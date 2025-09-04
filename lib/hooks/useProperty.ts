'use client';

import { useState } from 'react';

export interface PropertyConfig {
  basic: {
    name: string;
    type: 'villa' | 'apartment' | 'house' | 'condo';
    bedrooms: number;
    bathrooms: number;
    area: number;
    maxGuests: number;
    location: {
      city: string;
      state: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    pricePerNight: {
      low: number;
      mid: number;
      high: number;
    };
  };
  media: {
    mainImage: string;
    gallery: string[];
    virtualTour?: string;
  };
  amenities: string[];
  description: {
    short: string;
    full: string;
    highlights: string[];
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    pets: boolean;
    smoking: boolean;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Configuração padrão
const defaultConfig: PropertyConfig = {
  basic: {
    name: 'Villa Sunshine',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    maxGuests: 8,
    location: {
      city: 'Florianópolis',
      state: 'Santa Catarina',
      country: 'Brasil',
      coordinates: {
        lat: -27.5954,
        lng: -48.5480
      }
    },
    pricePerNight: {
      low: 250,
      mid: 350,
      high: 450
    }
  },
  media: {
    mainImage: '/images/villa-main.jpg',
    gallery: [
      '/images/villa-1.jpg',
      '/images/villa-2.jpg',
      '/images/villa-3.jpg'
    ]
  },
  amenities: [
    'Wi-Fi gratuito',
    'Piscina',
    'Churrasqueira',
    'Estacionamento',
    'Ar condicionado'
  ],
  description: {
    short: 'Villa exclusiva com vista para o mar',
    full: 'Uma villa luxuosa com todas as comodidades para uma estadia perfeita.',
    highlights: [
      'Vista panorâmica',
      'Piscina privativa',
      'Localização privilegiada'
    ]
  },
  contact: {
    phone: '+55 48 9999-9999',
    email: 'contato@villasunshine.com'
  },
  policies: {
    checkIn: '15:00',
    checkOut: '11:00',
    cancellation: 'Cancelamento gratuito até 24h antes',
    pets: false,
    smoking: false
  },
  seo: {
    title: 'Villa Sunshine - Aluguel por Temporada',
    description: 'Villa exclusiva em Florianópolis para aluguel por temporada.',
    keywords: ['villa', 'aluguel', 'temporada', 'florianópolis']
  }
};

export function useProperty() {
  const [config] = useState<PropertyConfig>(defaultConfig);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return {
    config,
    loading,
    error,
    updateConfig: (newConfig: Partial<PropertyConfig>) => {
      // Para uma versão simples, apenas retorna a config atual
      // Em produção, você pode implementar a lógica de update
      return { ...config, ...newConfig };
    }
  };
}