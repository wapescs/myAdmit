export type ChatRole = "assistant" | "user";

export interface Message {
  id: number;
  role: ChatRole;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  title: string;
  date: string;
  active: boolean;
}
