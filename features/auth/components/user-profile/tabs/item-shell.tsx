import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function TabItemShell({
  itemName,
  isReverse = false,
  children
}: {
  itemName: string;
  isReverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Separator className="my-4" />
      <div className="flex min-h-12 w-full items-center gap-x-4">
        <h2 className="w-1/3 font-semibold">{itemName}</h2>
        <div
          className={cn(
            "flex w-2/3 items-center justify-between",
            isReverse && "flex-row-reverse"
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export { TabItemShell };
