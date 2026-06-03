import AddCart from "../Cart/AddCart";
import { productImageUrl } from "../../config";
import { parseProductImages } from "../../utils/product";

function ProductDetailInfo({ item, selectedImage, onSelectImage }) {
  if (!item || Object.keys(item).length === 0) return null;

  const images = parseProductImages(item.image);

  return (
    <div className="product-details">
      <div className="col-sm-5">
        <div className="view-product">
          <img
            src={productImageUrl(item.id_user, selectedImage)}
            alt={item.name}
          />
        </div>
        <div
          id="similar-product"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="item active" style={{ display: "flex" }}>
              {images.map((fileName) => (
                <button
                  key={fileName}
                  type="button"
                  className="thumbnail-btn"
                  onClick={() => onSelectImage(fileName)}
                >
                  <img
                    src={productImageUrl(item.id_user, fileName)}
                    alt=""
                    style={{ maxWidth: "100px", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-7">
        <div className="product-information">
          <h2>{item.name}</h2>
          <p>Web ID: {item.web_id}</p>
          <span>
            <span>{item.price}</span>
            <AddCart id={item.id} />
          </span>
          <p>
            <b>Availability:</b> In Stock
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailInfo;
