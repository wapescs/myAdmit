import { AI_REPLIES } from "@/constants/chat";
import type { Message } from "@/types/chat.types";

/** Simulates network latency, matching the existing fake-typing-delay UX. */
export function sendChatMessage(nextId: number): Promise<Message> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: nextId,
        role: "assistant",
        content: AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)],
        timestamp: new Date(),
      });
    }, 1600);
  });
}
