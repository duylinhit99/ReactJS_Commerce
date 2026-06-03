import { useEffect, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";
import { getAuthHeaders } from "../../utils/auth";
import { productImageUrl } from "../../config";

function MyProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("user/my-product", { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.data.errors) {
          setData(res.data.data ?? []);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  function handleDelete(productId) {
    API.get(`/user/product/delete/${productId}`, { headers: getAuthHeaders() })
      .then((res) => setData(res.data.data ?? []))
      .catch((err) => console.error(err));
  }

  const rows = !data || Object.keys(data).length === 0
    ? []
    : Object.keys(data).map((key) => {
      const item = data[key];
      const imageArray = JSON.parse(item.image || "[]");
      const firstImage = imageArray[0];

      return (
        <tr key={item.id ?? key}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td className="product_image">
            {firstImage && (
              <img
                style={{ width: "100px" }}
                src={productImageUrl(item.id_user, firstImage)}
                alt="product"
              />
            )}
          </td>
          <td>{item.price}</td>
          <td className="action-buttons">
            <Link to={`/product/edit/${item.id}`}>
              <button type="button" className="edit">
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="delete"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

  return (
    <div className="main-content">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Link to="/product/add">
        <button type="button" className="add-product">
          Add Product
        </button>
      </Link>
    </div>
  );
}

export default MyProduct;
