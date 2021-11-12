import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_JEWELRY_LIST } from "../../utils/actions";

import JewelryItem from "../ProductItem";
import { QUERY_JEWELRY_LIST } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
import { idbPromise } from "../../utils/helpers";

function JewelryList() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_JEWELRY_LIST);

  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      dispatch({
        type: UPDATE_JEWELRY_LIST,
        products: data.jewelryList,
      });

      // but let's also take each product and save it to IndexedDB using the helper function
      data.jewelryList.forEach((jewelryItem) => {
        idbPromise("jewelryList", "put", jewelryItem);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the 'products' store
      idbPromise("jewelryList", "get").then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_JEWELRY_LIST,
          products: jewelryList,
        });
      });
    }
  }, [data, loading, dispatch]);

  // function filterJewelryList() {

  //   return state.jewelryList.filter(
  //     (jewelryItem) => jewelryItem._id === currentCategory
  //   );
  // }

  // still needs to be updated to reflect our jewelry model
  return (
    <div className="my-2">
      <h2>My Jewelry</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterJewelryList().map((jewelryItem) => (
            <JewelryItem
              key={product._id}
              _id={product._id}
              jewelryName={jewelry.name}
              description={jewelry.description}
              jewelryPrice={jewelry.price}
              assessedValue={jewelry.assessedValue}
              jewelryAssessor={jewelry.jewelryAssessor}
              jewelryWarranty={jewelry.jewelryWarranty}
              serviceDate={jewelry.serviceDate}
              jewelryPhoto={jewelry.jewelryPhoto}
              receiptPhoto={jewelry.receiptPhoto}
              createdAt={jewelry.createdAt}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any jewelry yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default JewelryList;
