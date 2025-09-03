
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

module.exports = nextConfig;