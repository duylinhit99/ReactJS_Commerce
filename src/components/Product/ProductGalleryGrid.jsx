import StaticProductCard from "./StaticProductCard";

function ProductGalleryGrid({ products, colClass = "col-sm-3" }) {
  return (
    <>
      {products.map((product, index) => (
        <StaticProductCard
          key={`${product.image}-${index}`}
          product={product}
          colClass={colClass}
        />
      ))}
    </>
  );
}

export default ProductGalleryGrid;
