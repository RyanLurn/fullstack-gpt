import { cn } from "@/lib/utils";

function TypographyP({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

function TypographyBlockquote({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

export { TypographyP, TypographyBlockquote };
