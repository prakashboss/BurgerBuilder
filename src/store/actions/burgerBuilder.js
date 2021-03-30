import Axios from "../../axios-orders";
import * as actionType from "./actionTypes";

export const addIngredient = (ingName) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

const setIngredients = (ingredientS) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredientS,
  };
};

const fetchIngredientsFail = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_FAIL,
    error: true,
  };
};

export const intIngredients = () => {
  return (dispatch) => {
    // dispatch ()
    Axios.get("ingredients.json")
      .then((response) => {
        // console.log(response.data);
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        // this.setState({ error: true });
        dispatch(fetchIngredientsFail);
        console.log(error);
      });
  };
};
