import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../API";
import FormPanel from "../common/FormPanel";
import FormErrorList from "../common/FormErrorList";
import SubmitButton from "../common/SubmitButton";
import ProductFormFields from "./ProductFormFields";
import ExistingProductImages from "./ExistingProductImages";
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
  status: "0",
  companyProfile: "",
  detail: "",
  salePrice: "",
};

function EditMyProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { category, brand } = useCategoryBrand();
  const { values, setValues, errors, setErrors, handleChange } =
    useForm(INITIAL);
  const { files, handleFileChange } = useMultiImageUpload();
  const [existingImages, setExistingImages] = useState([]);
  const [userId, setUserId] = useState("");
  const [deleteImages, setDeleteImages] = useState([]);

  useEffect(() => {
    API.get(`user/product/${id}`, { headers: getAuthHeaders() })
      .then((response) => {
        if (response.data.errors) return;
        const data = response.data.data;
        setValues({
          name: data.name ?? "",
          price: data.price ?? "",
          category: String(data.id_category ?? ""),
          brand: String(data.id_brand ?? ""),
          status: String(data.status ?? "0"),
          companyProfile: data.company_profile ?? "",
          detail: data.detail ?? "",
          salePrice: data.sale ?? "",
        });
        setExistingImages(JSON.parse(data.image || "[]"));
        setUserId(data.id_user);
      })
      .catch((err) => console.error(err));
  }, [id, setValues]);

  function toggleDeleteImage(fileName) {
    setDeleteImages((prev) =>
      prev.includes(fileName)
        ? prev.filter((name) => name !== fileName)
        : [...prev, fileName]
    );
  }

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

    const hasImages =
      files.length > 0 ||
      existingImages.filter((img) => !deleteImages.includes(img)).length > 0;
    if (!hasImages) {
      nextErrors.avatars = "Please keep or upload at least one image";
    } else if (files.length > 0) {
      const avatarError = validateImageFiles(files, { maxCount: 3 });
      if (avatarError) nextErrors.avatars = avatarError;
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
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("brand", values.brand);
    formData.append("company", values.companyProfile);
    formData.append("detail", values.detail);
    formData.append("sale", values.salePrice);
    formData.append("status", values.status);
    deleteImages.forEach((img) => formData.append("deleteImg[]", img));
    files.forEach((file) => formData.append("file[]", file));

    API.post(`user/product/edit/${id}`, formData, { headers: getAuthHeaders() })
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
    <FormPanel title="Update Product">
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
        <ExistingProductImages
          images={existingImages}
          userId={userId}
          selectedForDelete={deleteImages}
          onToggle={toggleDeleteImage}
        />
        <SubmitButton label="Update" />
      </form>
    </FormPanel>
  );
}

export default EditMyProduct;
