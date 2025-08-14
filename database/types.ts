import type { UIDataTypes, UIMessagePart, UITools } from "ai";

type MessagePart = UIMessagePart<UIDataTypes, UITools>;

type MessageParts = Array<MessagePart>;

export type { MessagePart, MessageParts };
