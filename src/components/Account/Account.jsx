import { useEffect } from "react";
import API from "../../API";
import FormPanel from "../common/FormPanel";
import FormField from "../common/FormField";
import FormFileInput from "../common/FormFileInput";
import FormErrorList from "../common/FormErrorList";
import SubmitButton from "../common/SubmitButton";
import { useForm } from "../../hooks/useForm";
import { useSingleImageUpload } from "../../hooks/useSingleImageUpload";
import {
  getAccessToken,
  getAuthUser,
  getAuthHeaders,
  setAuthSession,
} from "../../utils/auth";
import { isEmpty, validateImageFile } from "../../utils/validation";

const INITIAL_USER = {
  username: "",
  email: "",
  address: "",
  phone: "",
  pass: "",
};

function Account() {
  const { values, setValues, errors, setErrors, handleChange } =
    useForm(INITIAL_USER);
  const { file, preview, handleFileChange } = useSingleImageUpload();
  const userId = getAuthUser()?.id ?? "";

  useEffect(() => {
    const auth = getAuthUser();
    if (!auth) return;
    setValues({
      username: auth.name ?? "",
      email: auth.email ?? "",
      address: auth.address ?? "",
      phone: auth.phone ?? "",
      pass: "",
    });
  }, [setValues]);

  function validateForm() {
    const nextErrors = {};
    if (isEmpty(values.username)) nextErrors.username = "Vui lòng nhập tên";
    if (isEmpty(values.pass)) nextErrors.pass = "Vui lòng nhập mật khẩu";
    if (isEmpty(values.address)) nextErrors.address = "Vui lòng nhập địa chỉ";
    if (isEmpty(values.phone)) nextErrors.phone = "Vui lòng nhập số điện thoại";

    const avatarError = validateImageFile(file, {
      required: true,
      maxSizeMb: 1,
    });
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
    const formData = new FormData();
    formData.append("name", values.username);
    formData.append("password", values.pass);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("avatar", preview);

    API.post(`/user/update/${userId}`, formData, { headers: getAuthHeaders() })
      .then((response) => {
        if (response.data.errors) {
          setErrors(response.data.errors);
          return;
        }
        setAuthSession(response.data.Auth, response.data.token);
      })
      .catch((err) => console.error(err));
  }

  return (
    <FormPanel title="User Update">
      <FormErrorList errors={errors} />
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          name="username"
          value={values.username}
          onChange={handleChange}
          required
          error={errors.username}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          readOnly
          required
        />
        <FormField
          label="Password"
          name="pass"
          type="password"
          value={values.pass}
          onChange={handleChange}
          required
          error={errors.pass}
        />
        <FormField
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          required
          error={errors.phone}
        />
        <FormField
          label="Address"
          name="address"
          value={values.address}
          onChange={handleChange}
          required
          error={errors.address}
        />
        <FormFileInput
          label="Avatar"
          name="avatar"
          onChange={handleFileChange}
          required
          error={errors.avatar}
          preview={preview}
        />
        <SubmitButton label="Update" />
      </form>
    </FormPanel>
  );
}

export default Account;
