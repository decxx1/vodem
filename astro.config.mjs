import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://vodem.com.ar/',
  build: {
    // Ejemplo: Genera `page.html` en lugar de `page/index.html` durante la compilación.
    format: 'file'
  },
  integrations: [react(), tailwind()],
  experimental: {
    env: {
      schema: {
        WHATSAPP_READBLE: envField.string({
          context:'client',
          access: 'public'
        }),
        WHATSAPP_LINKEABLE: envField.string({
          context:'client',
          access: 'public'
        }),
        TELPHONE_READBLE: envField.string({
          context:'client',
          access: 'public'
        }),
        TELPHONE_LINKEABLE: envField.string({
          context:'client',
          access: 'public'
        }),
        INSTAGRAM: envField.string({
          context:'client',
          access: 'public'
        }),
        LINKEDIN: envField.string({
          context:'client',
          access: 'public'
        }),
        EMAIL: envField.string({
          context:'client',
          access: 'public'
        }),
        ENDPOINT: envField.string({
          context:'client',
          access: 'public'
        }),
        SITE_KEY: envField.string({
          context:'client',
          access: 'public'
        }),
        SECRET_KEY: envField.string({
          context:'client',
          access: 'public'
        })
      }
    }
  }
 
});