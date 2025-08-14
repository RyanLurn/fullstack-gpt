import { memo } from "react";
import type { UIMessage } from "ai";
import { StickToBottom } from "use-stick-to-bottom";
import { Message } from "@/features/chat/components/message";
import { ScrollButton } from "@/features/chat/components/scroll-button";
import { CHAT_CONTAINER_WIDTH } from "@/features/chat/utils/constants";
import { cn } from "@/lib/utils";

const Conversation = memo(function Conversation({
  className,
  messages
}: {
  className?: string;
  messages: UIMessage[];
}) {
  return (
    <StickToBottom
      initial="smooth"
      resize="smooth"
      role="log"
      className={cn(
        "relative flex w-full flex-col gap-y-3 overflow-y-auto",
        className
      )}
    >
      <StickToBottom.Content
        className={cn("flex flex-col gap-4 p-4", CHAT_CONTAINER_WIDTH)}
      >
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </StickToBottom.Content>
      <ScrollButton />
    </StickToBottom>
  );
});

export { Conversation };
