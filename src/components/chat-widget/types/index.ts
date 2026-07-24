export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatResponse {
  reply: string;
  conversationId: string;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  proyecto?: string;
  servicios_interes?: string;
}

export type TabType = 'chat' | 'contact';
export type ThemeType = 'light' | 'dark';