import type { Locale } from '../types/property';

// === TIPOS DE VALIDAÇÃO ===
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// === MENSAGENS DE ERRO LOCALIZADAS ===
const errorMessages = {
  pt: {
    required: 'Este campo é obrigatório',
    email: 'Email inválido',
    phone: 'Telefone inválido',
    minLength: 'Mínimo de {min} caracteres',
    maxLength: 'Máximo de {max} caracteres',
    numeric: 'Deve ser um número',
    positiveNumber: 'Deve ser um número positivo',
    dateFormat: 'Data inválida',
    priceRange: 'Preço deve estar entre {min} e {max}',
    areaRange: 'Área deve estar entre {min}m² e {max}m²',
    url: 'URL inválida',
    whatsapp: 'Número do WhatsApp inválido'
  },
  en: {
    required: 'This field is required',
    email: 'Invalid email',
    phone: 'Invalid phone number',
    minLength: 'Minimum {min} characters',
    maxLength: 'Maximum {max} characters',
    numeric: 'Must be a number',
    positiveNumber: 'Must be a positive number',
    dateFormat: 'Invalid date',
    priceRange: 'Price must be between {min} and {max}',
    areaRange: 'Area must be between {min}m² and {max}m²',
    url: 'Invalid URL',
    whatsapp: 'Invalid WhatsApp number'
  },
  es: {
    required: 'Este campo es obligatorio',
    email: 'Email inválido',
    phone: 'Teléfono inválido',
    minLength: 'Mínimo {min} caracteres',
    maxLength: 'Máximo {max} caracteres',
    numeric: 'Debe ser un número',
    positiveNumber: 'Debe ser un número positivo',
    dateFormat: 'Fecha inválida',
    priceRange: 'El precio debe estar entre {min} y {max}',
    areaRange: 'El área debe estar entre {min}m² y {max}m²',
    url: 'URL inválida',
    whatsapp: 'Número de WhatsApp inválido'
  },
  de: {
    required: 'Dieses Feld ist erforderlich',
    email: 'Ungültige E-Mail',
    phone: 'Ungültige Telefonnummer',
    minLength: 'Mindestens {min} Zeichen',
    maxLength: 'Maximal {max} Zeichen',
    numeric: 'Muss eine Zahl sein',
    positiveNumber: 'Muss eine positive Zahl sein',
    dateFormat: 'Ungültiges Datum',
    priceRange: 'Preis muss zwischen {min} und {max} liegen',
    areaRange: 'Fläche muss zwischen {min}m² und {max}m² liegen',
    url: 'Ungültige URL',
    whatsapp: 'Ungültige WhatsApp-Nummer'
  }
};

function getMessage(key: keyof typeof errorMessages.pt, locale: Locale = 'pt', replacements?: Record<string, string | number>): string {
  let message = errorMessages[locale][key];
  
  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      message = message.replace(`{${placeholder}}`, String(value));
    });
  }
  
  return message;
}

// === VALIDADORES BÁSICOS ===
export function validateRequired(value: string, locale: Locale = 'pt'): ValidationResult {
  const isValid = value.trim().length > 0;
  return {
    isValid,
    error: isValid ? undefined : getMessage('required', locale)
  };
}

export function validateEmail(email: string, locale: Locale = 'pt'): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email.trim());
  return {
    isValid,
    error: isValid ? undefined : getMessage('email', locale)
  };
}

export function validatePhone(phone: string, locale: Locale = 'pt'): ValidationResult {
  // Remove todos os caracteres não numéricos exceto +
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // Deve ter entre 9 e 15 dígitos, podendo começar com +
  const phoneRegex = /^\+?[1-9]\d{8,14}$/;
  const isValid = phoneRegex.test(cleanPhone);
  
  return {
    isValid,
    error: isValid ? undefined : getMessage('phone', locale)
  };
}

export function validateWhatsApp(whatsapp: string, locale: Locale = 'pt'): ValidationResult {
  // Remove todos os caracteres não numéricos
  const cleanWhatsApp = whatsapp.replace(/[^\d]/g, '');
  
  // Deve ter entre 10 e 15 dígitos
  const isValid = cleanWhatsApp.length >= 10 && cleanWhatsApp.length <= 15;
  
  return {
    isValid,
    error: isValid ? undefined : getMessage('whatsapp', locale)
  };
}

export function validateUrl(url: string, locale: Locale = 'pt'): ValidationResult {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: getMessage('url', locale)
    };
  }
}

export function validateMinLength(value: string, minLength: number, locale: Locale = 'pt'): ValidationResult {
  const isValid = value.trim().length >= minLength;
  return {
    isValid,
    error: isValid ? undefined : getMessage('minLength', locale, { min: minLength })
  };
}

