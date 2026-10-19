const PATH =
  "M938 228 L1355 828 L1355 460 L1507 676 L1503 1306 L1085 715 L1084 1146 L703 1146 C520 1112 383 985 381 770 C380 545 560 383 817 390 L816 537 L711 540 C600 572 531 660 531 760 C532 900 600 970 711 994 L934 995 Z";

export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="370 218 1150 1100" className={className} fill="currentColor" aria-hidden>
      <path d={PATH} />
    </svg>
  );
}
