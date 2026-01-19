// components/ChatWidget.tsx
'use client';

import { useEffect, useState, useRef } from 'react'; // 👈 agregá useRef
import { io, Socket } from 'socket.io-client';

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

  // 👇 Referencia para el scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 👇 Función para hacer scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detectar modo oscuro
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Cargar datos guardados
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

  // 👇 Auto-scroll cuando cambian los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Conectar socket
  useEffect(() => {
    if (!socket) {
      socket = io('https://chat-tumarca.onrender.com', {
        query: { role: 'visitor' },
      });

      socket.on('agentStatus', (status: { online: boolean }) => {
        setIsAgentOnline(status.online);
      });

      socket.on('receiveMessage', (msg: ReceiveMessagePayload) => {
        setMessages((prev) => [...prev, { from: 'agent', text: msg.text }]);
      });
    }

    return () => {};
  }, []);

  const handleSend = () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = input.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) return;

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
    <div className="fixed bottom-26 right-5 z-1000">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-500 text-black w-14 h-14 rounded-full shadow-lg hover:bg-amber-600 transition-all flex items-center justify-center text-xl"
          aria-label="Abrir chat"
        >
          💬
        </button>
      ) : (
        <div className={`${bgColor} border ${borderColor} rounded-xl shadow-lg w-80 h-[420px] flex flex-col overflow-hidden`}>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white flex justify-between items-center">
            <h3 className="font-bold text-white">Chat en vivo</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none text-lg"
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          {/* Status */}
          <div className="px-3 pt-2 pb-1">
            <span className={`text-xs font-medium ${isAgentOnline ? 'text-green-600' : 'text-orange-600'}`}>
              {isAgentOnline ? '🟢 Operador online' : '🟠 Fuera de horario'}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-2 overflow-y-auto space-y-2">
            {messages.length === 0 && (
              <p className={`text-sm text-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
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
                  className={`inline-block px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                    msg.from === 'visitor'
                      ? `${messageVisitorBg} text-white rounded-br-sm`
                      : `${messageAgentBg} ${messageAgentText} rounded-bl-sm`
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            
            {/* 👇 Anchor invisible para el scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario */}
          <div className={`p-3 border-t ${borderColor} space-y-2`}>
            {!hasSavedInfo ? (
              <>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className={`w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${inputBg} ${textColor} ${placeholderColor}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Tu email"
                  className={`w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${inputBg} ${textColor} ${placeholderColor}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                Como <span className="font-medium">{name}</span> ({email})
                <button
                  onClick={clearSavedInfo}
                  className="ml-2 text-amber-600 text-xs hover:underline"
                >
                  Cambiar
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={!name.trim() || !email.trim() ? "Completa nombre y email" : "Escribe tu mensaje..."}
                className={`flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${inputBg} ${textColor} ${placeholderColor}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={!name.trim() || !email.trim()}
              />
              <button
                onClick={handleSend}
                disabled={!isFormValid}
                className={`px-4 rounded-lg text-sm font-medium transition-colors ${
                  isFormValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}