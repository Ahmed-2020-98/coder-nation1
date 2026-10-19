import {
  Code2, Gauge, Layers, LayoutTemplate, Megaphone, Monitor, Palette, PenTool, Search,
  ShieldCheck, ShoppingBag, Smartphone, Sparkles, type LucideIcon,
} from "lucide-react";

// Keep in sync with web/src/components/ui/ServiceIcon.tsx
export const serviceIcons: Record<string, LucideIcon> = {
  monitor: Monitor,
  smartphone: Smartphone,
  search: Search,
  palette: Palette,
  "pen-tool": PenTool,
  layers: Layers,
  code: Code2,
  layout: LayoutTemplate,
  megaphone: Megaphone,
  "shopping-bag": ShoppingBag,
  gauge: Gauge,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = serviceIcons[name] ?? Code2;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
