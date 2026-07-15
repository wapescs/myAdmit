import type { Message, Conversation } from "@/types/chat.types";

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 1, role: "assistant",
    content: "Hello! I'm your AI Admission Counselor. I can help with university recommendations, scholarship guidance, admission probability assessment, and visa support.\n\nHow can I help you today?",
    timestamp: new Date(),
  },
];

export const AI_REPLIES: string[] = [
  "Based on your profile, I recommend **University of Toronto** (safe — 72% probability), **University of Edinburgh** (reach — 45%), and **TU Munich** (match — 58%).\n\nWould you like me to:\n- Generate a complete shortlist with match scores\n- Find scholarships for these universities\n- Draft your Statement of Purpose",
  "Great question! For students with 85%+ academics and 7.0 IELTS, Germany offers **free or near-free education** at world-class institutions.\n\nTop picks:\n- TU Munich (Rank #37)\n- RWTH Aachen (Rank #106)\n- Heidelberg University (Rank #58)\n\n**Key requirements:** Transcripts, motivation letter, APS certificate (India), IELTS 6.5+",
  "Looking at your budget and academic profile, here's my analysis:\n\n| University | Probability | Tuition |\n|---|---|---|\n| UniMelb | 68% | AUD $42K |\n| UofT | 55% | CAD $58K |\n| TCD Dublin | 79% | €20K |\n\nShall I create a detailed application timeline?",
];

export const CHAT_CONVERSATIONS: Conversation[] = [
  { title: "University recommendations for CS", date: "Today", active: true },
  { title: "Scholarship guidance UK", date: "Yesterday", active: false },
  { title: "SOP review – Canada MBA", date: "Jul 8", active: false },
  { title: "Visa requirements Germany", date: "Jul 5", active: false },
];

export const SUGGESTED_PROMPTS = [
  "Which universities suit my CS profile?",
  "Best scholarships for Indian students?",
  "Compare MIT vs Stanford for MBA",
];
