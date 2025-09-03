'use client';

import { useState } from 'react';
import { validateContactForm } from '../../lib/utils/validators';
import { sanitizeInput, sanitizePhone, sanitizeEmail } from '../../lib/utils/validators';
import type { Locale } from '../../lib/types/property';

interface ContactFormProps {
  locale: Locale;
  propertyName?: string;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<boolean>;
  variant?: 'default' | 'compact' | 'inline';
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyInterest?: string;
  contactPreference?: 'email' | 'phone' | 'whatsapp';
  gdprConsent: boolean;
}

export function ContactForm({ 
  locale = 'pt', 
  propertyName,
  className = '',
  onSubmit,
  variant = 'default'
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyInterest: propertyName || '',
    contactPreference: 'email',
    gdprConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const translations = {
    pt: {
      title: 'Entre em Contato',
      name: 'Nome Completo',
      email: 'Email',
      phone: 'Telefone (opcional)',
      message: 'Mensagem',
      propertyInterest: 'Imóvel de Interesse',
      contactPreference: 'Preferência de Contato',
      contactEmail: 'Email',
      contactPhone: 'Telefone',
      contactWhatsapp: 'WhatsApp',
      gdprConsent: 'Concordo com o tratamento dos meus dados pessoais conforme a política de privacidade',
      submit: 'Enviar Mensagem',
      submitting: 'Enviando...',
      successMessage: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      errorMessage: 'Erro ao enviar mensagem. Tente novamente.',
      requiredField: 'Este campo é obrigatório',
      defaultMessage: 'Olá, tenho interesse em obter mais informações sobre este imóvel.'
    },
    en: {
      title: 'Get in Touch',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone (optional)',
      message: 'Message',
      propertyInterest: 'Property of Interest',
      contactPreference: 'Contact Preference',
      contactEmail: 'Email',
      contactPhone: 'Phone',
      contactWhatsapp: 'WhatsApp',
      gdprConsent: 'I agree to the processing of my personal data according to the privacy policy',
      submit: 'Send Message',
      submitting: 'Sending...',
      successMessage: 'Message sent successfully! We will contact you soon.',
      errorMessage: 'Error sending message. Please try again.',
      requiredField: 'This field is required',
      defaultMessage: 'Hello, I am interested in getting more information about this property.'
    },
    es: {
      title: 'Póngase en Contacto',
      name: 'Nombre Completo',
      email: 'Email',
      phone: 'Teléfono (opcional)',
      message: 'Mensaje',
      propertyInterest: 'Propiedad de Interés',
      contactPreference: 'Preferencia de Contacto',
      contactEmail: 'Email',
      contactPhone: 'Teléfono',
      contactWhatsapp: 'WhatsApp',
      gdprConsent: 'Acepto el tratamiento de mis datos personales según la política de privacidad',
      submit: 'Enviar Mensaje',
      submitting: 'Enviando...',
      successMessage: 'Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
      errorMessage: 'Error al enviar mensaje. Inténtelo de nuevo.',
      requiredField: 'Este campo es obligatorio',
      defaultMessage: 'Hola, estoy interesado en obtener más información sobre esta propiedad.'
    },
    de: {
      title: 'Kontakt aufnehmen',
      name: 'Vollständiger Name',
      email: 'E-Mail',
      phone: 'Telefon (optional)',
      message: 'Nachricht',
      propertyInterest: 'Interessante Immobilie',
      contactPreference: 'Kontaktpräferenz',
      contactEmail: 'E-Mail',
      contactPhone: 'Telefon',
      contactWhatsapp: 'WhatsApp',
      gdprConsent: 'Ich stimme der Verarbeitung meiner persönlichen Daten gemäß der Datenschutzrichtlinie zu',
      submit: 'Nachricht senden',
      submitting: 'Senden...',
      successMessage: 'Nachricht erfolgreich gesendet! Wir werden uns bald bei Ihnen melden.',
      errorMessage: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.',
      requiredField: 'Dieses Feld ist erforderlich',
      defaultMessage: 'Hallo, ich interessiere mich für weitere Informationen zu dieser Immobilie.'
    }
  };

  const t = translations[locale];

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'name' || field === 'message' 
        ? sanitizeInput(value as string)
        : field === 'email'
        ? sanitizeEmail(value as string)
        : field === 'phone'
        ? sanitizePhone(value as string)
        : value
    }));

    // Limpar erro quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validar formulário
    const validation = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    }, locale);

    // Validar GDPR
    if (!formData.gdprConsent) {
      validation.errors.gdprConsent = t.requiredField;
      validation.isValid = false;
    }

    setErrors(validation.errors);

    if (validation.isValid) {
      try {
        // Se há função onSubmit personalizada, usar ela
        if (onSubmit) {
          const success = await onSubmit(formData);
          setSubmitStatus(success ? 'success' : 'error');
        } else {
          // Simular envio padrão
          await simulateSubmit();
          setSubmitStatus('success');
          
          // Limpar formulário
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            propertyInterest: propertyName || '',
            contactPreference: 'email',
            gdprConsent: false
          });
        }
      } catch (error) {
        setSubmitStatus('error');
      }
    }
    
    setIsSubmitting(false);
  };

  const simulateSubmit = () => {
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  // Definir estilos baseado na variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'p-4',
          input: 'py-2 text-sm',
          button: 'py-2 text-sm'
        };
      case 'inline':
        return {
          container: 'p-3',
          input: 'py-2 text-sm',
          button: 'py-2 text-sm'
        };
      default:
        return {
          container: 'p-6',
          input: 'py-3',
          button: 'py-3'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`bg-white rounded-lg shadow-lg ${styles.container} ${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {t.title}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.name} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`
              w-full px-4 ${styles.input} border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.name ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="João Silva"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.email} *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`
              w-full px-4 ${styles.input} border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.email ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="joao@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.phone}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`
              w-full px-4 ${styles.input} border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.phone ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="+351 123 456 789"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Imóvel de Interesse */}
        {propertyName && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.propertyInterest}
            </label>
            <input
              type="text"
              value={formData.propertyInterest}
              onChange={(e) => handleInputChange('propertyInterest', e.target.value)}
              className={`w-full px-4 ${styles.input} border border-gray-300 rounded-md bg-gray-50`}
              readOnly
            />
          </div>
        )}

        {/* Preferência de Contato */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.contactPreference}
          </label>
          <div className="flex space-x-4">
            {(['email', 'phone', 'whatsapp'] as const).map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  value={option}
                  checked={formData.contactPreference === option}
                  onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">
                  {option === 'email' && t.contactEmail}
                  {option === 'phone' && t.contactPhone}
                  {option === 'whatsapp' && t.contactWhatsapp}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Mensagem */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.message} *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            className={`
              w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none
              ${errors.message ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder={t.defaultMessage}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        {/* GDPR Consent */}
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.gdprConsent}
              onChange={(e) => handleInputChange('gdprConsent', e.target.checked)}
              className={`mt-1 mr-3 ${errors.gdprConsent ? 'border-red-500' : ''}`}
            />
            <span className="text-xs text-gray-600">
              {t.gdprConsent}
            </span>
          </label>
          {errors.gdprConsent && (
            <p className="text-red-500 text-xs mt-1">{errors.gdprConsent}</p>
          )}
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full ${styles.button} px-4 rounded-md font-medium transition-colors
            ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            } text-white
          `}
        >
          {isSubmitting ? t.submitting : t.submit}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">
              ✅ {t.successMessage}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">
              ❌ {t.errorMessage}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}