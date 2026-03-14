export const NICHE_SLUGS = [
  "beauty-skincare",
  "fashion",
  "fitness-wellness",
  "tech-gadgets",
  "home-decor",
  "pet-products",
  "food-supplements",
  "baby-kids",
  "jewelry",
  "gaming",
  "travel",
  "automotive",
] as const;

export const NICHE_LABELS: Record<string, string> = {
  "beauty-skincare": "Beauty & Skincare",
  fashion: "Fashion",
  "fitness-wellness": "Fitness & Wellness",
  "tech-gadgets": "Tech Gadgets",
  "home-decor": "Home Decor",
  "pet-products": "Pet Products",
  "food-supplements": "Food & Supplements",
  "baby-kids": "Baby & Kids",
  jewelry: "Jewelry",
  gaming: "Gaming",
  travel: "Travel",
  automotive: "Automotive",
};

export const NICHE_EMOJI: Record<string, string> = {
  "beauty-skincare": "✨",
  fashion: "👗",
  "fitness-wellness": "💪",
  "tech-gadgets": "📱",
  "home-decor": "🏠",
  "pet-products": "🐾",
  "food-supplements": "🥗",
  "baby-kids": "👶",
  jewelry: "💎",
  gaming: "🎮",
  travel: "✈️",
  automotive: "🚗",
};

export const NICHE_COLORS: Record<string, string> = {
  "beauty-skincare": "#FF2D78",
  fashion: "#F59E0B",
  "fitness-wellness": "#10B981",
  "tech-gadgets": "#8B5CF6",
  "home-decor": "#06B6D4",
  "pet-products": "#EC4899",
  "food-supplements": "#84CC16",
  "baby-kids": "#F97316",
  jewelry: "#A855F7",
  gaming: "#00D4FF",
  travel: "#14B8A6",
  automotive: "#EF4444",
};

export const TOP_NICHES = ["beauty-skincare", "fashion", "fitness-wellness", "tech-gadgets"] as const;

export const SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "commission", label: "Highest Commission" },
  { value: "price-asc", label: "Price Low → High" },
  { value: "price-desc", label: "Price High → Low" },
] as const;

export const OFFER_TYPES = [
  { value: "PRODUCT", label: "Products" },
  { value: "WEBSITE", label: "Websites" },
  { value: "APP", label: "Apps" },
  { value: "SAAS", label: "SaaS" },
  { value: "COURSE", label: "Courses" },
  { value: "SERVICE", label: "Services" },
  { value: "DIGITAL", label: "Digital" },
] as const;
