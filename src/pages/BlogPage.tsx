import { useEffect } from "react";
import { useLoading } from "../context/LoadingProvider";
import { smoother } from "../components/Navbar";
import Navbar from "../components/Navbar";
import SocialIcons from "../components/SocialIcons";
import Cursor from "../components/Cursor";
import { MdArrowForward, MdCalendarToday, MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/BlogPage.css";

// ── All blog posts data ────────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const blogPosts = [
    {
        id: 1,
        slug: "how-llms-work",
        title: "How Large Language Models (LLMs) Work",
        category: "AI",
        date: "March 10, 2026",
        readTime: "4 min read",
        tags: ["AI", "LLM", "Machine Learning"],
        excerpt:
            "Large Language Models like GPT understand and generate text using deep neural networks trained on massive datasets. Learn the basic workflow behind modern AI systems.",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&fit=crop",
        featured: false,
        content: `
Large Language Models (LLMs) are AI systems designed to understand and generate human language. Modern tools like chatbots, AI assistants, and coding copilots rely on LLMs to process natural language and produce meaningful responses.

## Training on Massive Data

LLMs are trained on extremely large datasets containing books, websites, research papers, and other text sources. During training, the model learns patterns in language such as grammar, meaning, context, and relationships between words.

The model does not memorize sentences. Instead, it learns statistical relationships between **tokens** (small pieces of words).

## Token Prediction

At their core, LLMs work by predicting the **next token** in a sequence.

Example:
**Input:** "JavaScript is a popular"
**Prediction:** "programming", "language", or "tool".

By repeating this prediction step many times, the model generates full sentences and paragraphs.

## Transformer Architecture

Most modern LLMs use the **Transformer architecture**, which relies on a mechanism called **self-attention**. This allows the model to understand relationships between words in a sentence, even if they are far apart.

For example, in the sentence:
*"The developer fixed the bug because **he** reviewed the logs."*
The model understands that **"he"** refers to the developer.



## Inference (How AI Responds)

When you send a prompt to an LLM:
1. The text is converted into tokens.
2. The tokens pass through neural network layers.
3. The model calculates probabilities for the next token.
4. The best token is selected.
5. The process repeats until the response is complete.

## Real-World Applications

LLMs are used in many modern applications:
- AI chatbots (ChatGPT, Claude, Gemini)
- Code generation tools (GitHub Copilot)
- Smart search engines
- Content writing assistants
- Customer support automation

## Final Thoughts

Large Language Models are transforming how humans interact with computers. By combining massive datasets with advanced neural network architectures, LLMs can understand context, generate content, and assist developers and researchers worldwide.
`,
    },
    {
        id: 2,
        slug: "future-of-nextjs-14",
        title: "The Future of Full-Stack Development with Next.js 14",
        category: "Technology",
        date: "Feb 28, 2024",
        readTime: "9 min read",
        tags: ["Next.js", "React", "Full-Stack"],
        excerpt:
            "Deep dive into Server Actions, App Router optimisation, and why Next.js is dominating the 2024 landscape for production-grade applications.",
        image:
            "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&fit=crop",
        featured: false,
        content: `
Next.js 14 represents a paradigm shift in how we think about full-stack React applications. With the stable release of Server Actions, developers finally have a clean, type-safe way to handle server-side mutations without writing API routes.

## Server Actions: The Game Changer

Server Actions allow you to define async functions that run exclusively on the server, called directly from your components:

\`\`\`tsx
async function createPost(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  await db.posts.create({ data: { title } });
  revalidatePath('/blog');
}
\`\`\`

This eliminates entire layers of boilerplate — no more API routes, no more fetch calls, no more manual state management for simple mutations.

## App Router Performance

The App Router introduced React Server Components (RSC), which render on the server and send only HTML to the client. The result? Dramatically smaller JavaScript bundles and faster Time to Interactive (TTI).

**Key benefits:**
- Zero JavaScript for static server components
- Streaming with Suspense boundaries
- Nested layouts without full-page remounts

## Partial Prerendering (PPR)

Next.js 14 introduced experimental Partial Prerendering — a new rendering model that combines static and dynamic content in a single response. The static shell is served instantly, while dynamic holes stream in.

## Why Teams Are Migrating

The developer experience improvements in Next.js 14 are tangible. Compile times are faster, the mental model is simpler, and the integration with Vercel's infrastructure makes deployments trivial.

The future of full-stack JavaScript is clearly server-first, and Next.js is leading the charge.
        `,
    },
    {
        id: 3,
        slug: "deploy-nodejs-app-on-vps",
        title: "How to Deploy Node.js Apps on a VPS",
        category: "Development",
        date: "March 10, 2026",
        readTime: "6 min read",
        tags: ["Node.js", "DevOps", "VPS", "Deployment"],
        excerpt:
            "A practical guide to deploying a Node.js application on a VPS using PM2 and Nginx. Learn the production setup used by many backend developers.",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&fit=crop",
        featured: false,
        content: `
Deploying a Node.js application to a VPS is one of the most common ways developers run production backend services. It gives you full control over the server environment and allows you to configure performance, security, and scaling.

This guide walks through a simple and reliable deployment workflow.

## Connect to Your VPS

First connect to your server using SSH.

\`\`\`bash
ssh root@your_server_ip
\`\`\`

Update the server packages:

\`\`\`bash
apt update && apt upgrade
\`\`\`

Keeping the system updated prevents security vulnerabilities.

## Install Node.js

Install Node.js using NodeSource:

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
\`\`\`

Verify installation:

\`\`\`bash
node -v
npm -v
\`\`\`

## Upload Your Application

Clone your project from GitHub or upload it manually.

\`\`\`bash
git clone https://github.com/your-username/project.git
cd project
npm install
\`\`\`

If your project uses environment variables, create a **.env** file.

## Run the App with PM2

Running Node.js directly is not recommended in production. Instead use **PM2**, a process manager that keeps your app running even after crashes or server restarts.

Install PM2 globally:

\`\`\`bash
npm install -g pm2
\`\`\`

Start your application:

\`\`\`bash
pm2 start server.js
\`\`\`

Save the process list:

\`\`\`bash
pm2 save
pm2 startup
\`\`\`

## Setup Nginx Reverse Proxy

Nginx is commonly used as a reverse proxy in front of Node.js apps.

Install Nginx:

\`\`\`bash
apt install nginx
\`\`\`

Create a config file:

\`\`\`bash
nano /etc/nginx/sites-available/nodeapp
\`\`\`

Example configuration:

\`\`\`
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\$host;
        proxy_cache_bypass \\$http_upgrade;
    }
}
\`\`\`

Enable the configuration:

\`\`\`bash
ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
\`\`\`

Now your Node.js app is accessible through your domain.

## Enable HTTPS (Recommended)

Secure your application with SSL using Certbot.

\`\`\`bash
apt install certbot python3-certbot-nginx
certbot --nginx
\`\`\`

This automatically generates and installs SSL certificates.

## Conclusion

Deploying Node.js on a VPS using PM2 and Nginx is a stable production setup used by many backend systems. It provides process management, better performance, and HTTPS support for your application.

Once deployed, you can scale your app further using load balancers, Docker containers, or cloud infrastructure.
`,
    },
    {
        id: 4,
        slug: "rest-api-vs-graphql",
        title: "REST API vs GraphQL: Which One Should You Choose?",
        category: "Development",
        date: "March 11, 2026",
        readTime: "5 min read",
        tags: ["API", "REST", "GraphQL", "Backend"],
        excerpt:
            "APIs are the backbone of modern applications. If you're building an app, you've likely heard of REST and GraphQL. Let's break down the differences.",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&fit=crop",
        featured: true,
        content: `
APIs are the backbone of modern web and mobile applications. If you’re building an app, you’ve likely heard of REST and GraphQL. Both allow clients to communicate with servers, but they do it differently. In this post, we’ll break down the differences and help you decide which one to use.

## What is REST API?
REST (Representational State Transfer) is the traditional approach to building APIs. It is resource-based and uses standard HTTP methods.



- **Structure:** REST uses multiple endpoints for different resources.
- **Example:**
\`\`\`bash
GET /users       # Fetch all users
GET /users/1     # Fetch user with ID 1
POST /users      # Create a new user
\`\`\`

- **Data Fetching:** Often returns fixed structures. Sometimes you get more data than needed (**over-fetching**) or need multiple requests to get all the data you want (**under-fetching**).
- **Caching:** Easy with standard HTTP caching, since each endpoint has a unique URL.
- **Error Handling:** Uses standard HTTP status codes like \`200\`, \`404\`, \`500\`.

## What is GraphQL?
GraphQL is a modern query language for APIs, developed by Facebook. It allows clients to define exactly what data they want.

- **Structure:** GraphQL uses a **single endpoint** for all data queries.
- **Example Query:**
\`\`\`graphql
query {
  user(id: 1) {
    name
    email
    posts {
      title
    }
  }
}
\`\`\`

- **Data Fetching:** Clients can request exactly the data they need, reducing over-fetching.
- **Caching:** More complex than REST; usually done at the query level or using libraries like Apollo Client.
- **Pros:** Flexible, fetch multiple resources in a single request, no need for versioning.

## REST vs GraphQL: Key Differences

| Feature | REST | GraphQL |
| :--- | :--- | :--- |
| **Endpoints** | Multiple per resource | Single endpoint |
| **Data Fetching** | Fixed structure | Flexible (Client specifies) |
| **Versioning** | Often needed (v1, v2) | Usually unnecessary |
| **Caching** | Easy (HTTP level) | Complex (Query level) |
| **Learning Curve**| Low / Easy | Moderate to High |

## When to Use REST
- Simple APIs with limited client variations.
- Projects that rely heavily on standard HTTP caching.
- When you want mature tooling and quick deployment.

## When to Use GraphQL
- Complex apps needing specific data on demand (like mobile apps).
- Multiple clients (web, mobile, IoT) with different data needs.
- Rapid iteration where API requirements evolve frequently.

## Final Thoughts
REST is **simple, structured, and mature**, while GraphQL is **flexible, efficient, and client-driven**. Both are powerful, but the right choice depends on your project’s complexity and scalability needs.
`
    }
];

