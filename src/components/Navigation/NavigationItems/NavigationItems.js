import React from "react";
import classes from "./NavigationItems.css";
import Navigation from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <div className={classes.NavigationItems}>
      <Navigation link={"/"} >
        Burger Builder
      </Navigation>
      <Navigation link={"/orders"}>Orders</Navigation>
      <Navigation link={"/auth"}>Authenticate</Navigation>
    </div>
  );
};

export default NavigationItems;
