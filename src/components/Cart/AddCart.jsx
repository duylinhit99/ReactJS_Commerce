import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useDispatch } from 'react-redux';
import { addToCart } from "../../actions/cart";
function AddCart(props) {
    let { id } = props
    const xx = useContext(UserContext);

    const dispatch = useDispatch()
    function handleCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || {}
        if (!cart[id]) {
            cart[id] = 1
        } else {
            cart[id] += 1
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        // console.log(cart)
        // console.log(id)
        // console.log(cart[id])
        let tongQty = 0
        if (Object.keys(cart).length > 0) {
            Object.keys(cart).map((item, i) => {
                tongQty += cart[item]
            })
        }
        // xx.getQty(tongQty)
        // localStorage.setItem('tongQty', JSON.stringify(tongQty))
        const action = addToCart(tongQty);
        dispatch(action);
    }
    return (
        <>
            <Link to=""
                className="btn btn-default  add-to-cart"
                onClick={handleCart}
            >
                <i className="fa fa-shopping-cart" />Add to cart
            </Link>
        </>

    )
}
export default AddCart;