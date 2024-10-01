export const addToCart = (tongQty) => {
    return {
        type: "ADD_TO_CART",
        payload: tongQty
    }
}

export const tangCart = (tongQty) => {
    return {
        type: "TANG_CART",
        payload: tongQty
    }
}


export const giamCart = (tongQty) => {
    return {
        type: "GIAM_CART",
        payload: tongQty
    }
}