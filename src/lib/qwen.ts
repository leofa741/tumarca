// lib/qwen.ts
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}