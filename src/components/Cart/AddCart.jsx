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
    <button
      type="button"
      className="btn btn-default add-to-cart"
      onClick={handleAddToCart}
    >
      <i className="fa fa-shopping-cart" />
      Add to cart
    </button>
  );
}

export default AddCart;
