import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
// import * as actions from "../../store/actions/index";

class Checkout extends Component {
  // state = {
  //   ingredients: {
  //     salad: 1,
  //     meat: 1,
  //     cheese: 1,
  //     bacon: 2,
  //   },
  //   totalPrice: 0,
  // };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   // console.log(this.props.location.search)
  //   const queryIngredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "totalPrice") {
  //       price = param[1];
  //     } else {
  //       queryIngredients[param[0]] = + param[1];
  //     }
  //   }
  //   this.setState({ ingredients: queryIngredients, totalPrice: price });
  //   // console.log(this.state.ingredients);
  // }

  // componentWillMount() {
  //   this.props.onPurchaseInit();
  // }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to = "/" /> : null;
      summary = (
        <div>
          {/* {console.log(this.props.ings, "from checkout")} */}
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinued={this.checkoutContinued}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            // render={() => (
            //   <ContactData
            //     {...this.props}
            //     totalPrice={this.props.tolPrice}
            //     ingredients={this.props.ings}
            //   />
            // )}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tolPrice: state.burgerBuilder.tolPrice,
    purchased: state.order.purchased
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // onPurchaseInit: () => dispatch(actions.purchaseInit()),
//   };
// };

export default connect(mapStateToProps, null)(Checkout);
