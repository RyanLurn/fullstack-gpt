import Markdown, { type Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4
} from "@/components/typography/headings";
import { cn } from "@/lib/utils";

const markdownComponents: Options["components"] = {
  strong: ({ children, className, ...props }) => (
    <span className={cn("font-semibold", className)} {...props}>
      {children}
    </span>
  ),
  a: ({ children, className, ...props }) => (
    <a
      className={cn("font-medium text-primary underline", className)}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  ),
  h1: ({ children, className, ...props }) => (
    <TypographyH1 className={cn("", className)} {...props}>
      {children}
    </TypographyH1>
  ),
  h2: ({ children, className, ...props }) => (
    <TypographyH2 className={cn("", className)} {...props}>
      {children}
    </TypographyH2>
  ),
  h3: ({ children, className, ...props }) => (
    <TypographyH3 className={cn("", className)} {...props}>
      {children}
    </TypographyH3>
  ),
  h4: ({ children, className, ...props }) => (
    <TypographyH4 className={cn("", className)} {...props}>
      {children}
    </TypographyH4>
  )
};

function TextPart({ className, text }: { className?: string; text: string }) {
  console.log(text);
  return (
    <div
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
    >
      <Markdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
        {text}
      </Markdown>
    </div>
  );
}

export { TextPart };
