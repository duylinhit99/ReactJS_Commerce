import { useEffect, useState } from "react";
import API from "../../API";
import { useNavigate } from "react-router-dom";

function AddMyProduct() {
    const [data, setData] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [input, setInput] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        companyProfile: '',
        status: "0",
        detail: "",
        salePrice: "",
        avatars: []
    })
    const [error, setError] = useState({})
    const [file, setFile] = useState([])
    const typeFile = ["png", "jpg", "jpeg", "PNG", "JPG"]
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const navigate = useNavigate()
    useEffect(() => {
        API.get('/category-brand')
            .then(res => {
                setCategory(res.data.category)
                setBrand(res.data.brand)
            })
            .catch(error => {
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
            {
                return brand.map((value, key) => {
                    return (
                        <option key={key} value={value.id}>{value.brand}</option>
                    )
                })
            }
        }
    }

    function renderSale() {
        if (input.status === "1") {
            return (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        placeholder="Sale Price"
                        name="salePrice"
                        style={{ width: 200, marginRight: 10 }}
                    />  %
                </div>
            );
        }
    }

    function hanldeInput(e) {
        const valueInput = e.target.value
        const nameInput = e.target.name
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

    function hanldeSubmit(e) {
        e.preventDefault()
        let isCheck = true
        let errorSubmit = {}

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
        } else {
            setError({})
            let url = "user/product/add"
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            let formData = new FormData()
            formData.append('name', input.name)
            formData.append('price', input.price)
            formData.append('category', input.category)
            formData.append('brand', input.brand)
            formData.append('company', input.companyProfile)
            formData.append('detail', input.detail)
            formData.append('sale', input.salePrice)
            formData.append('status', input.status)

            Object.keys(file).map((item, i) => {
                return formData.append("file[]", file[item])
            })

            API.post(url, formData, config)
                .then((response) => {
                    if (response.data.errors) {
                        console.log(response.data.errors);
                    } else {
                        console.log(response)
                        navigate('/my-product')
                    }
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
    function renderError() {
        if (Object.keys(error).length > 0) {
            return Object.keys(error).map((value, key) => {
                return (
                    <li style={{ listStyle: "none" }} key={key}>{error[value]}</li>
                )
            })
        }
    }
    return (
        <div className="signup-form col-sm-8 padding-right " style={{ marginBottom: 10 }}>
            <h2>Add Product</h2>
            {renderError()}
            <form encType="multipart/form-data" onSubmit={hanldeSubmit}>
                <label>Name (*)</label>
                <input type="text" name="name" onChange={hanldeInput} />
                <label>Price (*)</label>
                <input type="text" name="price" onChange={hanldeInput} />
                <label>Category (*)</label>
                <select name="category" id="" onChange={hanldeInput}>
                    <option>Please select category</option>
                    {renderCategory()}
                </select>
                <label>brand (*)</label>
                <select name="brand" id="" onChange={hanldeInput}>
                    <option>Please select brand</option>
                    {renderBrand()}
                </select>
                <label>Sale (*)</label>
                <select value={input.status} name="status" onChange={hanldeInput}>
                    <option value="0">New</option>
                    <option value="1">Sale</option>
                </select>
                {renderSale()}
                <label>Compony profile (*)</label>
                <input type='text' name='companyProfile' onChange={hanldeInput} />
                <label>Image (*)</label>
                <input type="file" id="files" accept='image/*' name="avatars" multiple style={{ paddingTop: 10 }} onChange={hanldeFile} />
                {file.map((image, index) => (
                    <img key={index} src={URL.createObjectURL(image)} alt=""
                        style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }}
                    />
                ))}
                <br></br>
                <label>Detail (*)</label>
                <textarea name="detail" placeholder="Detail" onChange={hanldeInput}></textarea>
                <button type="submit" className="btn btn-default">Add</button>
            </form>
        </div>
    )
}
export default AddMyProduct;