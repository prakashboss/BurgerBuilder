import React, { Component} from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxi/auxi";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component  {
  shouldComponentUpdate(nextProp, nextState) {
    return nextProp.show !== this.props.show || nextProp.children !== this.props.children;
  }

  componentDidUpdate() {
    // console.log('OrderSumary willupdate')
  }
  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? 1 : 0,
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
  
}

export default Modal;
