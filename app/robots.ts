import { MetadataRoute } from "next";

// ==========================================
// SIMPLE ROBOTS.TS - Clean & Professional
// ==========================================

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ==========================================
      // SEARCH ENGINE BOTS (Google, Bing, etc.)
      // ==========================================
      {
        userAgent: ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot", "Yandex"],
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/account/",
          "/checkout/",
          "/cart/",
          "/thank-you/",
          "/payment/",
          "/private/",
          "/*?*sort=",
          "/*?*filter=",
          "/search?",
        ],
      },

      // ==========================================
      // SOCIAL MEDIA BOTS (For Rich Previews)
      // ==========================================
      {
        userAgent: [
          "facebookexternalhit",
          "Facebot",
          "Twitterbot",
          "WhatsApp",
          "TelegramBot",
          "LinkedInBot",
          "Pinterestbot",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/account/",
          "/admin/",
        ],
      },

      // ==========================================
      // AI TRAINING BOTS - BLOCKED
      // ==========================================
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Google-Extended",
          "PerplexityBot",
          "Applebot-Extended",
          "Bytespider",
        ],
        disallow: "/",
      },

      // ==========================================
      // BAD/AGGRESSIVE CRAWLERS - BLOCKED
      // ==========================================
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "DotBot",
          "MJ12bot",
          "BLEXBot",
          "linkdexbot",
          "archive.org_bot",
        ],
        disallow: "/",
      },

      // ==========================================
      // ALL OTHER BOTS - CONTROLLED ACCESS
      // ==========================================
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/account/",
          "/checkout/",
          "/cart/",
          "/private/",
          "/*?*sessionid=",
          "/search?",
        ],
        crawlDelay: 10,
      },
    ],

    // ==========================================
    // SITEMAP LOCATION
    // ==========================================
    sitemap: "https://dkshandloom.online/sitemap.xml",
  };
}