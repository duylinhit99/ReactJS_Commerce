import { useState } from "react";
import API from "../../API";

function Comment(props) {
    const [comment, setComment] = useState('')
    const [error, setError] = useState({})
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const dataUser = JSON.parse(localStorage.getItem('authUser'))

    let { idBlog, getCmt, idCommentToReply } = props

    function hanldeMessage(e) {
        setComment(e.target.value)
    }
    function hanldePostComment(e) {
        e.preventDefault()
        let isCheck = true
        if (comment == "") {
            setError("Vui long nhap comment")
            isCheck = false
        } else if (!JSON.parse(localStorage.getItem('login'))) {
            setError("vui lòng đăng nhập")
            isCheck = false
        }

        if (isCheck) {
            let url = '/blog/comment/' + idBlog;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
            };
            const formData = new FormData();
            formData.append('id_blog', idBlog);
            formData.append('id_user', dataUser.id);
            formData.append('id_comment', idCommentToReply ? idCommentToReply : 0);
            formData.append('comment', comment);
            formData.append('image_user', dataUser.avatar);
            formData.append('name_user', dataUser.name);
            API.post(url, formData, config)
                .then((response) => {
                    if (response.data.errors) {
                        console.log(response.data.errors);
                    } else {
                        getCmt(response.data.data);
                        setComment("")
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
    return (
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea name="message" rows="11" onChange={hanldeMessage}></textarea>
                        <button className="btn btn-primary" onClick={hanldePostComment}>post comment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Comment;