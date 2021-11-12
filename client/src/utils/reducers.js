import { useReducer } from "react";
import { ADD_USER, ADD_JEWELRY_ITEM, REMOVE_JEWELRY_ITEM } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state with an updated products array
    case ADD_JEWELRY_ITEM:
      return {
        ...state,
        jewelryItem: [...action.jewelryItem],
      };
    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case ADD_USER:
      return {
        ...state,
        user: [...action.user],
      };

    case REMOVE_JEWELRY_ITEM:
      return {
        ...state,
        jewelryItem: action.jewelryItem,
      };

    // if it's none of these actions, do not update state at all and keep things the same
    default:
      return state;
  }
};

export function useJewelryReducer(initialState) {
  return useReducer(reducer, initialState);
}
