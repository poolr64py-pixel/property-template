<<<<<<< HEAD

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuração de internacionalização
  i18n: {
    // Idiomas suportados
    locales: ['pt', 'es', 'en', 'de'],
    // Idioma padrão
    defaultLocale: 'pt',
    // Detecção automática de idioma baseada no header Accept-Language
    localeDetection: false,
  },
};

=======

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuração de internacionalização
  i18n: {
    // Idiomas suportados
    locales: ['pt', 'es', 'en', 'de'],
    // Idioma padrão
    defaultLocale: 'pt',
    // Detecção automática de idioma baseada no header Accept-Language
    localeDetection: false,
  },
};

>>>>>>> 228e52862bd1487979d8c411c9e94465e04f3bce
module.exports = nextConfig;