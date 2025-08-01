import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
      title = 'منصة د/ كريم أيوب - مدرس الأحياء | منصة تعليمية متكاملة',
    description = 'د/ كريم أيوب - مدرس الأحياء المتميز. منصة تعليمية متكاملة تقدم دروساً وشروحات في الأحياء لجميع المراحل الدراسية.',
    keywords = 'د/ كريم أيوب, مدرس أحياء, تعليم اونلاين, دروس أحياء, شرح أحياء, منصة تعليمية',
      image = '/social-preview.jpg',
    url = 'https://karim-ayoub.com/',
  type = 'website',
      author = 'د/ كريم أيوب',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const fullUrl = url.startsWith('http') ? url : `https://karim-ayoub.com${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://karim-ayoub.com${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
              <meta property="og:site_name" content="منصة د/ كريم أيوب التعليمية" />
      <meta property="og:locale" content="ar_AR" />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      <meta property="twitter:creator" content="@karim_ayoub" />

      {/* Additional SEO Meta Tags */}
      <meta name="language" content="Arabic" />
      <meta name="geo.region" content="EG" />
      <meta name="geo.placename" content="Egypt" />
      <meta name="geo.position" content="30.0444;31.2357" />
      <meta name="ICBM" content="30.0444, 31.2357" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="generator" content="React" />
      <meta name="subject" content="تعليم الأحياء" />
      <meta name="category" content="تعليم" />
      <meta name="classification" content="منصة تعليمية" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="طلاب المدارس والجامعات" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
              <meta name="apple-mobile-web-app-title" content="منصة د/ كريم أيوب" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Structured Data for Teacher/Person */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "د/ كريم أيوب",
        "alternateName": ["كريم أيوب", "Karim Ayoub", "د/ كريم"],
        "jobTitle": "مدرس الأحياء",
        "description": "مدرس متميز في الأحياء مع خبرة أكثر من 10 سنوات في التدريس",
        "url": "https://karim-ayoub.com/",
        "image": fullImageUrl,
        "sameAs": [
          "https://www.facebook.com/karim.ayoub",
          "https://www.youtube.com/@karimayoub",
          "https://www.instagram.com/karim_ayoub"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "منصة د/ كريم أيوب التعليمية",
          "url": "https://karim-ayoub.com/"
        },
        "knowsAbout": [
          "الأحياء",
          "علم الأحياء الجزيئي", 
          "علم الوراثة",
          "علم البيئة",
          "تعليم الأحياء",
          "المناهج الدراسية",
          "التحضير للامتحانات",
          "الدروس الخصوصية"
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "مدرس خصوصي",
          "occupationLocation": {
            "@type": "Place",
            "name": "مصر"
          }
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "EG",
          "addressRegion": "القاهرة"
        },
        "telephone": "+20-100-000-0000",
        "email": "karim@karim-ayoub.com"
      })}
      </script>

      {/* Structured Data for WebSite */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "منصة د/ كريم أيوب التعليمية",
        "url": "https://karim-ayoub.com/",
        "description": "منصة تعليمية متكاملة تقدم دروساً وشروحات في الأحياء",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://karim-ayoub.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })}
      </script>
    </Helmet>
  );
};

export default SEOHead; 