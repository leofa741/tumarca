'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/qwen';
import { saveChatHistory, loadChatHistory, clearChatHistory, ChatHistory } from '@/lib/chat-storage';
import VisitTracker from '@/app/(marketing)/components/VisitTracker';

// Configuración
const FREE_MESSAGES_LIMIT = 3;
const DONATION_URL = 'https://www.paypal.com/donate/?hosted_button_id=6WZGSW58C4TZG';

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
    
    // 👇 Estados para sistema de donación
    const [messagesUsed, setMessagesUsed] = useState(0);
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [hasDonated, setHasDonated] = useState(false);
    const [showDonationHint, setShowDonationHint] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // ===== EFECTOS =====

    // Detectar modo oscuro del sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Cargar historial + estado de donación
    useEffect(() => {
        setChatHistory(loadChatHistory());
        
        const donated = localStorage.getItem('chat_donated') === 'true';
        const used = parseInt(localStorage.getItem('chat_messages_used') || '0', 10);
        setHasDonated(donated);
        setMessagesUsed(used);
        
        if (!donated && used >= FREE_MESSAGES_LIMIT) {
            setShowDonationModal(true);
        }
        // Mostrar hint sutil al llegar al 80% del límite
        if (!donated && used === Math.floor(FREE_MESSAGES_LIMIT * 0.8)) {
            setShowDonationHint(true);
        }
    }, []);

    // Guardar contador en localStorage
    useEffect(() => {
        localStorage.setItem('chat_messages_used', messagesUsed.toString());
    }, [messagesUsed]);

    // Scroll automático
    useEffect(() => {
        scrollToBottom();
        const totalTokens = messages.reduce((acc, msg) => acc + Math.ceil(msg.content.length / 4), 0);
        setTokenCount(totalTokens);
    }, [messages]);

    // ===== FUNCIONES =====

    const scrollToBottom = () => {
        if (messagesEndRef.current && messagesContainerRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            });
            setTimeout(() => {
                messagesContainerRef.current?.scrollTo({
                    top: messagesContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
        setShowScrollButton(false);
    };

    // Detectar scroll para botón "volver al final"
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

    // Manejar envío de mensaje con límite de donación
    const handleSend = async () => {
        const userMessage = input.trim();
        if (!userMessage || isLoading) return;

        // Bloquear si llegó al límite y no donó
        if (!hasDonated && messagesUsed >= FREE_MESSAGES_LIMIT) {
            setShowDonationModal(true);
            return;
        }

        const newUserMessage: Message = { role: 'user', content: userMessage };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);
        setIsTyping(true);

        // Incrementar contador solo si no donó
        if (!hasDonated) {
            setMessagesUsed(prev => {
                const newCount = prev + 1;
                // Mostrar hint cuando esté cerca del límite
                if (newCount === Math.floor(FREE_MESSAGES_LIMIT * 0.8)) {
                    setShowDonationHint(true);
                }
                return newCount;
            });
        }

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
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Lo siento, ocurrió un error. Por favor, intenta nuevamente.' 
            }]);
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

    const toggleDarkMode = () => setDarkMode(!darkMode);

    // Marcar como donado (client-side)
    const markAsDonated = () => {
        localStorage.setItem('chat_donated', 'true');
        setHasDonated(true);
        setShowDonationModal(false);
        setShowDonationHint(false);
    };

    // ===== COMPONENTES UI =====

    // Barra de progreso de mensajes gratis
    const ProgressBadge = () => {
        if (hasDonated) return null;
        const progress = Math.min((messagesUsed / FREE_MESSAGES_LIMIT) * 100, 100);
        const remaining = FREE_MESSAGES_LIMIT - messagesUsed;
        
        return (
            <div className="flex items-center gap-3">
                <div className="flex-1 min-w-[120px]">
                    <div className="flex justify-between text-xs mb-1">
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                            Mensajes gratis
                        </span>
                        <span className={`font-medium ${remaining <= 1 ? 'text-amber-500' : ''}`}>
                            {messagesUsed}/{FREE_MESSAGES_LIMIT}
                        </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ease-out ${
                                progress >= 100 
                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 animate-pulse' 
                                    : progress >= 66 
                                        ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                                        : 'bg-gradient-to-r from-blue-400 to-blue-500'
                            }`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                {showDonationHint && remaining > 0 && (
                    <button
                        onClick={() => setShowDonationModal(true)}
                        className="text-xs px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full transition-colors font-medium"
                    >
                        🎁 Apoyar
                    </button>
                )}
            </div>
        );
    };

    // Modal de Donación - Diseño Premium
    const DonationModal = () => {
        if (!showDonationModal) return null;
        
        return (
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
                onClick={(e) => e.target === e.currentTarget && !hasDonated && setShowDonationModal(false)}
            >
                <div className={`relative max-w-md w-full rounded-2xl shadow-2xl p-6 transform transition-all duration-300 scale-100 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                }`}>
                    {/* Close button - solo si ya donó */}
                    {hasDonated && (
                        <button 
                            onClick={() => setShowDonationModal(false)}
                            className={`absolute top-3 right-3 p-1 rounded-full transition-colors ${
                                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                            }`}
                            aria-label="Cerrar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                    
                    <div className="text-center">
                        {/* Icono animado */}
                        <div className="relative inline-block mb-4">
                            <div className="text-5xl animate-bounce">🫶</div>
                            {hasDonated && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                                    ✓
                                </div>
                            )}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">
                            {hasDonated ? '¡Gracias por tu apoyo! 🎉' : '¿Te está sirviendo el chat?'}
                        </h3>
                        
                        <p className={`mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {hasDonated 
                                ? 'Tu contribución ayuda a mantener este proyecto activo y en mejora continua. ¡Podés seguir chateando sin límites!' 
                                : `Este asistente es gratuito gracias a la comunidad. Ya usaste ${messagesUsed} de ${FREE_MESSAGES_LIMIT} mensajes gratis. ¿Podés colaborar para que siga disponible?`
                            }
                        </p>
                        
                        {/* Botón principal de donación */}
                        {!hasDonated && (
                            <a
                                href={DONATION_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={markAsDonated}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                                Donar con PayPal
                            </a>
                        )}
                        
                        {/* Mensaje post-donación */}
                        {hasDonated && (
                            <div className={`p-3 rounded-lg mb-4 ${darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'}`}>
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="font-medium">¡Donación registrada! Disfrutá el chat ilimitado.</span>
                                </div>
                            </div>
                        )}
                        
                        {/* Link secundario */}
                        {!hasDonated && (
                            <>
                                <p className="text-xs opacity-60 mb-3">
                                    💡 Tip: Después de donar, hacé click en "Ya doné" para continuar inmediatamente.
                                </p>
                                
                                <button
                                    onClick={markAsDonated}
                                    className={`text-sm font-medium underline transition-colors ${
                                        darkMode 
                                            ? 'text-gray-400 hover:text-gray-200' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    ✓ Ya realicé mi donación
                                </button>
                            </>
                        )}
                        
                        {/* Badge de confianza */}
                        <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                            <p className="text-xs opacity-50 flex items-center justify-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                                </svg>
                                Pago seguro vía PayPal • Sin suscripciones
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ===== RENDER =====

    return (
        <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'
        }`}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 className="text-3xl font-bold">Chat AI — Tu Marca AR</h1>
                    <VisitTracker pageName="chat-ai" />

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {showHistory ? 'Cerrar Historial' : 'Ver Historial'}
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
                        </button>
                        <button
                            onClick={clearChat}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            🗑️ Limpiar
                        </button>
                        {messages.length > 0 && (
                            <button
                                onClick={exportChat}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                📥 Exportar
                            </button>
                        )}
                    </div>
                </div>

                {/* Estadísticas + Progreso + Donación */}
                <div className={`mb-4 p-3 rounded-xl flex flex-wrap items-center gap-4 ${
                    darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/70 border border-gray-200 shadow-sm'
                }`}>
                    <span className="text-sm">🪙 Tokens: <strong>{tokenCount.toLocaleString()}</strong></span>
                    <span className="text-sm">💵 Est. ${(tokenCount * 0.0000007).toFixed(4)} USD</span>
                    
                    <div className="flex-1 min-w-[200px]">
                        <ProgressBadge />
                    </div>
                    
                    <button
                        onClick={() => window.open(DONATION_URL.trim(), '_blank')}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        🫶 Apoyar proyecto
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Historial */}
                    {showHistory && (
                        <div className={`lg:col-span-1 rounded-xl shadow-lg p-4 h-[600px] overflow-y-auto ${
                            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                            <h3 className="font-bold mb-3">📚 Historial</h3>
                            {chatHistory.length === 0 ? (
                                <p className="text-sm opacity-75">No hay chats guardados</p>
                            ) : (
                                <ul className="space-y-2">
                                    {chatHistory.map(chat => (
                                        <li key={chat.id}>
                                            <button
                                                onClick={() => loadChat(chat)}
                                                className={`w-full text-left p-2 rounded text-sm truncate transition-colors ${
                                                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                                }`}
                                            >
                                                {chat.title}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={clearChatHistory}
                                            className="w-full text-left p-2 rounded text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                                        >
                                            🗑️ Borrar todo
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Chat principal */}
                    <div className={`${showHistory ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                        <div className={`rounded-2xl shadow-xl border flex flex-col ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`} style={{ height: '70vh' }}>

                            {/* Messages Area */}
                            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative">
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                        <div className="text-6xl mb-4 animate-pulse">🤖</div>
                                        <h2 className="text-xl font-semibold mb-2">Asistente de Tu Marca AR</h2>
                                        <p className="opacity-80 max-w-md">
                                            Hola! Soy tu asistente de IA especializado en servicios digitales premium.
                                            Pregúntame sobre diseño web, branding, SEO, marketing o desarrollo de aplicaciones.
                                        </p>
                                        {!hasDonated && (
                                            <p className="text-xs mt-4 opacity-60">
                                                🎁 Tenés <strong>{FREE_MESSAGES_LIMIT} mensajes gratis</strong> para empezar
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    messages.map((msg, index) => (
                                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] lg:max-w-[75%] px-4 py-3 rounded-2xl transition-all ${
                                                msg.role === 'user'
                                                    ? 'bg-amber-500 text-black rounded-tr-none shadow-md'
                                                    : darkMode 
                                                        ? 'bg-gray-700 text-gray-100 rounded-tl-none' 
                                                        : 'bg-gray-100 text-gray-900 rounded-tl-none'
                                            }`}>
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className={`max-w-[85%] lg:max-w-[75%] px-4 py-3 rounded-2xl rounded-tl-none ${
                                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                        }`}>
                                            <div className="flex space-x-1">
                                                {[0, 0.1, 0.2].map((delay, i) => (
                                                    <div 
                                                        key={i}
                                                        className="w-2 h-2 bg-current rounded-full animate-bounce" 
                                                        style={{ animationDelay: `${delay}s` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />

                                {/* Scroll to bottom button */}
                                {showScrollButton && (
                                    <button
                                        onClick={scrollToBottom}
                                        className="fixed bottom-24 right-6 z-10 bg-amber-500 hover:bg-amber-600 text-black p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        aria-label="Ir al final del chat"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                {/* Mensaje de límite alcanzado */}
                                {!hasDonated && messagesUsed >= FREE_MESSAGES_LIMIT && (
                                    <div className={`mb-3 p-2 rounded-lg text-center text-sm ${
                                        darkMode ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-800'
                                    }`}>
                                        🎯 ¡Límite alcanzado! <button 
                                            onClick={() => setShowDonationModal(true)}
                                            className="font-semibold underline hover:no-underline"
                                        >
                                            Apoyá el proyecto para seguir chateando →
                                        </button>
                                    </div>
                                )}
                                
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={hasDonated ? "Escribe tu mensaje..." : `Mensaje ${messagesUsed + 1}/${FREE_MESSAGES_LIMIT}...`}
                                        disabled={isLoading || (!hasDonated && messagesUsed >= FREE_MESSAGES_LIMIT)}
                                        className={`flex-1 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                                            darkMode
                                                ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 disabled:opacity-50'
                                                : 'bg-white border border-gray-300 text-gray-800 placeholder-gray-500 disabled:opacity-50'
                                        } ${!hasDonated && messagesUsed >= FREE_MESSAGES_LIMIT ? 'cursor-not-allowed' : ''}`}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading || (!hasDonated && messagesUsed >= FREE_MESSAGES_LIMIT)}
                                        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        aria-label="Enviar mensaje"
                                    >
                                        {isLoading ? (
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs mt-2 text-center opacity-75">
                                    ⚡ Potenciado por Qwen AI • Respuestas pueden variar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Donación */}
            <DonationModal />
        </div>
    );
}