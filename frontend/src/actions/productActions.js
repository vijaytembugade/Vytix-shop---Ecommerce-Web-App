import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const listProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  // const { data } = axios.get("api/products");
  fetch("/api/products")
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          err.responce && err.responce.data.mesage
            ? err.responce.data.message
            : err.message,
      });
    });

  // dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
};

export const listProductDetails = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });

  // const { data } = axios.get("api/products");
  fetch(`/api/products/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          err.responce && err.responce.data.message
            ? err.responce.data.message
            : err.message,
      });
    });

  // dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
};
