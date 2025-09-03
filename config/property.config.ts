import type { PropertyConfig } from '../lib/types/property';

// Configuração dinâmica do imóvel - Altere apenas este arquivo para cada propriedade
const propertyConfig: PropertyConfig = {
  // === INFORMAÇÕES BÁSICAS ===
  property: {
    id: "villa-sunshine-algarve-001",
    name: "Villa Sunshine Algarve", 
    type: "villa",
    status: "for-sale",
    featured: true,
    dateAdded: "2025-01-15",
    dateUpdated: "2025-03-01",
    
    // Localização
    location: {
      country: "Portugal",
      region: "Algarve",
      city: "Lagos",
      address: "Rua das Oliveiras, 123",
      coordinates: {
        lat: 37.1018,
        lng: -8.6732
      },
      neighborhood: "Meia Praia",
      zipCode: "8600-123"
    },

    // Características físicas
    specs: {
      bedrooms: 4,
      bathrooms: 3,
      area: 320, // m²
      plotSize: 1200, // m²
      buildYear: 2018,
      floors: 2,
      parking: 2,
      pool: true,
      garden: true,
      balcony: true,
      terrace: true,
      elevator: false,
      furnished: "semi",
      condition: "excellent",
      energyRating: "A+"
    },

    // Preços
    pricing: {
      salePrice: 850000,
      currency: "EUR",
      pricePerSqm: 2656,
      rentPrice: undefined,
      deposits: {
        booking: 10000,
        security: undefined
      },
      fees: {
        agency: 3, // porcentagem
        notary: 2500,
        registration: 500,
        legal: 1200
      },
      mortgageInfo: {
        monthlyPayment: 3200,
        interestRate: 3.5,
        loanTerm: 30
      }
    }
  },

  // === CONTEÚDO MULTILÍNGUE ===
  content: {
    pt: {
      title: "Villa Sunshine - Luxuosa Moradia no Algarve",
      subtitle: "Propriedade exclusiva com vista mar deslumbrante",
      description: "Magnífica villa de luxo situada numa das zonas mais prestigiadas do Algarve. Com acabamentos de primeira qualidade, jardim privativo e piscina, esta propriedade oferece o máximo conforto e privacidade numa localização privilegiada.",
      highlights: [
        "Vista panorâmica para o mar",
        "Piscina privativa aquecida",
        "Jardim paisagístico de 1200m²",
        "Cozinha gourmet totalmente equipada",
        "Suite master com closet",
        "Garagem para 2 carros",
        "Sistema de domótica",
        "Ar condicionado em todas as divisões",
        "Painéis solares",
        "Sistema de segurança 24h"
      ],
      rooms: {
        livingRoom: "Sala de estar ampla com lareira e acesso direto ao terraço com vista mar",
        kitchen: "Cozinha moderna equipada com eletrodomésticos topo de gama Miele e ilha central",
        masterBedroom: "Suite master com closet, casa de banho privativa e terraço com vista mar",
        bedrooms: "3 quartos adicionais com roupeiros embutidos e casas de banho privativas",
        bathrooms: "4 casas de banho com acabamentos em mármore e louças sanitárias de luxo",
        outdoor: "Área exterior com piscina infinita, jardim paisagístico e zona de churrasqueira",
        garage: "Garagem subterrânea para 2 carros com sistema de carregamento elétrico"
      },
      location: {
        description: "Localizada na prestigiada zona de Meia Praia, oferece privacidade total mantendo proximidade às melhores praias e comodidades do Algarve",
        nearbyAttractions: [
          "Praia de Meia Praia - 800m",
          "Centro histórico de Lagos - 2km", 
          "Ponta da Piedade - 3km",
          "Palmares Golf Course - 1.5km",
          "Marina de Lagos - 2.5km",
          "Sagres - 35km",
          "Aeroporto de Faro - 85km"
        ],
        transportation: [
          "Estação de comboios de Lagos - 3km",
          "Paragem de autocarro - 500m",
          "A22 (Via do Infante) - 2km"
        ]
      },
      legalInfo: {
        ownership: "Propriedade livre de encargos com escritura registada",
        taxes: "IMI anual aproximadamente €2.400. Mais-valias aplicáveis conforme legislação",
        permits: "Licença de habitação válida. Certificado energético A+"
      }
    },
    
    en: {
      title: "Villa Sunshine - Luxurious Villa in Algarve",
      subtitle: "Exclusive property with stunning sea views",
      description: "Magnificent luxury villa located in one of the most prestigious areas of the Algarve. With top quality finishes, private garden and swimming pool, this property offers maximum comfort and privacy in a privileged location.",
      highlights: [
        "Panoramic sea views",
        "Private heated swimming pool", 
        "1200m² landscaped garden",
        "Fully equipped gourmet kitchen",
        "Master suite with walk-in closet",
        "2-car garage",
        "Home automation system",
        "Air conditioning throughout",
        "Solar panels",
        "24h security system"
      ],
      rooms: {
        livingRoom: "Spacious living room with fireplace and direct access to sea-view terrace",
        kitchen: "Modern kitchen equipped with top-of-the-line Miele appliances and central island",
        masterBedroom: "Master suite with walk-in closet, private bathroom and sea-view terrace",
        bedrooms: "3 additional bedrooms with built-in wardrobes and private bathrooms", 
        bathrooms: "4 bathrooms with marble finishes and luxury sanitary ware",
        outdoor: "Outdoor area with infinity pool, landscaped garden and barbecue area",
        garage: "Underground garage for 2 cars with electric charging system"
      },
      location: {
        description: "Located in the prestigious Meia Praia area, offering total privacy while maintaining proximity to the best beaches and amenities of the Algarve",
        nearbyAttractions: [
          "Meia Praia Beach - 800m",
          "Lagos Historic Center - 2km",
          "Ponta da Piedade - 3km", 
          "Palmares Golf Course - 1.5km",
          "Lagos Marina - 2.5km",
          "Sagres - 35km",
          "Faro Airport - 85km"
        ],
        transportation: [
          "Lagos Train Station - 3km",
          "Bus Stop - 500m",
          "A22 Highway - 2km"
        ]
      },
      legalInfo: {
        ownership: "Property free of charges with registered deed",
        taxes: "Annual property tax approximately €2,400. Capital gains tax applicable as per legislation",
        permits: "Valid habitation license. Energy certificate A+"
      }
    },

    es: {
      title: "Villa Sunshine - Villa Lujosa en Algarve",
      subtitle: "Propiedad exclusiva con impresionantes vistas al mar",
      description: "Magnífica villa de lujo situada en una de las zonas más prestigiosas del Algarve. Con acabados de primera calidad, jardín privado y piscina, esta propiedad ofrece el máximo confort y privacidad en una ubicación privilegiada.",
      highlights: [
        "Vistas panorámicas al mar",
        "Piscina privada climatizada",
        "Jardín paisajístico de 1200m²", 
        "Cocina gourmet completamente equipada",
        "Suite principal con vestidor",
        "Garaje para 2 coches",
        "Sistema domótico",
        "Aire acondicionado en todas las habitaciones",
        "Paneles solares",
        "Sistema de seguridad 24h"
      ],
      rooms: {
        livingRoom: "Amplio salón con chimenea y acceso directo a terraza con vista al mar",
        kitchen: "Cocina moderna equipada con electrodomésticos Miele de alta gama e isla central",
        masterBedroom: "Suite principal con vestidor, baño privado y terraza con vista al mar",
        bedrooms: "3 dormitorios adicionales con armarios empotrados y baños privados",
        bathrooms: "4 baños con acabados en mármol y sanitarios de lujo",
        outdoor: "Área exterior con piscina infinita, jardín paisajístico y zona de barbacoa",
        garage: "Garaje subterráneo para 2 coches con sistema de carga eléctrica"
      },
      location: {
        description: "Ubicada en la prestigiosa zona de Meia Praia, ofrece total privacidad manteniendo proximidad a las mejores playas y servicios del Algarve",
        nearbyAttractions: [
          "Playa Meia Praia - 800m",
          "Centro histórico de Lagos - 2km",
          "Ponta da Piedade - 3km",
          "Campo de Golf Palmares - 1.5km", 
          "Marina de Lagos - 2.5km",
          "Sagres - 35km",
          "Aeroporto de Faro - 85km"
        ],
        transportation: [
          "Estación de tren de Lagos - 3km",
          "Parada de autobús - 500m",
          "Autopista A22 - 2km"
        ]
      },
      legalInfo: {
        ownership: "Propiedad libre de cargas con escritura registrada",
        taxes: "Impuesto anual aproximadamente €2.400. Plusvalías aplicables según legislación",
        permits: "Licencia de habitabilidad válida. Certificado energético A+"
      }
    },

    de: {
      title: "Villa Sunshine - Luxuriöse Villa an der Algarve",
      subtitle: "Exklusive Immobilie mit atemberaubendem Meerblick",
      description: "Prächtige Luxusvilla in einer der prestigeträchtigsten Gegenden der Algarve. Mit hochwertiger Ausstattung, privatem Garten und Pool bietet diese Immobilie maximalen Komfort und Privatsphäre in privilegierter Lage.",
      highlights: [
        "Panoramischer Meerblick",
        "Privater beheizter Pool",
        "1200m² Landschaftsgarten",
        "Voll ausgestattete Gourmetküche",
        "Master-Suite mit begehbarem Kleiderschrank",
        "Garage für 2 Autos",
        "Hausautomationssystem",
        "Klimaanlage in allen Räumen",
        "Solarpanels",
        "24h Sicherheitssystem"
      ],
      rooms: {
        livingRoom: "Geräumiges Wohnzimmer mit Kamin und direktem Zugang zur Meerblick-Terrasse",
        kitchen: "Moderne Küche mit hochwertigen Miele-Geräten und zentraler Insel",
        masterBedroom: "Master-Suite mit begehbarem Kleiderschrank, privatem Bad und Meerblick-Terrasse",
        bedrooms: "3 weitere Schlafzimmer mit Einbauschränken und privaten Bädern",
        bathrooms: "4 Badezimmer mit Marmorausstattung und Luxus-Sanitäranlagen",
        outdoor: "Außenbereich mit Infinity-Pool, Landschaftsgarten und Grillplatz",
        garage: "Tiefgarage für 2 Autos mit Elektro-Ladesystem"
      },
      location: {
        description: "In der prestigeträchtigen Gegend Meia Praia gelegen, bietet totale Privatsphäre bei gleichzeitiger Nähe zu den besten Stränden und Annehmlichkeiten der Algarve",
        nearbyAttractions: [
          "Meia Praia Strand - 800m",
          "Historisches Zentrum Lagos - 2km",
          "Ponta da Piedade - 3km",
          "Palmares Golfplatz - 1,5km",
          "Marina Lagos - 2,5km",
          "Sagres - 35km",
          "Flughafen Faro - 85km"
        ],
        transportation: [
          "Bahnhof Lagos - 3km",
          "Bushaltestelle - 500m",
          "Autobahn A22 - 2km"
        ]
      },
      legalInfo: {
        ownership: "Lastenfreie Immobilie mit eingetragener Urkunde",
        taxes: "Jährliche Grundsteuer ca. €2.400. Kapitalertragssteuer nach geltendem Recht",
        permits: "Gültige Wohnlizenz. Energiezertifikat A+"
      }
    }
  },

  // === CONFIGURAÇÃO DE IMAGENS ===
  media: {
    hero: {
      desktop: "/images/villa-sunshine-hero-desktop.jpg",
      mobile: "/images/villa-sunshine-hero-mobile.jpg",
      alt: "Villa Sunshine exterior view with sea view"
    },
    gallery: [
      { src: "/images/exterior-front.jpg", alt: "Villa exterior front view", category: "exterior", featured: true, order: 1 },
      { src: "/images/living-room.jpg", alt: "Spacious living room with fireplace", category: "interior", featured: true, order: 2 },
      { src: "/images/kitchen.jpg", alt: "Modern gourmet kitchen", category: "interior", featured: true, order: 3 },
      { src: "/images/master-bedroom.jpg", alt: "Master bedroom with sea view", category: "interior", order: 4 },
      { src: "/images/master-bathroom.jpg", alt: "Master bathroom with marble finishes", category: "interior", order: 5 },
      { src: "/images/pool-area.jpg", alt: "Infinity swimming pool", category: "outdoor", featured: true, order: 6 },
      { src: "/images/garden.jpg", alt: "Landscaped garden", category: "outdoor", order: 7 },
      { src: "/images/terrace-view.jpg", alt: "Terrace with sea view", category: "outdoor", order: 8 },
      { src: "/images/bedroom-2.jpg", alt: "Second bedroom", category: "interior", order: 9 },
      { src: "/images/bedroom-3.jpg", alt: "Third bedroom", category: "interior", order: 10 },
      { src: "/images/garage.jpg", alt: "Underground garage", category: "interior", order: 11 },
      { src: "/images/exterior-night.jpg", alt: "Villa exterior night view", category: "exterior", order: 12 }
    ],
    floorPlan: "/documents/villa-sunshine-floor-plan.pdf",
    virtualTour: "https://tour.matterport.com/villa-sunshine",
    video: "/videos/villa-sunshine-tour.mp4",
    brochure: "/documents/villa-sunshine-brochure.pdf"
  },

  // === SEO DINÂMICO ===
  seo: {
    pt: {
      title: "Villa Sunshine Algarve - Moradia de Luxo à Venda em Lagos €850.000",
      description: "Villa de luxo de 4 quartos com vista mar no Algarve. Piscina privativa, jardim de 1200m² e acabamentos premium. Localizada em Meia Praia, Lagos.",
      keywords: "villa algarve, moradia luxo lagos, casa vista mar portugal, propriedade premium algarve, villa piscina lagos, imobiliário algarve",
      ogTitle: "Villa de Luxo no Algarve - €850.000 | Vista Mar",
      ogDescription: "Magnífica villa com 4 quartos, piscina infinita e vista mar deslumbrante em Lagos, Algarve",
      ogImage: "/images/villa-sunshine-og.jpg"
    },
    en: {
      title: "Villa Sunshine Algarve - Luxury Villa for Sale in Lagos €850,000",
      description: "Luxury 4-bedroom villa with sea views in Algarve. Private infinity pool, 1200m² garden and premium finishes. Located in Meia Praia, Lagos.",
      keywords: "algarve villa, luxury house lagos, sea view property portugal, premium algarve real estate, villa pool lagos, portugal property",
      ogTitle: "Luxury Villa in Algarve - €850,000 | Sea View", 
      ogDescription: "Magnificent 4-bedroom villa with infinity pool and stunning sea views in Lagos, Algarve",
      ogImage: "/images/villa-sunshine-og.jpg"
    },
    es: {
      title: "Villa Sunshine Algarve - Villa de Lujo en Venta en Lagos €850.000",
      description: "Villa de lujo de 4 dormitorios con vistas al mar en Algarve. Piscina infinita privada, jardín de 1200m² y acabados premium. Ubicada en Meia Praia, Lagos.",
      keywords: "villa algarve, casa lujo lagos, propiedad vista mar portugal, inmobiliaria premium algarve, villa piscina lagos",
      ogTitle: "Villa de Lujo en Algarve - €850.000 | Vista al Mar",
      ogDescription: "Magnífica villa de 4 dormitorios con piscina infinita y vistas impresionantes al mar en Lagos, Algarve",
      ogImage: "/images/villa-sunshine-og.jpg"
    },
    de: {
      title: "Villa Sunshine Algarve - Luxusvilla zum Verkauf in Lagos €850.000",
      description: "Luxuriöse 4-Zimmer-Villa mit Meerblick an der Algarve. Privater Infinity-Pool, 1200m² Garten und Premium-Ausstattung. Gelegen in Meia Praia, Lagos.",
      keywords: "villa algarve, luxushaus lagos, meerblick immobilie portugal, premium algarve immobilien, villa pool lagos",
      ogTitle: "Luxusvilla an der Algarve - €850.000 | Meerblick",
      ogDescription: "Prächtige 4-Zimmer-Villa mit Infinity-Pool und atemberaubendem Meerblick in Lagos, Algarve",
      ogImage: "/images/villa-sunshine-og.jpg"
    }
  },

  // === CONFIGURAÇÃO DO SITE ===
  website: {
    brand: {
      name: "Villa Sunshine",
      logo: "/images/logo-villa-sunshine.png",
      favicon: "/favicon.ico"
    },
    contact: {
      agent: {
        name: "Ana Silva",
        phone: "+351 282 123 456",
        email: "ana@luxuryrealestate.pt",
        whatsapp: "+351282123456",
        photo: "/images/agent-ana.jpg",
        license: "AMI 12345",
        languages: ["pt", "en", "es"]
      },
      office: {
        name: "Luxury Real Estate Algarve",
        address: "Rua Central, 45, 8600-123 Lagos",
        phone: "+351 282 987 654",
        email: "info@luxuryrealestate.pt",
        website: "https://luxuryrealestate.pt",
        logo: "/images/logo-company.png"
      }
    },
    social: {
      facebook: "https://facebook.com/luxuryrealestate.algarve",
      instagram: "https://instagram.com/luxuryrealestate.algarve", 
      youtube: "https://youtube.com/@luxuryrealestate",
      linkedin: "https://linkedin.com/company/luxury-real-estate-algarve"
    },
    analytics: {
      googleAnalytics: "G-XXXXXXXXXX",
      facebookPixel: "1234567890",
      gtmId: "GTM-XXXXXXX"
    }
  },

  // === FUNCIONALIDADES ===
  features: {
    showVirtualTour: true,
    showMortgageCalculator: true,
    showContactForm: true,
    showSimilarProperties: true,
    showNeighborhoodInfo: true,
    enableScheduleVisit: true,
    enablePriceAlerts: false,
    showEnergyRating: true,
    showFloorPlan: true,
    enableShare: true,
    enablePrint: true,
    showPropertyHistory: false
  }
};

export default propertyConfig;