export function validateMaxLength(value: string, maxLength: number, locale: Locale = 'pt'): ValidationResult {
  const isValid = value.trim().length <= maxLength;
  return {
    isValid,
    error: isValid ? undefined : getMessage('maxLength', locale, { max: maxLength })
  };
}

export function validateNumeric(value: string, locale: Locale = 'pt'): ValidationResult {
  const isValid = !isNaN(Number(value)) && value.trim() !== '';
  return {
    isValid,
    error: isValid ? undefined : getMessage('numeric', locale)
  };
}

export function validatePositiveNumber(value: string, locale: Locale = 'pt'): ValidationResult {
  const num = Number(value);
  const isValid = !isNaN(num) && num > 0;
  return {
    isValid,
    error: isValid ? undefined : getMessage('positiveNumber', locale)
  };
}

export function validatePriceRange(value: string, min: number, max: number, locale: Locale = 'pt'): ValidationResult {
  const num = Number(value);
  const isValid = !isNaN(num) && num >= min && num <= max;
  return {
    isValid,
    error: isValid ? undefined : getMessage('priceRange', locale, { min, max })
  };
}

export function validateAreaRange(value: string, min: number, max: number, locale: Locale = 'pt'): ValidationResult {
  const num = Number(value);
  const isValid = !isNaN(num) && num >= min && num <= max;
  return {
    isValid,
    error: isValid ? undefined : getMessage('areaRange', locale, { min, max })
  };
}

// === VALIDADORES COMPOSTOS ===
export function validateContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}, locale: Locale = 'pt'): FormValidationResult {
  const errors: Record<string, string> = {};
  
  // Validar nome
  const nameValidation = validateRequired(data.name, locale);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error!;
  } else {
    const minLengthValidation = validateMinLength(data.name, 2, locale);
    if (!minLengthValidation.isValid) {
      errors.name = minLengthValidation.error!;
    }
  }
  
  // Validar email
  const emailValidation = validateEmail(data.email, locale);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }
  
  // Validar telefone (se fornecido)
  if (data.phone && data.phone.trim()) {
    const phoneValidation = validatePhone(data.phone, locale);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error!;
    }
  }
  
  // Validar mensagem
  const messageValidation = validateRequired(data.message, locale);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error!;
  } else {
    const minLengthValidation = validateMinLength(data.message, 10, locale);
    if (!minLengthValidation.isValid) {
      errors.message = minLengthValidation.error!;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateScheduleVisitForm(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
}, locale: Locale = 'pt'): FormValidationResult {
  const errors: Record<string, string> = {};
  
  // Validar dados básicos usando validador de contato
  const contactValidation = validateContactForm({
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message || 'Visit request'
  }, locale);
  
  Object.assign(errors, contactValidation.errors);
  
  // Validar data
  const dateValidation = validateRequired(data.date, locale);
  if (!dateValidation.isValid) {
    errors.date = dateValidation.error!;
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = 'Data deve ser futura';
    }
  }
  
  // Validar hora
  const timeValidation = validateRequired(data.time, locale);
  if (!timeValidation.isValid) {
    errors.time = timeValidation.error!;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateMortgageCalculatorForm(data: {
  propertyPrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
}, locale: Locale = 'pt'): FormValidationResult {
  const errors: Record<string, string> = {};
  
  // Validar preço da propriedade
  const priceValidation = validatePriceRange(data.propertyPrice, 10000, 50000000, locale);
  if (!priceValidation.isValid) {
    errors.propertyPrice = priceValidation.error!;
  }
  
  // Validar entrada (0-90%)
  const downPaymentNum = Number(data.downPayment);
  if (isNaN(downPaymentNum) || downPaymentNum < 0 || downPaymentNum > 90) {
    errors.downPayment = 'Entrada deve ser entre 0% e 90%';
  }
  
  // Validar taxa de juros (0.1-20%)
  const interestRateNum = Number(data.interestRate);
  if (isNaN(interestRateNum) || interestRateNum < 0.1 || interestRateNum > 20) {
    errors.interestRate = 'Taxa deve ser entre 0.1% e 20%';
  }
  
  // Validar prazo do empréstimo (1-50 anos)
  const loanTermNum = Number(data.loanTerm);
  if (isNaN(loanTermNum) || loanTermNum < 1 || loanTermNum > 50) {
    errors.loanTerm = 'Prazo deve ser entre 1 e 50 anos';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// === SANITIZAÇÃO DE DADOS ===
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>\"'&]/g, '');
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+\-\s()]/g, '');
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}