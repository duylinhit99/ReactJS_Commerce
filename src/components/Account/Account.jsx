import { useEffect, useState } from "react"
import API from "../../API"
function Account() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        address: "",
        phone: "",
        pass: "",
        avatar: ""
    })
    const [userId, setUserID] = useState('')
    const [error, setError] = useState({})
    const [file, setFile] = useState('')
    const [avatar, setAvatar] = useState('')
    const typeFile = ["png", "jpg", "jpeg", "PNG", "JPG"]
    function handleFile(e) {
        const files = e.target.files
        setFile(files)
        if (files && files.length > 0) {
            let render = new FileReader()
            render.onload = (e) => {
                setAvatar(e.target.result)
            }
            render.readAsDataURL(files[0])
        }
    }
    useEffect(() => {
        let userData = localStorage.getItem("authUser")
        if (userData) {
            userData = JSON.parse(userData)
            setUserID(userData.id)
            setUser({
                username: userData.name,
                email: userData.email,
                address: userData.address,
                phone: userData.phone,
            })
        }
    }, [])
    function handleInput(e) {
        const nameUser = e.target.name
        const value = e.target.value
        setUser(prev => ({ ...prev, [nameUser]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        let errorSubmit = {}
        let isCheck = true
        if (user.username === '') {
            errorSubmit.username = 'Vui lòng nhập tên'
            isCheck = false
        }
        if (user.pass === '') {
            errorSubmit.pass = 'Vui lòng nhập mật khẩu'
            isCheck = false
        }
        if (user.address === '') {
            errorSubmit.address = 'Vui lòng nhập địa chỉ'
            isCheck = false
        }
        if (user.phone === '') {
            errorSubmit.phone = 'Vui lòng nhập số điện thoại'
            isCheck = false
        }
        if (file === '') {
            errorSubmit.avatar = 'Vui lòng gửi file để upload'
            isCheck = false
        } else {
            if (file[0].size > 1024 * 1024) {
                setError(prev => ({ ...prev, avatar: 'Vui lòng chọn file nhỏ hơn 1 MB' }))
                isCheck = false
            }
            else if (!typeFile.includes(file[0].name.split('.').pop())) {
                setError(prev => ({ ...prev, avatar: 'Chỉ chưa những file ảnh có đuôi: png, jpg, jpeg, PNG, JPG' }))
                isCheck = false
            } else {
                setError(prev => ({ ...prev, avatar: "" }))
            }
        }

        if (!isCheck) {
            setError(errorSubmit)
        }
        else {
            setError({})
            let url = '/user/update/' + userId
            const accessToken = JSON.parse(localStorage.getItem("accessToken"))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            let formData = new FormData()
            formData.append('name', user.username)
            formData.append('password', user.pass)
            formData.append('phone', user.phone)
            formData.append('email', user.email)
            formData.append('address', user.address)
            formData.append('avatar', avatar)

            API.post(url, formData, config)
                .then(response => {
                    if (response.data.errors) {
                        setError(response.data.errors)
                    } else {
                        console.log(response)
                        localStorage.setItem("appState", JSON.stringify(response.data.Auth))
                        localStorage.setItem("accessToken", JSON.stringify(response.data.token))
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })

        }
    }
    function renderError() {
        if (Object.keys(error).length > 0) {
            return Object.keys(error).map((value, key) => {
                return (
                    <li key={key}>{error[value]}</li>
                )


            })
        }
    }
    return (
        <>
            <div className="signup-form col-sm-8 padding-right " style={{ marginBottom: 10 }}>
                <h2>User Update</h2>
                {renderError()}
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <label>Full Name (*)</label>
                    <input type="text" name="username" value={user.username} onChange={handleInput} />
                    <label>Email (*)</label>
                    <input type="email" name="email" readOnly value={user.email} />
                    <label>Password (*)</label>
                    <input type="password" name="pass" value={user.pass} onChange={handleInput} />
                    <label>Phone (*)</label>
                    <input type="text" name="phone" value={user.phone} onChange={handleInput} />
                    <label>Address (*)</label>
                    <input type="text" name="address" value={user.address} onChange={handleInput} />
                    <label>Avatar (*)</label>
                    <input type='file' accept='image/*' style={{ paddingTop: 10 }} name='avatar' onChange={handleFile} />
                    <img src={avatar} alt="" style={{ width: 100, marginBottom: 10 }} />
                    <button type="submit" className="btn btn-default">Update</button>
                </form>

            </div>
        </>


    )
}
export default Account