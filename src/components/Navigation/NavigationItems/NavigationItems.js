import React from "react";
import classes from "./NavigationItems.css";
import Navigation from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <div className={classes.NavigationItems}>
      <Navigation link={"/"} active>
        Burger Builder
      </Navigation>
      <Navigation link={"/"}>Checkout</Navigation>
    </div>
  );
};

export default NavigationItems;
