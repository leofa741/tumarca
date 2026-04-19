// src/app/(audiobook)/audiobook/lib/tts-utils.ts
// Utilidades para el módulo TTS: cache, presets, formateo, etc.

import { TTSSettings } from '../api/tts/types';

// ============ CONFIGURACIÓN DE BASE DE DATOS ============

const DB_NAME = 'TTSApp';
const DB_VERSION = 2; // Incrementado para asegurar creación del store
const STORE_NAME = 'tts-cache';

/**
 * Inicializa/actualiza la base de datos IndexedDB
 * Siempre asegura que el object store exista
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    // Verificar si IndexedDB está disponible
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB no está disponible en este navegador'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // ⚠️ CLAVE: Se ejecuta cuando la DB es nueva o la versión cambia
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Crear el store solo si no existe
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
        console.log(`[IndexedDB] Object store "${STORE_NAME}" creado`);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      console.error('[IndexedDB] Error al abrir DB:', request.error);
      reject(request.error);
    };
  });
}

// ============ FUNCIONES DE CACHE ============

/**
 * Genera un hash simple para cachear respuestas de TTS
 * Útil para evitar regenerar el mismo audio
 */
/**
 * Genera una clave de cache única y consistente
 * - Ordena las keys de settings para JSON estable
 * - Usa 64 caracteres en lugar de 32 para evitar colisiones
 */
/**
 * Genera clave de cache ÚNICA usando SHA-256 (Web Crypto API)
 * - Cero colisiones garantizadas
 * - Funciona con textos de cualquier longitud
 * - Fallback seguro si crypto no está disponible
 */
export async function generateCacheKey(
  text: string, 
  voiceId: string, 
  settings: TTSSettings
): Promise<string> {
  // Ordenar keys para JSON consistente (independiente del orden de inserción)
  const sortedSettings = Object.keys(settings)
    .sort()
    .reduce((acc, key) => {
      (acc as any)[key] = settings[key as keyof TTSSettings];
      return acc;
    }, {} as Record<string, number>);
  
  // String único: texto + voz + configuración ordenada
  const rawKey = `text:${text}||voice:${voiceId}||settings:${JSON.stringify(sortedSettings)}`;
  
  // Usar SHA-256 si está disponible (navegadores modernos)
  if (typeof crypto !== 'undefined' && crypto.subtle?.digest) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(rawKey);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      // Convertir buffer a hex string (64 caracteres)
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    } catch (e) {
      console.warn('[Cache] SHA-256 falló, usando fallback:', e);
    }
  }
  
  // 🔙 Fallback: base64 con slice más largo (128 chars) + limpieza
  return btoa(unescape(encodeURIComponent(rawKey)))
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 128);
}
/**
 * Guarda audio en cache del navegador (IndexedDB con fallback a localStorage)
 */
export async function cacheAudio(key: string, audioBlob: Blob): Promise<void> {
  try {
    // Si IndexedDB no está disponible, usar fallback inmediatamente
    if (typeof indexedDB === 'undefined') {
      await fallbackCache(key, audioBlob);
      return;
    }

    const db = await openDatabase();
    
    // Verificar que el store existe antes de usarlo
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      console.warn('[Cache] Store no encontrado, usando fallback');
      await fallbackCache(key, audioBlob);
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(audioBlob, key);

      req.onsuccess = () => {
        db.close();
        resolve();
      };
      req.onerror = () => {
        console.error('[Cache] Error al guardar:', req.error);
        db.close();
        // Fallback automático si falla IndexedDB
        fallbackCache(key, audioBlob).then(resolve).catch(reject);
      };
    });

  } catch (error) {
    console.warn('[Cache] Error con IndexedDB, usando fallback:', error);
    await fallbackCache(key, audioBlob);
  }
}

/**
 * Recupera audio del cache
 */
export async function getCachedAudio(key: string): Promise<Blob | null> {
  try {
    // Si IndexedDB no está disponible, usar fallback
    if (typeof indexedDB === 'undefined') {
      return await fallbackGet(key);
    }

    const db = await openDatabase();
    
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      return await fallbackGet(key);
    }

    const result = await new Promise<Blob | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        db.close();
        resolve(req.result || null);
      };
      req.onerror = () => {
        console.error('[Cache] Error al recuperar:', req.error);
        db.close();
        reject(req.error);
      };
    });

    return result;

  } catch (error) {
    console.warn('[Cache] Error al recuperar de IndexedDB:', error);
    return await fallbackGet(key);
  }
}

