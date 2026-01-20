// lib/chat-storage.ts
export interface ChatHistory {
  id: string;
  title: string;
  createdAt: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
}

const CHAT_HISTORY_KEY = 'chat_ai_history';

export const saveChatHistory = (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  if (messages.length === 0) return;
  
  const history: ChatHistory[] = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '[]');
  
  // Crear título basado en el primer mensaje
  const title = messages[0].content.substring(0, 30) + (messages[0].content.length > 30 ? '...' : '');
  
  const newChat: ChatHistory = {
    id: Date.now().toString(),
    title,
    createdAt: new Date().toISOString(),
    messages
  };
  
  history.unshift(newChat);
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history.slice(0, 20))); // Máximo 20 chats
};

export const loadChatHistory = (): ChatHistory[] => {
  return JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '[]');
};

export const clearChatHistory = () => {
  localStorage.removeItem(CHAT_HISTORY_KEY);
};