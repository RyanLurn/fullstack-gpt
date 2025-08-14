/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo } from "react";
import Markdown, { type Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  TypographyEmphasis,
  TypographyStrong
} from "@/components/typography/format";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4
} from "@/components/typography/headings";
import {
  TypographyOrderedList,
  TypographyUnorderedList
} from "@/components/typography/list";
import {
  TypographyBlockquote,
  TypographyLink,
  TypographyP
} from "@/components/typography/text";
import { cn } from "@/lib/utils";

const markdownComponents: Options["components"] = {
  strong: ({ node, children, className, ...props }) => (
    // Ignore ^ intentionally for optimizing rerenders during streaming
    <TypographyStrong className={cn("", className)} {...props}>
      {children}
    </TypographyStrong>
  ),
  em: ({ node, children, className, ...props }) => (
    <TypographyEmphasis className={cn("", className)} {...props}>
      {children}
    </TypographyEmphasis>
  ),
  a: ({ node, children, className, ...props }) => (
    <TypographyLink className={cn("", className)} {...props}>
      {children}
    </TypographyLink>
  ),
  h1: ({ node, children, className, ...props }) => (
    <TypographyH1 className={cn("mb-8", className)} {...props}>
      {children}
    </TypographyH1>
  ),
  h2: ({ node, children, className, ...props }) => (
    <TypographyH2 className={cn("mb-6", className)} {...props}>
      {children}
    </TypographyH2>
  ),
  h3: ({ node, children, className, ...props }) => (
    <TypographyH3 className={cn("mb-4", className)} {...props}>
      {children}
    </TypographyH3>
  ),
  h4: ({ node, children, className, ...props }) => (
    <TypographyH4 className={cn("mb-2", className)} {...props}>
      {children}
    </TypographyH4>
  ),
  p: ({ node, children, className, ...props }) => (
    <TypographyP className={cn("", className)} {...props}>
      {children}
    </TypographyP>
  ),
  blockquote: ({ node, children, className, ...props }) => (
    <TypographyBlockquote className={cn("", className)} {...props}>
      {children}
    </TypographyBlockquote>
  ),
  ol: ({ node, children, className, ...props }) => (
    <TypographyOrderedList className={cn("", className)} {...props}>
      {children}
    </TypographyOrderedList>
  ),
  ul: ({ node, children, className, ...props }) => (
    <TypographyUnorderedList className={cn("", className)} {...props}>
      {children}
    </TypographyUnorderedList>
  )
};

const TextPart = memo(function TextPart({
  className,
  text
}: {
  className?: string;
  text: string;
}) {
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
});

export { TextPart };
