import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { SERVICES as SERVICES_FALLBACK, GALLERY as GALLERY_FALLBACK } from "../data";

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  created_at?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  stock: number;
  status: string;
  created_at?: string;
  categories?: Category | null;
  amenities?: string[] | null;
  max_guests?: number | null;
  bed_type?: string | null;
  size_m2?: number | null;
  images?: string[] | null;
}

export interface Settings {
  id: string;
  site_name: string;
  support_email: string;
  banner_text: string;
  maintenance_mode: boolean;
  updated_at?: string;
  hero_image_url?: string | null;
  hero_mobile_image_url?: string | null;
}

export interface ContentBlock {
  id: string;
  key: string;
  value: string;
  title: string | null;
  content: string | null;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount_percent: number;
  code: string;
  banner_image_url?: string | null;
  is_active: boolean;
  valid_from?: string | null;
  valid_until?: string | null;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: "rooms" | "dining" | "exterior" | "lounge";
}

const FALLBACK_CATEGORIES: Category[] = [
  {
    id: "cat_1",
    name: "Room Bookings",
    description: "Coordinated suites and standard rooms optimized for business and leisure travelers alike.",
    slug: "room-bookings"
  },
  {
    id: "cat_2",
    name: "Food & Beverage",
    description: "Historic Ras Restaurant traditional dining, banqueting plans, and authentic hospitality.",
    slug: "food-beverage"
  },
  {
    id: "cat_3",
    name: "Event Venues",
    description: "Spacious corporate meeting chambers and reception halls with convenient city access.",
    slug: "event-venues"
  },
  {
    id: "cat_4",
    name: "Wellness & Leisure",
    description: "Restorative therapeutic steam baths, standard massage services, and local tours.",
    slug: "wellness-leisure"
  }
];

// Seed fallback products that match the Supabase table items exactly
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    title: "Executive Suite Booking",
    description: "Generous executive suite in Kezira with king bed, luxury bath, writing desk, high-speed internet, and elegant city-center views.",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=60",
    category_id: "cat_1",
    stock: 6,
    status: "In Stock",
    categories: {
      id: "cat_1",
      name: "Room Bookings",
      description: "Coordinated suites and standard rooms optimized for business and leisure travelers alike.",
      slug: "room-bookings"
    }
  },
  {
    id: "prod_2",
    title: "Standard Double Room",
    description: "Comfortable twin beds room combining convenient access to Kezira city center with traditional Ethiopian hospitality and modern amenities.",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&auto=format&fit=crop&q=60",
    category_id: "cat_1",
    stock: 14,
    status: "In Stock",
    categories: {
      id: "cat_1",
      name: "Room Bookings",
      description: "Coordinated suites and standard rooms optimized for business and leisure travelers alike.",
      slug: "room-bookings"
    }
  },
  {
    id: "prod_3",
    title: "Main Conference Ballroom",
    description: "High-tech corporate meeting and events venue in Kezira District. Fully equipped with smart projectors, high-density audio, and banquet logistics.",
    price: 380.00,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4-90182c33d57733427?w=600&auto=format&fit=crop&q=60", // Unsplash fallback configuration
    category_id: "cat_3",
    stock: 2,
    status: "In Stock",
    categories: {
      id: "cat_3",
      name: "Event Venues",
      description: "Spacious corporate meeting chambers and reception halls with convenient city access.",
      slug: "event-venues"
    }
  },
  {
    id: "prod_4",
    title: "Grand Ethiopian Dinner Buffet",
    description: "Traditional daytime and dinner buffet service for resident guests and visitors at Ras Restaurant. Curated local organic recipes.",
    price: 30.00,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=60",
    category_id: "cat_2",
    stock: 75,
    status: "In Stock",
    categories: {
      id: "cat_2",
      name: "Food & Beverage",
      description: "Historic Ras Restaurant traditional dining, banqueting plans, and authentic hospitality.",
      slug: "food-beverage"
    }
  },
  {
    id: "prod_5",
    title: "Kezira Steam & Wellness Package",
    description: "Restorative session at the spa including traditional steam bath, professional massage therapy, and natural oils.",
    price: 50.00,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=60",
    category_id: "cat_4",
    stock: 12,
    status: "In Stock",
    categories: {
      id: "cat_4",
      name: "Wellness & Leisure",
      description: "Restorative therapeutic steam baths, standard massage services, and local tours.",
      slug: "wellness-leisure"
    }
  }
];

