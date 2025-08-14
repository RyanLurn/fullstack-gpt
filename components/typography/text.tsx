import { type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

const TypographyP = memo(function TypographyP({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
});

const TypographyBlockquote = memo(function TypographyBlockquote({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
});

const TypographyLink = memo(function TypographyLink({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn("font-medium text-primary underline", className)}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
});

export { TypographyP, TypographyBlockquote, TypographyLink };
