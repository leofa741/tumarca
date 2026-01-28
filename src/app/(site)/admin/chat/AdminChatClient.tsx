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
  // Microinteracciones
  const [refreshRipple, setRefreshRipple] = useState<{ x: number; y: number } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const refreshAgentStatus = (e: React.MouseEvent) => {
    if (refreshing || !socketRef.current) return;

    // Ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    setRefreshRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setRefreshRipple(null), 600);

    // Acción principal
    setRefreshing(true);
    socketRef.current.emit('refreshAgentStatus');

    // Mostrar éxito brevemente
    setTimeout(() => {
      setRefreshing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1000);
  };


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
          {/* Botón Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 
               text-gray-800 font-medium shadow-sm hover:shadow-md 
               transition-all duration-300 hover:from-gray-200 hover:to-gray-300 
               active:scale-[0.98] border border-gray-200 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              {darkMode ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>

                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>

                </>
              )}
            </span>
          </button>

          {/* Botón Actualizar Estado con microinteracciones */}
          <button
            onClick={refreshAgentStatus}
            disabled={refreshing}
            className="group relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 
               text-black font-bold shadow-lg hover:shadow-xl 
               transition-all duration-300 hover:from-amber-600 hover:to-amber-700 
               active:scale-[0.98] disabled:opacity-70 overflow-hidden hover:-translate-y-0.5"
          >
            {/* Ripple effect */}
            {refreshRipple && (
              <span
                className="absolute w-24 h-24 bg-white/30 rounded-full animate-ripple"
                style={{
                  left: refreshRipple.x - 48,
                  top: refreshRipple.y - 48,
                }}
              />
            )}

            <span className="flex items-center gap-2 relative z-10">
              {refreshing ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : showSuccess ? (
                <svg className="w-4 h-4 animate-success-check" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 014.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {showSuccess ? 'Actualizado!' : refreshing ? 'Actualizando...' : 'Actualizar'}
            </span>
          </button>

          {/* Botón Cerrar Sesión */}
          <button
            onClick={logout}
            className="group relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 
               text-white font-medium shadow-lg hover:shadow-xl 
               transition-all duration-300 hover:from-red-600 hover:to-red-700 
               active:scale-[0.98] hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de chats pendientes */}
          <div className={`lg:col-span-1 rounded-lg shadow p-4 h-[600px] overflow-y-auto transition-colors duration-200 ${darkMode ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-gray-800'
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
                    className={`p-3 rounded cursor-pointer border transition-colors duration-150 ${selectedVisitorId === msg.visitorId
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
          <div className={`lg:col-span-2 rounded-lg shadow p-4 flex flex-col transition-colors duration-200 ${darkMode ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-gray-800'
            }`}>
            <h2 className="font-bold mb-4">
              {selectedVisitorId
                ? 'Conversación'
                : 'Selecciona una conversación'}
            </h2>

            {selectedVisitorId && (
              <>
                <div className={`flex-1 rounded p-3 mb-4 overflow-y-auto h-64 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                  {conversation.length === 0 ? (
                    <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Cargando conversación...
                    </p>
                  ) : (
                    conversation.map((msg, i) => (
                      <div key={`${msg._id}-${i}`} className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-semibold ${msg.name === 'Operador'
                            ? 'text-amber-500'
                            : 'text-blue-500'
                            }`}>
                            {msg.name}
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className={`p-2 rounded text-sm ${msg.name === 'Operador'
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
                    className={`flex-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200 ${darkMode
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
                    className={`px-4 rounded font-medium transition-colors duration-200 ${responseText.trim()
                      ? 'bg-amber-500 text-black hover:bg-amber-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
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