import { useContext, useEffect, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";
import { UserContext } from '../../UserContext'
function Cart(props) {
    const [item, setItem] = useState([])
    const [total, setTotal] = useState(0)
    const qty = useContext(UserContext)
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));

        if (cart) {
            API.post('product/cart', cart)
                .then((response) => {
                    setItem(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching cart:', error);
                });
        }
    }, []);

    useEffect(() => {
        let total = 0
        Object.keys(item).map((key, i) => {
            total += item[key].qty * item[key].price
        })
        setTotal(total)
    })

    function handlePlus(id) {
        // Tạo bản sao của state `item` hiện tại
        let newItem = [...item];

        // Tìm và tăng số lượng của sản phẩm có id tương ứng
        newItem = newItem.map((item) => {
            if (item.id === id) {
                return { ...item, qty: item.qty + 1 };
            }
            return item;
        });

        // Cập nhật state với danh sách sản phẩm mới
        setItem(newItem);

        // Lấy giỏ hàng từ localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || {};

        // Tăng số lượng sản phẩm trong giỏ hàng nếu tồn tại
        if (cart[id]) {
            cart[id] += 1;
        } else {
            cart[id] = 1
        }

        // Lưu giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Tính tổng số lượng sản phẩm trong giỏ hàng
        let tongQty = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

        // Lưu tổng số lượng vào localStorage
        // localStorage.setItem("tongQty", JSON.stringify(tongQty));
        qty.getQty(tongQty)
    }


    function handleMinus(id) {
        let newItem = [...item]
        // Tìm và giảm số lượng của sản phẩm có id tương ứng
        newItem = newItem
            .map((item) => {
                if (item.id === id) {
                    return { ...item, qty: item.qty - 1 };
                }
                return item;
            })
            .filter((item) => item.qty > 0); // Chỉ giữ lại những sản phẩm có số lượng lớn hơn 0
        setItem(newItem)
        let cart = JSON.parse(localStorage.getItem('cart')) || {}
        if (cart[id] && cart[id] > 1) {
            cart[id] -= 1
        } else {
            delete cart[id];  // Nếu số lượng <= 1, xóa sản phẩm khỏi giỏ hàng
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        let tongQty = Object.values(cart).reduce((acc, qty) => acc + qty, 0)

        qty.getQty(tongQty)
    }


    function handleDelete() {

    }
    function renderData() {
        if (Object.keys(item).length > 0) {
            return Object.keys(item).map((key, i) => {
                const imageArray = JSON.parse(item[key].image)
                const firstImage = imageArray[0]
                return (

                    <tr key={key}>
                        <td className="cart_product">
                            <Link to="">
                                <img
                                    src={"http://localhost/laravel8/laravel8/public/upload/product/" + item[key].id_user + "/" + firstImage}
                                    style={{ width: "100px" }}
                                    alt="" />
                            </Link>
                        </td>
                        <td className="cart_description">
                            <h4><a href="">{item[key].name}</a></h4>
                            <p>Web ID: 1089772</p>
                        </td>
                        <td className="cart_price">
                            <p>{item[key].price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <Link className="cart_quantity_up" to="" onClick={() => handlePlus(item[key].id)}> + </Link>
                                <input className="cart_quantity_input" type="text" name="quantity" value={item[key].qty} autocomplete="off" size="2" />
                                <Link className="cart_quantity_down" to="" onClick={() => handleMinus(item[key].id)}> - </Link>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price" id={item[key].id}>{item[key].qty * item[key].price}</p>
                        </td>
                        <td className="cart_delete">
                            <Link className="cart_quantity_delete" to="" onClick={handleDelete}><i className="fa fa-times"></i></Link>
                        </td>
                    </tr>

                )
            })
        }
    }
    return (
        <>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description"></td>
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href="">Get Quotes</a>
                                <a className="btn btn-default check_out" href="">Continue</a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>$59</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>{total}</span></li>
                                </ul>
                                <a className="btn btn-default update" href="">Update</a>
                                <a className="btn btn-default check_out" href="">Check Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Cart;