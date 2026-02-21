import React from "react";

interface LogoItem {
  name: string;
  href?: string;
  /** Simple Icons slug (e.g. "openai") or full image URL. Falls back to text. */
  logo?: string;
}

interface LogoCloudProps {
  headline?: string;
  logos: Array<LogoItem>;
  animate?: boolean;
}

function LogoCell({ item }: { item: LogoItem }) {
  const [failed, setFailed] = React.useState(false);

  const src = item.logo
    ? item.logo.startsWith("http")
      ? item.logo
      : `https://cdn.simpleicons.org/${item.logo}/717171`
    : null;

  const visual =
    src && !failed ? (
      <img
        src={src}
        alt={item.name}
        className="h-5 w-auto"
        onError={() => setFailed(true)}
      />
    ) : (
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
        {item.name}
      </span>
    );

  return (
    <div className="flex-shrink-0 flex items-center justify-center border-r border-border px-8 py-5">
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          {visual}
        </a>
      ) : (
        visual
      )}
    </div>
  );
}

export function LogoCloud({ headline, logos, animate = true }: LogoCloudProps) {
  // Duplicate logos only (not the headline) for a seamless loop
  const items = [...logos, ...logos];

  return (
    <div className="border-y border-border flex">
      {/* Static headline cell — sits outside the animation */}
      {headline && (
        <div className="flex-shrink-0 flex items-center border-r border-border px-[5vw] py-5 min-w-[160px] bg-background z-10">
          <p className="text-xs text-muted-foreground leading-snug max-w-[130px]">
            {headline}
          </p>
        </div>
      )}

      {/* Animated logo track — overflow clips the scrolling content */}
      <div
        className="overflow-hidden flex-1 group"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <div
          className="flex w-max group-hover:[animation-play-state:paused]"
          style={
            animate ? { animation: "marquee 32s linear infinite" } : undefined
          }
        >
          {items.map((logo, i) => (
            <LogoCell key={i} item={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
