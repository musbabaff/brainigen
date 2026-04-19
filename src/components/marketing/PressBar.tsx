"use client";

export function PressBar() {
  const publications = [
    "TechCrunch", "Forbes", "The Verge", "Hacker News", "Product Hunt", "Wired",
  ];

  return (
    <section className="py-10 border-t border-border/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span className="text-xs text-muted-foreground/50 uppercase tracking-[0.15em] font-medium shrink-0">
            As featured in
          </span>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
            {publications.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-muted-foreground/30 select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
