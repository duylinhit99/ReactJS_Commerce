import { useEffect, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";
import AddCart from "../Cart/AddCart";


function ProductHome() {
    const [dataProd, setDataProd] = useState([]);
    const [dataDetail, setDataDetail] = useState("");

    useEffect(() => {
        API.get("product")
            .then(res => {
                setDataProd(res.data.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleDetail = (id) => {
        API.get(`/product/detail/${id}`)
            .then(response => {
                setDataDetail(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const renderProduct = () => {
        if (dataProd.length > 0) {
            return dataProd.map((product) => {
                const imgArr = JSON.parse(product.image);
                const imageFirst = imgArr[0];
                return (
                    <div className="col-sm-4" key={product.id}>
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img
                                        src={`http://localhost/laravel8/laravel8/public/upload/product/${product.id_user}/${imageFirst}`}
                                        alt={product.name}
                                    />
                                    <h2>{product.price}</h2>
                                    <p>{product.name}</p>
                                    <AddCart id={product.id} />
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>{product.price}</h2>
                                        <p>{product.name}</p>
                                        <AddCart id={product.id} />
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                                    <li><Link to={"product/detail/" + product.id}><i className="fa fa-plus-square"></i>Read More</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };

    return (
        <>
            <div className="col-sm-9 padding-right">
                <div className="features_items">
                    <h2 className="title text-center">Features Items</h2>
                    {renderProduct()}
                    <ul className="pagination">
                        <li className="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">»</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ProductHome;
