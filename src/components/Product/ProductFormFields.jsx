import FormField from "../common/FormField";
import FormSelect from "../common/FormSelect";
import FormTextarea from "../common/FormTextarea";
import FormFileInput from "../common/FormFileInput";
import ImagePreviewGrid from "../common/ImagePreviewGrid";

function ProductFormFields({
  values,
  errors,
  onChange,
  onFileChange,
  category,
  brand,
  previewFiles,
}) {
  const showSale = String(values.status) === "1";

  return (
    <>
      <FormField
        label="Name"
        name="name"
        value={values.name}
        onChange={onChange}
        required
        error={errors.name}
      />
      <FormField
        label="Price"
        name="price"
        value={values.price}
        onChange={onChange}
        required
        error={errors.price}
      />
      <FormSelect
        label="Category"
        name="category"
        value={values.category}
        onChange={onChange}
        required
        placeholder="Please select category"
        error={errors.category}
      >
        {category.map((item) => (
          <option key={item.id} value={item.id}>
            {item.category}
          </option>
        ))}
      </FormSelect>
      <FormSelect
        label="Brand"
        name="brand"
        value={values.brand}
        onChange={onChange}
        required
        placeholder="Please select brand"
        error={errors.brand}
      >
        {brand.map((item) => (
          <option key={item.id} value={item.id}>
            {item.brand}
          </option>
        ))}
      </FormSelect>
      <FormSelect
        label="Sale"
        name="status"
        value={values.status}
        onChange={onChange}
        required
      >
        <option value="0">New</option>
        <option value="1">Sale</option>
      </FormSelect>
      {showSale && (
        <FormField
          label="Sale Price"
          name="salePrice"
          value={values.salePrice}
          onChange={onChange}
          placeholder="Sale Price"
          className="sale-price-field"
        />
      )}
      <FormField
        label="Company profile"
        name="companyProfile"
        value={values.companyProfile}
        onChange={onChange}
        required
        error={errors.companyProfile}
      />
      <FormFileInput
        label="Image"
        name="avatars"
        onChange={onFileChange}
        multiple
        required
        error={errors.avatars}
      />
      <ImagePreviewGrid files={previewFiles} />
      <FormTextarea
        label="Detail"
        name="detail"
        value={values.detail}
        onChange={onChange}
        placeholder="Detail"
        required
        error={errors.detail}
      />
    </>
  );
}

export default ProductFormFields;
