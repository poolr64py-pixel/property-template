'use client';

import { motion } from 'framer-motion';
import { propertyConfig } from '@/config/property.config';
import { MapPin, Bed, Bath, Car, Maximize, Calendar, Home, Phone, Mail, MessageCircle, User, Check } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

export default function PropertyPage() {
  const { title, subtitle, description, price, location, features, images, amenities, agent } = propertyConfig;

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${title}. Gostaria de agendar uma visita.`);
    const whatsappNumber = agent.whatsapp?.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simples */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
          <button 
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Coluna da imagem - tamanho controlado */}
          <div className="space-y-6">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <OptimizedImage
                src={images.hero}
                alt={title}
                fill
                priority
                className="object-cover"
              />
            </div>
            
            {/* Galeria compacta */}
            <div className="grid grid-cols-4 gap-2">
              {images.gallery.slice(0, 4).map((image, index) => (
                <div key={index} className="relative h-20 rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={image}
                    alt={`Foto ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Coluna das informações */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600 mb-4">{subtitle}</p>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{location.address}, {location.city}</span>
              </div>
            </div>

            {/* Preço em destaque */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              {price.sale && (
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Venda:</span>
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(price.sale, price.currency)}
                  </div>
                </div>
              )}
              {price.rent && (
                <div>
                  <span className="text-sm text-gray-500">Aluguel:</span>
                  <div className="text-xl font-semibold text-blue-600">
                    {formatPrice(price.rent, price.currency)}/mês
                  </div>
                </div>
              )}
            </div>

            {/* Características em grid compacto */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Bed className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold">{features.bedrooms}</div>
                <div className="text-sm text-gray-500">Dormitórios</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Bath className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold">{features.bathrooms}</div>
                <div className="text-sm text-gray-500">Banheiros</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Maximize className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold">{features.area}m²</div>
                <div className="text-sm text-gray-500">Área</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Car className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold">{features.parking}</div>
                <div className="text-sm text-gray-500">Vagas</div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
              >
                Agendar Visita
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold">
                Mais Informações
              </button>
            </div>
          </div>
        </div>

        {/* Seções adicionais mais compactas */}
        <div className="mt-12 space-y-8">
          
          {/* Descrição */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Sobre o Imóvel</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Comodidades */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Comodidades</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Contato</h2>
            <div className="space-y-2">
              <p className="font-semibold">{agent.name}</p>
              <p className="text-gray-600">{agent.phone}</p>
              <p className="text-gray-600">{agent.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}