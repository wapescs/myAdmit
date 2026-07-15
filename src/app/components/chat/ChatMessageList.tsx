"use client";

import type { RefObject } from "react";
import { ChatLockedState } from "./ChatLockedState";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatTypingIndicator } from "./ChatTypingIndicator";
import type { Message } from "@/types/chat.types";

export function ChatMessageList({
  messages, typing, isLocked, endRef,
}: {
  messages: Message[];
  typing: boolean;
  isLocked: boolean;
  endRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
      {isLocked && <ChatLockedState />}
      {messages.map(msg => (
        <ChatMessageBubble key={msg.id} message={msg} />
      ))}
      {typing && <ChatTypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}
