import React, { useState, useRef, useEffect } from 'react';
import { getAssetPath } from '../lib/assets';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function OptimizedImage({ src, alt, className, style }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Préférer WebP si supporté, fallback vers l'image originale
  const getOptimizedSrc = (originalSrc: string) => {
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    };

    // Résoudre le chemin avec la base URL
    const resolvedSrc = getAssetPath(originalSrc);

    if (supportsWebP()) {
      // Remplacer .jpg par .webp si on avait des versions WebP
      return resolvedSrc.replace(/\.(jpg|jpeg)$/i, '.webp');
    }
    return resolvedSrc;
  };

  return (
    <div
      ref={imgRef}
      className={className}
      style={{
        ...style,
        backgroundColor: '#0a0a0a', // Couleur de fond pendant le chargement
        backgroundImage: isInView && isLoaded ? `url(${getAssetPath(src)})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.3,
      }}
    >
      {/* Image cachée pour précharger et détecter le chargement */}
      {isInView && (
        <img
          src={getOptimizedSrc(src)}
          alt={alt}
          style={{ display: 'none' }}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            // Fallback vers l'image originale en cas d'erreur
            setIsLoaded(true);
          }}
        />
      )}
      
      {/* Indicateur de chargement minimal */}
      {isInView && !isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#10b981',
            fontSize: '14px',
            opacity: 0.7,
          }}
        >
          Chargement...
        </div>
      )}
    </div>
  );
}