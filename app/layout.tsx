import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default:
      "DKS Handloom - Premium Fashion & Lifestyle Store | Buy Online India",
    template: "%s | DKS Handloom",
  },
  description:
    "DKS Handloom - India's trusted premium fashion & lifestyle destination. Shop men's fashion, women's collection, kids wear, watches, shoes & home kitchen products. ✓ Easy Returns ✓ Fast Delivery ✓ COD Available ✓ Best Prices",
  keywords: [
    "DKS Handloom",
    "DKS Handloom Dhanau",
    "handloom store india",
    "buy fashion online india",
    "premium fashion store",
    "men's fashion online",
    "women's clothing india",
    "kids wear online india",
    "buy watches online india",
    "branded shoes online",
    "home kitchen products online",
    "lifestyle products india",
    "ethnic wear online",
    "traditional handloom",
    "handcrafted fashion",
    "COD available",
    "fast delivery india",
    "best online shopping",
    "affordable fashion india",
    "quality handloom products",
  ],
  authors: [{ name: "DKS Handloom" }],
  creator: "DKS Handloom",
  publisher: "DKS Handloom",
  metadataBase: new URL("https://dkshandloom.online"),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "DKS Handloom - Premium Fashion & Lifestyle Store India",
    description:
      "Shop premium fashion, ethnic wear, kids collection, watches & home products online at DKS Handloom. ✓ Trusted Quality ✓ Fast Delivery ✓ Easy Returns",
    url: "https://dkshandloom.online",
    siteName: "DKS Handloom",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DKS Handloom - Premium Fashion & Lifestyle Store",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DKS Handloom - Premium Fashion & Lifestyle Store",
    description:
      "India's trusted fashion destination. Shop men's, women's & kids wear, watches, shoes & home products. ✓ Fast Delivery ✓ COD Available",
    images: ["/og-image.jpg"],
    creator: "@dkshandloom",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",

  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  category: "E-commerce",

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DKS Handloom",
    alternateName: "DKS Handloom Dhanau",
    url: "https://dkshandloom.online",
    logo: {
      "@type": "ImageObject",
      url: "https://dkshandloom.online/logo.png",
      width: 250,
      height: 60,
    },
    image: "https://dkshandloom.online/og-image.jpg",
    description:
      "DKS Handloom is a premium fashion and lifestyle store offering quality products across India with fast delivery and easy returns.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhanau",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    sameAs: [
      "https://instagram.com/d.k.s._handloom_dhanau",
      "https://instagram.com/fateh_khan_halepoto_",
      "https://facebook.com/fateh.khan",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9950388083",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    },
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DKS Handloom",
    url: "https://dkshandloom.online",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://dkshandloom.online/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Online Store Schema
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "DKS Handloom",
    image: "https://dkshandloom.online/og-image.jpg",
    url: "https://dkshandloom.online",
    telephone: "+91-9950388083",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhanau",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    paymentAccepted: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "UPI",
      "Net Banking",
    ],
    currenciesAccepted: "INR",
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dkshandloom.online",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Additional Meta Tags */}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Geographic Tags */}
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Dhanau, Rajasthan" />
        <meta name="geo.position" content="27.1767;75.8885" />
        <meta name="ICBM" content="27.1767, 75.8885" />

        {/* Additional SEO Tags */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="language" content="English" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />

        {/* Mobile Optimization */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* Apple Tags */}
        <meta name="apple-mobile-web-app-title" content="DKS Handloom" />

        {/* Microsoft Tags */}
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>

      <body className="bg-black text-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-94VNTB23Y3"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-94VNTB23Y3');
  `}
        </Script>

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Store Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(storeSchema),
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />

        <CartProvider>
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
