// Configuração dinâmica do imóvel - Altere apenas este arquivo para cada propriedade
const propertyConfig = {
  // === INFORMAÇÕES BÁSICAS ===
  property: {
    id: "villa-sunshine-algarve-001",
    name: "Villa Sunshine Algarve", 
    type: "villa", // villa, apartment, house, commercial
    status: "for-sale", // for-sale, for-rent, sold, rented
    featured: true,
    
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
      furnished: "semi", // full, semi, unfurnished
      condition: "excellent" // new, excellent, good, renovation-needed
    },

    // Preços
    pricing: {
      salePrice: 850000,
      currency: "EUR",
      pricePerSqm: 2656,
      rentPrice: null, // Se for para aluguel
      deposits: {
        booking: 10000,
        security: null
      },
      fees: {
        agency: 3, // porcentagem
        notary: 2500,
        registration: 500
      }
    }
  },

  // === CONTEÚDO MULTILÍNGUE ===
  content: {
    pt: {
      title: "Villa Sunshine - Luxuosa Moradia no Algarve",
      subtitle: "Propriedade exclusiva com vista mar deslumbrante",
      description: "Magnífica villa de luxo situada numa das zonas mais prestigiadas do Algarve. Com acabamentos de primeira qualidade, jardim privativo e piscina, esta propriedade oferece o máximo conforto e privacidade.",
      highlights: [
        "Vista panorâmica para o mar",
        "Piscina privativa aquecida",
        "Jardim paisagístico de 1200m²",
        "Cozinha gourmet totalmente equipada",
        "Suite master com closet",
        "Garagem para 2 carros",
        "Sistema de domótica",
        "Ar condicionado em todas as divisões"
      ],
      rooms: {
        livingRoom: "Sala de estar ampla com lareira e acesso direto ao terraço",
        kitchen: "Cozinha moderna equipada com eletrodomésticos topo de gama",
        masterBedroom: "Suite master com closet e casa de banho privativa",
        bedrooms: "3 quartos adicionais com roupeiros embutidos",
        outdoor: "Área exterior com piscina, jardim e zona de churrasqueira"
      },
      location: {
        description: "Localizada na prestigiada zona de Meia Praia, a poucos minutos das melhores praias do Algarve",
        nearbyAttractions: [
          "Praia de Meia Praia - 800m",
          "Centro de Lagos - 2km", 
          "Ponta da Piedade - 3km",
          "Golf Course - 1.5km",
          "Marina de Lagos - 2.5km",
          "Aeroporto de Faro - 85km"
        ]
      }
    },
    en: {
      title: "Villa Sunshine - Luxurious Villa in Algarve",
      subtitle: "Exclusive property with stunning sea views",
      description: "Magnificent luxury villa located in one of the most prestigious areas of the Algarve. With top quality finishes, private garden and swimming pool, this property offers maximum comfort and privacy.",
      highlights: [
        "Panoramic sea views",
        "Private heated swimming pool", 
        "1200m² landscaped garden",
        "Fully equipped gourmet kitchen",
        "Master suite with walk-in closet",
        "2-car garage",
        "Home automation system",
        "Air conditioning throughout"
      ],
      rooms: {
        livingRoom: "Spacious living room with fireplace and direct access to terrace",
        kitchen: "Modern kitchen equipped with top-of-the-line appliances",
        masterBedroom: "Master suite with walk-in closet and private bathroom",
        bedrooms: "3 additional bedrooms with built-in wardrobes", 
        outdoor: "Outdoor area with pool, garden and barbecue area"
      },
      location: {
        description: "Located in the prestigious Meia Praia area, minutes from the best beaches in the Algarve",
        nearbyAttractions: [
          "Meia Praia Beach - 800m",
          "Lagos City Center - 2km",
          "Ponta da Piedade - 3km", 
          "Golf Course - 1.5km",
          "Lagos Marina - 2.5km",
          "Faro Airport - 85km"
        ]
      }
    },
    es: {
      title: "Villa Sunshine - Villa Lujosa en Algarve",
      subtitle: "Propiedad exclusiva con impresionantes vistas al mar",
      description: "Magnífica villa de lujo situada en una de las zonas más prestigiosas del Algarve. Con acabados de primera calidad, jardín privado y piscina, esta propiedad ofrece el máximo confort y privacidad.",
      highlights: [
        "Vistas panorámicas al mar",
        "Piscina privada climatizada",
        "Jardín paisajístico de 1200m²", 
        "Cocina gourmet completamente equipada",
        "Suite principal con vestidor",
        "Garaje para 2 coches",
        "Sistema domótico",
        "Aire acondicionado en todas las habitaciones"
      ],
      rooms: {
        livingRoom: "Amplio salón con chimenea y acceso directo a la terraza",
        kitchen: "Cocina moderna equipada con electrodomésticos de alta gama",
        masterBedroom: "Suite principal con vestidor y baño privado",
        bedrooms: "3 dormitorios adicionales con armarios empotrados",
        outdoor: "Área exterior con piscina, jardín y zona de barbacoa"
      },
      location: {
        description: "Ubicada en la prestigiosa zona de Meia Praia, a minutos de las mejores playas del Algarve",
        nearbyAttractions: [
          "Playa Meia Praia - 800m",
          "Centro de Lagos - 2km",
          "Ponta da Piedade - 3km",
          "Campo de Golf - 1.5km", 
          "Marina de Lagos - 2.5km",
          "Aeroporto de Faro - 85km"
        ]
      }
    }
  },

  // === CONFIGURAÇÃO DE IMAGENS ===
  media: {
    hero: {
      desktop: "/images/hero-desktop.jpg",
      mobile: "/images/hero-mobile.jpg",
      alt: "Villa Sunshine exterior view"
    },
    gallery: [
      { src: "/images/exterior-1.jpg", alt: "Villa exterior", category: "exterior" },
      { src: "/images/living-room.jpg", alt: "Living room", category: "interior" },
      { src: "/images/kitchen.jpg", alt: "Kitchen", category: "interior" },
      { src: "/images/master-bedroom.jpg", alt: "Master bedroom", category: "interior" },
      { src: "/images/pool.jpg", alt: "Swimming pool", category: "outdoor" },
      { src: "/images/garden.jpg", alt: "Garden view", category: "outdoor" },
      { src: "/images/terrace.jpg", alt: "Terrace", category: "outdoor" },
      { src: "/images/bathroom.jpg", alt: "Bathroom", category: "interior" }
    ],
    floorPlan: "/images/floor-plan.pdf",
    virtualTour: "https://tour.example.com/villa-sunshine"
  },

  // === SEO DINÂMICO ===
  seo: {
    pt: {
      title: "Villa Sunshine Algarve - Moradia de Luxo à Venda em Lagos",
      description: "Villa de luxo de 4 quartos com vista mar no Algarve. Piscina privativa, jardim de 1200m² e acabamentos premium. €850.000",
      keywords: "villa algarve, moradia luxo lagos, casa vista mar portugal, propriedade premium algarve",
      ogTitle: "Villa de Luxo no Algarve - €850.000",
      ogDescription: "Magnífica villa com 4 quartos, piscina e vista mar deslumbrante"
    },
    en: {
      title: "Villa Sunshine Algarve - Luxury Villa for Sale in Lagos",
      description: "Luxury 4-bedroom villa with sea views in Algarve. Private pool, 1200m² garden and premium finishes. €850,000",
      keywords: "algarve villa, luxury house lagos, sea view property portugal, premium algarve real estate",
      ogTitle: "Luxury Villa in Algarve - €850,000", 
      ogDescription: "Magnificent 4-bedroom villa with pool and stunning sea views"
    }
  },

  // === CONFIGURAÇÃO DO SITE ===
  website: {
    brand: {
      name: "Villa Sunshine",
      logo: "/images/logo.png",
      favicon: "/favicon.ico"
    },
    contact: {
      agent: {
        name: "Ana Silva",
        phone: "+351 123 456 789",
        email: "ana@luxuryrealestate.pt",
        whatsapp: "+351123456789",
        photo: "/images/agent-ana.jpg"
      },
      office: {
        name: "Luxury Real Estate Algarve",
        address: "Rua Central, 45, Lagos",
        phone: "+351 282 123 456",
        email: "info@luxuryrealestate.pt"
      }
    },
    social: {
      facebook: "https://facebook.com/luxuryrealestate",
      instagram: "https://instagram.com/luxuryrealestate", 
      youtube: "https://youtube.com/luxuryrealestate"
    },
    analytics: {
      googleAnalytics: "G-XXXXXXXXXX",
      facebookPixel: "XXXXXXXXXX"
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
    showEnergyRating: true
  }
};

module.exports = propertyConfig;