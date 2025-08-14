"use client";

import { type FormEvent, useState } from "react";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
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

  function sendHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void sendMessage({ text: prompt });
    setPrompt("");
  }

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
              default:
                return null;
            }
          })}
        </div>
      ))}

      <PromptInput
        className="mt-4"
        sendHandler={sendHandler}
        prompt={prompt}
        promptChangeHandler={e => setPrompt(e.currentTarget.value)}
        status={status}
      />
    </div>
  );
}

export { Chat };
