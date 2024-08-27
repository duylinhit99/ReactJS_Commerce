import moment from 'moment';
import { Link } from 'react-router-dom';

function ListComment({ listComment, handleReplyClick }) {
    function handleReply(e) {
        handleReplyClick(e.target.id);
    }

    function getRepliesForComment(idComment, commentsList) {
        return commentsList.filter((value) => parseInt(value.id_comment) === idComment);
    }

    function renderComments(item, index = 0) {
        const replies = getRepliesForComment(item.id, listComment);
        return (
            <li className={index === 0 ? 'media' : 'media second-media'} key={item.id}>
                <Link to="" className="pull-left">
                    <img
                        className="media-object"
                        style={{ width: 100 }}
                        src={`http://localhost/laravel8/public/upload/user/avatar/${item.image_user}`}
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
                            {moment(item.created_at).format('h:mm A')}
                        </li>
                        <li>
                            <i className="fa fa-calendar" />
                            {moment(item.updated_at).format('MMM D, YYYY')}
                        </li>
                    </ul>
                    <p>{item.comment}</p>
                    <Link id={item.id} onClick={handleReply} className="btn btn-primary" to="">
                        <i className="fa fa-reply" />
                        Reply
                    </Link>
                </div>
                {replies.length > 0 && (
                    <ul>
                        {replies.map((reply) => renderComments(reply, index + 1))}
                    </ul>
                )}
            </li>
        );
    }

    return (
        <div className="response-are">
            <h2>{listComment.length} RESPONSES</h2>
            <ul className="media-list">
                {listComment &&
                    listComment.filter((item) => parseInt(item.id_comment) === 0)
                        .map((value) => renderComments(value))}
            </ul>
        </div>
    );
}

export default ListComment;
