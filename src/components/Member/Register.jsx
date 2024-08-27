import { useState } from "react";
import API from "../../API";

function Register() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
    })
    const [file, setFile] = useState("")
    const [avatar, setAvatar] = useState("")
    const [error, setError] = useState({})
    const typeFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
    const hanldeInput = (e) => {
        // lấy value and name
        const valueInput = e.target.value
        const nameInput = e.target.name
        setInput(state => ({ ...state, [nameInput]: valueInput }))
    }

    const hanldeFile = (e) => {
        const file = e.target.files
        // send file to api server
        let render = new FileReader();
        render.onload = (e) => {
            setAvatar(e.target.result); //cái này gửi qua api
            setFile(file[0]) // cái này để toàn bộ thông tin file upload vào file để xử lý
        }
        render.readAsDataURL(file[0])
    }

    function validateEmail(email) {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function renderError() {
        if (Object.keys(error).length > 0) {
            return Object.keys(error).map((key, index) => {
                return (
                    <li key={index}>{error[key]}</li>
                )
            })
        }
    }

    const hanldeSubmit = (e) => {
        // ngăn chặn hành vi mặc định của trình duyệt
        e.preventDefault();
        let isCheck = true;
        let errorSubmit = {}

        if (input.name == "") {
            errorSubmit.name = "Please enter Name *"
            isCheck = false
        }

        if (input.email == "") {
            errorSubmit.email = "Please enter Email *"
            isCheck = false
        } else if (!validateEmail(input.email)) {
            errorSubmit.email = "Please enter the correct format *"
            isCheck = false
        }

        if (input.password == "") {
            errorSubmit.password = "Please enter Password *"
            isCheck = false
        }

        if (input.phone == "") {
            errorSubmit.phone = "Please enter Phone *"
            isCheck = false
        }

        if (input.address == "") {
            errorSubmit.address = "Please enter Address *"
            isCheck = false
        }

        if (file == "") {
            errorSubmit.avatar = "Please enter Avatar *"
            isCheck = false
        } else if (file['size'] > 1024 * 1024) {
            setError((state) => ({ ...state, avatar: 'Please choose a file smaller than 1MB' }));
            isCheck = false;
        } else if (!typeFile.includes(file['name'].split('.').pop())) {
            setError((state) => ({ ...state, avatar: 'Only contains files with the extension:png, jpg, jpeg, PNG, JPG' }));
            isCheck = false;
        } else {
            setError((state) => ({ ...state, avatar: '' }));
        }

        if (!isCheck) {
            setError(errorSubmit)
        } else {
            setError({})
            const data = {
                name: input.name,
                email: input.email,
                password: input.password,
                phone: input.phone,
                address: input.address,
                avatar: avatar,
                level: 0,
            };
            API.post('/register', data)
                .then((res) => {
                    if (res.data.errors) {
                        console.log(res.data.errors);
                    } else {
                        console.log(res);
                        setInput({
                            name: '',
                            email: '',
                            password: '',
                            phone: '',
                            address: '',
                            avatar: '',
                            level: 0,
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <h2>New User Signup!</h2>
                {renderError()}
                <form action="#" onSubmit={hanldeSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={hanldeInput} />
                    <input type="email" name="email" placeholder="Email Address" onChange={hanldeInput} />
                    <input type="password" name="password" placeholder="Password" onChange={hanldeInput} />
                    <input type="text" name="phone" placeholder="Phone" onChange={hanldeInput} />
                    <input type="text" name="address" placeholder="Address" onChange={hanldeInput} />
                    <input type="file" name="avatar" placeholder="Avatar" onChange={hanldeFile} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
        </div>
    )
}
export default Register;