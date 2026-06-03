import { useNavigate } from "react-router-dom";
import API from "../../API";
import FormField from "../common/FormField";
import FormErrorList from "../common/FormErrorList";
import SubmitButton from "../common/SubmitButton";
import { useForm } from "../../hooks/useForm";
import { setAuthSession } from "../../utils/auth";
import { isEmpty, validateEmail } from "../../utils/validation";

const INITIAL = { email: "", password: "" };

function Login() {
  const navigate = useNavigate();
  const { values, errors, setErrors, handleChange } = useForm(INITIAL);

  function validateForm() {
    const nextErrors = {};
    if (isEmpty(values.email)) {
      nextErrors.email = "Please enter Email";
    } else if (!validateEmail(values.email)) {
      nextErrors.email = "Please enter the correct format";
    }
    if (isEmpty(values.password)) {
      nextErrors.password = "Please enter Password";
    }
    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    API.post("/login", {
      email: values.email,
      password: values.password,
      level: 0,
    })
      .then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
          return;
        }
        setAuthSession(res.data.Auth, res.data.token);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        <h2>Login to your account</h2>
        <FormErrorList errors={errors} />
        <form onSubmit={handleSubmit}>
          <FormField
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
          <span>
            <input type="checkbox" className="checkbox" />
            Keep me signed in
          </span>
          <SubmitButton label="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