/**
 * Limpia todo el cache de TTS
 */
export async function clearTTSCache(): Promise<void> {
  try {
    if (typeof indexedDB !== 'undefined') {
      const db = await openDatabase();
      if (db.objectStoreNames.contains(STORE_NAME)) {
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const req = tx.objectStore(STORE_NAME).clear();
          req.onsuccess = () => { db.close(); resolve(); };
          req.onerror = () => { db.close(); reject(req.error); };
        });
      }
    }
    // También limpiar fallback de localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('tts:')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('[Cache] Error al limpiar:', error);
  }
}

// ============ FALLBACK: localStorage (para cuando IndexedDB falla) ============

async function fallbackCache(key: string, blob: Blob): Promise<void> {
  try {
    // localStorage tiene límite ~5MB, así que solo cacheamos audios pequeños
    if (blob.size > 2 * 1024 * 1024) { // 2MB límite
      console.warn('[Fallback] Audio muy grande para localStorage');
      return;
    }
    
    const base64 = await blobToBase64(blob);
    localStorage.setItem(`tts:${key}`, base64);
  } catch (error) {
    // Si localStorage está lleno o bloqueado, simplemente ignoramos
    console.warn('[Fallback] No se pudo guardar en localStorage:', error);
  }
}

async function fallbackGet(key: string): Promise<Blob | null> {
  try {
    const base64 = localStorage.getItem(`tts:${key}`);
    if (base64) {
      return await base64ToBlob(base64, 'audio/mpeg');
    }
  } catch (error) {
    console.warn('[Fallback] Error al recuperar de localStorage:', error);
  }
  return null;
}

// ============ HELPERS DE CONVERSIÓN ============

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // FileReader devuelve "audio/mpeg;base64,XXXX", extraemos solo el base64
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function base64ToBlob(base64: string, mimeType: string): Promise<Blob> {
  // Reconstruir el data URL completo
  const dataUrl = `${mimeType};base64,${base64}`;
  const response = await fetch(dataUrl);
  return await response.blob();
}

// ============ UTILIDADES DE FORMATO Y CÁLCULO ============

/**
 * Formatea duración en MM:SS
 */
export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Calcula el costo estimado en USD (referencial ElevenLabs)
 * Plan Creator: ~$0.30 USD por 1K caracteres
 */
export function estimateCost(characterCount: number): number {
  const COST_PER_1K = 0.30;
  return (characterCount / 1000) * COST_PER_1K;
}

/**
 * Estima duración en segundos (promedio: 15 caracteres/segundo en español)
 */
export function estimateDuration(characterCount: number, speedMultiplier = 1.0): number {
  const BASE_CHARS_PER_SECOND = 15;
  return Math.ceil(characterCount / (BASE_CHARS_PER_SECOND * speedMultiplier));
}

// ============ PRESETS DE CONFIGURACIÓN POR ESTILO ============

export const TTS_PRESETS: Record<string, TTSSettings> = {
  // 🎙️ Estándar / Profesional
  profesional: {
    stability: 0.65,      // Consistente y claro
    similarityBoost: 0.85, // Fiel a la voz original
    style: 0.2,           // Neutral, sin excesos emocionales
    speed: 1.0,           // Velocidad normal
  },
  
  // 📖 Narrativo / Audiolibro
  narrativo: {
    stability: 0.35,      // Más variación para contar historias
    similarityBoost: 0.75, // Balance entre naturalidad y fidelidad
    style: 0.5,           // Expresividad moderada
    speed: 0.95,          // Ligeramente lento para mejor comprensión
  },
  
  // 📣 Publicitario / Marketing
  publicitario: {
    stability: 0.3,       // Dinámico y variado
    similarityBoost: 0.8,  // Mantiene identidad de marca
    style: 0.7,           // Energético y persuasivo
    speed: 1.1,           // Un poco más rápido para mantener atención
  },
  
  // 🎧 Podcast / Conversacional
  podcast: {
    stability: 0.4,       // Natural pero consistente
    similarityBoost: 0.9,  // Muy fiel a la voz base
    style: 0.4,           // Conversacional, cercano
    speed: 1.0,           // Ritmo de conversación normal
  },
  
  // ✨ NUEVO: Voz suave, dulce y seductora
  seductora: {
    stability: 0.25,        // ← Bajo = más variación emocional, susurros, respiraciones
    similarityBoost: 0.82,  // ← Alto = mantiene la calidez característica de la voz
    style: 0.75,            // ← Alto = más expresividad, pausas dramáticas, intención
    speed: 0.88,            // ← Ligeramente lento = más íntimo y deliberado
  },
  
  // 🤫 Susurro íntimo
  susurro: {
    stability: 0.15,        // Máxima variación para efecto de susurro
    similarityBoost: 0.9,   // Mantener esencia de la voz
    style: 0.9,             // Máxima expresividad emocional
    speed: 0.75,            // Muy lento para efecto íntimo
  },
  
  // 🫶 Cariñoso / Amigable
  cariñosa: {
    stability: 0.3,         // Cálido y natural
    similarityBoost: 0.85,  // Fidelidad con calidez
    style: 0.6,             // Expresivo pero no exagerado
    speed: 0.92,            // Suave y pausado
  },
};

