import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  image?: string;
  url?: string;
  keywords?: string[];
}

const SEO = ({ title, description, name = 'Rimon Dutta', type = 'website', image, url, keywords }: SEOProps) => {
  const defaultImage = "https://rimondutta.vercel.app/images/rimondutta.png";
  const defaultURL = "https://rimondutta.vercel.app/";
  
  const siteUrl = url ? `${defaultURL}${url.replace(/^\//, '')}` : defaultURL;
  const siteImage = image || defaultImage;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={name} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={siteImage} />
    </Helmet>
  );
};

export default SEO;
