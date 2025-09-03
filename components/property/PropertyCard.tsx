'use client';

import { useState } from 'react';
import type { PropertyData, PropertyContent, Locale } from '../../lib/types/property';
import { formatPrice, formatArea } from '../../lib/utils/formatters';
import { OptimizedImage } from '../ui/OptimizedImage';

interface PropertyCardProps {
  property: PropertyData;
  content: PropertyContent;
  locale: Locale;
  heroImage: string;
  className?: string;
  onClick?: () => void;
  showFavorite?: boolean;
  onFavoriteClick?: (propertyId: string) => void;
  isFavorite?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export function PropertyCard({
  property,
  content,
  locale,
  heroImage,
  className = '',
  onClick,
  showFavorite = false,
  onFavoriteClick,
  isFavorite = false,
  variant = 'default'
}: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formattedPrice = property.pricing.salePrice 
    ? formatPrice(property.pricing.salePrice, property.pricing.currency, locale)
    : property.pricing.rentPrice 
    ? `${formatPrice(property.pricing.rentPrice, property.pricing.currency, locale)}/mês`
    : 'Preço sob consulta';

  const formattedArea = formatArea(property.specs.area, locale);
  
  const pricePerSqm = property.pricing.salePrice 
    ? formatPrice(Math.round(property.pricing.salePrice / property.specs.area), property.pricing.currency, locale)
    : null;

  const statusLabels = {
    pt: {
      'for-sale': 'À Venda',
      'for-rent': 'Para Alugar',
      'sold': 'Vendido',
      'rented': 'Alugado'
    },
    en: {
      'for-sale': 'For Sale',
      'for-rent': 'For Rent',
      'sold': 'Sold',
      'rented': 'Rented'
    },
    es: {
      'for-sale': 'En Venta',
      'for-rent': 'Para Alquilar',
      'sold': 'Vendido',
      'rented': 'Alquilado'
    },
    de: {
      'for-sale': 'Zu Verkaufen',
      'for-rent': 'Zu Vermieten',
      'sold': 'Verkauft',
      'rented': 'Vermietet'
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          card: 'max-w-sm',
          image: 'h-48',
          content: 'p-3'
        };
      case 'featured':
        return {
          card: 'max-w-lg border-2 border-blue-200 shadow-xl',
          image: 'h-64',
          content: 'p-6'
        };
      default:
        return {
          card: 'max-w-md',
          image: 'h-56',
          content: 'p-4'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div 
      className={`
        ${styles.card} bg-white rounded-lg shadow-md hover:shadow-xl 
        transition-all duration-300 cursor-pointer border border-gray-200
        ${property.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        ${className}
      `}
      onClick={onClick}
      style={{
        transform: 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      }}
    >
      {/* Image Container */}
      <div className={`relative ${styles.image} overflow-hidden rounded-t-lg`}>
        {!imageError ? (
          <>
            <OptimizedImage
              src={heroImage}
              alt={content.title}
              fill
              style={{ objectFit: 'cover' }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Imagem não disponível</p>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span className={`
            px-2 py-1 text-xs font-semibold rounded-full
            ${property.status === 'for-sale' ? 'bg-green-100 text-green-800' : ''}
            ${property.status === 'for-rent' ? 'bg-blue-100 text-blue-800' : ''}
            ${property.status === 'sold' ? 'bg-gray-100 text-gray-800' : ''}
            ${property.status === 'rented' ? 'bg-gray-100 text-gray-800' : ''}
          `}>
            {statusLabels[locale][property.status]}
          </span>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-2 right-2">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-semibold rounded-full">
              ⭐ Destaque
            </span>
          </div>
        )}

        {/* Favorite Button */}
        {showFavorite && (
          <button
            className={`
              absolute bottom-2 right-2 p-2 rounded-full transition-all
              ${isFavorite 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white text-gray-400 hover:text-red-500'
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick?.(property.id);
            }}
          >
            <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}

        {/* Property Type */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {content.title}
        </h3>

        {/* Location */}
        <p className="text-gray-600 text-sm mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location.city}, {property.location.region}
        </p>

        {/* Specs */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
            </svg>
            {property.specs.bedrooms} quartos
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
            </svg>
            {property.specs.bathrooms} WC
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {formattedArea}
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.specs.pool && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">🏊‍♀️ Piscina</span>}
          {property.specs.garden && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🌳 Jardim</span>}
          {property.specs.parking && <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">🚗 Garagem</span>}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">{formattedPrice}</p>
            {pricePerSqm && (
              <p className="text-xs text-gray-500">{pricePerSqm}/m²</p>
            )}
          </div>
          
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}