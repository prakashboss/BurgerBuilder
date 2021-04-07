import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxi/auxi";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import axios from "axios";
// import * as actionType from "../../store/actions/actionTypes";
import {
  addIngredient,
  removeIngredient,
  intIngredients,
  purchaseInit
} from "../../store/actions/index";

class BurgerBuilder extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    // loading: false,
    // error: false
  };

  componentDidMount() {
    console.log(this.props);
    // Axios.get("ingredients.json")
    //   .then((response) => {
    //     // console.log(response.data);
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //     console.log(error);
    //   });
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  // used by buildcontrol to add items to the burger
  // addIngredientHandler = (type) => {
  //   // to add number of ingredients based on the type
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   // to calculate price based on the ingredient added
  //   // const newPrice = this.state.totalPrice + INGEDIENT_PRICES[type]
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // used by buildcontrol to remove items from the burger
  // removeIngredientHandler = (type) => {
  //   // to remove number of ingredients based on the type
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   // to calculate price based on the current ingredient
  //   // const newPrice = this.state.totalPrice - INGEDIENT_PRICES[type]
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // to check if the order button was clicked
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('you have Purchased the burger!!')

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("totalPrice=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      // search: "?" + queryString,
    });
    this.props.onPurchaseInit()
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // console.log(this.state.purchasable);
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Sorry the burger ingredient can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.tolPrice}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            // ingredientAdded={this.addIngredientHandler}
            ingredientAdded={this.props.onIngredientAdded}
            // ingredientRemoved={this.removeIngredientHandler}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.tolPrice}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tolPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(intIngredients()),
    onPurchaseInit: () => dispatch(purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, Axios));
