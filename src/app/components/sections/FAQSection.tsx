import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/components/ui/utils";
import type { LucideIcon } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: Array<FAQItem>;
}

interface FAQSectionProps {
  sectionTagIcon?: LucideIcon;
  sectionTag?: string;
  heading?: string;
  /** Word inside heading to render in primary color */
  accentWord?: string;
  subtitle?: string;
  categories: Array<FAQCategory>;
}

function AccordionItem({ question, answer }: FAQItem) {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-medium text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            "size-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <p
        id={panelId}
        hidden={!open}
        className="pb-4 text-sm text-muted-foreground leading-relaxed"
      >
        {answer}
      </p>
    </div>
  );
}

export function FAQSection({
  sectionTagIcon: TagIcon,
  sectionTag,
  heading = "Frequently asked questions",
  accentWord,
  subtitle,
  categories,
}: FAQSectionProps) {
  const renderHeading = () => {
    if (!accentWord || !heading.includes(accentWord)) {
      return (
        <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>
      );
    }
    const [before, after] = heading.split(accentWord);
    return (
      <h2 className="text-3xl font-semibold tracking-tight">
        {before}
        <span className="text-primary">{accentWord}</span>
        {after}
      </h2>
    );
  };

  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        {/* Section header */}
        <div className="border-b border-border py-14">
          {sectionTag && (
            <div className="mb-4 inline-flex items-center gap-1.5 text-muted-foreground/60">
              <span className="font-mono text-xs">//</span>
              {TagIcon && <TagIcon className="size-3.5 text-primary" />}
              <span className="text-xs font-medium text-muted-foreground">
                {sectionTag}
              </span>
              <span className="font-mono text-xs">\\</span>
            </div>
          )}
          {renderHeading()}
          {subtitle && (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Category rows: category label left, accordions right */}
        <div className="divide-y divide-border">
          {categories.map((cat) => (
            <div key={cat.category} className="grid grid-cols-3 items-start">
              {/* Left col — category name */}
              <div className="border-r border-border px-8 py-8">
                <span className="text-sm font-semibold text-foreground">
                  {cat.category}
                </span>
              </div>
              {/* Right col — accordion items */}
              <div className="col-span-2 px-8 py-2">
                {cat.items.map((item) => (
                  <AccordionItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
