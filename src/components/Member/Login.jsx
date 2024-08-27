import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API";

function Login() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({})
    const hanldeInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state => ({ ...state, [nameInput]: valueInput }))
    }

    function validateEmail(email) {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function renderError() {
        if (Object.keys(error).length > 0) {
            return Object.keys(error).map((value, key) => (
                <div className="ProductError" key={key}>
                    <li style={{ listStyle: 'none' }}>{error[value]}</li>
                </div>
            ));
        }
    }

    function hanldeSubmit(e) {
        e.preventDefault()
        let isCheck = true
        let errorSubmit = {}
        if (input.email == "") {
            errorSubmit.email = "Please enter Email"
            isCheck = false
        } else if (!validateEmail(input.email)) {
            errorSubmit.email = "Please enter the correct format"
            isCheck = false
        }

        if (input.password == "") {
            errorSubmit.password = "Please enter Password"
            isCheck = false
        }

        if (!isCheck) {
            setError(errorSubmit)
        } else {
            const data = {
                email: input.email,
                password: input.password,
                level: 0
            }
            API.post("/login", data)
                .then(res => {
                    if (res.data.errors) {
                        console.log(res.data.errors);
                    } else {
                        console.log(res);
                        navigate("/")
                        localStorage.setItem("login", true)
                        localStorage.setItem("authUser", JSON.stringify(res.data.Auth))
                        localStorage.setItem("accessToken", JSON.stringify(res.data.token))
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
                <h2>Login to your account</h2>
                <form action="#" onSubmit={hanldeSubmit}>
                    <input type="email" placeholder="Email" name="email" onChange={hanldeInput} />
                    <input type="password" placeholder="Password" name="password" onChange={hanldeInput} />
                    <span>
                        <input type="checkbox" className="checkbox" />
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;