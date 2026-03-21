import { useEffect } from "react";
import { useLoading } from "../context/LoadingProvider";
import { smoother } from "../components/Navbar";
import Navbar from "../components/Navbar";
import SocialIcons from "../components/SocialIcons";
import Cursor from "../components/Cursor";
import SEO from "../components/SEO";
import { MdArrowForward, MdCalendarToday, MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/BlogPage.css";
import { blogPosts } from "../data/blogPosts";

// ── Sub-components ─────────────────────────────────────────────────────────

const FeaturedCard = ({ post }: { post: any }) => (
    <Link to={`/blog/${post.slug}`} className="bp-featured" data-cursor="disable">
        <div className="bp-featured-image">
            <img src={post.image} alt={post.title} />
            <div className="bp-featured-overlay" />
        </div>
        <div className="bp-featured-content">
            <span className="bp-category">{post.category}</span>
            <h2 className="bp-featured-title">{post.title}</h2>
            <p className="bp-featured-excerpt">{post.excerpt}</p>
            <div className="bp-featured-meta">
                <span><MdCalendarToday size={13} /> {post.date}</span>
                <span><MdAccessTime size={13} /> {post.readTime}</span>
            </div>
            <div className="bp-read-btn">
                Read Article <MdArrowForward />
            </div>
        </div>
    </Link>
);

const PostCard = ({ post }: { post: any }) => (
    <Link to={`/blog/${post.slug}`} className="bp-card" data-cursor="disable">
        <div className="bp-card-image">
            <img src={post.image} alt={post.title} />
        </div>
        <div className="bp-card-body">
            <span className="bp-category">{post.category}</span>
            <h3 className="bp-card-title">{post.title}</h3>
            <p className="bp-card-excerpt">{post.excerpt}</p>
            <div className="bp-card-footer">
                <div className="bp-card-meta">
                    <span><MdCalendarToday size={12} /> {post.date}</span>
                    <span><MdAccessTime size={12} /> {post.readTime}</span>
                </div>
                <div className="bp-card-btn">
                    Read <MdArrowForward />
                </div>
            </div>
        </div>
    </Link>
);

// ── Page ───────────────────────────────────────────────────────────────────

const BlogPage = () => {
    const { setIsLoading, setLoading } = useLoading();

    useEffect(() => {
        setLoading(100);
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflowY = "auto";
            if (smoother) smoother.paused(false);
            document
                .querySelectorAll<HTMLElement>(".header, .icons-section, .nav-fade")
                .forEach((el) => (el.style.opacity = "1"));
        }, 400);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const featured = blogPosts.filter((p: any) => p.featured);
    const rest = blogPosts.filter((p: any) => !p.featured);

    return (
        <div className="container-main blog-page-root">
            <SEO 
                title="Blog | Rimon Dutta - Software Developer" 
                description="Explore tech insights, tutorials, and stories on modern web development, DevOps, and AI." 
                url="/blog"
                keywords={["blog", "tech", "development", "DevOps", "AI", "Rimon Dutta", "Next.js", "React"]}
            />
            <Cursor />
            <Navbar />
            <SocialIcons />

            <div id="smooth-wrapper">
                <div id="smooth-content">

                    {/* ── Hero ── */}
                    <div className="bp-hero">
                        <video
                            className="bp-video-bg"
                            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <div className="bp-video-overlay" />

                        <div className="bp-hero-inner font-general-sans">
                            <div className="bp-hero-content">
                                <div className="bp-pill-badge">
                                    <div className="bp-pill-dot" />
                                    <span className="bp-pill-text-dim">New post available from</span>
                                    <span className="bp-pill-text-solid">March 2026</span>
                                </div>
                                <h1 className="bp-hero-title-new">
                                    Expore All Tech Insights, Tutorials, and Stories on My Blog
                                </h1>
                                <p className="bp-hero-sub-new">
                                    Dive into a world of tech insights, tutorials, and stories. From AI breakthroughs to coding tips, my blog is your go-to source for all things tech.
                                </p>
                                <button className="bp-cta-btn">
                                    <div className="bp-cta-glow" />
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Featured Post ── */}
                    <section className="bp-section">
                        <div className="bp-section-label">Featured</div>
                        {featured.map((p: any) => (
                            <FeaturedCard key={p.id} post={p} />
                        ))}
                    </section>

                    {/* ── Divider ── */}
                    <div className="bp-divider" />

                    {/* ── All Posts ── */}
                    <section className="bp-section">
                        <div className="bp-section-label">All Articles</div>
                        <div className="bp-grid">
                            {rest.map((p: any) => (
                                <PostCard key={p.id} post={p} />
                            ))}
                        </div>
                    </section>

                    {/* ── Footer Strip ── */}
                    <div className="bp-footer-strip">
                        <p>© 2026 Rimon Dutta— All rights reserved.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogPage;
