import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuration pour GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/greenworld-tshirt/' : '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimisations pour un build plus léger
    minify: 'esbuild', // Plus rapide que terser
    rollupOptions: {
      output: {
        // Code splitting pour charger uniquement ce qui est nécessaire
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    // Réduire la taille du CSS
    cssMinify: 'esbuild',
    // Optimiser les images
    assetsInlineLimit: 2048, // Inline les petites images en base64
    // Compression
    reportCompressedSize: true,
  },
  // Optimisations pour le dev
  server: {
    // Précharger les modules pour des temps de chargement plus rapides
    fs: {
      // Restreindre l'accès aux fichiers pour la sécurité
      strict: true,
    },
  },
})
