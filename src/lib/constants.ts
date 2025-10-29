// Constantes de performance
export const ANIMATION_CONFIG = {
  duration: 0.45,
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
} as const;


export const IMAGE_TRANSITION_CONFIG = {
  duration: 0.8,
  ease: "easeInOut" as const,
} as const;


export const INTERSECTION_CONFIG = {
  threshold: 0.1,
  rootMargin: '50px',
} as const;


export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const;


export const DEBOUNCE_DELAYS = {
  scroll: 16, // 60fps
  resize: 100,
  search: 300,
} as const;


export const PERFORMANCE_CONFIG = {
  maxImageSize: 2048, // Taille max pour l'inline en base64
  lazyLoadOffset: 50, // Pixels avant le viewport pour charger
  prefetchCount: 1, // Nombre d'images à précharger
} as const;