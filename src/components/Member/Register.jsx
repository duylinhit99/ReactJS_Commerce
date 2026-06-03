import API from "../../API";
import FormPanel from "../common/FormPanel";
import FormField from "../common/FormField";
import FormFileInput from "../common/FormFileInput";
import FormErrorList from "../common/FormErrorList";
import SubmitButton from "../common/SubmitButton";
import { useForm } from "../../hooks/useForm";
import { useSingleImageUpload } from "../../hooks/useSingleImageUpload";
import { isEmpty, validateEmail, validateImageFile } from "../../utils/validation";

const INITIAL = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};

function Register() {
  const { values, setValues, errors, setErrors, handleChange } =
    useForm(INITIAL);
  const { file, preview, handleFileChange, reset: resetImage } =
    useSingleImageUpload();

  function validateForm() {
    const nextErrors = {};
    if (isEmpty(values.name)) nextErrors.name = "Please enter Name *";
    if (isEmpty(values.email)) {
      nextErrors.email = "Please enter Email *";
    } else if (!validateEmail(values.email)) {
      nextErrors.email = "Please enter the correct format *";
    }
    if (isEmpty(values.password)) nextErrors.password = "Please enter Password *";
    if (isEmpty(values.phone)) nextErrors.phone = "Please enter Phone *";
    if (isEmpty(values.address)) nextErrors.address = "Please enter Address *";

    const avatarError = validateImageFile(file, { required: true });
    if (avatarError) nextErrors.avatar = avatarError;

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
    API.post("/register", {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address,
      avatar: preview,
      level: 0,
    })
      .then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
          return;
        }
        setValues({ ...INITIAL });
        resetImage();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="col-sm-4">
      <FormPanel title="New User Signup!" wide={false}>
        <FormErrorList errors={errors} />
        <form onSubmit={handleSubmit}>
          <FormField
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormField
            type="email"
            name="email"
            placeholder="Email Address"
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
          <FormField
            name="phone"
            placeholder="Phone"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormField
            name="address"
            placeholder="Address"
            value={values.address}
            onChange={handleChange}
            error={errors.address}
          />
          <FormFileInput
            name="avatar"
            onChange={handleFileChange}
            error={errors.avatar}
            preview={preview}
          />
          <SubmitButton label="Signup" />
        </form>
      </FormPanel>
    </div>
  );
}

export default Register;
