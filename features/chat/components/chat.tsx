"use client";

import { useState } from "react";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { generateUuid } from "@/lib/generateUuid";

function Chat({
  id,
  initialMessages
}: {
  id: string;
  initialMessages: UIMessage[];
}) {
  const [prompt, setPrompt] = useState("");
  const { messages, sendMessage } = useChat({
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

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          void sendMessage({ text: prompt });
          setPrompt("");
        }}
      >
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-zinc-300 p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          value={prompt}
          placeholder="Say something..."
          onChange={e => setPrompt(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}

export { Chat };
