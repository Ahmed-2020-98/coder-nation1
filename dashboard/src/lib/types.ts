export type Translatable = { ar: string; en: string };
export type TranslatableList = { ar: string[]; en: string[] };

export type Service = {
  id: number;
  slug: string;
  title: Translatable;
  excerpt: Translatable;
  description: Translatable;
  features: Partial<TranslatableList>;
  icon: string;
  category: string | null;
  order: number;
  is_active: boolean;
  messages_count?: number;
  updated_at: string;
};

export type Project = {
  id: number;
  slug: string;
  title: Translatable;
  summary: Translatable;
  description: Translatable;
  category: string;
  cover: string | null;
  cover_url: string | null;
  color: string;
  gallery: string[];
  gallery_urls: string[];
  client: string | null;
  tech_stack: string[];
  live_url: string | null;
  year: number | null;
  is_featured: boolean;
  order: number;
  is_active: boolean;
  updated_at: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: Translatable;
  company: string | null;
  content: Translatable;
  rating: number;
  avatar: string | null;
  avatar_url: string | null;
  order: number;
  is_active: boolean;
  updated_at: string;
};

export type MessageStatus = "new" | "read" | "replied" | "archived";

export type Message = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  budget: string | null;
  message: string;
  status: MessageStatus;
  locale: string;
  service: { id: number; title: Translatable } | null;
  created_at: string;
};

export type Paginated<T> = {
  data: T[];
  meta: { current_page: number; last_page: number; total: number; per_page: number };
};

export type Stats = {
  services: number;
  projects: number;
  testimonials: number;
  messages: number;
  new_messages: number;
  latest_messages: Message[];
};

export type Settings = {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: Partial<Translatable>;
  tagline?: Partial<Translatable>;
  socials?: Record<string, string | null>;
  stats?: Record<string, number | null>;
};
