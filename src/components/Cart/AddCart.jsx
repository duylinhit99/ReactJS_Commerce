import { Link } from "react-router-dom";

function AddCart(props) {
    let { id } = props
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
                tongQty = tongQty + cart[item]
            })
        }
        localStorage.setItem('tongQty', JSON.stringify(tongQty))

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