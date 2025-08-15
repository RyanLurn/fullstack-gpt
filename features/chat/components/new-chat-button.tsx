import { memo } from "react";
import { MessageCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createChat } from "@/features/chat/db-operations/create-chat";
import { cn } from "@/lib/utils";

const NewChatButton = memo(({ className }: { className?: string }) => {
  return (
    <Button
      onClick={() => void createChat()}
      size="icon"
      className={cn(className)}
    >
      <MessageCirclePlus />
    </Button>
  );
});

export { NewChatButton };
