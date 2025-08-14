import { memo } from "react";
import type { UIMessage } from "ai";
import { TextPart } from "@/features/chat/components/message/content/text-part";
import { cn } from "@/lib/utils";

const MessageContent = memo(function MessageContent({
  id,
  parts,
  className
}: Pick<UIMessage, "id" | "parts"> & {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-sm text-foreground",
        "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
        "group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground",
        className
      )}
    >
      <div className="is-user:dark">
        {parts.map((part, i) => {
          switch (part.type) {
            case "text":
              return <TextPart key={`${id}-${i}`} text={part.text} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
});

export { MessageContent };
