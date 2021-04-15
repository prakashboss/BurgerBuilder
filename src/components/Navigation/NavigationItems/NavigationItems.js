import React from "react";
import classes from "./NavigationItems.css";
import Navigation from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  console.log(props.isAuthenticated);
  return (
    <div className={classes.NavigationItems}>
      <Navigation link={"/"}>Burger Builder</Navigation>
      {props.isAuthenticated ? (
        <Navigation link={"/orders"}>Orders</Navigation>
      ) : null}
      {props.isAuthenticated ? (
        <Navigation link={"/logout"}>Logout</Navigation>
      ) : (
        <Navigation link={"/auth"}>Authenticate</Navigation>
      )}
    </div>
  );
};

export default NavigationItems;
