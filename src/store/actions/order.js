import Axios from "../../axios-orders";
import * as actionType from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch (purchaseBurgerStart())
    Axios.post("https://react-my-burger1-efbb7-default-rtdb.firebaseio.com/orders.json", orderData)
      .then((response) => {
        console.log(response.data)
        purchaseBurgerSuccess(response.data, orderData)
      })
      .catch((error) => {
        console.log(error)
        purchaseBurgerFail(error)
      });
  };
};
