import { memo } from "react";
import type { UIMessage } from "ai";
import { MessageAvatar } from "@/features/chat/components/message/avatar";
import { MessageContent } from "@/features/chat/components/message/content";
import { cn } from "@/lib/utils";

const Message = memo(function Message({
  className,
  message
}: {
  className?: string;
  message: UIMessage;
}) {
  return (
    <div
      className={cn(
        "group flex w-full items-end justify-end gap-2 py-4",
        message.role === "user"
          ? "is-user"
          : "is-assistant flex-row-reverse justify-end",
        "[&>div]:max-w-[80%]",
        className
      )}
    >
      <MessageContent id={message.id} parts={message.parts} />
      <MessageAvatar role={message.role} />
    </div>
  );
});

export { Message };
