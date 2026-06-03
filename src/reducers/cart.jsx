import {
  ADD_TO_CART,
  INCREMENT_CART,
  DECREMENT_CART,
} from "../actions/cart";

const initialState = {
  tongQty: 0,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
    case INCREMENT_CART:
    case DECREMENT_CART:
      return { ...state, tongQty: action.payload };
    default:
      return state;
  }
}

export default cartReducer;
