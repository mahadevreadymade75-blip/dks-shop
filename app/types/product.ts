/* ================= COMMON BASE ================= */

export interface BaseProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;

  category: string;
  subCategory?: string;

  description?: string;

  image?: string;
  images?: string[];

  colors?: string[];
  sizes?: string[];

  rating?: number;
  reviews?: number;
}

/* ================= MEN ================= */

export interface MenProduct extends BaseProduct {
  category: "men";
  subCategory:
    | "Tshirts"
    | "Shirts"
    | "Jeans"
    | "Trousers"
    | "Jackets"
    | "Suits"
    | "Shorts"
    | "Casual"
    | "Formal"
    | "Ethnic"
    | "Activewear";

  material?: "Cotton" | "Denim" | "Linen" | "Polyester" | "Silk" | "Wool" | string;
}

/* ================= WOMEN ================= */

export interface WomenProduct extends BaseProduct {
  category: "women";
  subCategory:
    | "Jewellery"
    | "Ethnic"
    | "Tops"
    | "Kurti"
    | "Footwear"
    | "Dress"
    | "Sarees"
    | "Lehenga"
    | "Salwar"
    | "Western"
    | "Casual"
    | "Formal"
    | "Party"
    | "Bags"
    | "Accessories";

  jewelleryType?: "Choker" | "Necklace" | "Earrings" | "Bangles" | "Rings" | "Bracelet";

  material?: string;
  stones?: string[];
}

/* ================= WATCHES ================= */

export interface WatchProduct extends BaseProduct {
  category: "watches";
  subCategory?: "Men" | "Women" | "Kids" | "Unisex";

  watchType: "Luxury" | "Analog" | "Sports" | "Smart" | "Digital" | "Chronograph";

  material?: "Steel" | "Leather" | "Silicone" | "Ceramic" | "Gold" | "Silver" | string;
}

/* ================= SHOES / SANDALS ================= */

export interface ShoeProduct extends BaseProduct {
  category: "shoes" | "sandals";
  subCategory?:
    | "Casual"
    | "Formal"
    | "Sports"
    | "Running"
    | "Sneakers"
    | "Loafers"
    | "Boots"
    | "Sandals"
    | "Slippers"
    | "Flip-flops";

  material?: "Leather" | "Synthetic" | "Canvas" | "Rubber" | "Mesh" | string;
}

/* ================= KIDS ================= */

export interface KidsProduct extends BaseProduct {
  category: "kids";

  subCategory:
    | "Boys"
    | "Girls"
    | "Tshirts"
    | "Winter"
    | "Party"
    | "Ethnic"
    | "Casual"
    | "Formal"
    | "Footwear"
    | "Accessories"
    | "Toys";

  material?: "Cotton" | "Wool" | "Polyester" | string;
}

/* ================= KITCHEN ================= */

export interface KitchenProduct extends BaseProduct {
  category: "kitchen";

  subCategory:
    | "Cookware"
    | "Dinnerware"
    | "Storage"
    | "Appliances"
    | "Tools"
    | "Cutlery"
    | "Containers"
    | "Utensils"
    | "Bakeware"
    | "Glassware";

  material?: "Steel" | "Plastic" | "Glass" | "Ceramic" | "Aluminum" | "Wood" | string;
}

/* ================= FINAL PRODUCT TYPE ================= */

export type Product =
  | MenProduct
  | WomenProduct
  | WatchProduct
  | ShoeProduct
  | KidsProduct
  | KitchenProduct;
