import { productImageUrl } from "../../config";

function ExistingProductImages({ images, userId, selectedForDelete, onToggle }) {
  if (!images?.length) return null;

  return (
    <ul
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {images.map((fileName) => (
        <li key={fileName} className="image-item">
          <label className="image-label">
            <img
              className="image-my-product"
              src={productImageUrl(userId, fileName)}
              alt="Product"
            />
            <input
              type="checkbox"
              checked={selectedForDelete.includes(fileName)}
              onChange={() => onToggle(fileName)}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}

export default ExistingProductImages;
