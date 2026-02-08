/* ================= COMMON BASE ================= */

interface BaseProduct {
    id: number;
    name: string;
    price: number;
    originalPrice?: number; // For showing discount/strike-through price
    discount?: number; // Percentage discount (e.g., 20 for 20% off)

    category: string;
    subCategory?: string;

    description?: string;
    features?: string[]; // Product features/highlights

    image?: string; // Main product image
    images?: string[]; // Multiple product images

    colors?: string[]; // Available colors
    sizes?: string[]; // Available sizes

    rating?: number; // Average rating (0-5)
    reviews?: number; // Number of reviews

    inStock?: boolean; // Stock availability
    stockCount?: number; // Quantity in stock

    brand?: string; // Brand name
    sku?: string; // Stock Keeping Unit

    tags?: string[]; // Search tags
    isFeatured?: boolean; // Featured product flag
    isNew?: boolean; // New arrival flag
    isBestseller?: boolean; // Bestseller flag

    weight?: string; // Product weight (e.g., "500g")
    dimensions?: string; // Product dimensions (e.g., "30x20x10 cm")

    createdAt?: Date; // Product creation date
    updatedAt?: Date; // Last update date
}

/* ================= MEN ================= */

export interface MenProduct extends BaseProduct {
    category: "men";
    subCategory: "tshirts" | "shirts" | "jeans" | "trousers" | "jackets" | "suits" | "shorts" | "innerwear" | "activewear";

    material?: "Cotton" | "Denim" | "Linen" | "Polyester" | "Silk" | "Wool" | "Blended" | string;
    
    fit?: "Slim Fit" | "Regular Fit" | "Relaxed Fit" | "Loose Fit" | "Athletic Fit";
    neckType?: "Round Neck" | "V-Neck" | "Collar" | "Polo" | "Henley";
    sleeveLength?: "Full Sleeve" | "Half Sleeve" | "Sleeveless" | "3/4 Sleeve";
    
    pattern?: "Solid" | "Striped" | "Checked" | "Printed" | "Plain";
    occasion?: "Casual" | "Formal" | "Party" | "Sports" | "Ethnic";
    
    washCare?: string; // Washing instructions
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
        | "Dress"
        | "sarees"
        | "lehenga"
        | "salwar"
        | "western"
        | "innerwear"
        | "activewear"
        | "bags"
        | "accessories";

    // Jewellery specific
    jewelleryType?: "choker" | "necklace" | "earrings" | "bangles" | "rings" | "bracelet" | "anklet" | "maang-tikka";
    plating?: "Gold Plated" | "Silver Plated" | "Rose Gold" | "Antique" | "Oxidized";
    stones?: string[]; // e.g., ["Kundan", "Pearls", "Crystals"]

    // Clothing specific
    material?: string; // Flexible for various fabrics
    fit?: "Slim Fit" | "Regular Fit" | "A-Line" | "Bodycon" | "Flared" | "Straight";
    neckType?: "Round Neck" | "V-Neck" | "Boat Neck" | "Collar" | "Square Neck" | "Sweetheart";
    sleeveLength?: "Full Sleeve" | "Half Sleeve" | "Sleeveless" | "3/4 Sleeve" | "Bell Sleeve";
    
    pattern?: "Solid" | "Printed" | "Embroidered" | "Embellished" | "Plain" | "Floral" | "Geometric";
    occasion?: "Casual" | "Formal" | "Party" | "Wedding" | "Festive" | "Daily Wear";
    
    dressLength?: "Mini" | "Midi" | "Maxi" | "Knee Length" | "Ankle Length" | "Floor Length";
    
    washCare?: string;
}

/* ================= WATCHES ================= */

export interface WatchProduct extends BaseProduct {
    category: "watches";
    subCategory?: "men" | "women" | "kids" | "unisex";

    watchType: "luxury" | "analog" | "sports" | "smart" | "digital" | "chronograph" | "automatic";
    
    material?: "Steel" | "Leather" | "Silicone" | "Ceramic" | "Gold" | "Silver" | "Titanium" | "Rubber" | string;
    
    movement?: "Quartz" | "Automatic" | "Mechanical" | "Digital" | "Solar";
    
    displayType?: "Analog" | "Digital" | "Analog-Digital";
    
    strapMaterial?: "Leather" | "Steel" | "Silicone" | "Rubber" | "Fabric" | "Ceramic";
    strapColor?: string;
    
    dialShape?: "Round" | "Square" | "Rectangle" | "Oval";
    dialColor?: string;
    
    waterResistant?: boolean;
    waterResistanceDepth?: string; // e.g., "50m", "100m"
    
    features?: string[]; // e.g., ["Date Display", "Stopwatch", "Alarm", "LED Backlight"]
    
    warranty?: string; // e.g., "1 Year Warranty"
}

/* ================= SHOES / SANDALS ================= */

