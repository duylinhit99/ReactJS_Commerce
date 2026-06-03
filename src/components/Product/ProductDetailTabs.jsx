import { useState } from "react";
import ProductGalleryGrid from "./ProductGalleryGrid";
import ProductDetailReviews from "./ProductDetailReviews";
import {
  PRODUCT_DETAIL_TABS,
  GALLERY_BY_TAB,
} from "../../constants/productDetailData";

function ProductDetailTabs({ product }) {
  const [activeTab, setActiveTab] = useState("reviews");

  function renderTabPanel() {
    if (activeTab === "reviews") {
      return <ProductDetailReviews />;
    }

    if (activeTab === "details" && product?.detail) {
      return (
        <div className="col-sm-12 product-detail-text">
          <p>{product.detail}</p>
        </div>
      );
    }

    const galleryItems = GALLERY_BY_TAB[activeTab] ?? GALLERY_BY_TAB.details;
    return <ProductGalleryGrid products={galleryItems} />;
  }

  return (
    <div className="category-tab shop-details-tab">
      <div className="col-sm-12">
        <ul className="nav nav-tabs">
          {PRODUCT_DETAIL_TABS.map((tab) => (
            <li key={tab.id} className={activeTab === tab.id ? "active" : ""}>
              <button
                type="button"
                className="tab-button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.id === "reviews" ? " (5)" : ""}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content">
        <div className={`tab-pane fade active in`}>{renderTabPanel()}</div>
      </div>
    </div>
  );
}

export default ProductDetailTabs;
