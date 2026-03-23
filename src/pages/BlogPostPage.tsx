import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useLoading } from "../context/LoadingProvider";
import { smoother } from "../components/Navbar";
import Navbar from "../components/Navbar";
import SocialIcons from "../components/SocialIcons";
import Cursor from "../components/Cursor";
import SEO from "../components/SEO";
import { MdCalendarToday, MdAccessTime, MdArrowBack, MdArrowForward, MdContentCopy, MdCheck } from "react-icons/md";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { blogPosts } from "../data/blogPosts";
import "../styles/BlogPostPage.css";

// ── Copy Button Component ──────────────────────────────────────────────
const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button className="bpp-copy-btn" onClick={handleCopy} aria-label="Copy code">
            {copied ? <MdCheck size={16} color="#4ade80" /> : <MdContentCopy size={16} />}
        </button>
    );
};

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { setIsLoading, setLoading } = useLoading();
    const post = blogPosts.find((p: any) => p.slug === slug);

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
    }, [setIsLoading, setLoading]);

    if (!post) return <Navigate to="/blog" replace />;

    const otherPosts = blogPosts.filter((p: any) => p.id !== post.id).slice(0, 2);

    return (
        <div className="container-main">
            <SEO
                title={`${post.title} | Rimon Dutta`}
                description={post.metaDescription || post.excerpt}
                image={post.image}
                url={`/blog/${post.slug}`}
                keywords={post.tags}
                type="article"
            />
            <Cursor />
            <Navbar />
            <SocialIcons />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <div className="bpp-hero">
                        <img src={post.image} alt={post.title} className="bpp-hero-img" />
                        <div className="bpp-hero-overlay" />
                        <div className="bpp-hero-content">
                            <Link to="/blog" className="bpp-back" data-cursor="disable">
                                <MdArrowBack /> Back to Blog
                            </Link>
                            <span className="bpp-category">{post.category}</span>
                            <h1 className="bpp-title">{post.title}</h1>
                            <div className="bpp-meta">
                                <span><MdCalendarToday size={14} /> {post.date}</span>
                                <span><MdAccessTime size={14} /> {post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    <article className="bpp-article">
                        <div className="bpp-article-inner">
                            <div className="bpp-tags">
                                {post.tags?.map((tag: any) => (
                                    <span key={tag} className="bpp-tag">{tag}</span>
                                ))}
                            </div>

                            <div className="bpp-content">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h1: ({ ...props }) => <h1 className="bpp-h1" {...props} />,
                                        h2: ({ ...props }) => <h2 className="bpp-h2" {...props} />,
                                        h3: ({ ...props }) => <h3 className="bpp-h3" {...props} />,
                                        h4: ({ ...props }) => <h4 className="bpp-h4" {...props} />,
                                        h5: ({ ...props }) => <h5 className="bpp-h5" {...props} />,
                                        h6: ({ ...props }) => <h6 className="bpp-h6" {...props} />,
                                        p: ({ ...props }) => <p className="bpp-p" {...props} />,
                                        ul: ({ ...props }) => <ul className="bpp-list" {...props} />,
                                        ol: ({ ...props }) => <ol className="bpp-list bpp-list--ordered" {...props} />,
                                        table: ({ ...props }) => (
                                            <div className="table-responsive"><table {...props} /></div>
                                        ),
                                        code({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            const codeString = String(children).replace(/\n$/, '');
                                            return !inline ? (
                                                <div className="bpp-code-wrapper">
                                                    <div className="bpp-code-header">
                                                        <span className="bpp-code-lang">{match ? match[1] : "code"}</span>
                                                        <CopyButton text={codeString} />
                                                    </div>
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={match ? match[1] : 'text'}
                                                        PreTag="div"
                                                        className="bpp-syntax-highlighter"
                                                        customStyle={{
                                                            margin: 0,
                                                            padding: 0, // CSS handles it
                                                            background: 'transparent',
                                                        }}
                                                        codeTagProps={{
                                                            style: {
                                                                fontSize: '14px',
                                                                lineHeight: '1.7',
                                                                fontFamily: '"SFMono-Regular", Consolas, monospace',
                                                                display: 'block',
                                                            }
                                                        }}
                                                    >
                                                        {codeString}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <code className="bpp-inline-code" {...props}>{children}</code>
                                            );
                                        }
                                    }}
                                >
                                    {post.content || ""}
                                </ReactMarkdown>
                            </div>

                            <div className="bpp-divider" />

                            {otherPosts.length > 0 && (
                                <div className="bpp-more">
                                    <p className="bpp-more-label">Continue Reading</p>
                                    <div className="bpp-more-grid">
                                        {otherPosts.map((p: any) => (
                                            <Link to={`/blog/${p.slug}`} key={p.id} className="bpp-more-card" data-cursor="disable">
                                                <div className="bpp-more-image"><img src={p.image} alt={p.title} /></div>
                                                <div className="bpp-more-body">
                                                    <span className="bpp-more-cat">{p.category}</span>
                                                    <p className="bpp-more-title">{p.title}</p>
                                                    <span className="bpp-more-link">Read <MdArrowForward /></span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>

                    <div className="bp-footer-strip">
                        <p>© 2026 Rimon Dutta — All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;