import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddCart from '../Cart/AddCart'
import API from "../../API";

function ProductDetail() {
    let params = useParams();

    const [item, setItem] = useState({})
    const [brand, setBrand] = useState([])
    const [content, setContent] = useState("reviews")
    const [userName, setUserName] = useState('')
    const [selectImg, setSelectImg] = useState('')
    useEffect(() => {
        API.get('/category-brand')
            .then(response => {
                setBrand(response.data.brand)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])
    useEffect(() => {
        API.get('product/detail/' + params.id)
            .then((response) => {
                setItem(response.data.data)
                const imageArray = JSON.parse(response.data.data.image)
                setSelectImg(imageArray[0])
                console.log(response.data.data);

            }).catch(error => {
                console.log(error);
            })
    }, [params.id])
    // if (item) {
    //     return null
    // }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("appState"))
        setUserName(user.name)
    }, [])
    const renderData = () => {
        if (Object.keys(item).length > 0) {
            const imageArray = JSON.parse(item.image)
            console.log(imageArray)
            return (
                <>
                    <div className="product-details">
                        <div className="col-sm-5">
                            <div className="view-product">
                                <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + item.id_user + "/" + selectImg} alt="" />
                                <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>

                            </div>
                            <div id="similar-product" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active" style={{ display: 'flex' }}>
                                        {imageArray.map((value, key) => (
                                            <Link key={key}>
                                                <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + item.id_user + "/" + value} alt=""
                                                    style={{ maxWidth: '100px', objectFit: "cover" }}
                                                    onClick={() => setSelectImg(value)}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>


                                <a className="left item-control" href="#similar-product" data-slide="prev">
                                    <i className="fa fa-angle-left"></i>
                                </a>
                                <a className="right item-control" href="#similar-product" data-slide="next">
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </div>

                        </div>
                        <div className="col-sm-7">
                            <div className="product-information">
                                <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                <h2>{item.name}</h2>
                                <p>Web ID: {item.web_id}</p>
                                <img src="images/product-details/rating.png" alt="" />
                                <span>
                                    <span>{item.price}</span>

                                    <AddCart id={item.id} />

                                </span>
                                <p><b>Availability:</b> In Stock</p>
                                <p><b>Condition:</b> New</p>
                                <p><b>Brand:</b> E-SHOPPER</p>
                                <a href=""><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </>

            )
        }
    }
    return (
        <div className="col-sm-9 padding-right">
            {renderData()}

            <div className="category-tab shop-details-tab">
                <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li><a href="#details" data-toggle="tab">Details</a></li>
                        <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                        <li><a href="#tag" data-toggle="tab">Tag</a></li>
                        <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade" id="details" >
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="companyprofile" >
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="tag" >
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade active in" id="reviews" >
                        <div className="col-sm-12">
                            <ul>
                                <li><a href=""><i className="fa fa-user"></i>EUGEN</a></li>
                                <li><a href=""><i className="fa fa-clock-o"></i>12:41 PM</a></li>
                                <li><a href=""><i className="fa fa-calendar-o"></i>31 DEC 2014</a></li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p><b>Write Your Review</b></p>

                            <form action="#">
                                <span>
                                    <input type="text" placeholder="Your Name" />
                                    <input type="email" placeholder="Email Address" />
                                </span>
                                <textarea name="" ></textarea>
                                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                <button type="button" className="btn btn-default pull-right">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <div className="recommended_items">
                <h2 className="title text-center">recommended items</h2>

                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="item active">
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                        <i className="fa fa-angle-left"></i>
                    </a>
                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                        <i className="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>

        </div>
    )
}
export default ProductDetail;