// ============ FUNCIONES HELPER PARA PRESETS ============

/**
 * Aplica el preset "seductora" a cualquier configuración base
 * Asegura que los parámetros estén en el rango óptimo
 */
export function applySeductoraPreset(settings: TTSSettings): TTSSettings {
  return {
    stability: Math.min(settings.stability, 0.30),     // Nunca > 0.30 para más naturalidad
    similarityBoost: Math.max(settings.similarityBoost, 0.80), // Nunca < 0.80 para calidez
    style: Math.max(settings.style, 0.70),             // Nunca < 0.70 para expresividad
    speed: Math.min(Math.max(settings.speed, 0.85), 0.92), // Entre 0.85 y 0.92 para ritmo íntimo
  };
}

/**
 * Aplica el preset "susurro" a cualquier configuración base
 */
export function applySusurroPreset(settings: TTSSettings): TTSSettings {
  return {
    stability: Math.min(settings.stability, 0.20),
    similarityBoost: Math.max(settings.similarityBoost, 0.85),
    style: Math.max(settings.style, 0.85),
    speed: Math.min(Math.max(settings.speed, 0.70), 0.80),
  };
}

/**
 * Obtiene el nombre legible de un preset
 */
export function getPresetName(presetKey: string): string {
  const names: Record<string, string> = {
    profesional: 'Profesional',
    narrativo: 'Narrativo',
    publicitario: 'Publicitario',
    podcast: 'Podcast',
    seductora: '✨ Seductor',
    susurro: '🤫 Susurro',
    cariñosa: '🫶 Cariñoso',
  };
  return names[presetKey] || presetKey;
}

/**
 * Obtiene el emoji/icono de un preset para la UI
 */
export function getPresetIcon(presetKey: string): string {
  const icons: Record<string, string> = {
    profesional: '💼',
    narrativo: '📖',
    publicitario: '📣',
    podcast: '🎧',
    seductora: '🌙',
    susurro: '🤫',
    cariñosa: '🫶',
  };
  return icons[presetKey] || '🎙️';
}

// ============ FUNCIONES DE DEBUG (solo desarrollo) ============

/**
 * Función de diagnóstico para debuggear el cache en desarrollo
 * Se expone en window.debugTTSCache para usar desde consola
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).debugTTSCache = async () => {
    console.log('=== 🎧 TTS Cache Debug ===');
    
    // IndexedDB
    if (typeof indexedDB !== 'undefined') {
      try {
        const db = await openDatabase();
        console.log('📦 DB:', DB_NAME, '| Versión:', db.version);
        console.log('🗄️ Stores:', Array.from(db.objectStoreNames));
        
        if (db.objectStoreNames.contains(STORE_NAME)) {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.getAllKeys();
          req.onsuccess = () => {
            console.log('🔑 Keys en cache:', req.result);
            db.close();
          };
        } else {
          console.log('⚠️ Store no encontrado');
        }
        db.close();
      } catch (e) {
        console.error('❌ Error debug DB:', e);
      }
    } else {
      console.log('⚠️ IndexedDB no disponible');
    }
    
    // localStorage fallback
    const lsKeys = Object.keys(localStorage).filter(k => k.startsWith('tts:'));
    console.log('💾 Keys en localStorage fallback:', lsKeys.length);
    
    console.log('=== Fin Debug ===\n');
  };
  
  console.log('💡 Tip: Usá window.debugTTSCache() en consola para ver el estado del cache');
}