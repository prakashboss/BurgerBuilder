import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 2,
    },
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    // console.log(this.props.location.search)
    const queryIngredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "totalPrice") {
        price = param[1];
      } else {
        queryIngredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: queryIngredients, totalPrice: price });
    // console.log(this.state.ingredients);
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              {...this.props}
              totalPrice={this.state.totalPrice}
              ingredients={this.state.ingredients}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;