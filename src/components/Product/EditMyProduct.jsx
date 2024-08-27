import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";

function EditMyProduct() {

    let params = useParams()
    const [input, setInput] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        status: 0,
        companyProfile: '',
        avatars: '',
        detail: ''
    })

    const [error, setError] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const typeFile = ["png", "jpg", "jpeg", "PNG", "JPG"]
    const [image, setImage] = useState([])
    const [fileApi, setFileApi] = useState([])
    const [file, setFile] = useState([])
    const [deleteImg, setDeleteImg] = useState([])
    const [userData, setUserData] = useState("")

    useEffect(() => {
        API.get('/category-brand')
            .then((response) => {
                setCategory(response.data.category)
                setBrand(response.data.brand)
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"))
        const config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        API.get("user/product/" + params.id, config)
            .then((response) => {
                if (response.data.errors) {
                    console.log(response.data.errors);
                } else {
                    const data = response.data.data
                    setInput({
                        name: data.name,
                        price: data.price,
                        category: data.id_category,
                        brand: data.id_brand,
                        status: data.status,
                        companyProfile: data.company_profile,
                        detail: data.detail,
                        sale: data.sale
                    })
                    setImage(data.image)
                    setUserData(data.id_user)
                }
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    function renderCategory() {
        if (category.length > 0) {
            return category.map((value, key) => {
                return (
                    <option key={key} value={value.id}>{value.category}</option>
                )
            })
        }
    }

    function renderBrand() {
        if (brand.length > 0) {
            return brand.map((value, key) => {
                return (
                    <option key={key} value={value.id}>{value.brand}</option>
                )
            })
        }
    }

    function handleImage(e) {
        if (image.length > 0) {
            return image.map((value, key) => {
                return (
                    <li key={key} className="image-item">
                        <label className="image-label">
                            <img
                                className="image-my-product"
                                src={`http://localhost/laravel8/laravel8/public/upload/product/${userData}/${value}`}
                                alt="Product Image"
                            />
                            <input
                                type="checkbox"
                                value={value}
                                name="avatarCheckbox"
                                onChange={() => handleCheckBox(value)}
                            />
                        </label>
                    </li>

                )
            })
        }
    }

    function handleCheckBox(nameImage) {
        if (deleteImg.includes(nameImage)) {
            // Nếu tên ảnh đã có trong deleteImg, loại bỏ nó khỏi danh sách
            setDeleteImg(deleteImg.filter((name) => name !== nameImage));
        } else {
            // Nếu tên ảnh chưa có trong deleteImg, thêm nó vào danh sách
            setDeleteImg([...deleteImg, nameImage]);
        }
    }


    function hanldeInput(e) {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state => ({ ...state, [nameInput]: valueInput }))
    }

    function hanldeFile(e) {
        const files = e.target.files
        const newFiles = [...file, ...files]
        setFile(newFiles)
        const tempError = { ...error };

        if (newFiles.length > 3) {
            tempError.avatars = 'You can only upload up to 3 images';
            setError(tempError);
            return;
        }
        for (let i = 0; i < newFiles.length; i++) {
            const currentFile = newFiles[i];
            if (currentFile.size > 1024 * 1024) {
                tempError.avatars = 'Please choose files smaller than 1MB';
                setError(tempError);
                return;
            }
            if (!typeFile.includes(currentFile.name.split('.').pop().toLowerCase())) {
                tempError.avatars = 'Please upload images with the extensions png, jpg, jpeg, PNG, JPG ';
                setError(tempError);
                return;
            }
        }
        setError({});
        setInput(state => ({ ...state, avatars: newFiles }))
    }

    function renderSale() {
        if (input.status === 1) {
            return (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        placeholder="Sale Price"
                        name="sale"
                        value={input.sale}
                        onChange={hanldeInput}
                        style={{ width: 200, marginRight: 10 }}
                    />  %
                </div>
            );
        }
    }

    function renderError() {
        if (Object.keys(error).length > 0) {
            return Object.keys(error).map((value, key) => {
                return (
                    <li style={{ listStyle: "none", color: 'red' }} key={key}>{error[value]} * </li>
                )
            })
        }
    }

    function hanldeSubmit(e) {
        e.preventDefault()
        let isCheck = true
        const errorSubmit = {}

        if (input.name === "") {
            errorSubmit.name = "Please enter Name"
            isCheck = false
        }

        if (input.price === "") {
            errorSubmit.price = "Please enter Price"
            isCheck = false
        }

        if (input.category === "") {
            errorSubmit.category = "Please select Category"
            isCheck = false
        }

        if (input.brand === "") {
            errorSubmit.brand = "Please select brand"
            isCheck = false
        }

        if (input.detail === "") {
            errorSubmit.detail = "Please enter detail"
            isCheck = false
        }

        if (input.companyProfile === "") {
            errorSubmit.companyProfile = "Please enter company"
            isCheck = false
        }

        if (input.avatars === "") {
            errorSubmit.avatars = "Please select image"
            isCheck = false
        }

        if (!isCheck) {
            setError(errorSubmit)
        }
    }
    return (
        <div className="signup-form col-sm-8 padding-right " style={{ marginBottom: 10 }}>
            <h2>Update Product</h2>
            {renderError()}
            <form encType="multipart/form-data" onSubmit={hanldeSubmit}>
                <label>Name (*)</label>
                <input type="text" name="name" value={input.name} onChange={hanldeInput} />
                <label>Price (*)</label>
                <input type="text" name="price" value={input.price} onChange={hanldeInput} />
                <label>Category (*)</label>
                <select name="category" value={input.category} id="" onChange={hanldeInput}>
                    <option>Please select category</option>
                    {renderCategory()}
                </select>
                <label>Brand (*)</label>
                <select name="brand" id="" value={input.brand} onChange={hanldeInput}>
                    <option>Please select brand</option>
                    {renderBrand()}
                </select>
                <label>Sale (*)</label>
                <select name="status" value={input.status} onChange={hanldeInput}>
                    <option value="0">New</option>
                    <option value="1">Sale</option>
                </select>
                {renderSale()}
                <label>Compony profile (*)</label>
                <input type='text' name='companyProfile' value={input.companyProfile} onChange={hanldeInput} />
                <label>Image (*)</label>
                <input type="file" id="files" accept='image/*' name="avatars" multiple style={{ paddingTop: 10 }} onChange={hanldeFile} />
                <ul style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {handleImage()}
                </ul>
                <br></br>
                <label>Detail (*)</label>
                <textarea name="detail" placeholder="Detail" value={input.detail} onChange={hanldeInput}></textarea>
                <button type="submit" className="btn btn-default">Update</button>
            </form>
        </div>
    )
}
export default EditMyProduct;