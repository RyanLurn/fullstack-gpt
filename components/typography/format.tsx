import { type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

const TypographyStrong = memo(function TypographyStrong({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <strong className={cn("font-semibold", className)} {...props}>
      {children}
    </strong>
  );
});

const TypographyEmphasis = memo(function TypographyEmphasis({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <em className={cn("italic", className)} {...props}>
      {children}
    </em>
  );
});

export { TypographyStrong, TypographyEmphasis };
