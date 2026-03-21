export const blogPosts = [
  {
    id: 1,
    slug: "how-llms-work",
    title: "How Large Language Models (LLMs) Work",
    category: "AI",
    date: "March 10, 2026",
    readTime: "4 min read",
    tags: [
      "AI",
      "LLM",
      "Machine Learning"
    ],
    excerpt: "Large Language Models like GPT understand and generate text using deep neural networks trained on massive datasets. Learn the basic workflow behind modern AI systems.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&fit=crop",
    featured: false,
    content: `
Large Language Models (LLMs) are AI systems designed to understand and generate human language. Modern tools like chatbots, AI assistants, and coding copilots rely on LLMs to process natural language and produce meaningful responses.

<h2>Training on Massive Data</h2>

LLMs are trained on extremely large datasets containing books, websites, research papers, and other text sources. During training, the model learns patterns in language such as grammar, meaning, context, and relationships between words.

The model does not memorize sentences. Instead, it learns statistical relationships between **tokens** (small pieces of words).

<h2>Token Prediction</h2>

At their core, LLMs work by predicting the **next token** in a sequence.

Example:
**Input:** "JavaScript is a popular"
**Prediction:** "programming", "language", or "tool".

By repeating this prediction step many times, the model generates full sentences and paragraphs.

<h2>Transformer Architecture</h2>

Most modern LLMs use the **Transformer architecture**, which relies on a mechanism called **self-attention**. This allows the model to understand relationships between words in a sentence, even if they are far apart.

For example, in the sentence:
*"The developer fixed the bug because **he** reviewed the logs."*
The model understands that **"he"** refers to the developer.

<h2>Inference (How AI Responds)</h2>

When you send a prompt to an LLM:
1. The text is converted into tokens.
2. The tokens pass through neural network layers.
3. The model calculates probabilities for the next token.
4. The best token is selected.
5. The process repeats until the response is complete.

<h2>Real-World Applications</h2>

LLMs are used in many modern applications:
- AI chatbots (ChatGPT, Claude, Gemini)
- Code generation tools (GitHub Copilot)
- Smart search engines
- Content writing assistants
- Customer support automation

<h2>Final Thoughts</h2>

Large Language Models are transforming how humans interact with computers. By combining massive datasets with advanced neural network architectures, LLMs can understand context, generate content, and assist developers and researchers worldwide.
`
  },
  {
    id: 2,
    slug: "future-of-nextjs-14",
    title: "The Future of Full-Stack Development with Next.js 14",
    category: "Technology",
    date: "Feb 28, 2024",
    readTime: "9 min read",
    tags: [
      "Next.js",
      "React",
      "Full-Stack"
    ],
    excerpt: "Deep dive into Server Actions, App Router optimisation, and why Next.js is dominating the 2024 landscape for production-grade applications.",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&fit=crop",
    featured: false,
    content: `
Next.js 14 represents a paradigm shift in how we think about full-stack React applications. With the stable release of Server Actions, developers finally have a clean, type-safe way to handle server-side mutations without writing API routes.

<h2>Server Actions: The Game Changer</h2>

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

<h2>App Router Performance</h2>

The App Router introduced React Server Components (RSC), which render on the server and send only HTML to the client. The result? Dramatically smaller JavaScript bundles and faster Time to Interactive (TTI).

**Key benefits:**
- Zero JavaScript for static server components
- Streaming with Suspense boundaries
- Nested layouts without full-page remounts

<h2>Partial Prerendering (PPR)</h2>

Next.js 14 introduced experimental Partial Prerendering — a new rendering model that combines static and dynamic content in a single response. The static shell is served instantly, while dynamic holes stream in.

<h2>Why Teams Are Migrating</h2>

The developer experience improvements in Next.js 14 are tangible. Compile times are faster, the mental model is simpler, and the integration with Vercel's infrastructure makes deployments trivial.

The future of full-stack JavaScript is clearly server-first, and Next.js is leading the charge.
`
  },
  {
    id: 3,
    slug: "deploy-nodejs-app-on-vps-nginx-pm2",
    metaTitle: "Deploy Node.js on a VPS: Complete Nginx & PM2 Guide",
    metaDescription: "Learn how to deploy a production-ready Node.js application on a VPS using PM2 process manager, Nginx reverse proxy, and free SSL via Let's Encrypt.",
    title: "How to Deploy a Node.js App on a VPS (Production Guide)",
    category: "Development",
    date: "March 10, 2026",
    readTime: "7 min read",
    tags: [
      "Node.js",
      "DevOps",
      "VPS",
      "Deployment",
      "Nginx",
      "PM2"
    ],
    excerpt: "A complete, step-by-step guide to deploying a production-ready Node.js application on a VPS using PM2, an Nginx reverse proxy, and free SSL via Let's Encrypt.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&fit=crop",
    featured: false,
    content: `
Deploying a Node.js application to a Virtual Private Server (VPS) is one of the most reliable ways to run production backend services. It gives you absolute control over your server environment, allowing you to fine-tune performance, security, and scalability.

This guide walks through a robust deployment workflow using **PM2** for process management and **Nginx** as a reverse proxy.

<h2>Step 1: Connect to Your VPS and Update Packages</h2>

First, connect to your server securely using SSH. 

\`\`\`bash
ssh root@your_server_ip
\`\`\`

Before installing any new software, update your server's package index to prevent security vulnerabilities and ensure you have the latest features:

\`\`\`bash
apt update && apt upgrade -y
\`\`\`

<h2>Step 2: Install Node.js for Production</h2>

Install the latest stable version of Node.js using NodeSource. This ensures you get a more recent version than what is typically available in the default OS repositories.

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
\`\`\`

Verify the installation was successful:

\`\`\`bash
node -v
npm -v
\`\`\`

<h3>Step 3: Upload and Configure Your Application</h3>

Clone your project from GitHub directly to the server.

\`\`\`bash
git clone https://github.com/your-username/project.git
cd project
npm install
\`\`\`

If your project requires environment variables for database connections or API keys, create a **.env** file directly on the server using \`nano .env\`. Always ensure your \`.env\` file is securely added to your local \`.gitignore\` file before pushing to remote repositories to completely avoid exposing sensitive environment variables in your commit history.

<h4>Step 4: Run the App with PM2 Process Manager</h4>

Running Node.js directly with \`node server.js\` is not recommended for production. If the app crashes, it stays down. **PM2** is an advanced process manager that automatically restarts your app after crashes or server reboots.

Install PM2 globally:

\`\`\`bash
npm install -g pm2
\`\`\`

Start your Node.js application (replace \`server.js\` with your entry file):

\`\`\`bash
pm2 start server.js --name "my-node-app"
\`\`\`

Save the current process list so it respawns on a server reboot:

\`\`\`bash
pm2 save
pm2 startup
\`\`\`

<h2>Step 5: Setup Nginx as a Reverse Proxy</h2>

Nginx sits in front of your Node.js app to handle incoming HTTP requests, offering better security, load balancing, and performance than Node's built-in HTTP server.

Install Nginx:

\`\`\`bash
apt install nginx -y
\`\`\`

Create a new Nginx configuration file for your app:

\`\`\`bash
nano /etc/nginx/sites-available/nodeapp
\`\`\`

Add the following configuration, making sure to replace \`yourdomain.com\` with your actual domain and \`3000\` with your app's port:

\`\`\`nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

Enable the configuration and restart Nginx:

\`\`\`bash
ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
\`\`\`

Your Node.js app is now accessible via your domain name over standard HTTP.

<h5>Step 6: Enable HTTPS with Free SSL (Recommended)</h5>

Modern SEO and security standards require HTTPS. Secure your application with a free SSL certificate from Let's Encrypt using Certbot.

\`\`\`bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
\`\`\`

Certbot will automatically generate the SSL certificates and update your Nginx configuration to route traffic securely.

<h2>Conclusion</h2>

Deploying Node.js on a VPS using PM2 and Nginx is the industry-standard production setup for backend systems. It provides resilient process management, robust performance handling, and top-tier security for your web applications. 

From here, you can easily scale your infrastructure by introducing load balancers, Docker containers, or automated CI/CD pipelines.
`
  },
  {
    id: 4,
    slug: "rest-api-vs-graphql",
    title: "REST API vs GraphQL: Which One Should You Choose?",
    category: "Development",
    date: "March 11, 2026",
    readTime: "5 min read",
    tags: [
      "API",
      "REST",
      "GraphQL",
      "Backend"
    ],
    excerpt: "APIs are the backbone of modern applications. If you're building an app, you've likely heard of REST and GraphQL. Let's break down the differences.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&fit=crop",
    featured: true,
    content: `
APIs are the backbone of modern web and mobile applications. If you’re building an app, you’ve likely heard of REST and GraphQL. Both allow clients to communicate with servers, but they do it differently. In this post, we’ll break down the differences and help you decide which one to use.

<h2>What is REST API?</h2>
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

<h2>What is GraphQL?</h2>
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

<h2>REST vs GraphQL: Key Differences</h2>

| Feature | REST | GraphQL |
| :--- | :--- | :--- |
| **Endpoints** | Multiple per resource | Single endpoint |
| **Data Fetching** | Fixed structure | Flexible (Client specifies) |
| **Versioning** | Often needed (v1, v2) | Usually unnecessary |
| **Caching** | Easy (HTTP level) | Complex (Query level) |
| **Learning Curve**| Low / Easy | Moderate to High |

<h2>When to Use REST</h2>
- Simple APIs with limited client variations.
- Projects that rely heavily on standard HTTP caching.
- When you want mature tooling and quick deployment.

<h2>When to Use GraphQL</h2>
- Complex apps needing specific data on demand (like mobile apps).
- Multiple clients (web, mobile, IoT) with different data needs.
- Rapid iteration where API requirements evolve frequently.

<h2>Final Thoughts</h2>
REST is **simple, structured, and mature**, while GraphQL is **flexible, efficient, and client-driven**. Both are powerful, but the right choice depends on your project’s complexity and scalability needs.
`
  }
];
