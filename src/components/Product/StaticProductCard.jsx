import AddCart from "../Cart/AddCart";

function StaticProductCard({ product, colClass = "col-sm-3", productId }) {
  return (
    <div className={colClass}>
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <img src={product.image} alt={product.name} />
            <h2>{product.price}</h2>
            <p>{product.name}</p>
            {productId ? (
              <AddCart id={productId} />
            ) : (
              <button type="button" className="btn btn-default add-to-cart" disabled>
                <i className="fa fa-shopping-cart" />
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaticProductCard;