export interface ShoeProduct extends BaseProduct {
    category: "shoes" | "sandals";
    subCategory?: "casual" | "formal" | "sports" | "sneakers" | "loafers" | "boots" | "slippers" | "flip-flops";

    material?: "Leather" | "Synthetic" | "Canvas" | "Rubber" | "Mesh" | "Suede" | "Fabric" | string;
    
    soleMaterial?: "Rubber" | "EVA" | "PVC" | "Leather" | "TPR";
    
    closureType?: "Lace-Up" | "Slip-On" | "Velcro" | "Buckle" | "Zipper";
    
    occasion?: "Casual" | "Formal" | "Sports" | "Party" | "Daily Wear" | "Outdoor";
    
    gender?: "Men" | "Women" | "Unisex" | "Kids";
    
    comfort?: "Cushioned" | "Lightweight" | "Breathable" | "Arch Support";
    
    style?: "Classic" | "Modern" | "Trendy" | "Ethnic" | "Minimalist";
    
    toeShape?: "Round Toe" | "Pointed Toe" | "Square Toe" | "Open Toe";
}

/* ================= KIDS ================= */

export interface KidsProduct extends BaseProduct {
    category: "kids";
    subCategory:
        | "boys"
        | "girls"
        | "tshirts"
        | "winter"
        | "party"
        | "ethnic"
        | "casual"
        | "formal"
        | "innerwear"
        | "footwear"
        | "accessories"
        | "toys";

    ageGroup?: "0-2 years" | "2-5 years" | "5-8 years" | "8-12 years" | "12-16 years";
    
    material?: 
        | "Cotton"
        | "Wool"
        | "Polyester"
        | "Net"
        | "Net & Sequin"
        | "Georgette & Silk Blend"
        | "Silk"
        | "Blended"
        | string; // Flexible for party wear materials
    
    fit?: "Regular Fit" | "Slim Fit" | "Relaxed Fit" | "Loose Fit";
    
    pattern?: "Solid" | "Printed" | "Embroidered" | "Character Print" | "Cartoon" | "Floral";
    
    occasion?: "Casual" | "Party" | "Ethnic" | "School" | "Sports" | "Winter Wear" | "Festive";
    
    sleeveLength?: "Full Sleeve" | "Half Sleeve" | "Sleeveless";
    
    neckType?: "Round Neck" | "V-Neck" | "Collar" | "Hooded";
    
    safetyFeatures?: string[]; // e.g., ["Non-toxic", "BPA Free", "Fire Retardant"]
    
    washCare?: string;
}

/* ================= KITCHEN ================= */

export interface KitchenProduct extends BaseProduct {
    category: "kitchen";
    subCategory:
        | "cookware"
        | "dinnerware"
        | "storage"
        | "appliances"
        | "tools"
        | "cutlery"
        | "containers"
        | "utensils"
        | "bakeware";

    material?: "Steel" | "Plastic" | "Glass" | "Ceramic" | "Aluminum" | "Non-Stick" | "Cast Iron" | "Wood" | "Silicone" | string;
    
    // Cookware specific
    capacity?: string; // e.g., "2L", "500ml", "5 pieces"
    
    // Appliances specific
    power?: string; // e.g., "1000W", "220V"
    warranty?: string; // e.g., "1 Year Warranty"
    
    dishwasherSafe?: boolean;
    microwaveSafe?: boolean;
    ovenSafe?: boolean;
    freezerSafe?: boolean;
    
    // Set information
    setOf?: number; // e.g., 6 for "Set of 6 bowls"
    includes?: string[]; // Items included in set
    
    features?: string[]; // e.g., ["Non-Stick Coating", "Heat Resistant", "Easy to Clean"]
    
    color?: string; // Primary color
    finish?: "Matte" | "Glossy" | "Polished" | "Brushed";
    
    ecoFriendly?: boolean;
    
    careInstructions?: string;
}

/* ================= HOME & DECOR (NEW CATEGORY) ================= */

export interface HomeDecorProduct extends BaseProduct {
    category: "home-decor";
    subCategory:
        | "wall-art"
        | "cushions"
        | "curtains"
        | "bedsheets"
        | "towels"
        | "rugs"
        | "lamps"
        | "decorative";

    material?: string;
    
    dimensions?: string; // e.g., "90x60 inches"
    
    roomType?: "Bedroom" | "Living Room" | "Kitchen" | "Bathroom" | "Dining Room";
    
    pattern?: "Solid" | "Printed" | "Embroidered" | "Striped" | "Floral" | "Geometric";
    
    color?: string;
    
    washCare?: string;
}

/* ================= FINAL PRODUCT TYPE ================= */

export type Product =
    | MenProduct
    | WomenProduct
    | WatchProduct
    | ShoeProduct
    | KidsProduct
    | KitchenProduct
    | HomeDecorProduct;