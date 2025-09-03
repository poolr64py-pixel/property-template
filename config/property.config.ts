// config/property.config.ts
export interface PropertyConfig {
  // Informações Básicas
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: {
    sale?: number;
    rent?: number;
    currency: 'USD' | 'BRL' | 'EUR';
  };
  
  // Localização
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  
  // Características
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    areaUnit: 'm²' | 'ft²';
    parking: number;
    yearBuilt?: number;
    propertyType: 'house' | 'apartment' | 'condo' | 'land' | 'commercial';
  };
  
  // Amenidades
  amenities: string[];
  
  // Imagens
  images: {
    hero: string;
    gallery: string[];
    floorPlan?: string;
  };
  
  // Contato
  agent: {
    name: string;
    phone: string;
    email: string;
    whatsapp?: string;
    photo?: string;
  };
  
  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
  
  // Configurações do Site
  branding: {
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  
  // Social Media
  social?: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
}

// Exemplo de configuração para um imóvel
export const propertyConfig: PropertyConfig = {
  id: "luxury-apartment-las-mercedes",
  title: "Apartamento de Luxo em Las Mercedes",
  subtitle: "Elegância e sofisticação no coração da cidade",
  description: "Magnífico apartamento de 3 dormitórios com acabamentos de primeira linha, localizado no prestigioso bairro de Las Mercedes. Vista panorâmica da cidade, varanda gourmet e todas as comodidades modernas para seu conforto.",
  
  price: {
    sale: 450000,
    rent: 2800,
    currency: "USD"
  },
  
  location: {
    address: "Av. España 1234",
    city: "Asunción",
    state: "Central",
    country: "Paraguay",
    zipCode: "1209",
    coordinates: {
      lat: -25.2637,
      lng: -57.5759
    }
  },
  
  features: {
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    areaUnit: "m²",
    parking: 2,
    yearBuilt: 2022,
    propertyType: "apartment"
  },
  
  amenities: [
    "Piscina",
    "Academia",
    "Salão de Festas",
    "Portaria 24h",
    "Playground",
    "Churrasqueira",
    "Elevador",
    "Ar Condicionado",
    "Armários Planejados",
    "Varanda Gourmet"
  ],
  
  images: {
    hero: "/images/hero.jpg",
    gallery: [
      "/images/living-room.jpg",
      "/images/kitchen.jpg",
      "/images/bedroom-1.jpg",
      "/images/bathroom.jpg",
      "/images/building.jpg"
    ],
    floorPlan: "/images/floor-plan.jpg"
  },
  
  agent: {
  name: "Roberto de Moura",
  phone: "+595 994 718400",
  email: "robertodemoura@remax.com.py",
  whatsapp: "+595994718400",
  photo: "/images/agent.jpg"
},
  
  seo: {
    metaTitle: "Apartamento de Luxo Las Mercedes - 3 Dormitórios | Venda/Aluguel",
    metaDescription: "Apartamento de luxo de 3 dormitórios em Las Mercedes, Asunción. 120m², varanda gourmet, piscina. Venda: $450.000 | Aluguel: $2.800/mês",
    keywords: [
      "apartamento luxo las mercedes",
      "imóvel asunción",
      "apartamento 3 dormitórios",
      "imóvel venda paraguai",
      "apartamento moderno"
    ],
    ogImage: "/images/og-image.jpg"
  },
  
  branding: {
    primaryColor: "#1a365d",
    secondaryColor: "#2d5a87",
    accentColor: "#ed8936"
  },
  
  social: {
    instagram: "https://instagram.com/imobiliaria",
    facebook: "https://facebook.com/imobiliaria",
    website: "https://imobiliaria.com"
  }
};