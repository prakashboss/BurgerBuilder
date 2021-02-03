import React from "react";
import burgerLogo from "../../../src/assets/Images/burger-logo.png";
import classes from './Logo.css'

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt='MyBurger logo'/>
    </div>
  );
};

export default Logo;
