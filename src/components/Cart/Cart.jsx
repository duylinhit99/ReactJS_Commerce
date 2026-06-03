import { useEffect, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementCartQty, decrementCartQty } from "../../actions/cart";
import { productImageUrl } from "../../config";
import {
  getCart,
  incrementCartItem,
  decrementCartItem,
} from "../../utils/cart";
import { getFirstProductImage } from "../../utils/product";

function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = getCart();
    if (Object.keys(cart).length === 0) return;

    API.post("product/cart", cart)
      .then((response) => setItems(response.data.data ?? []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const nextTotal = items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
    setTotal(nextTotal);
  }, [items]);

  function handlePlus(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
    dispatch(incrementCartQty(incrementCartItem(id)));
  }

  function handleMinus(id) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
    dispatch(decrementCartQty(decrementCartItem(id)));
  }

  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const firstImage = getFirstProductImage(item.image);
                  return (
                    <tr key={item.id}>
                      <td className="cart_product">
                        <img
                          src={productImageUrl(item.id_user, firstImage)}
                          style={{ width: "100px" }}
                          alt={item.name}
                        />
                      </td>
                      <td className="cart_description">
                        <h4>{item.name}</h4>
                      </td>
                      <td className="cart_price">
                        <p>{item.price}</p>
                      </td>
                      <td className="cart_quantity">
                        <div className="cart_quantity_button">
                          <button
                            type="button"
                            className="cart_quantity_up"
                            onClick={() => handlePlus(item.id)}
                          >
                            +
                          </button>
                          <input
                            className="cart_quantity_input"
                            type="text"
                            readOnly
                            value={item.qty}
                            size="2"
                          />
                          <button
                            type="button"
                            className="cart_quantity_down"
                            onClick={() => handleMinus(item.id)}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td className="cart_total">
                        <p className="cart_total_price">
                          {item.qty * item.price}
                        </p>
                      </td>
                      <td className="cart_delete" />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div className="container">
          <div className="total_area">
            <ul>
              <li>
                Total <span>{total}</span>
              </li>
            </ul>
            <Link className="btn btn-default check_out" to="/">
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
