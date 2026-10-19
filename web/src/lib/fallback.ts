import type { Locale } from "@/i18n/routing";
import type { Service, Settings } from "./types";

// Minimal content used only when the API is unreachable, so the site never renders empty.
export const fallbackServices: Record<Locale, Service[]> = {
  ar: [
    {
      id: 1, slug: "web-development", icon: "monitor", category: "web",
      title: "تصميم وتطوير المواقع",
      excerpt: "مواقع سريعة وأنيقة ومتجاوبة، مبنية لتحويل الزوار إلى عملاء.",
      description: "من الموقع التعريفي إلى المتجر الإلكتروني ومنصات الأعمال، نبني مواقع بأحدث التقنيات وأداء عالٍ.",
      features: ["تصميم UI/UX مخصص لهويتك", "تطوير بـ Next.js و Laravel", "متجاوب مع كل الشاشات", "تهيئة كاملة لمحركات البحث"],
    },
    {
      id: 2, slug: "mobile-apps", icon: "smartphone", category: "mobile",
      title: "تطوير تطبيقات الموبايل",
      excerpt: "تطبيقات iOS و Android بتجربة سلسة وأداء أصلي تحبها جماهيرك.",
      description: "نحوّل فكرتك إلى تطبيق حقيقي على App Store و Google Play بتجربة استخدام سلسة.",
      features: ["تطبيقات iOS و Android", "Flutter و React Native", "ربط بالـ API والدفع الإلكتروني", "نشر على المتاجر ودعم مستمر"],
    },
  ],
  en: [
    {
      id: 1, slug: "web-development", icon: "monitor", category: "web",
      title: "Web Design & Development",
      excerpt: "Fast, elegant, responsive websites engineered to turn visitors into customers.",
      description: "From corporate websites to e-commerce and business platforms, we build with modern technology and high performance.",
      features: ["Custom UI/UX tailored to your brand", "Built with Next.js & Laravel", "Responsive on every screen", "SEO-ready from day one"],
    },
    {
      id: 2, slug: "mobile-apps", icon: "smartphone", category: "mobile",
      title: "Mobile App Development",
      excerpt: "iOS and Android apps with seamless UX and native-grade performance your users love.",
      description: "We turn your idea into a real app on the App Store and Google Play with a seamless experience.",
      features: ["iOS & Android apps", "Flutter & React Native", "API & payment integrations", "Store publishing & ongoing support"],
    },
  ],
};

export const fallbackSettings: Settings = {
  email: "hello@codernation.com",
  phone: "+20 100 000 0000",
  whatsapp: "+201000000000",
  stats: { projects: 120, clients: 85, years: 6, satisfaction: 98 },
  socials: {},
};
