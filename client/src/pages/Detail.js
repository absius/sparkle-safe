// needs to be adjusted to match our app

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_JEWELRY_ITEM, QUERY_JEWELRY_LIST } from "../utils/queries";
import spinner from "../assets/spinner.gif";
import { useStoreContext } from "../utils/GlobalState";
import JewelryList from "../components/JewelryList";
import JewelryItem from "../components/JewelryItem";
import { REMOVE_JEWELRY, ADD_JEWELRY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

function Detail() {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  const [currentJewelry, setCurrentJewelry] = useState({});

  const { loading, data } = useQuery(QUERY_JEWELRY);

  const { jewelry, JewelryList } = state;

  const addJewelry = () => {
    const itemInJewelryList = JewelryList.find(
      (JewelryItem) => JewelryItem._id === id
    );

    if (itemInJewelryList) {
      dispatch({
        type: UPDATE_JEWELRY_LIST_QUANTITY,
        _id: id,
        jewelryQuantity: parseInt(itemInJewelryList.jewelryQuantity) + 1,
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise("jewelryList", "put", {
        ...itemInJewelryList,
        jewelryQuantity: parseInt(itemInJewelryList.jewelryQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_JEWELRY,
        product: { ...currentJewelry, jewelryQuantity: 1 },
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise("jewelryList", "put", {
        ...currentJewelry,
        jewelryQuantity: 1,
      });
    }
  };

  const removeFromJewelryList = () => {
    dispatch({
      type: REMOVE_FROM_JEWELRY_LIST,
      _id: currentJewelry._id,
    });

    // upon removal from cart, delete item form IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise("jewelryList", "delete", { ...currentJewelry });
  };

  useEffect(() => {
    // already in global store
    if (JewelryList.length) {
      setCurrentJewelry(jewelryList.find((jewelry) => jewelry._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_JEWELRY_LIST,
        products: data.jewelry_list,
      });

      data.jewelryList.forEach((jewelry) => {
        idbPromise("jewelryList", "put", jewelry);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("jewelryList", "get").then((indexedJewelryList) => {
        dispatch({
          type: UPDATE_JEWELRY_LIST,
          products: indexedJewelryList,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
