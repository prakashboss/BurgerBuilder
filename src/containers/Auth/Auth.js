import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },

      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  render() {
    const formElementsArray = [];
    for (let Key in this.state.controls) {
      formElementsArray.push({
        id: Key,
        config: this.state.controls[Key],
      });
    }
  
    const form = formElementsArray.map((formElement) => (
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
    ));
    return (
      <div>
        <form>
          {form}
          <Button btnType="Success">Submit </Button>
        </form>
      </div>
    );
  }
}

export default Auth;
