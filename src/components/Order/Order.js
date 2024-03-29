import React from "react";
import classes from "./Order.css";

const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ingredient) => (
    <span
      key={ingredient.name}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: '2px solid #ccc',
        padding: '5px'
      }}
    >
      {ingredient.name} ({ingredient.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>NZD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
