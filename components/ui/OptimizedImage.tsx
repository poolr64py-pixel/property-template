'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  className = '',
  style,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
  placeholder = 'blur',
  blurDataURL,
  quality = 85
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Gerar blur placeholder se não fornecido
  const generateBlurDataURL = (width: number = 10, height: number = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || generateBlurDataURL();

  // Fallback para imagens que não carregam
  const fallbackImages = [
    '/images/placeholder-property.jpg',
    '/images/no-image.jpg',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzY5NzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg=='
  ];

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    // Tentar próxima imagem de fallback
    const currentIndex = fallbackImages.indexOf(imageSrc);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < fallbackImages.length) {
      setImageSrc(fallbackImages[nextIndex]);
      setHasError(false);
    }
    
    onError?.();
  };

  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  // Componente de loading
  const LoadingPlaceholder = () => (
    <div 
      className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
      style={style}
    >
      <div className="text-gray-400">
        <svg 
          className="w-12 h-12" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    </div>
  );

  // Props para o componente Image do Next.js
  const imageProps = {
    src: imageSrc,
    alt,
    className,
    style: {
      objectFit,
      objectPosition,
      ...style
    },
    onLoad: handleLoad,
    onError: handleError,
    placeholder: placeholder as any,
    blurDataURL: defaultBlurDataURL,
    quality,
    sizes: sizes || fill ? '100vw' : undefined,
    priority
  };

  if (fill) {
    return (
      <div className="relative">
        {isLoading && <LoadingPlaceholder />}
        <Image
          {...imageProps}
          fill
          style={{
            ...imageProps.style,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        />
      </div>
    );
  }

  if (!width || !height) {
    console.warn('OptimizedImage: width e height são obrigatórios quando fill=false');
    return <LoadingPlaceholder />;
  }

  return (
    <div className="relative">
      {isLoading && <LoadingPlaceholder />}
      <Image
        {...imageProps}
        width={width}
        height={height}
        style={{
          ...imageProps.style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
}

// Componente para galeria de imagens otimizada
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    featured?: boolean;
  }>;
  className?: string;
  onImageClick?: (index: number) => void;
}

export function ImageGallery({ images, className = '', onImageClick }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    onImageClick?.(index);
  };

  if (images.length === 0) {
    return (
      <div className={`bg-gray-200 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500">Nenhuma imagem disponível</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className}`}>
      {/* Imagem principal */}
      <div className="md:col-span-3 relative aspect-video cursor-pointer">
        <OptimizedImage
          src={images[currentIndex]?.src}
          alt={images[currentIndex]?.alt}
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className="rounded-lg hover:opacity-90 transition-opacity"
          onClick={() => handleImageClick(currentIndex)}
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 md:grid-cols-1 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className={`
              relative aspect-square cursor-pointer rounded-lg overflow-hidden
              ${index === currentIndex ? 'ring-2 ring-blue-500' : ''}
              hover:opacity-80 transition-opacity
            `}
            onClick={() => handleImageClick(index)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="150px"
              className="object-cover"
            />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold">
                  +{images.length - 4}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Hook para otimização de imagens
export function useImageOptimization() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verificar suporte para formatos modernos
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('webp') !== -1;
    };

    const checkAVIFSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/avif').indexOf('avif') !== -1;
    };

    setIsSupported({
      webp: checkWebPSupport(),
      avif: checkAVIFSupport()
    } as any);
  }, []);

  const getOptimizedSrc = (originalSrc: string, width?: number, quality = 85) => {
    // Se for uma imagem externa, retornar como está
    if (originalSrc.startsWith('http')) {
      return originalSrc;
    }

    // Para imagens locais, adicionar parâmetros de otimização
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());
    
    return `${originalSrc}?${params.toString()}`;
  };

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  };

  const preloadImages = async (srcs: string[]) => {
    try {
      await Promise.all(srcs.map(preloadImage));
    } catch (error) {
      console.warn('Erro ao pré-carregar imagens:', error);
    }
  };

  return {
    isSupported,
    getOptimizedSrc,
    preloadImage,
    preloadImages
  };
}