// app/admin/chat/AdminChatClient.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { signOut } from 'next-auth/react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  visitorId: string;
  createdAt: string;
}

export default function AdminChatClient() {
  const [pendingMessages, setPendingMessages] = useState<Message[]>([]);
  const [responseText, setResponseText] = useState('');
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [newMessageAlert, setNewMessageAlert] = useState<{ id: string; name: string } | null>(null);
  const socketRef = useRef<Socket | null>(null);
  
  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Cambiar título de la pestaña
  useEffect(() => {
    if (pendingMessages.length > 0) {
      document.title = `(${pendingMessages.length}) Nuevos mensajes - Tu Marca AR`;
    } else {
      document.title = "Panel de Operador - Tu Marca AR";
    }
  }, [pendingMessages.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto-ocultar alerta después de 5 segundos
  useEffect(() => {
    if (newMessageAlert) {
      const timer = setTimeout(() => {
        setNewMessageAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newMessageAlert]);

  // Conexión WebSocket
  useEffect(() => {
    const socket = io('https://chat-tumarca.onrender.com', {
      query: { role: 'agent' },
    });
    socketRef.current = socket;

    socket.on('pendingMessages', (messages: Message[]) => {
      setPendingMessages(messages);
    });

    socket.on('newMessage', (msg: any) => {
      const newMsg = {
        ...msg,
        _id: msg._id || Date.now().toString(),
        createdAt: msg.createdAt || new Date().toISOString(),
        status: 'pending',
      };
      setPendingMessages(prev => [...prev, newMsg]);
      
      // Mostrar alerta visual
      setNewMessageAlert({ id: newMsg._id, name: newMsg.name });
      
      if (!selectedVisitorId) setSelectedVisitorId(msg.visitorId);
    });

    socket.on('agentResponseSent', (responseMsg: Message) => {
      setPendingMessages(prev => [...prev, responseMsg]);
      if (selectedVisitorId === responseMsg.visitorId) {
        setConversation(prev => [...prev, responseMsg]);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  // Cargar conversación completa
  useEffect(() => {
    if (selectedVisitorId) {
      const fullConversation = pendingMessages
        .filter(msg => msg.visitorId === selectedVisitorId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setConversation(fullConversation);
    }
  }, [selectedVisitorId, pendingMessages]);

  const handleSendResponse = () => {
    if (!responseText.trim() || !selectedVisitorId) return;

    socketRef.current?.emit('sendMessageToVisitor', {
      visitorId: selectedVisitorId,
      message: responseText,
    });

    setResponseText('');
  };

  const logout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* 🚨 Notificación de nuevo mensaje */}
      {newMessageAlert && (
        <div className="fixed top-4 right-4 z-50 bg-amber-500 text-black px-4 py-3 rounded-lg shadow-xl animate-pulse border border-amber-600">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-black rounded-full animate-ping absolute"></div>
            <span className="text-xl">💬</span>
            <div>
              <p className="font-bold">Nuevo mensaje</p>
              <p className="text-sm">de <strong>{newMessageAlert.name}</strong></p>
            </div>
            <button 
              onClick={() => setNewMessageAlert(null)}
              className="ml-2 text-black hover:text-gray-800 font-bold text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <br />
        <br />
        <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Panel de Operador — Tu Marca AR
        </h1>
        <br />

        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors duration-200"
          >
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de chats pendientes */}
          <div className={`lg:col-span-1 rounded-lg shadow p-4 h-[600px] overflow-y-auto transition-colors duration-200 ${
            darkMode ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-gray-800'
          }`}>
            <h2 className="font-bold mb-3">
              Mensajes ({pendingMessages.length})
            </h2>
            {pendingMessages.length === 0 ? (
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No hay mensajes.
              </p>
            ) : (
              <ul className="space-y-3">
                {Array.from(
                  new Map(pendingMessages.map(msg => [msg.visitorId, msg])).values()
                ).map((msg) => (
                  <li
                    key={msg.visitorId}
                    onClick={() => setSelectedVisitorId(msg.visitorId)}
                    className={`p-3 rounded cursor-pointer border transition-colors duration-150 ${
                      selectedVisitorId === msg.visitorId
                        ? (darkMode ? 'border-amber-500 bg-amber-900/20' : 'border-amber-500 bg-amber-50')
                        : (darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50')
                    }`}
                  >
                    <p className="font-medium">{msg.name}</p>
                    <p className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {msg.message}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Área de conversación */}
          <div className={`lg:col-span-2 rounded-lg shadow p-4 flex flex-col transition-colors duration-200 ${
            darkMode ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-gray-800'
          }`}>
            <h2 className="font-bold mb-4">
              {selectedVisitorId
                ? 'Conversación'
                : 'Selecciona una conversación'}
            </h2>

            {selectedVisitorId && (
              <>
                <div className={`flex-1 rounded p-3 mb-4 overflow-y-auto h-64 transition-colors duration-200 ${
                  darkMode ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                  {conversation.length === 0 ? (
                    <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Cargando conversación...
                    </p>
                  ) : (
                    conversation.map((msg, i) => (
                      <div key={`${msg._id}-${i}`} className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-semibold ${
                            msg.name === 'Operador' 
                              ? 'text-amber-500' 
                              : 'text-blue-500'
                          }`}>
                            {msg.name}
                          </span>
                          <span className={`text-xs ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className={`p-2 rounded text-sm ${
                          msg.name === 'Operador'
                            ? (darkMode ? 'bg-amber-900/30 text-amber-100' : 'bg-amber-100 text-amber-800')
                            : (darkMode ? 'bg-blue-900/30 text-blue-100' : 'bg-blue-100 text-blue-800')
                        }`}>
                          {msg.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribe tu respuesta..."
                    className={`flex-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-black placeholder-gray-500'
                    } border`}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendResponse()}
                  />
                  <button
                    onClick={handleSendResponse}
                    disabled={!responseText.trim()}
                    className={`px-4 rounded font-medium transition-colors duration-200 ${
                      responseText.trim()
                        ? 'bg-amber-500 text-black hover:bg-amber-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Enviar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}