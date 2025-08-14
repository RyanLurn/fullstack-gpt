import type { ChangeEvent, KeyboardEvent } from "react";
import type { ChatStatus } from "ai";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function PromptInputEditor({
  className,
  prompt,
  promptChangeHandler,
  status
}: {
  className?: string;
  prompt: string;
  promptChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  status: ChatStatus;
}) {
  const isDisabled = status === "streaming" || status === "submitted";

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      }

      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  }

  return (
    <Textarea
      name="message"
      className={cn(
        "w-full resize-none rounded-none border-none p-3 shadow-none ring-0 outline-none",
        "field-sizing-content max-h-[6lh] bg-transparent dark:bg-transparent",
        "focus-visible:ring-0",
        className
      )}
      value={prompt}
      onChange={promptChangeHandler}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      placeholder={isDisabled ? "Please wait..." : "Type your message here..."}
    />
  );
}

export { PromptInputEditor };
