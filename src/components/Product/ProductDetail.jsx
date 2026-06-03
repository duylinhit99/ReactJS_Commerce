import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailTabs from "./ProductDetailTabs";
import ProductRecommendedCarousel from "./ProductRecommendedCarousel";
import { getFirstProductImage } from "../../utils/product";

function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`product/detail/${id}`)
      .then((response) => {
        const data = response.data.data;
        setItem(data);
        setSelectedImage(getFirstProductImage(data.image));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="col-sm-9 padding-right">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!item?.id) {
    return (
      <div className="col-sm-9 padding-right">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="col-sm-9 padding-right">
      <ProductDetailInfo
        item={item}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
      />
      <ProductDetailTabs product={item} />
      <ProductRecommendedCarousel />
    </div>
  );
}

export default ProductDetail;
