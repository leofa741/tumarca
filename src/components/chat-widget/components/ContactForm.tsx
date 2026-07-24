'use client';

import { useState } from 'react';
import { ContactFormData } from '../types';
import styles from '../ChatWidget.module.css';
import Swal from 'sweetalert2';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface ContactFormProps {
  onSwitchToChat: () => void;
}

export default function ContactForm({ onSwitchToChat }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    proyecto: '',
    servicios_interes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro Exitoso!',
          text: 'Hemos recibido tu información. Nuestro equipo te contactará pronto.',
          confirmButtonColor: '#6366f1'
        });
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          proyecto: '',
          servicios_interes: ''
        });
        onSwitchToChat();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al enviar. Por favor, intenta nuevamente.',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Por favor, verifica tu conexión a internet.',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="nombre">Nombre *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="empresa">Empresa</label>
        <input
          type="text"
          id="empresa"
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
        />
      </div>

      {/* ✅ NUEVO CAMPO: Servicios de interés para el Scoring */}
      <div className={styles.formGroup}>
        <label htmlFor="servicios_interes">Servicios de interés</label>
        <input
          type="text"
          id="servicios_interes"
          name="servicios_interes"
          placeholder="Ej: ecommerce, web_basica, seo, app_movil"
          value={formData.servicios_interes}
          onChange={handleChange}
        />
        <small style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '4px', display: 'block' }}>
          Separa los servicios con comas para una mejor atención.
        </small>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="proyecto">¿Qué necesitas? (Detalles del proyecto)</label>
        <textarea
          id="proyecto"
          name="proyecto"
          rows={3}
          placeholder="Cuéntanos brevemente sobre tu proyecto..."
          value={formData.proyecto}
          onChange={handleChange}
        />
      </div>
      
      <button 
        type="submit" 
        className={styles.submit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
      </button>
    </form>
  );
}