import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/orders";
import Auth from './containers/Auth/Auth'
import Logout from "./containers/Auth/Logout/Logout";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/orders' component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
