// lib/utils/seo.ts
import { PropertyConfig } from '../hooks/useProperty';

export function generateStructuredData(config: PropertyConfig) {
  // Mapeia a estrutura do PropertyConfig para os dados necessários
  const {
    basic: { name, location, pricePerNight, bedrooms, bathrooms, area, maxGuests },
    media: { mainImage, gallery },
    description: { short, full },
    amenities,
    contact
  } = config;

  // Schema.org para Propriedades Imobiliárias
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": name,
    "description": full,
    "image": [mainImage, ...gallery].filter(Boolean),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.city,
      "addressRegion": location.state,
      "addressCountry": location.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "priceRange": `$${pricePerNight.low}-${pricePerNight.high}`,
    "amenityFeature": amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "numberOfRooms": bedrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": area,
      "unitCode": "MTK"
    },
    "occupancy": {
      "@type": "QuantitativeValue",
      "maxValue": maxGuests
    },
    "telephone": contact.phone,
    "email": contact.email,
    "url": typeof window !== 'undefined' ? window.location.origin : ''
  };

  return structuredData;
}

export function generateMetaTags(config: PropertyConfig) {
  const {
    basic: { name, location },
    description: { short, full },
    media: { mainImage },
    seo
  } = config;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.join(', '),
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: name
        }
      ],
      type: 'website',
      locale: 'pt_BR'
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [mainImage]
    },
    other: {
      'property:type': 'rental',
      'property:price': config.basic.pricePerNight.mid.toString(),
      'property:currency': 'BRL',
      'property:bedrooms': config.basic.bedrooms.toString(),
      'property:bathrooms': config.basic.bathrooms.toString(),
      'property:location': `${location.city}, ${location.state}`
    }
  };
}

export function generateCanonicalUrl(slug?: string) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return slug ? `${baseUrl}/${slug}` : baseUrl;
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}