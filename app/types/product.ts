/* ================= COMMON BASE ================= */

interface BaseProduct {
    id: number;
    name: string;
    price: number;
    originalPrice?: number; // For showing discount/strike-through price

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
    subCategory: "tshirts" | "shirts" | "jeans";

    material?: "Cotton" | "Denim" | "Linen" | "Polyester";
}

/* ================= WOMEN ================= */

export interface WomenProduct extends BaseProduct {
    category: "women";
    subCategory:
        | "jewellery"
        | "ethnic"
        | "tops"
        | "kurti"
        | "Footwear"
        | "Dress";

    jewelleryType?: "choker" | "necklace" | "earrings" | "bangles";

    material?: string;
    stones?: string[];
}

/* ================= WATCHES ================= */

export interface WatchProduct extends BaseProduct {
    category: "watches";

    watchType: "luxury" | "analog" | "sports" | "smart";

    material?: "Steel" | "Leather" | "Silicone" | "Ceramic";
}

/* ================= SHOES / SANDALS ================= */

export interface ShoeProduct extends BaseProduct {
    category: "shoes" | "sandals";

    material?: "Leather" | "Synthetic" | "Canvas" | "Rubber";
}

/* ================= KIDS ================= */

export interface KidsProduct extends BaseProduct {
    category: "kids";

    subCategory:
        | "boys"
        | "girls"
        | "tshirts"
        | "winter"
        | "party";

    material?: 
        | "Cotton"
        | "Wool"
        | "Polyester"
        | string; // ✅ allows: "Net", "Net & Sequin", "Georgette & Silk Blend"
}

/* ================= KITCHEN ================= */

export interface KitchenProduct extends BaseProduct {
    category: "kitchen";

    subCategory:
        | "cookware"
        | "dinnerware"
        | "storage"
        | "appliances"
        | "tools";

    material?: "Steel" | "Plastic" | "Glass" | "Ceramic";
}

/* ================= FINAL PRODUCT TYPE ================= */

export type Product =
    | MenProduct
    | WomenProduct
    | WatchProduct
    | ShoeProduct
    | KidsProduct
    | KitchenProduct;