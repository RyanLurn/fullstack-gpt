import { Separator } from "@/components/ui/separator";

function TabItemShell({
  itemName,
  children
}: {
  itemName: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Separator className="my-4" />
      <div className="flex min-h-12 w-full items-center gap-x-4">
        <h2 className="w-1/3 font-semibold">{itemName}</h2>
        <div className="flex w-2/3 items-center justify-between">
          {children}
        </div>
      </div>
    </>
  );
}

export { TabItemShell };
