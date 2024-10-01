import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function BlogDetail(props) {
    let params = useParams();
    const [data, setData] = useState('');
    const [listComment, setListComment] = useState([])
    const [commentReply, setCommentReply] = useState();
    const idBlog = params.id;
    useEffect(() => {
        API.get('/blog/detail/' + params.id)
            .then(response => {
                setData(response.data.data)
                setListComment(response.data.data.comment)
            }).catch(function (error) {
                console.log(error);
            })
    }, [])
    function getCmt(newComment) {
        // console.log(newComment)
        setListComment((state) => [...state, newComment]);
    }
    function handleReplyClick(newId) {
        setCommentReply(newId);
    }
    const renderData = () => {
        return (
            <>
                <div className="single-blog-post">
                    <h3>{data.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user"></i> Mac Doe</li>
                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                            <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                        </ul>
                        <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                        </span>
                    </div>
                    <a href="">
                        <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + data.image} alt="" />
                    </a>
                    <p>
                        {data.content}
                    </p>
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderData()}
            </div>

            <div className="rating-area">
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <li>
                        <Rate idBlog={idBlog} />
                    </li>
                    <li className="color">(5 votes)</li>
                </ul>
                <ul className="tag">
                    <li>TAG:</li>
                    <li><a className="color" href="">Pink <span>/</span></a></li>
                    <li><a className="color" href="">T-Shirt <span>/</span></a></li>
                    <li><a className="color" href="">Girls</a></li>
                </ul>
            </div>

            <div className="socials-share">
                <a href=""><img src="images/blog/socials.png" alt="" /></a>
            </div>

            <div className="media commnets">
                <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-one.jpg" alt="" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">Annie Davis</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="blog-socials">
                        <ul>
                            <li><a href=""><i className="fa fa-facebook"></i></a></li>
                            <li><a href=""><i className="fa fa-twitter"></i></a></li>
                            <li><a href=""><i className="fa fa-dribbble"></i></a></li>
                            <li><a href=""><i className="fa fa-google-plus"></i></a></li>
                        </ul>
                        <a className="btn btn-primary" href="">Other Posts</a>
                    </div>
                </div>
            </div>
            <ListComment listComment={listComment} handleReplyClick={handleReplyClick} idReply={commentReply} />
            <Comment idBlog={idBlog} getCmt={getCmt} idCommentToReply={commentReply} />
        </div>
    )
}
export default BlogDetail;