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
  title = 'منصة م. محمود الشيخ - مدرس التاريخ | منصة تعليمية متكاملة',
  description = 'م. محمود الشيخ - مدرس التاريخ المتميز. منصة تعليمية متكاملة تقدم دروساً وشروحات في التاريخ لجميع المراحل الدراسية.',
  keywords = 'م. محمود الشيخ, مدرس تاريخ, تعليم اونلاين, دروس تاريخ, شرح تاريخ, منصة تعليمية',
      image = '/social-preview.jpg',
    url = 'https://mahmoud-elsheikh.com/',
  type = 'website',
  author = 'م. محمود الشيخ',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const fullUrl = url.startsWith('http') ? url : `https://mahmoud-elsheikh.com${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://mahmoud-elsheikh.com${image}`;

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
      <meta property="og:site_name" content="منصة م. محمود الشيخ التعليمية" />
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
      <meta property="twitter:creator" content="@mahmoud_elsheikh" />
      <meta property="twitter:site" content="@ibrahim_magdy_platform" />

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
      <meta name="subject" content="تعليم الرياضيات والفيزياء" />
      <meta name="category" content="تعليم" />
      <meta name="classification" content="منصة تعليمية" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="طلاب المدارس والجامعات" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="منصة م. محمود الشيخ" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Structured Data for Teacher/Person */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "م. محمود الشيخ",
        "alternateName": ["محمود الشيخ", "Mahmoud Elsheikh", "م. محمود"],
        "jobTitle": "مدرس التاريخ",
        "description": "مدرس متميز في التاريخ مع خبرة أكثر من 10 سنوات في التدريس",
        "url": "https://mahmoud-elsheikh.com/",
        "image": fullImageUrl,
        "sameAs": [
          "https://www.facebook.com/mahmoud.elsheikh",
          "https://www.youtube.com/@mahmoudelsheikh",
          "https://www.instagram.com/mahmoud_elsheikh"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "منصة م. محمود الشيخ التعليمية",
          "url": "https://ibrahim-magdy.com/"
        },
        "knowsAbout": [
          "التاريخ",
          "التاريخ الإسلامي", 
          "التاريخ الحديث",
          "التاريخ القديم",
          "تعليم التاريخ",
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
        "email": "mahmoud@mahmoud-elsheikh.com"
      })}
      </script>

      {/* Structured Data for WebSite */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "منصة م. محمود الشيخ التعليمية",
        "url": "https://mahmoud-elsheikh.com/",
        "description": "منصة تعليمية متكاملة تقدم دروساً وشروحات في التاريخ",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://mahmoud-elsheikh.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })}
      </script>
    </Helmet>
  );
};

export default SEOHead; 