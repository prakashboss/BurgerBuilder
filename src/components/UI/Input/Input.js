import React from "react";
import classes from "./Input.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement]
  
  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          defaultValue={props.value}
          className={inputClasses.join(' ')}
          onChange={(e)=>props.changed(e)}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          defaultValue={props.value}
          className={inputClasses.join(' ')}
          onChange={(e)=>props.changed(e)}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          defaultValue={'Please select a option'}
          onChange={(e)=>props.changed(e)}
          className={inputClasses.join(' ')}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          defaultValue={props.value}
          onChange={(e)=>props.changed(e)}
          className={classes.InputElement}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
