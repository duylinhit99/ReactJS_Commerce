import StaticProductCard from "./StaticProductCard";
import { RECOMMENDED_CAROUSEL_SLIDES } from "../../constants/productDetailData";

function ProductRecommendedCarousel() {
  return (
    <div className="recommended_items">
      <h2 className="title text-center">recommended items</h2>
      <div
        id="recommended-item-carousel"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {RECOMMENDED_CAROUSEL_SLIDES.map((slide) => (
            <div
              key={slide.id}
              className={`item${slide.active ? " active" : ""}`}
            >
              {slide.products.map((product, index) => (
                <StaticProductCard
                  key={`${slide.id}-${index}`}
                  product={product}
                  colClass="col-sm-4"
                />
              ))}
            </div>
          ))}
        </div>
        <a
          href="#recommended-item-carousel"
          className="left recommended-item-control"
          data-slide="prev"
        >
          <i className="fa fa-angle-left" />
        </a>
        <a
          href="#recommended-item-carousel"
          className="right recommended-item-control"
          data-slide="next"
        >
          <i className="fa fa-angle-right" />
        </a>
      </div>
    </div>
  );
}

export default ProductRecommendedCarousel;
