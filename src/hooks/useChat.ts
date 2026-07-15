"use client";

import { useEffect, useRef, useState } from "react";
import { INITIAL_MESSAGES } from "@/constants/chat";
import { sendChatMessage } from "@/services/chat.service";
import type { Message } from "@/types/chat.types";
import type { UserState } from "@/types/user.types";

export function useChat(userState: UserState) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  const isLocked = userState === "anonymous";
  const isLimited = userState === "logged-in" && dailyCount >= 3;

  const send = () => {
    if (!input.trim() || isLocked || isLimited) return;
    const userMsg: Message = { id: messages.length + 1, role: "user", content: input, timestamp: new Date() };
    setMessages(p => [...p, userMsg]);
    setInput("");
    setTyping(true);
    setDailyCount(p => p + 1);
    sendChatMessage(messages.length + 2).then(reply => {
      setMessages(p => [...p, reply]);
      setTyping(false);
    });
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return { messages, input, setInput, typing, dailyCount, endRef, send, isLocked, isLimited };
}
