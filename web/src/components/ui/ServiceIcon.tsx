import {
  Code2, Gauge, Layers, LayoutTemplate, Megaphone, Monitor, Palette, PenTool, Search,
  ShieldCheck, ShoppingBag, Smartphone, Sparkles, type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
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
  const Icon = icons[name] ?? Code2;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
