import React from "react";
import { Link } from "react-router-dom";
import { pluralize, idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import {
  ADD_JEWELRY_ITEM,
  UPDATE_JEWELRY_LIST_QUANTITY,
} from "../../utils/actions";

function JewelryItem(item) {
  const {
    _id,
    jewelryName,
    description,
    jewelryPrice,
    assessedValue,
    jewelryAssessor,
    purchaseDate,
    jewelryWarranty,
    serviceDate,
    jewelryPhoto,
    receiptPhoto,
    createdAt,
  } = item;
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const addJewelryItem = () => {
    // find the cart item with the matching id
    const itemInJewelryList = cart.find(
      (jewelryItem) => jewelryItem._id === _id
    );

    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInJewelryList) {
      dispatch({
        type: UPDATE_JEWELRY_LIST_QUANTITY,
        _id: _id,
        jewelryListQuantity: parseInt(itemInJewelryList.jewelryQuantity) + 1,
      });
      idbPromise("jewelryList", "put", {
        ...itemInJewelryList,
        jewelryListQuantity:
          parseInt(itemInJewelryList.jewelryListQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_JEWELRY_ITEM,
        jewelryItem: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default JewelryItem;
