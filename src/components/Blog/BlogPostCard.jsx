import { Link } from "react-router-dom";
import { blogImageUrl } from "../../config";

function BlogPostCard({ post }) {
  return (
    <div className="single-blog-post">
      <h3>{post.title}</h3>
      <div className="post-meta">
        <ul>
          <li>
            <i className="fa fa-user" /> Mac Doe
          </li>
          <li>
            <i className="fa fa-clock-o" /> 1:33 pm
          </li>
          <li>
            <i className="fa fa-calendar" /> DEC 5, 2013
          </li>
        </ul>
        <span>
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star-half-o" />
        </span>
      </div>
      <img src={blogImageUrl(post.image)} alt={post.title} />
      <p>{post.content}</p>
      <Link className="btn btn-primary" to={`/blog/detail/${post.id}`}>
        Read More
      </Link>
    </div>
  );
}

export default BlogPostCard;
