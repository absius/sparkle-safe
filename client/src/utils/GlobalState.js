import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";
// instead of useProductReducer, will be useJewelryReducer (I think)
const StoreContext = createContext();
const { Provider } = StoreContext;

// still needs to be updated for sparkle-safe
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: "",
  });
  // use this to confirm it works
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
