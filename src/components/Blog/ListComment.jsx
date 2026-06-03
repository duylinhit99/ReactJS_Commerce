import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userAvatarUrl } from "../../config";

function ListComment({ listComment, handleReplyClick }) {
  const [activeReply, setActiveReply] = useState("");

  function handleReply(e) {
    const commentId = e.target.id;
    handleReplyClick(commentId);
    setActiveReply(activeReply === commentId ? "" : commentId);
  }

  function getRepliesForComment(idComment) {
    return listComment.filter(
      (value) => parseInt(value.id_comment, 10) === idComment
    );
  }

  function renderComment(item, index = 0) {
    const replies = getRepliesForComment(item.id);

    return (
      <li
        className={index === 0 ? "media" : "media second-media"}
        key={item.id}
      >
        <Link to="/" className="pull-left">
          <img
            className="media-object"
            style={{ width: 30 }}
            src={userAvatarUrl(item.image_user)}
            alt=""
          />
        </Link>
        <div className="media-body" style={{ marginBottom: 15 }}>
          <ul className="sinlge-post-meta">
            <li>
              <i className="fa fa-user" />
              {item.name_user}
            </li>
            <li>
              <i className="fa fa-clock-o" />
              {moment(item.created_at).format("h:mm A")}
            </li>
            <li>
              <i className="fa fa-calendar" />
              {moment(item.updated_at).format("MMM D, YYYY")}
            </li>
          </ul>
          <p>{item.comment}</p>
          <button
            type="button"
            id={item.id}
            onClick={handleReply}
            className="btn btn-primary"
          >
            <i className="fa fa-reply" /> Reply
          </button>
          {activeReply === String(item.id) && (
            <div className="chat-box">
              <textarea
                placeholder="Enter your reply"
                className="form-control"
              />
              <button type="button" className="btn btn-success mt-2">
                Send
              </button>
            </div>
          )}
        </div>
        {replies.length > 0 && (
          <ul>{replies.map((reply) => renderComment(reply, index + 1))}</ul>
        )}
      </li>
    );
  }

  const rootComments = listComment.filter(
    (item) => parseInt(item.id_comment, 10) === 0
  );

  return (
    <div className="response-are">
      <h2>{listComment.length} RESPONSES</h2>
      <ul className="media-list">
        {rootComments.map((comment) => renderComment(comment))}
      </ul>
    </div>
  );
}

export default ListComment;
