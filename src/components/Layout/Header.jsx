import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useSelector } from "react-redux";

function Header() {
    const navigate = useNavigate()
    // const qty = JSON.parse(localStorage.getItem('tongQty'))

    const cartList = useSelector(state => state.cart.tongQty)

    // const { qty, getQty } = useContext(UserContext); // Giả sử context cung cấp `qty` và `getQty`
    const cart = JSON.parse(localStorage.getItem("cart")) || {}; // Đảm bảo `cart` không bị `null`

    // useEffect(() => {
    //     // Tính tổng số lượng sản phẩm trong giỏ hàng
    //     const totalQty = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);
    //     // Cập nhật qty trong context
    //     getQty(totalQty);
    // }, [cart, getQty]); // Thực hiện khi `cart` thay đổi

    function hanldeLogin() {
        if (localStorage.getItem('login')) {
            return (
                <li><Link to="/login" onClick={hanldeLogout}><i className="fa fa-lock"></i>Logout</Link></li>
            )
        } else {
            return (
                <li><Link to="/login"><i className="fa fa-lock"></i>Login</Link></li>
            )
        }
    }

    function hanldeLogout() {
        localStorage.removeItem('login')
        navigate('/login')
    }

    // function renderTotal() {
    //     if (qty === 0) {
    //         return (
    //             <li>
    //                 <Link to="/product/cart">
    //                     <i className="fa fa-shopping-cart" />Cart
    //                 </Link>
    //             </li>
    //         )
    //     } else {
    //         return (
    //             <li>
    //                 <Link to="/product/cart">
    //                     {qty} Cart
    //                 </Link>
    //             </li>
    //         )
    //     }
    // }

    return (
        <header id="header">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><a href="#"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
                                    <li><a href="#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 clearfix">
                            <div className="logo pull-left">
                                <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
                            </div>
                            <div className="btn-group pull-right clearfix">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        USA
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a href="">Canada</a></li>
                                        <li><a href="">UK</a></li>
                                    </ul>
                                </div>

                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        DOLLAR
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a href="">Canadian Dollar</a></li>
                                        <li><a href="">Pound</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 clearfix">
                            <div className="shop-menu clearfix pull-right">
                                <ul className="nav navbar-nav">
                                    {/* <li><a href="">Xin Chào : {email}</a></li> */}
                                    <li><Link to="/account"><i className="fa fa-user"></i> Account</Link></li>
                                    <li><a href=""><i className="fa fa-star"></i> Wishlist</a></li>
                                    <li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
                                    <li><Link to="/product/cart"><i class="fa fa-shopping-cart"></i> Cart {cartList}</Link></li>
                                    {hanldeLogin()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to="/" className="active">Home</Link></li>
                                    <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                                        <ul role="menu" className="sub-menu">
                                            <li><a href="shop.html">Products</a></li>
                                            <li><a href="product-details.html">Product Details</a></li>
                                            <li><a href="checkout.html">Checkout</a></li>
                                            <li><a href="cart.html">Cart</a></li>
                                            <li><a href="login.html">Login</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down"></i></a>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="/blog">Blog List</Link></li>
                                            <li><a href="blog-single.html">Blog Single</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="404.html">404</a></li>
                                    <li><a href="contact-us.html">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;