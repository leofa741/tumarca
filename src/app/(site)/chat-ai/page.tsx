// app/chat-ai/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/qwen';
import { saveChatHistory, loadChatHistory, clearChatHistory, ChatHistory } from '@/lib/chat-storage';

export default function ChatAIPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [tokenCount, setTokenCount] = useState(0);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Detectar modo oscuro del sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Cargar historial
    useEffect(() => {
        setChatHistory(loadChatHistory());
    }, []);

    // 👇 FUNCIÓN CORREGIDA: Scroll solo en el contenedor
    const scrollToBottom = () => {
        if (messagesEndRef.current && messagesContainerRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            });

            // Fallback adicional
            setTimeout(() => {
                messagesContainerRef.current?.scrollTo({
                    top: messagesContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
        setShowScrollButton(false);
    };

    // Detectar scroll
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
            setShowScrollButton(!isScrolledToBottom);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-scroll
    useEffect(() => {
        scrollToBottom();

        const totalTokens = messages.reduce((acc, msg) => acc + Math.ceil(msg.content.length / 4), 0);
        setTokenCount(totalTokens);
    }, [messages]);

    const handleSend = async () => {
        const userMessage = input.trim();
        if (!userMessage || isLoading) return;

        const newUserMessage: Message = { role: 'user', content: userMessage };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);
        setIsTyping(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, newUserMessage] })
            });

            const data = await response.json();

            if (data.response) {
                const aiMessage: Message = { role: 'assistant', content: data.response };
                setMessages(prev => [...prev, aiMessage]);
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Lo siento, ocurrió un error. Por favor, intenta nuevamente.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    };

    const clearChat = () => {
        if (messages.length > 0) {
            saveChatHistory(messages);
            setChatHistory(loadChatHistory());
        }
        setMessages([]);
        setInput('');
    };

    const loadChat = (chat: ChatHistory) => {
        setMessages(chat.messages);
        setShowHistory(false);
    };

    const exportChat = () => {
        const chatText = messages.map(msg =>
            `${msg.role === 'user' ? '👤 Usuario' : '🤖 IA'}: ${msg.content}`
        ).join('\n\n');

        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-tu-marca-ar-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'
            }`}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 className="text-3xl font-bold">Chat AI — Tu Marca AR</h1>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                            {showHistory ? 'Cerrar Historial' : 'Ver Historial'}
                        </button>

                        <button
                            onClick={toggleDarkMode}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                        </button>

                        <button
                            onClick={clearChat}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-colors"
                        >
                            Limpiar Chat
                        </button>

                        {messages.length > 0 && (
                            <button
                                onClick={exportChat}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                            >
                                Exportar
                            </button>
                        )}
                    </div>
                </div>

                {/* Estadísticas */}
                {/* Estadísticas + Donación */}
                <div className={`mb-4 p-3 rounded-lg text-sm flex flex-wrap items-center gap-4 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                    <span>Tokens usados: {tokenCount.toLocaleString()}</span>
                    <span>Costo estimado: ${(tokenCount * 0.0000007).toFixed(4)} USD</span>

                    {/* Botón de donación estilo Tailwind */}
                    <button
                        onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=6WZGSW58C4TZG', '_blank')}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded text-xs font-medium transition-all transform hover:scale-105"
                    >
                        🫶 Apoyar este proyecto
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Historial (solo en desktop) */}
                    {showHistory && (
                        <div className={`lg:col-span-1 rounded-xl shadow-lg p-4 h-[600px] overflow-y-auto ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                            }`}>
                            <h3 className="font-bold mb-3">Historial de chats</h3>
                            {chatHistory.length === 0 ? (
                                <p className="text-sm opacity-75">No hay chats guardados</p>
                            ) : (
                                <ul className="space-y-2">
                                    {chatHistory.map(chat => (
                                        <li key={chat.id}>
                                            <button
                                                onClick={() => loadChat(chat)}
                                                className={`w-full text-left p-2 rounded text-sm truncate ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                                    }`}
                                            >
                                                {chat.title}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={clearChatHistory}
                                            className="w-full text-left p-2 rounded text-sm text-red-500 hover:bg-red-500/10"
                                        >
                                            Borrar todo el historial
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Chat principal */}
                    <div className={`${showHistory ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                        <div className={`rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            } flex flex-col`} style={{ height: '70vh' }}>

                            {/* Messages */}
                            <div
                                ref={messagesContainerRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 relative"
                            >
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                        <div className="text-6xl mb-4">🤖</div>
                                        <h2 className="text-xl font-semibold mb-2">Asistente de Tu Marca AR</h2>
                                        <p className="opacity-80">
                                            Hola! Soy tu asistente de IA especializado en servicios digitales premium.
                                            Pregúntame sobre diseño web, branding, SEO, marketing o desarrollo de aplicaciones.
                                        </p>
                                    </div>
                                ) : (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] lg:max-w-[75%] px-4 py-3 rounded-2xl ${msg.role === 'user'
                                                        ? 'bg-amber-500 text-black rounded-tr-none'
                                                        : 'bg-gray-100 text-gray-900 rounded-tl-none'
                                                    } ${darkMode && msg.role !== 'user' ? 'bg-gray-700 text-gray-100' : ''}`}
                                            >
                                                <p className="whitespace-pre-wrap text-black">
                                                    {msg.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}

                                {/* Indicador de "escribiendo..." */}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className={`max-w-[85%] lg:max-w-[75%] px-4 py-3 rounded-2xl ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800'
                                            } rounded-tl-none`}>
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />

                                {/* Botón de scroll al final */}
                                {showScrollButton && (
                                    <button
                                        onClick={scrollToBottom}
                                        className="fixed bottom-24 right-38 z-10 bg-amber-500 hover:bg-amber-600 text-black p-2 rounded-full shadow-lg transition-all duration-200 animate-bounce"
                                        aria-label="Ir al final del chat"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Input */}
                            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'
                                }`}>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Escribe tu mensaje..."
                                        disabled={isLoading}
                                        className={`flex-1 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 ${darkMode
                                                ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border border-gray-300 text-gray-800 placeholder-gray-500'
                                            }`}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>  
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs mt-2 text-center opacity-75">
                                    Potenciado por Qwen AI • Respuestas pueden variar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}