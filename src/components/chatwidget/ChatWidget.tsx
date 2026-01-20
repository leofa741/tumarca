// components/ChatWidget.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  from: 'visitor' | 'agent';
  text: string;
}

interface SendMessagePayload {
  name: string;
  email: string;
  message: string;
}

interface ReceiveMessagePayload {
  from: 'agent';
  text: string;
}

const STORAGE_KEY = 'chat_visitor_info';

let socket: Socket | null = null;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAgentOnline, setIsAgentOnline] = useState(false);
  const [hasSavedInfo, setHasSavedInfo] = useState(false);
  const [sendRipple, setSendRipple] = useState<{ x: number; y: number } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { name, email } = JSON.parse(saved);
        setName(name);
        setEmail(email);
        setHasSavedInfo(true);
      } catch (e) {
        console.warn('No se pudieron cargar datos guardados');
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      // 🔥 Corregí el espacio en la URL
      const BACKEND_URL = 'https://chat-tumarca.onrender.com';
      socket = io(BACKEND_URL, {
        query: { role: 'visitor' },
      });

      socket.on('agentStatus', (status: { online: boolean }) => {
        setIsAgentOnline(status.online);
      });

      socket.on('receiveMessage', (msg: ReceiveMessagePayload) => {
        setMessages((prev) => [...prev, { from: 'agent', text: msg.text }]);
      });
    }

    return () => { };
  }, []);

  const handleSend = (e: React.MouseEvent) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = input.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) return;

    // Ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    setSendRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setSendRipple(null), 600);

    // Acción principal
    setIsSending(true);

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: cleanName, email: cleanEmail }));
    setHasSavedInfo(true);

    const payload = {
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    };

    socket?.emit('sendMessage', payload);
    setMessages((prev) => [...prev, { from: 'visitor', text: cleanMessage }]);
    setInput('');

    setTimeout(() => setIsSending(false), 500);
  };

  const clearSavedInfo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setName('');
    setEmail('');
    setHasSavedInfo(false);
  };

  const isFormValid = name.trim() && email.trim() && input.trim();

  // Clases para dark mode
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const placeholderColor = darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500';
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-white';
  const messageVisitorBg = darkMode ? 'bg-blue-700' : 'bg-blue-600';
  const messageAgentBg = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  const messageAgentText = darkMode ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className="fixed bottom-16 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#000',
            boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
          }}
          aria-label="Abrir chat"
        >
          💬
        </button>
      ) : (
        <div className={`rounded-2xl shadow-2xl w-80 h-[440px] flex flex-col overflow-hidden transition-all duration-300 ${bgColor} border ${borderColor}`}>
          {/* Header */}
          <div className="p-4 flex justify-between items-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            <h3 className="font-bold text-white text-lg">Chat en vivo</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none text-lg transition-colors"
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          {/* Status */}
          <div className="px-4 pt-2 pb-1 flex justify-between items-center">
            <span className={`text-xs font-medium inline-flex items-center gap-1 ${isAgentOnline ? 'text-green-500' : 'text-orange-500'
              }`}>
              {isAgentOnline ? '🟢 Operador online' : '🟠 Fuera de horario'}
            </span>
            <button
              onClick={() => socket?.emit('requestAgentStatus')}
              className="text-xs text-amber-600 hover:text-amber-500 transition-colors"
            >
              Actualizar
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 px-4 py-3 overflow-y-auto space-y-3 ${darkMode ? 'scrollbar-thin scrollbar-thumb-gray-700' : ''}`}>
            {messages.length === 0 && (
              <p className={`text-sm text-center mt-4 opacity-80 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isAgentOnline
                  ? 'Escribe tu mensaje y te responderemos al instante.'
                  : 'Dejanos tu consulta y te responderemos a la brevedad.'}
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'visitor' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-2xl text-sm max-w-[80%] transition-all duration-200 ${msg.from === 'visitor'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-tr-none'
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    } ${darkMode && msg.from !== 'visitor' ? 'bg-gray-700 text-gray-100' : ''}`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Formulario */}
          <div className={`p-4 space-y-3 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
            {!hasSavedInfo ? (
              <>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className={`w-full p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 border ${inputBg} ${textColor} ${placeholderColor}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Tu email"
                  className={`w-full p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 border ${inputBg} ${textColor} ${placeholderColor}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              <div className={`text-sm flex justify-between items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>
                  Como <span className="font-semibold text-amber-600">{name}</span>
                </span>
                <button
                  onClick={clearSavedInfo}
                  className="text-amber-500 hover:text-amber-400 text-xs font-medium transition-colors"
                >
                  Cambiar
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={!name.trim() || !email.trim() ? "Completa nombre y email" : "Escribe tu mensaje..."}
                className={`flex-1 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 border ${inputBg} ${textColor} ${placeholderColor}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(e as any)}
                disabled={!name.trim() || !email.trim()}
              />
              <button
                onClick={handleSend}
                disabled={!isFormValid || isSending}
                className="relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md hover:shadow-lg overflow-hidden"
              >
                {/* Ripple effect */}
                {sendRipple && (
                  <span
                    className="absolute w-24 h-24 bg-white/30 rounded-full animate-ripple"
                    style={{
                      left: sendRipple.x - 48,
                      top: sendRipple.y - 48,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {isSending ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>  

                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}