import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import { blogImageUrl } from "../../config";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function BlogDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [listComment, setListComment] = useState([]);
  const [commentReplyId, setCommentReplyId] = useState(null);

  useEffect(() => {
    API.get(`/blog/detail/${id}`)
      .then((response) => {
        setData(response.data.data);
        setListComment(response.data.data?.comment ?? []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  function handleNewComment(newComment) {
    setListComment((prev) => [...prev, newComment]);
  }

  function handleReplyClick(commentId) {
    setCommentReplyId(commentId);
  }

  if (!data) {
    return (
      <div className="col-sm-9">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        <div className="single-blog-post">
          <h3>{data.title}</h3>
          <img src={blogImageUrl(data.image)} alt={data.title} />
          <p>{data.content}</p>
        </div>
      </div>

      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li>
            <Rate idBlog={id} />
          </li>
        </ul>
      </div>

      <ListComment
        listComment={listComment}
        handleReplyClick={handleReplyClick}
        idReply={commentReplyId}
      />
      <Comment
        idBlog={id}
        onCommentPosted={handleNewComment}
        idCommentToReply={commentReplyId}
      />
    </div>
  );
}

export default BlogDetail;
