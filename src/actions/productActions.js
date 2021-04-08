import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products"); //this needs to be converted to JSON so
  const data =  await res.json();//json function returns promise, we need to make it await
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
