import React, { Component } from "react";
import { connect } from 'react-redux'

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Steet",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP CODE",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {
          required: false,
        },
        valid: true,
        value: "",
      },
    },
    formIsValid: false,
    loading: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    } else if (!rules.required) {
      isValid = true;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChagedHandler = (e, inputIdentifier) => {
    // console.log(e.target.value)
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.touched = true;
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    console.log(updatedFormElement, inputIdentifier);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  orderHandler = (e) => {
    e.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.tolPrice,
      orderData: formData,
    };
    Axios.post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        // console.log(response);
        this.props.history.replace("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    const formElementArray = [];
    for (let Key in this.state.orderForm) {
      formElementArray.push({
        id: Key,
        config: this.state.orderForm[Key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(e) => this.inputChagedHandler(e, formElement.id)}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation.required}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    tolPrice: state.totalPrice
  }
}

export default  connect(mapStateToProps)(ContactData)