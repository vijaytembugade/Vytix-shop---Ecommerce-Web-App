import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_PRODUCT_TOP_REQUEST,
  PRODUCT_PRODUCT_TOP_SUCCESS,
  PRODUCT_PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const listProduct = (keyword = "", pageNumber="") => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  // const { data } = axios.get("api/products");
  fetch(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
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






export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.post(`/api/products/`, {} , config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload : data
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.put(`/api/products/${product._id}`, product , config);

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload : data
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createProductReview = (productId,review ) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

     await axios.post(`/api/products/${productId}/reviews`, review , config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

export const listTopProducts = (id) => async (dispatch) => {

  try {
    dispatch({
      type: PRODUCT_PRODUCT_TOP_REQUEST,
    });
     const {data} = await axios.get(`/api/products/top`);
     console.log(data)

    dispatch({
      type: PRODUCT_PRODUCT_TOP_SUCCESS,
      payload : data
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_PRODUCT_TOP_FAIL,
      payload: message,
    });
  }
  // dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
};