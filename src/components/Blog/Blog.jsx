import { useEffect, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";

function Blog(props) {
    const [getItem, setItem] = useState([]);

    useEffect(() => {
        API.get('/blog')
            .then((res) => {
                setItem(res.data.blog.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    const hanldeData = () => {
        if (getItem.length > 0) {
            return getItem.map((value, key) => {
                return (
                    <div className="single-blog-post" key={key}>
                        <h3>{value.title}</h3>
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
                            <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + value.image} alt="" />
                        </a>
                        <p>{value.content}</p>
                        <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
                    </div>
                )
            })
        } else {
            return <p>No blog posts available.</p>;
        }
    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {hanldeData()}
                <div className="pagination-area">
                    <ul className="pagination">
                        <li><a href="" className="active">1</a></li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a href=""><i className="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Blog;