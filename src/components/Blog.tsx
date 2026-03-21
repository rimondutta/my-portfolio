import { MdArrowForward, MdCalendarToday } from "react-icons/md";
import { Link } from "react-router-dom";
import "./styles/Blog.css";
import { blogPosts } from "../data/blogPosts";

const Blog = () => {
    const preview = blogPosts.slice(0, 3);

    return (
        <section className="blog-section section-container" id="blog">
            <div className="blog-header-row">
                <h2>
                    My <span>Blog</span>
                </h2>
                <Link to="/blog" className="blog-view-all" data-cursor="disable">
                    View All Posts <MdArrowForward />
                </Link>
            </div>

            <div className="blog-grid">
                {preview.map((post, index) => (
                    <div className="blog-card" key={index} data-cursor="disable">
                        <div className="blog-image-wrapper">
                            <img src={post.image} alt={`Featured image for ${post.title}`} />
                        </div>

                        <div className="blog-meta">
                            <span className="blog-category">{post.category}</span>
                            <span className="blog-date">
                                <MdCalendarToday size={14} style={{ marginRight: '5px' }} />
                                {post.date}
                            </span>
                        </div>

                        <div className="blog-info">
                            <h4>{post.title}</h4>
                            <p>{post.excerpt}</p>
                        </div>

                        <div className="blog-footer">
                            Read More <MdArrowForward />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
