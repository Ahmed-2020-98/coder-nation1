export type Service = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  features: string[];
  icon: string;
  category: string | null;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: "web" | "mobile" | string;
  cover: string | null;
  color: string;
  gallery: string[];
  client: string | null;
  tech_stack: string[];
  live_url: string | null;
  year: number | null;
  is_featured: boolean;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string | null;
  content: string;
  rating: number;
  avatar: string | null;
};

export type Settings = {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  tagline?: string;
  socials?: Partial<Record<"facebook" | "instagram" | "linkedin" | "behance" | "x" | "tiktok", string>>;
  stats?: Partial<Record<"projects" | "clients" | "years" | "satisfaction", number>>;
};
