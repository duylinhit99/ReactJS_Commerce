import { Link } from "react-router-dom";
import AddCart from "../Cart/AddCart";
import { productImageUrl } from "../../config";
import { getFirstProductImage } from "../../utils/product";

function ProductCard({ product }) {
  const imageFirst = getFirstProductImage(product.image);

  return (
    <div className="col-sm-4">
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <img
              src={productImageUrl(product.id_user, imageFirst)}
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
            <li>
              <a href="/">
                <i className="fa fa-plus-square" />
                Add to wishlist
              </a>
            </li>
            <li>
              <Link to={`/product/detail/${product.id}`}>
                <i className="fa fa-plus-square" />
                Read More
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
