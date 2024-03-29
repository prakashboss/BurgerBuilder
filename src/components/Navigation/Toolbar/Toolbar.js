import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggler clicked={props.openSideDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.auth} />
      </nav>
    </header>
  );
};

export default Toolbar;
