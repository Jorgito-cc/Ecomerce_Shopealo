// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',        // <- clave para tu toggle
  theme: { extend: {} },
  // En v4 el "content" es opcional (escaneo automático).
  // Si tu setup es raro, puedes añadirlo:
  // content: ['./index.html','./src/**/*.{ts,tsx}'],
} satisfies Config