const FALLBACK_SETTINGS: Settings = {
  id: "site_config",
  site_name: "Dire Dawa Ras Hotel",
  support_email: "ddrashotel1@gmail.com",
  banner_text: "Welcome to Dire Dawa Ras Hotel! Enjoy coordinate suites & traditional hospitality since 1964 EC in Kezira, Ethiopia. \"Stay a cool place in warmer city\".",
  maintenance_mode: false,
  hero_image_url: null,
  hero_mobile_image_url: null
};

const FALLBACK_PROMOTIONS: Promotion[] = [
  {
    id: "p1",
    title: "Early Bird Discount",
    description: "Plan ahead to guarantee your reservation. Book your accommodations directly with us and enjoy an instant 15% off room rates.",
    discount_percent: 15,
    code: "EARLYBIRD15",
    is_active: true
  }
];

let connectionFailed = false;

export const apiService = {
  // Fetch all products with join to category info
  async getProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured || connectionFailed) {
      return FALLBACK_PRODUCTS;
    }
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories:category_id(*)")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      return data && data.length > 0 ? data : FALLBACK_PRODUCTS;
    } catch (err: any) {
      if (err instanceof TypeError || String(err).includes("Failed to fetch") || String(err).includes("NetworkError")) {
        connectionFailed = true;
        console.warn("Supabase network offline or database paused. Switching to local directory fallback.");
      } else {
        console.error("Error in getProducts, using fallback:", err);
      }
      return FALLBACK_PRODUCTS;
    }
  },

  // Fetch simple detail of a single product by Its ID
  async getProductById(id: string): Promise<Product | null> {
    if (!isSupabaseConfigured || connectionFailed) {
      return FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
    }
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories:category_id(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data || FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
    } catch (err: any) {
      if (err instanceof TypeError || String(err).includes("Failed to fetch") || String(err).includes("NetworkError")) {
        connectionFailed = true;
        console.warn("Supabase network offline or database paused. Switching to local directory fallback.");
      } else {
        console.error(`Error in getProductById for ID ${id}, using fallback:`, err);
      }
      return FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
    }
  },

  // Fetch products filtered by category ID
  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    if (!isSupabaseConfigured || connectionFailed) {
      return FALLBACK_PRODUCTS.filter((p) => p.category_id === categoryId);
    }
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories:category_id(*)")
        .eq("category_id", categoryId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      return data && data.length > 0 ? data : FALLBACK_PRODUCTS.filter((p) => p.category_id === categoryId);
    } catch (err: any) {
      if (err instanceof TypeError || String(err).includes("Failed to fetch") || String(err).includes("NetworkError")) {
        connectionFailed = true;
        console.warn("Supabase network offline or database paused. Switching to local directory fallback.");
      } else {
        console.error(`Error in getProductsByCategory for categoryId ${categoryId}, using fallback:`, err);
      }
      return FALLBACK_PRODUCTS.filter((p) => p.category_id === categoryId);
    }
  },

  // Fetch all categories
  async getCategories(): Promise<Category[]> {
    if (!isSupabaseConfigured || connectionFailed) {
      return FALLBACK_CATEGORIES;
    }
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }
      return data && data.length > 0 ? data : FALLBACK_CATEGORIES;
    } catch (err: any) {
      if (err instanceof TypeError || String(err).includes("Failed to fetch") || String(err).includes("NetworkError")) {
        connectionFailed = true;
        console.warn("Supabase network offline or database paused. Switching to local directory fallback.");
      } else {
        console.error("Error in getCategories, using fallback:", err);
      }
      return FALLBACK_CATEGORIES;
    }
  },

  // Fetch category by its unique URL slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (!isSupabaseConfigured || connectionFailed) {
      return FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
    }
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data || FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
    } catch (err: any) {
      if (err instanceof TypeError || String(err).includes("Failed to fetch") || String(err).includes("NetworkError")) {
        connectionFailed = true;
        console.warn("Supabase network offline or database paused. Switching to local directory fallback.");
      } else {
        console.error(`Error in getCategoryBySlug for slug ${slug}, using fallback:`, err);
      }
      return FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
    }
  },

  // Fetch a single row of application level settings
  async getSettings(): Promise<Settings | null> {
    if (!isSupabaseConfigured || connectionFailed) {
      return FALLBACK_SETTINGS;
    }
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("id", "site_config")
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data || FALLBACK_SETTINGS;
    } catch (err: any) {
      if (err instanceof TypeError || String(err).includes("Failed to fetch") || String(err).includes("NetworkError")) {
        connectionFailed = true;
        console.warn("Supabase network offline or database paused. Switching to local settings fallback.");
      } else {
        console.error("Error in getSettings, using fallback:", err);
      }
      return FALLBACK_SETTINGS;
    }
  },

  // Fetch signature available hospitality services from DB
  async getServices(): Promise<Service[]> {
    if (!isSupabaseConfigured || connectionFailed) {
      return SERVICES_FALLBACK;
    }
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      const filtered = data ? data.filter((s: any) => s.is_available !== false) : [];
      return filtered.length > 0 ? filtered.map((s: any) => ({
        id: s.id,
        title: s.title || s.name || "",
        description: s.description || "",
        iconName: s.icon_name || "ConciergeBell"
      })) : SERVICES_FALLBACK;
    } catch (err: any) {
      console.warn("Error in getServices, using fallback:", err);
      return SERVICES_FALLBACK;
    }
  },

  // Fetch dynamic visual tours from the gallery DB table
  async getGallery(): Promise<GalleryImage[]> {
    if (!isSupabaseConfigured || connectionFailed) {
      return GALLERY_FALLBACK;
    }
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data && data.length > 0 ? data.map((d: any) => ({
        id: String(d.id),
        url: d.image_url || d.url || "",
        caption: d.caption || d.title || "",
        category: (d.category || d.category_tag || "exterior").toLowerCase() as any
      })) : GALLERY_FALLBACK;
    } catch (err: any) {
      console.warn("Error in getGallery, using fallback:", err);
      return GALLERY_FALLBACK;
    }
  },

  // Fetch active promotions
  async getPromotions(): Promise<Promotion[]> {
    if (!isSupabaseConfigured || connectionFailed) {
      return FALLBACK_PROMOTIONS;
    }
    try {
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .eq("is_active", true);

      if (error) throw error;

      const nowStr = new Date().toISOString();
      let parsed = data || [];
      
      parsed = parsed.filter((p: any) => {
        if (p.valid_from && nowStr < p.valid_from) return false;
        if (p.valid_until && nowStr > p.valid_until) return false;
        return true;
      });

      return parsed.length > 0 ? parsed.map((p: any) => ({
        id: String(p.id),
        title: p.title,
        description: p.description || "",
        discount_percent: Number(p.discount_percent || p.discount_percentage || 0),
        code: p.code || p.promo_code || "",
        banner_image_url: p.banner_image_url || null,
        is_active: p.is_active !== false,
        valid_from: p.valid_from || null,
        valid_until: p.valid_until || null
      })) : FALLBACK_PROMOTIONS;
    } catch (err: any) {
      console.warn("Error in getPromotions, using fallback:", err);
      return FALLBACK_PROMOTIONS;
    }
  },

  // Fetch dynamic content blocks for site personalization
  async getContentBlocks(): Promise<ContentBlock[]> {
    if (!isSupabaseConfigured || connectionFailed) {
      return [];
    }
    try {
      const { data, error } = await supabase
        .from("content_blocks")
        .select("*");

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      console.warn("Error querying content_blocks, returning empty:", err);
      return [];
    }
  },

  // Create booking in database backend
  async createBooking(booking: any): Promise<any> {
    if (!isSupabaseConfigured || connectionFailed) {
      return { success: true, localOnly: true };
    }
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            id: booking.id,
            room_id: booking.roomId || null,
            guest_name: booking.guestName,
            guest_email: booking.guestEmail,
            guest_phone: booking.guestPhone,
            check_in: booking.checkIn,
            check_out: booking.checkOut,
            guests_count: booking.adults || 2,
            children_count: booking.children || 0,
            total_price: booking.totalPrice,
            status: "pending",
            special_requests: booking.specialRequests || null,
            confirmation_code: booking.confirmationCode
          }
        ])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      console.error("Database table write warning for bookings:", err);
      return { success: false, error: err.message };
    }
  }
};
