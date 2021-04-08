import { FETCH_PRODUCTS } from "../types";
import { FILTER_PRODUCTS_BY_SIZE } from "../types";
import { ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products"); //this needs to be converted to JSON so
  const data = await res.json(); //json function returns promise, we need to make it await
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      //this object contains 2 values.1.selected sizes.2.filtered products
      size: size, //which user selected
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
      //moved app.js logic here
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    //base on ID
    sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    //base on price
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : b.price > a.price
        ? 1
        : -1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
