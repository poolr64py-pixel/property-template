// components/OptimizedImage.tsx
'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  onLoad?: () => void;
  lazy?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  lazy = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Componente de fallback para erro
  const ErrorFallback = () => (
    <div 
      className={`
        bg-gradient-to-br from-gray-100 to-gray-200 
        flex items-center justify-center
        ${className}
      `}
      style={{ width: width, height: height }}
    >
      <div className="text-center text-gray-400">
        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs">Imagem não disponível</p>
      </div>
    </div>
  );

  if (hasError) {
    return <ErrorFallback />;
  }

  const imageProps = {
    src,
    alt,
    quality,
    priority: !lazy || priority,
    placeholder: placeholder as any,
    onLoad: handleLoad,
    onError: handleError,
    style: {
      objectFit,
      objectPosition,
    },
    className: `
      transition-opacity duration-500 ease-in-out
      ${isLoaded ? 'opacity-100' : 'opacity-0'}
      ${className}
    `,
  };

  // Para imagens com fill, sempre usar um container com position relative
  if (fill) {
    return (
      <div className="relative w-full h-full">
        <Image
          {...imageProps}
          fill
          sizes={sizes}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>
    );
  }

  // Para imagens com dimensões fixas
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Image
        {...imageProps}
        width={width}
        height={height}
        sizes={sizes}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </motion.div>
  );
}

// Hook para otimização de imagem responsiva
export function useResponsiveImage(baseSrc: string) {
  const generateSrcSet = useCallback((src: string) => {
    // Se usando Cloudinary
    if (src.includes('cloudinary.com')) {
      return {
        mobile: src.replace('/upload/', '/upload/c_fill,w_640,h_480,q_auto,f_auto/'),
        tablet: src.replace('/upload/', '/upload/c_fill,w_1024,h_768,q_auto,f_auto/'),
        desktop: src.replace('/upload/', '/upload/c_fill,w_1920,h_1080,q_auto,f_auto/'),
      };
    }
    
    // Se usando ImageKit
    if (src.includes('imagekit.io')) {
      return {
        mobile: `${src}?tr=w-640,h-480,q-80,f-auto`,
        tablet: `${src}?tr=w-1024,h-768,q-80,f-auto`,
        desktop: `${src}?tr=w-1920,h-1080,q-80,f-auto`,
      };
    }
    
    // Fallback para imagens locais
    return {
      mobile: src,
      tablet: src,
      desktop: src,
    };
  }, []);

  return generateSrcSet(baseSrc);
}

// Componente para galeria otimizada
export function OptimizedGallery({ 
  images, 
  className = '' 
}: { 
  images: string[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {images.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="aspect-square relative overflow-hidden rounded-lg"
        >
          <OptimizedImage
            src={image}
            alt={`Imagem ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="hover:scale-110 transition-transform duration-300"
          />
        </motion.div>
      ))}
    </div>
  );
}