/**
 * Utilitaires pour gérer les chemins d'assets en fonction de l'environnement
 */

// Récupérer la base URL depuis l'import.meta (Vite)
export const getBaseUrl = (): string => {
  return import.meta.env.BASE_URL || '/';
};

// Construire un chemin d'asset complet
export const getAssetPath = (path: string): string => {
  const baseUrl = getBaseUrl();
  
  // Supprimer le slash initial de path s'il existe pour éviter les doubles slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combiner base URL et path
  const fullPath = baseUrl + cleanPath;
  
  // Nettoyer les doubles slashes (sauf pour http://)
  return fullPath.replace(/([^:]\/)\/+/g, '$1');
};

// Vérifier si on est en mode développement
export const isDev = (): boolean => {
  return import.meta.env.DEV;
};

// Vérifier si on est en production
export const isProd = (): boolean => {
  return import.meta.env.PROD;
};