/**
 * Utilitaires pour gérer les chemins d'assets en fonction de l'environnement
 */


export const getBaseUrl = (): string => {
  return import.meta.env.BASE_URL || '/';
};


export const getAssetPath = (path: string): string => {
  const baseUrl = getBaseUrl();
  
  // Supprimer le slash initial de path s'il existe pour éviter les doubles slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combiner base URL et path
  const fullPath = baseUrl + cleanPath;
  
  // Nettoyer les doubles slashes (sauf pour http://)
  return fullPath.replace(/([^:]\/)\/+/g, '$1');
};


export const isDev = (): boolean => {
  return import.meta.env.DEV;
};


export const isProd = (): boolean => {
  return import.meta.env.PROD;
};