import React, { Component } from "react";
import Burger from '../../components/Burger/Burger'
import Aux from "../../hoc/auxi";

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Burger Controls</div>
      </Aux>
    );
  }
}


export default BurgerBuilder