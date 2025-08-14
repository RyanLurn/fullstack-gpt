import { memo } from "react";
import type { ChatStatus } from "ai";
import { PromptInputSendButton } from "@/features/chat/components/prompt-input/send-button";
import { PromptInputTools } from "@/features/chat/components/prompt-input/tools";
import { cn } from "@/lib/utils";

const PromptInputToolbar = memo(function PromptInputToolbar({
  className,
  sendDisabled,
  status
}: {
  className?: string;
  sendDisabled: boolean;
  status: ChatStatus;
}) {
  return (
    <div className={cn("flex items-center justify-between p-1", className)}>
      <PromptInputTools />
      <PromptInputSendButton disabled={sendDisabled} status={status} />
    </div>
  );
});

export { PromptInputToolbar };
