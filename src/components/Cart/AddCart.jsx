import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartQty } from "../../actions/cart";
import { addProductToCart } from "../../utils/cart";

function AddCart({ id }) {
  const dispatch = useDispatch();

  function handleAddToCart(e) {
    e.preventDefault();
    const totalQty = addProductToCart(id);
    dispatch(setCartQty(totalQty));
  }

  return (
    <Link
      to="/"
      className="btn btn-default add-to-cart"
      onClick={handleAddToCart}
    >
      <i className="fa fa-shopping-cart" />
      Add to cart
    </Link>
  );
}

export default AddCart;
