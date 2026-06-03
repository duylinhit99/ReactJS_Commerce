import { useNavigate } from "react-router-dom";
import API from "../../API";
import FormPanel from "../common/FormPanel";
import FormErrorList from "../common/FormErrorList";
import SubmitButton from "../common/SubmitButton";
import ProductFormFields from "./ProductFormFields";
import { useForm } from "../../hooks/useForm";
import { useMultiImageUpload } from "../../hooks/useMultiImageUpload";
import { useCategoryBrand } from "../../hooks/useCategoryBrand";
import { getAuthHeaders } from "../../utils/auth";
import { isEmpty, validateImageFiles } from "../../utils/validation";

const INITIAL = {
  name: "",
  price: "",
  category: "",
  brand: "",
  companyProfile: "",
  status: "0",
  detail: "",
  salePrice: "",
};

function AddMyProduct() {
  const navigate = useNavigate();
  const { category, brand } = useCategoryBrand();
  const { values, errors, setErrors, handleChange } = useForm(INITIAL);
  const { files, handleFileChange } = useMultiImageUpload();

  function validateForm() {
    const nextErrors = {};
    if (isEmpty(values.name)) nextErrors.name = "Please enter Name";
    if (isEmpty(values.price)) nextErrors.price = "Please enter Price";
    if (isEmpty(values.category)) nextErrors.category = "Please select Category";
    if (isEmpty(values.brand)) nextErrors.brand = "Please select brand";
    if (isEmpty(values.detail)) nextErrors.detail = "Please enter detail";
    if (isEmpty(values.companyProfile)) {
      nextErrors.companyProfile = "Please enter company";
    }

    const avatarError = validateImageFiles(files, { maxCount: 3 });
    if (avatarError) nextErrors.avatars = avatarError;

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
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("brand", values.brand);
    formData.append("company", values.companyProfile);
    formData.append("detail", values.detail);
    formData.append("sale", values.salePrice);
    formData.append("status", values.status);
    files.forEach((file) => formData.append("file[]", file));

    API.post("user/product/add", formData, { headers: getAuthHeaders() })
      .then((response) => {
        if (response.data.errors) {
          setErrors(response.data.errors);
          return;
        }
        navigate("/my-product");
      })
      .catch((err) => console.error(err));
  }

  return (
    <FormPanel title="Add Product">
      <FormErrorList errors={errors} />
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <ProductFormFields
          values={values}
          errors={errors}
          onChange={handleChange}
          onFileChange={handleFileChange}
          category={category}
          brand={brand}
          previewFiles={files}
        />
        <SubmitButton label="Add" />
      </form>
    </FormPanel>
  );
}

export default AddMyProduct;
