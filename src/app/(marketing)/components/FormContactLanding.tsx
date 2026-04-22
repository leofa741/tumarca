// components/FormContactLanding.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  business: string;
  phone?: string;
  message: string;
}

// ✅ Declaración de tipos para gtag (Google Ads)
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params: Record<string, unknown>
    ) => void;
  }
}

// ✅ Función helper para disparar conversión de Google Ads
const trackGoogleAdsConversion = (value: number = 1.0, currency: string = 'ARS') => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-18104438023/S9xOCM3f7Z4cEIea77hD',
      value: value,
      currency: currency,
      transaction_id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });
  }
};

export default function FormContactLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          subject: 'Nuevo lead - Sistema de Gestión Premium',
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      // ✅ DISPARAR CONVERSIÓN DE GOOGLE ADS (solo si el envío fue exitoso)
      trackGoogleAdsConversion(1.0, 'ARS');

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Vista de éxito post-envío
  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4">¡Mensaje enviado!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Te contactaremos en las próximas 24 horas.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  // ✅ Formulario principal
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nombre completo *
          </label>
          <input
            id="name"
            {...register('name', { required: 'El nombre es requerido' })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-amber-500'
            } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-amber-500'
            } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Negocio */}
        <div>
          <label htmlFor="business" className="block text-sm font-medium mb-2">
            Negocio *
          </label>
          <input
            id="business"
            {...register('business', {
              required: 'El nombre de tu negocio es requerido',
            })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.business
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-amber-500'
            } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="Nombre de tu empresa o emprendimiento"
          />
          {errors.business && (
            <p className="mt-1 text-sm text-red-500">
              {errors.business.message}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Teléfono (opcional)
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="+54 11 1234-5678"
          />
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          ¿Qué necesitás resolver? *
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message', {
            required: 'Por favor, contanos qué necesitás',
            minLength: {
              value: 20,
              message: 'Por favor, sé más específico (mínimo 20 caracteres)',
            },
          })}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-amber-500'
          } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          placeholder="Contanos sobre tu negocio y qué problemas querés resolver..."
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error message */}
      {submitError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-300">{submitError}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando....
          </span>
        ) : (
          'Enviar mensaje →'
        )}
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        ⚡ Respondemos en menos de 24 horas • Garantía 100% de satisfacción
      </p>
    </form>
  );
}