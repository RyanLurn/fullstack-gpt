import type { ChatStatus } from "ai";
import { Loader2Icon, SendIcon, SquareIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function PromptInputSendButton({
  className,
  status,
  disabled
}: {
  className?: string;
  status: ChatStatus;
  disabled: boolean;
}) {
  let Icon = <SendIcon className="size-4" />;

  if (status === "submitted") {
    Icon = <Loader2Icon className="size-4 animate-spin" />;
  } else if (status === "streaming") {
    Icon = <SquareIcon className="size-4" />;
  } else if (status === "error") {
    Icon = <XIcon className="size-4" />;
  }

  return (
    <Button
      className={cn("gap-1.5 rounded-lg", className)}
      size="icon"
      type="submit"
      disabled={disabled}
    >
      {Icon}
    </Button>
  );
}

export { PromptInputSendButton };
