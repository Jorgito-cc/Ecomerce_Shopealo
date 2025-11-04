import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx' // o './App' si no tienes carpeta /app
import './index.css'

// 👇 Registrar el Service Worker de PWA
import { registerSW } from 'virtual:pwa-register'

// Configuración del Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('⚡ Nueva versión disponible. ¿Actualizar ahora?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('✅ La app está lista para funcionar sin conexión.')
  },
})

// Renderizado principal
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
