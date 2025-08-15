import { memo, startTransition } from "react";
import { Loader2Icon, MessageCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NewChatButton = memo(
  ({
    className,
    createChatAction,
    isPending
  }: {
    className?: string;
    createChatAction: () => void;
    isPending: boolean;
  }) => {
    return (
      <Button
        disabled={isPending}
        onClick={() => startTransition(createChatAction)}
        size="icon"
        className={cn(className)}
      >
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <MessageCirclePlus />
        )}
      </Button>
    );
  }
);

export { NewChatButton };
