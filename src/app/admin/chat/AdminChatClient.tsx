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
  const socketRef = useRef<Socket | null>(null);
  
  


  // Dark mode: detectar preferencia del sistema
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Detectar preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      query: { role: 'agent' },
    });
    socketRef.current = socket;

    socket.on('pendingMessages', (messages: Message[]) => {
      setPendingMessages(messages);
    });

    socket.on('newMessage', (msg: any) => {
      setPendingMessages((prev) => [
        ...prev,
        {
          ...msg,
          _id: msg.id,
          createdAt: new Date().toISOString(),
          status: 'pending',
        },
      ]);
      if (!selectedVisitorId) setSelectedVisitorId(msg.visitorId);
    });

    return () => {
      socket.close();
    };
  }, [selectedVisitorId]);

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
      <div className="max-w-6xl mx-auto">
        <br />
        <br />
        <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Panel de Operador — Tu Marca AR
        </h1>
        <br />


        <div className="flex justify-end mb-6">
          <button
            onClick={() => logout()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors duration-200"
          >
            Cerrar Sesión
          </button>
        </div>


        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors duration-200"
          >
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de chats pendientes */}
          <div className={`lg:col-span-1 rounded-lg shadow p-4 h-[600px] overflow-y-auto transition-colors duration-200 ${darkMode ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-gray-800'
            }`}>
            <h2 className="font-bold mb-3">
              Mensajes pendientes ({pendingMessages.length})
            </h2>
            {pendingMessages.length === 0 ? (
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No hay mensajes pendientes.
              </p>
            ) : (
              <ul className="space-y-3">
                {pendingMessages.map((msg) => (
                  <li
                    key={msg._id}
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

          {/* Área de respuesta */}
          <div className={`lg:col-span-2 rounded-lg shadow p-4 flex flex-col transition-colors duration-200 ${darkMode ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-gray-800'
            }`}>
            <h2 className="font-bold mb-4">
              {selectedVisitorId
                ? 'Responder mensaje'
                : 'Selecciona un mensaje para responder'}
            </h2>

            {selectedVisitorId && (
              <>
                <div className={`flex-1 rounded p-3 mb-4 overflow-y-auto h-64 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                  {pendingMessages
                    .filter((m) => m.visitorId === selectedVisitorId)
                    .map((msg, i) => (
                      <div key={i} className="mb-2">
                        <p className="text-sm">
                          <span className="font-bold">{msg.name}</span> ({msg.email})
                        </p>
                        <p className={`p-2 rounded text-sm ${darkMode ? 'bg-blue-900/50 text-blue-100' : 'bg-blue-100 text-gray-800'
                          }`}>
                          {msg.message}
                        </p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
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
                    className="bg-amber-500 text-black px-4 rounded font-medium hover:bg-amber-600 transition-colors duration-200"
                  >
                    Enviar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}