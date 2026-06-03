import { useState } from "react";
import FormField from "../common/FormField";
import FormTextarea from "../common/FormTextarea";
import SubmitButton from "../common/SubmitButton";
import { SAMPLE_REVIEW } from "../../constants/productDetailData";
import { isEmpty } from "../../utils/validation";

function ProductDetailReviews() {
  const [form, setForm] = useState({
    reviewName: "",
    reviewEmail: "",
    review: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(form.reviewName) || isEmpty(form.review)) {
      setError("Vui lòng nhập tên và nội dung đánh giá");
      return;
    }
    setError("");
    setForm({ reviewName: "", reviewEmail: "", review: "" });
  }

  return (
    <div className="col-sm-12">
      <ul className="review-meta">
        <li>
          <i className="fa fa-user" />
          {SAMPLE_REVIEW.author}
        </li>
        <li>
          <i className="fa fa-clock-o" />
          {SAMPLE_REVIEW.time}
        </li>
        <li>
          <i className="fa fa-calendar-o" />
          {SAMPLE_REVIEW.date}
        </li>
      </ul>
      <p>{SAMPLE_REVIEW.content}</p>
      <p>
        <b>Write Your Review</b>
      </p>
      {error && <p className="field-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormField
          name="reviewName"
          placeholder="Your Name"
          value={form.reviewName}
          onChange={handleChange}
        />
        <FormField
          type="email"
          name="reviewEmail"
          placeholder="Email Address"
          value={form.reviewEmail}
          onChange={handleChange}
        />
        <FormTextarea
          name="review"
          placeholder="Your review"
          value={form.review}
          onChange={handleChange}
        />
        <b>Rating: </b>
        <img src="images/product-details/rating.png" alt="Rating" />
        <SubmitButton label="Submit" className="btn btn-default pull-right" />
      </form>
    </div>
  );
}

export default ProductDetailReviews;
