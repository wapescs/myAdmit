"use client";

import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatSuggestedPrompts } from "./ChatSuggestedPrompts";
import { ChatInputBar } from "./ChatInputBar";
import { useChat } from "@/hooks/useChat";
import { useUserState } from "@/app/providers/UserStateProvider";

export function ChatPage() {
  const { userState } = useUserState();
  const { messages, input, setInput, typing, dailyCount, endRef, send, isLocked, isLimited } = useChat(userState);

  return (
    <div className="flex h-screen pt-16 lg:pt-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <ChatSidebar dailyCount={dailyCount} />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader />
        <ChatMessageList messages={messages} typing={typing} isLocked={isLocked} endRef={endRef} />
        {messages.length <= 1 && !isLocked && (
          <ChatSuggestedPrompts onSelectPrompt={setInput} />
        )}
        <ChatInputBar input={input} onChangeInput={setInput} onSend={send} isLocked={isLocked} isLimited={isLimited} />
      </div>
    </div>
  );
}
