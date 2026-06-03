import { useState } from "react";
import API from "../../API";
import FormTextarea from "../common/FormTextarea";
import SubmitButton from "../common/SubmitButton";
import { getAuthUser, getAuthHeaders, isLoggedIn } from "../../utils/auth";
import { isEmpty } from "../../utils/validation";

function Comment({ idBlog, onCommentPosted, idCommentToReply }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  function handleMessage(e) {
    setComment(e.target.value);
  }

  function handlePostComment(e) {
    e.preventDefault();

    if (isEmpty(comment)) {
      setError("Vui lòng nhập comment");
      return;
    }
    if (!isLoggedIn()) {
      setError("Vui lòng đăng nhập");
      return;
    }

    const user = getAuthUser();
    if (!user?.id) {
      setError("Không tìm thấy thông tin user");
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append("id_blog", idBlog);
    formData.append("id_user", user.id);
    formData.append("id_comment", idCommentToReply || 0);
    formData.append("comment", comment);
    formData.append("image_user", user.avatar);
    formData.append("name_user", user.name);

    API.post(`/blog/comment/${idBlog}`, formData, { headers: getAuthHeaders() })
      .then((response) => {
        if (response.data.errors) {
          setError("Không gửi được comment");
          return;
        }
        onCommentPosted(response.data.data);
        setComment("");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>
          {error && <p className="field-error">{error}</p>}
          <form onSubmit={handlePostComment}>
            <FormTextarea
              label="Your comment"
              name="message"
              value={comment}
              onChange={handleMessage}
              required
            />
            <SubmitButton label="Post comment" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comment;
