import type { ChangeEvent, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function PromptInputEditor({
  className,
  prompt,
  promptChangeHandler,
  isDisabled
}: {
  className?: string;
  prompt: string;
  promptChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled: boolean;
}) {
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
