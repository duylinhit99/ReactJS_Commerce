import { useEffect, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";

function MyProduct() {
    const [data, setData] = useState("")
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    let url = "user/my-product"

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        API.get(url, config)
            .then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                } else {
                    setData(res.data.data)
                }
            }).catch((error) => {
                console.log(error);

            })
    }, [])

    function hanldeDelete(productId) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        API.get("/user/product/delete/" + productId, config)
            .then(res => {
                setData(res.data.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    function renderData() {
        if (Object.keys(data).length > 0) {
            return Object.keys(data).map((key, index) => {
                const imageArray = JSON.parse(data[key].image);
                const firstImage = imageArray[0]
                return (
                    <tr key={key}>
                        <td>{data[key].id}</td>
                        <td>{data[key].name}</td>
                        <td className="product_image">
                            <img style={{ width: '100px' }} src={"http://localhost/laravel8/laravel8/public/upload/product/" + data[key].id_user + "/" + firstImage} alt="product" />
                        </td>
                        <td>{data[key].price}</td>
                        <td class="action-buttons">
                            <Link to={"/product/edit/" + data[key].id}><button class="edit">Edit</button></Link>
                            <Link to={""} onClick={() => hanldeDelete(data[key].id)}><button class="delete">Delete</button></Link>
                        </td>
                    </tr>
                )
            })
        }
    }
    return (
        <div class="main-content">
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
                <tbody>
                    {renderData()}
                </tbody>
            </table>
            <Link to={'/product/add'}>
                <button type="submit" class="add-product">Add Product</button>
            </Link>
        </div>
    )
}
export default MyProduct;