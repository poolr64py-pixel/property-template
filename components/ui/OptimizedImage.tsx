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
  onClick?: () => void; // ADICIONADO
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
  onClick, // ADICIONADO
  placeholder = 'blur',
  blurDataURL,
  quality = 85
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const generateBlurDataURL = () => {
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  };

  const defaultBlurDataURL = blurDataURL || generateBlurDataURL();

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={style}
        onClick={onClick}
      >
        <span className="text-gray-500">Imagem não disponível</span>
      </div>
    );
  }

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
    sizes: sizes || (fill ? '100vw' : undefined),
    priority
  };

  if (fill) {
    return (
      <div 
        className="relative"
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <Image
          {...imageProps}
          fill
        />
      </div>
    );
  }

  if (!width || !height) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={style}
        onClick={onClick}
      >
        <span className="text-gray-500">Dimensões obrigatórias</span>
      </div>
    );
  }

  return (
    <div 
      className="relative"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    </div>
  );
}