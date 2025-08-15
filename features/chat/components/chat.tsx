"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useActionState,
  useCallback,
  useState
} from "react";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Conversation } from "@/features/chat/components/conversation";
import { NewChatButton } from "@/features/chat/components/new-chat-button";
import { PromptInput } from "@/features/chat/components/prompt-input";
import { createChat } from "@/features/chat/db-operations/create-chat";
import { generateUuid } from "@/lib/generateUuid";

function Chat({
  id,
  initialMessages
}: {
  id: string;
  initialMessages: UIMessage[];
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, createChatAction, pending] = useActionState(
    createChat,
    undefined
  );
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
      <NewChatButton
        className="fixed top-3 left-3 z-50"
        createChatAction={createChatAction}
        isPending={pending}
      />
      <Conversation className="flex-1" messages={messages} />
      <PromptInput
        className="mb-3"
        sendHandler={sendHandler}
        prompt={prompt}
        promptChangeHandler={promptChangeHandler}
        status={status}
        isDisabled={pending}
      />
    </div>
  );
}

export { Chat };
