import { useState, useRef, useEffect } from 'react';
import { Message, ChatResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';


// ============================================
// FUNCIÓN AUXILIAR: Registrar conversación
// ============================================

async function registrarConversacion(conversationId: string, role: 'user' | 'bot', message: string) {
  try {
    await fetch(`${API_URL}/conversaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, role, message })
    });
  } catch (error) {
    console.error('Error guardando conversación:', error);
  }
}

// ============================================
// ENDPOINTS DIRECTOS
// ============================================
async function getContacto(): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/contacto`);
    return await response.text();
  } catch { return '❌ Error de conexión.'; }
}

async function getPrecios(): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/precios`);
    return await response.text();
  } catch { return '❌ Error de conexión.'; }
}

async function getServicios(): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/servicios`);
    return await response.text();
  } catch { return '❌ Error de conexión.'; }
}

// ============================================
// DETECCIÓN DE PALABRAS CLAVE
// ============================================
function detectKeyword(text: string): 'contacto' | 'precios' | 'servicios' | null {
  const t = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Solo detectar preguntas EXPLÍCITAS por contacto
  // NO detectar si el usuario está DANDO su email
  const preguntaPorContacto = [
    'cual es tu email', 'cual es su email', 'cual es el email',
    'cual es tu telefono', 'cual es su telefono', 'cual es el telefono',
    'cual es tu whatsapp', 'cual es su whatsapp', 'cual es el whatsapp',
    'como los contacto', 'como te contacto', 'como contactarlos',
    'donde estan ubicados', 'cual es su direccion', 'donde quedan'
  ];
  
  if (preguntaPorContacto.some(phrase => t.includes(phrase))) return 'contacto';
  if (['precio','precios','costo','costos','cuanto cuesta','tarifa','presupuesto'].some(w => t.includes(w))) return 'precios';
  if (['servicio','servicios','que hacen','que ofrecen'].some(w => t.includes(w))) return 'servicios';
  
  return null;
}




// ============================================
// HOOK PRINCIPAL
// ============================================
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: '¡Hola! 👋 Soy el asistente virtual de tumarca.ar. ¿En qué puedo ayudarte?',
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState('widget-' + Date.now());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };



  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // 1. Mostrar y GUARDAR mensaje del usuario
    setMessages(prev => [...prev, {
      id: Date.now().toString(), text, sender: 'user', timestamp: new Date()
    }]);
    
    // 🔑 CLAVE: Guardar el mensaje del usuario SIEMPRE
    registrarConversacion(conversationId, 'user', text);
    
    setIsLoading(true);

    try {
      const keyword = detectKeyword(text);
      let botReply: string;
      
      // 2. Obtener respuesta (directa o IA)
      if (keyword === 'contacto') {
        botReply = await getContacto();
      } else if (keyword === 'precios') {
        botReply = await getPrecios();
      } else if (keyword === 'servicios') {
        botReply = await getServicios();
      } else {
        // IA normal (el backend guarda ambos mensajes automáticamente)
        const response = await fetch(`${API_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, conversationId })
        });
        const data: ChatResponse = await response.json();
        botReply = data.reply || 'Error procesando mensaje';
        
        // Para el caso IA NO guardamos aquí (lo hace el backend)
        // Pero guardamos el bot si hubo fallback/error
        if (!data.reply) {
          registrarConversacion(conversationId, 'bot', botReply);
        }
      }
      
      // 3. GUARDAR la respuesta del bot cuando vino de endpoint directo
      if (keyword) {
        registrarConversacion(conversationId, 'bot', botReply);
      }
      
      addBotMessage(botReply);
    } catch {
      const errorReply = 'Error de conexión. Verifica tu internet.';
      addBotMessage(errorReply);
    } finally {
      setIsLoading(false);
    }
  };



  return { messages, isLoading, messagesEndRef, sendMessage };
}