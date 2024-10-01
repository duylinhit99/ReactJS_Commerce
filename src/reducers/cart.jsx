const initalState = {
    tongQty: 0
}

// Reducer nhận vào 2 giá trị state , action
const cartReducer = (state = initalState, action) => {
    console.log(action.type)
    switch (action.type) {
        case "ADD_TO_CART": {
            return {
                ...state,
                tongQty: action.payload
            }
        }
        case "TANG_CART": {
            return {
                ...state,
                tongQty: action.payload
            }
        }
        case "GIAM_CART": {
            return {
                ...state,
                tongQty: action.payload
            }
        }
        default:
            return state;
    }
}
export default cartReducer;