// ── Sub-components ─────────────────────────────────────────────────────────

const FeaturedCard = ({ post }: { post: typeof blogPosts[0] }) => (
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

const PostCard = ({ post }: { post: typeof blogPosts[0] }) => (
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

    const featured = blogPosts.filter((p) => p.featured);
    const rest = blogPosts.filter((p) => !p.featured);

    return (
        <div className="container-main">
            <Cursor />
            <Navbar />
            <SocialIcons />

            <div id="smooth-wrapper">
                <div id="smooth-content">

                    {/* ── Hero ── */}
                    <div className="bp-hero">
                        <div className="bp-hero-inner">
                            <Link to="/" className="bp-back-link" data-cursor="disable">
                                ← Back to Portfolio
                            </Link>
                            <p className="bp-hero-tag">My Thoughts &amp; Insights</p>
                            <h1 className="bp-hero-title">
                                The <span>Blog</span>
                            </h1>
                            <p className="bp-hero-sub">
                                Deep dives into design, engineering, and the craft of
                                building great software.
                            </p>
                        </div>
                        <div className="bp-hero-glow" />
                        <div className="bp-hero-glow bp-hero-glow--2" />
                    </div>

                    {/* ── Featured Post ── */}
                    <section className="bp-section">
                        <div className="bp-section-label">Featured</div>
                        {featured.map((p) => (
                            <FeaturedCard key={p.id} post={p} />
                        ))}
                    </section>

                    {/* ── Divider ── */}
                    <div className="bp-divider" />

                    {/* ── All Posts ── */}
                    <section className="bp-section">
                        <div className="bp-section-label">All Articles</div>
                        <div className="bp-grid">
                            {rest.map((p) => (
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
