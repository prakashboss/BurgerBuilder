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
    dispatch(purchaseBurgerStart())
    Axios.post("/orders.json", orderData)
      .then((response) => {
        console.log(response.data.name)
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch((error) => {
        console.log(error)
        dispatch(purchaseBurgerFail(error))
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (order) => {
  return {
    type: actionType.FETCH_ORDERS_SUCCESS,
    orders: order
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionType.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionType.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    Axios.get("/orders.json")
      .then((res) => {
        
        // console.log(res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch (fetchOrdersSuccess(fetchedOrders))
        // this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        // this.setState({ loading: false });
        dispatch(fetchOrdersFail(err))
      });
  }
}