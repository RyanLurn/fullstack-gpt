import type { ChangeEvent, FormEvent } from "react";
import { memo } from "react";
import type { ChatStatus } from "ai";
import { PromptInputEditor } from "@/features/chat/components/prompt-input/editor";
import { PromptInputToolbar } from "@/features/chat/components/prompt-input/toolbar";
import { CHAT_CONTAINER_WIDTH } from "@/features/chat/utils/constants";
import { cn } from "@/lib/utils";

const PromptInput = memo(function PromptInput({
  className,
  sendHandler,
  prompt,
  promptChangeHandler,
  status
}: {
  className?: string;
  sendHandler: (e: FormEvent<HTMLFormElement>) => void;
  prompt: string;
  promptChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  status: ChatStatus;
}) {
  return (
    <form
      className={cn(
        "flex flex-col divide-y-2 overflow-hidden rounded-xl border bg-background shadow-sm",
        CHAT_CONTAINER_WIDTH,
        className
      )}
      onSubmit={sendHandler}
    >
      <PromptInputEditor
        prompt={prompt}
        promptChangeHandler={promptChangeHandler}
        status={status}
      />
      <PromptInputToolbar sendDisabled={!prompt} status={status} />
    </form>
  );
});

export { PromptInput };
