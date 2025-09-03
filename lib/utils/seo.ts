// lib/seo.ts
import { PropertyConfig } from '@/config/property.config';

export function generateStructuredData(config: PropertyConfig) {
  const { features, location, price, title, description, images, agent } = config;
  
  // Schema.org para Propriedades Imobiliárias
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstate",
    "name": title,
    "description": description,
    "image": [
      images.hero,
      ...images.gallery
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.city,
      "addressRegion": location.state,
      "addressCountry": location.country,
      "postalCode": location.zipCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": features.area,
      "unitText": features.areaUnit
    },
    "numberOfRooms": features.bedrooms,
    "numberOfBathroomsTotal": features.bathrooms,
    "yearBuilt": features.yearBuilt,
    "offers": []
  };

  // Adicionar ofertas (venda/aluguel)
  if (price.sale) {
    structuredData.offers.push({
      "@type": "Offer",
      "price": price.sale,
      "priceCurrency": price.currency,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "category": "Sale"
    });
  }

  if (price.rent) {
    structuredData.offers.push({
      "@type": "Offer",
      "price": price.rent,
      "priceCurrency": price.currency,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "category": "Rent",
      "unitCode": "MON"
    });
  }

  // Adicionar informações do agente
  if (agent) {
    structuredData["broker"] = {
      "@type": "RealEstateAgent",
      "name": agent.name,
      "telephone": agent.phone,
      "email": agent.email,
      "image": agent.photo
    };
  }

  return structuredData;
}

export function generateSitemap(config: PropertyConfig) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const currentDate = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    ${config.images.gallery.map(image => `
    <image:image>
      <image:loc>${baseUrl}${image}</image:loc>
      <image:title>${config.title}</image:title>
    </image:image>`).join('')}
  </url>
  <url>
    <loc>${baseUrl}/galeria</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contato</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/localizacao</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
}

export function generateRobotsTxt() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Bloquear arquivos desnecessários
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /.well-known/`;
}

export function generateWebManifest(config: PropertyConfig) {
  return {
    name: config.title,
    short_name: config.title.split(' ').slice(0, 2).join(' '),
    description: config.description,
    start_url: "/",
    display: "standalone",
    background_color: config.branding.primaryColor,
    theme_color: config.branding.primaryColor,
    orientation: "portrait-primary",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    categories: ["real estate", "property", "business"]
  };
}