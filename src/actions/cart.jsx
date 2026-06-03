export const ADD_TO_CART = "ADD_TO_CART";
export const INCREMENT_CART = "INCREMENT_CART";
export const DECREMENT_CART = "DECREMENT_CART";

export function setCartQty(qty) {
  return { type: ADD_TO_CART, payload: qty };
}

export function incrementCartQty(qty) {
  return { type: INCREMENT_CART, payload: qty };
}

export function decrementCartQty(qty) {
  return { type: DECREMENT_CART, payload: qty };
}

/** @deprecated Use setCartQty */
export const addToCart = setCartQty;
/** @deprecated Use incrementCartQty */
export const tangCart = incrementCartQty;
/** @deprecated Use decrementCartQty */
export const giamCart = decrementCartQty;
