import type { ChangeEvent, FormEvent } from "react";
import type { ChatStatus } from "ai";
import { PromptInputEditor } from "@/features/chat/components/prompt-input/editor";
import { PromptInputToolbar } from "@/features/chat/components/prompt-input/toolbar";
import { cn } from "@/lib/utils";

function PromptInput({
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
        "flex w-full flex-col divide-y-2 overflow-hidden rounded-xl border bg-background shadow-sm",
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
}

export { PromptInput };
