import { Link } from "react-router-dom";

function MenuAccount() {
    function handleToggle() {

    }
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Account</h2>
                <div className="panel-group category-products" id="accordian">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <Link data-toggle="collapse" data-parent="#accordian" to="/account">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    Account
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <Link type="submit" data-toggle="collapse" data-parent="#accordian" to="/my-product" onClick={handleToggle}>
                                        <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                        My Product
                                    </Link>
                                </h4>
                            </div>
                            <div id="sportswear" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <ul>
                                        <li><a href="#">Edit Product</a></li>
                                        <li><a href="#">Add Product</a></li>
                                        <li><a href="#">Delete Product</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shipping text-center">
                    <img src="images/home/shipping.jpg" alt="" />
                </div>

            </div>
        </div>
    )
}
export default MenuAccount;