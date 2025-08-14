"use client";

import { type ChangeEvent, type FormEvent, useCallback, useState } from "react";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Conversation } from "@/features/chat/components/conversation";
import { PromptInput } from "@/features/chat/components/prompt-input";
import { generateUuid } from "@/lib/generateUuid";

function Chat({
  id,
  initialMessages
}: {
  id: string;
  initialMessages: UIMessage[];
}) {
  const [prompt, setPrompt] = useState("");
  const { messages, sendMessage, status } = useChat({
    id,
    messages: initialMessages,
    generateId: generateUuid,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      // only send the last message (the user's prompt) to the server:
      prepareSendMessagesRequest({ id, messages }) {
        return {
          body: { chatId: id, newMessage: messages[messages.length - 1] }
        };
      }
    })
  });

  const promptChangeHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.currentTarget.value);
    },
    [setPrompt]
  );

  const sendHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      void sendMessage({ text: prompt });
      setPrompt("");
    },
    [prompt, sendMessage, setPrompt]
  );

  return (
    <div className="flex h-full w-full flex-col gap-y-3">
      <Conversation className="flex-1" messages={messages} />
      <PromptInput
        className="mb-3"
        sendHandler={sendHandler}
        prompt={prompt}
        promptChangeHandler={promptChangeHandler}
        status={status}
      />
    </div>
  );
}

export { Chat };
