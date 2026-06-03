import { useEffect, useState } from "react";
import API from "../../API";
import BlogPostCard from "./BlogPostCard";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/blog")
      .then((res) => setPosts(res.data.blog?.data ?? []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {posts.length > 0 ? (
          posts.map((post) => <BlogPostCard key={post.id} post={post} />)
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Blog;
