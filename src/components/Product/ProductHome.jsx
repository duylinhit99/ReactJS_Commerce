import { useEffect, useState } from "react";
import API from "../../API";
import ProductCard from "./ProductCard";

function ProductHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("product")
      .then((res) => setProducts(res.data.data ?? []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        <h2 className="title text-center">Features Items</h2>
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductHome;
