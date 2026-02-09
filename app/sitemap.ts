import { MetadataRoute } from "next";

// If you have a database or API to fetch products, uncomment and use this:
// import { getAllProducts } from "@/lib/products";
// import { getAllBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dkshandloom.online";
  const currentDate = new Date();

  // Helper function to create sitemap entry
  const createSitemapEntry = (
    path: string,
    priority: number,
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  ): MetadataRoute.Sitemap[number] => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  });

  // ==========================================
  // CORE PAGES (Highest Priority)
  // ==========================================
  const corePages: MetadataRoute.Sitemap = [
    createSitemapEntry("", 1.0, "daily"), // Homepage
    createSitemapEntry("/shop", 0.95, "daily"),
    createSitemapEntry("/new-arrivals", 0.95, "daily"),
    createSitemapEntry("/best-sellers", 0.95, "daily"),
    createSitemapEntry("/sale", 0.95, "daily"),
  ];

  // ==========================================
  // MAIN CATEGORY PAGES
  // ==========================================
  const mainCategories: MetadataRoute.Sitemap = [
    createSitemapEntry("/categories/mens-fashion", 0.9, "weekly"),
    createSitemapEntry("/categories/womens-collection", 0.9, "weekly"),
    createSitemapEntry("/categories/kids-wear", 0.9, "weekly"),
    createSitemapEntry("/categories/watches", 0.85, "weekly"),
    createSitemapEntry("/categories/shoes", 0.85, "weekly"),
    createSitemapEntry("/categories/home-kitchen", 0.85, "weekly"),
    createSitemapEntry("/categories/ethnic-wear", 0.85, "weekly"),
    createSitemapEntry("/categories/accessories", 0.8, "weekly"),
    createSitemapEntry("/categories/traditional-handloom", 0.85, "weekly"),
  ];

  // ==========================================
  // MEN'S FASHION SUBCATEGORIES
  // ==========================================
  const mensSubcategories: MetadataRoute.Sitemap = [
    createSitemapEntry("/categories/mens-fashion/shirts", 0.85, "weekly"),
    createSitemapEntry("/categories/mens-fashion/t-shirts", 0.85, "weekly"),
    createSitemapEntry("/categories/mens-fashion/polos", 0.8, "weekly"),
    createSitemapEntry("/categories/mens-fashion/jeans", 0.85, "weekly"),
    createSitemapEntry("/categories/mens-fashion/trousers", 0.8, "weekly"),
    createSitemapEntry("/categories/mens-fashion/kurtas", 0.85, "weekly"),
    createSitemapEntry("/categories/mens-fashion/sherwanis", 0.8, "weekly"),
    createSitemapEntry("/categories/mens-fashion/jackets", 0.8, "weekly"),
    createSitemapEntry("/categories/mens-fashion/blazers", 0.8, "weekly"),
    createSitemapEntry("/categories/mens-fashion/suits", 0.8, "weekly"),
    createSitemapEntry("/categories/mens-fashion/ethnic-wear", 0.8, "weekly"),
    createSitemapEntry("/categories/mens-fashion/sportswear", 0.75, "weekly"),
  ];

  // ==========================================
  // WOMEN'S FASHION SUBCATEGORIES
  // ==========================================
  const womensSubcategories: MetadataRoute.Sitemap = [
    createSitemapEntry("/categories/womens-collection/sarees", 0.85, "weekly"),
    createSitemapEntry("/categories/womens-collection/kurtis", 0.85, "weekly"),
    createSitemapEntry("/categories/womens-collection/kurta-sets", 0.85, "weekly"),
    createSitemapEntry("/categories/womens-collection/salwar-suits", 0.85, "weekly"),
    createSitemapEntry("/categories/womens-collection/lehenga", 0.8, "weekly"),
    createSitemapEntry("/categories/womens-collection/dresses", 0.85, "weekly"),
    createSitemapEntry("/categories/womens-collection/tops", 0.8, "weekly"),
    createSitemapEntry("/categories/womens-collection/jeans", 0.8, "weekly"),
    createSitemapEntry("/categories/womens-collection/palazzo", 0.8, "weekly"),
    createSitemapEntry("/categories/womens-collection/dupatta", 0.75, "weekly"),
    createSitemapEntry("/categories/womens-collection/western-wear", 0.8, "weekly"),
    createSitemapEntry("/categories/womens-collection/party-wear", 0.8, "weekly"),
  ];

  // ==========================================
  // KIDS WEAR SUBCATEGORIES
  // ==========================================
  const kidsSubcategories: MetadataRoute.Sitemap = [
    createSitemapEntry("/categories/kids-wear/boys", 0.85, "weekly"),
    createSitemapEntry("/categories/kids-wear/girls", 0.85, "weekly"),
    createSitemapEntry("/categories/kids-wear/infants", 0.8, "weekly"),
    createSitemapEntry("/categories/kids-wear/ethnic", 0.8, "weekly"),
    createSitemapEntry("/categories/kids-wear/western", 0.8, "weekly"),
    createSitemapEntry("/categories/kids-wear/party-wear", 0.8, "weekly"),
  ];

  // ==========================================
  // WATCHES SUBCATEGORIES
  // ==========================================
  const watchesSubcategories: MetadataRoute.Sitemap = [
    createSitemapEntry("/categories/watches/mens-watches", 0.8, "weekly"),
    createSitemapEntry("/categories/watches/womens-watches", 0.8, "weekly"),
    createSitemapEntry("/categories/watches/smart-watches", 0.85, "weekly"),
    createSitemapEntry("/categories/watches/luxury-watches", 0.75, "weekly"),
    createSitemapEntry("/categories/watches/sports-watches", 0.75, "weekly"),
  ];

  // ==========================================
  // SHOES SUBCATEGORIES
  // ==========================================
  const shoesSubcategories: MetadataRoute.Sitemap = [
    createSitemapEntry("/categories/shoes/mens-shoes", 0.8, "weekly"),
    createSitemapEntry("/categories/shoes/womens-shoes", 0.8, "weekly"),
    createSitemapEntry("/categories/shoes/kids-shoes", 0.8, "weekly"),
    createSitemapEntry("/categories/shoes/sports-shoes", 0.8, "weekly"),
    createSitemapEntry("/categories/shoes/formal-shoes", 0.75, "weekly"),
    createSitemapEntry("/categories/shoes/casual-shoes", 0.75, "weekly"),
    createSitemapEntry("/categories/shoes/sandals", 0.75, "weekly"),
  ];

  // ==========================================
  // HOME & KITCHEN SUBCATEGORIES
  // ==========================================
  const homeKitchenSubcategories: MetadataRoute.Sitemap = [
    createSitemapEntry("/categories/home-kitchen/cookware", 0.75, "weekly"),
    createSitemapEntry("/categories/home-kitchen/dinnerware", 0.75, "weekly"),
    createSitemapEntry("/categories/home-kitchen/kitchen-tools", 0.75, "weekly"),
    createSitemapEntry("/categories/home-kitchen/home-decor", 0.75, "weekly"),
    createSitemapEntry("/categories/home-kitchen/bed-bath", 0.75, "weekly"),
    createSitemapEntry("/categories/home-kitchen/storage", 0.7, "weekly"),
  ];

  // ==========================================
  // SPECIAL COLLECTIONS
  // ==========================================
  const specialCollections: MetadataRoute.Sitemap = [
    createSitemapEntry("/collections/diwali-special", 0.85, "weekly"),
    createSitemapEntry("/collections/wedding-collection", 0.85, "weekly"),
    createSitemapEntry("/collections/festive-wear", 0.85, "weekly"),
    createSitemapEntry("/collections/summer-collection", 0.8, "weekly"),
    createSitemapEntry("/collections/winter-collection", 0.8, "weekly"),
    createSitemapEntry("/collections/trending-now", 0.85, "daily"),
    createSitemapEntry("/collections", 0.8, "weekly"),
  ];

  // ==========================================
  // INFORMATIONAL PAGES
  // ==========================================
  const infoPages: MetadataRoute.Sitemap = [
    createSitemapEntry("/about", 0.6, "monthly"),
    createSitemapEntry("/contact", 0.7, "monthly"),
    createSitemapEntry("/faq", 0.6, "monthly"),
    createSitemapEntry("/size-guide", 0.6, "monthly"),
    createSitemapEntry("/how-to-order", 0.5, "monthly"),
    createSitemapEntry("/track-order", 0.6, "monthly"),
  ];

  // ==========================================
  // BLOG PAGES
  // ==========================================
  const blogPages: MetadataRoute.Sitemap = [
    createSitemapEntry("/blog", 0.7, "weekly"),
    createSitemapEntry("/blog/fashion-tips", 0.6, "weekly"),
    createSitemapEntry("/blog/styling-guide", 0.6, "weekly"),
    createSitemapEntry("/blog/care-instructions", 0.6, "weekly"),
    createSitemapEntry("/blog/latest-trends", 0.65, "weekly"),
  ];

  // ==========================================
  // POLICY PAGES
  // ==========================================
  const policyPages: MetadataRoute.Sitemap = [
    createSitemapEntry("/privacy-policy", 0.3, "yearly"),
    createSitemapEntry("/terms-conditions", 0.3, "yearly"),
    createSitemapEntry("/shipping-policy", 0.4, "monthly"),
    createSitemapEntry("/return-refund-policy", 0.5, "monthly"),
    createSitemapEntry("/cancellation-policy", 0.4, "monthly"),
    createSitemapEntry("/payment-security", 0.4, "yearly"),
  ];

  // ==========================================
  // USER ACCOUNT PAGES (Lower Priority)
  // ==========================================
  const userPages: MetadataRoute.Sitemap = [
    createSitemapEntry("/account/login", 0.5, "monthly"),
    createSitemapEntry("/account/register", 0.5, "monthly"),
    createSitemapEntry("/account/forgot-password", 0.4, "monthly"),
  ];

  // ==========================================
  // DYNAMIC PRODUCT PAGES
  // ==========================================
  // Uncomment this when you have products in database
  /*
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productPages = products.map((product) =>
      createSitemapEntry(
        `/product/${product.slug}`,
        0.8,
        "weekly"
      )
    );
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }
  */

  // ==========================================
  // DYNAMIC BLOG POST PAGES
  // ==========================================
  // Uncomment this when you have blog posts in database
  /*
  let blogPostPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllBlogPosts();
    blogPostPages = posts.map((post) =>
      createSitemapEntry(
        `/blog/${post.slug}`,
        0.6,
        "monthly"
      )
    );
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }
  */

  // ==========================================
  // COMBINE ALL PAGES
  // ==========================================
  return [
    ...corePages,
    ...mainCategories,
    ...mensSubcategories,
    ...womensSubcategories,
    ...kidsSubcategories,
    ...watchesSubcategories,
    ...shoesSubcategories,
    ...homeKitchenSubcategories,
    ...specialCollections,
    ...infoPages,
    ...blogPages,
    ...policyPages,
    ...userPages,
    // ...productPages, // Uncomment when products are available
    // ...blogPostPages, // Uncomment when blog posts are available
  ];
}

// ==========================================
// SITEMAP INDEX (For large sites with 50k+ URLs)
// ==========================================
// If your site grows to have many products, create separate sitemaps:
// - sitemap.xml (main sitemap index)
// - sitemap-products.xml (all products)
// - sitemap-categories.xml (all categories)
// - sitemap-blog.xml (all blog posts)
// - sitemap-static.xml (static pages)