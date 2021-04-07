import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import Axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    // loading: true,
  };
  componentDidMount() {
    // now done using redux so the same axios get function can be found in the action
    // part of the orders
    // Axios.get("/orders.json")
    //   .then((res) => {
    //     this.setState({ loading: false });
    //     console.log(res.data);
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key,
    //       });
    //     }
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
    this.props.onFetchOrder();
  }
  render() {
    let loadOrders = <Spinner />;
    // console.log(this.props.orders);
    if (!this.props.loading) {
      loadOrders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.totalPrice}
        />
      ));
    }
    return <div>{loadOrders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, Axios));
