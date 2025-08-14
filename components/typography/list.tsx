import { cn } from "@/lib/utils";

function TypographyOrderedList({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ol
      className={cn(
        "my-2 ml-2 list-inside list-decimal [&>li]:mt-2",
        className
      )}
    >
      {children}
    </ol>
  );
}

function TypographyUnorderedList({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ul
      className={cn("my-2 ml-2 list-inside list-disc [&>li]:mt-2", className)}
    >
      {children}
    </ul>
  );
}

export { TypographyOrderedList, TypographyUnorderedList };
