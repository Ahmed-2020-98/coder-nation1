const stack = [
  "Next.js", "React", "Laravel", "Flutter", "React Native", "TypeScript", "Tailwind CSS",
  "Node.js", "MySQL", "PostgreSQL", "Firebase", "Figma", "Swift", "Kotlin",
];

export function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line py-6" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent rtl:bg-gradient-to-r" />
      <div className="animate-marquee flex w-max gap-14" dir="ltr">
        {[...stack, ...stack].map((name, i) => (
          <span key={i} className="flex items-center gap-14 font-wordmark text-lg tracking-[0.12em] whitespace-nowrap text-muted">
            {name}
            <span className="h-4 w-px rotate-[35deg] bg-line-strong" />
          </span>
        ))}
      </div>
    </div>
  );
}
