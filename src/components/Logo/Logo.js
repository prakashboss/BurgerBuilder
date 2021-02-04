import React from "react";
import burgerLogo from "../../../src/assets/Images/burger-logo.png";
import classes from './Logo.css'

const Logo = (props) => {
  return (
    <div className={classes.Logo} style={{height: props.height}}>
      <img src={burgerLogo} alt='MyBurger logo'/>
    </div>
  );
};

export default Logo;
