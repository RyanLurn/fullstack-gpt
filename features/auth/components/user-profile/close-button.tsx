import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { XIcon } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";

function UserProfileCloseButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClose() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("userProfile");
    params.delete("tab");
    router.replace(pathname + "?" + params.toString());
  }

  return (
    <DialogClose
      onClick={handleClose}
      className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
    >
      <XIcon />
      <span className="sr-only">Close</span>
    </DialogClose>
  );
}

export { UserProfileCloseButton };
