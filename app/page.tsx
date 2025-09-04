'use client';

import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PropertyCard } from '../components/property/PropertyCard';
import { MapPin, Wifi, Car, Coffee, Waves, Phone, Mail } from 'lucide-react';

type Locale = 'pt' | 'en' | 'es' | 'de';

const translations = {
  pt: {
    brand: 'Villa Sunshine',
    tagline: 'Sua villa dos sonhos em Florianópolis',
    hero: 'Villa Exclusiva com Vista para o Mar',
    heroDesc: 'Desfrute de momentos inesquecíveis em nossa luxuosa villa com vista panorâmica para o mar, piscina privativa e todas as comodidades.',
    bookNow: 'Reserve Agora',
    fromPrice: 'A partir de R$ 350/noite',
    amenities: 'Comodidades',
    contact: 'Entre em Contato',
    wifi: 'Wi-Fi Gratuito',
    parking: 'Estacionamento',
    kitchen: 'Cozinha Completa',
    pool: 'Piscina Privativa',
    nav: {
      home: 'Início',
      about: 'Sobre',
      contact: 'Contato'
    }
  },
  en: {
    brand: 'Villa Sunshine',
    tagline: 'Your dream villa in Florianópolis',
    hero: 'Exclusive Villa with Ocean View',
    heroDesc: 'Enjoy unforgettable moments in our luxurious villa with panoramic ocean views, private pool and all amenities.',
    bookNow: 'Book Now',
    fromPrice: 'Starting from $70/night',
    amenities: 'Amenities',
    contact: 'Get in Touch',
    wifi: 'Free Wi-Fi',
    parking: 'Parking',
    kitchen: 'Full Kitchen',
    pool: 'Private Pool',
    nav: {
      home: 'Home',
      about: 'About',
      contact: 'Contact'
    }
  },
  es: {
    brand: 'Villa Sunshine',
    tagline: 'Tu villa soñada en Florianópolis',
    hero: 'Villa Exclusiva con Vista al Mar',
    heroDesc: 'Disfruta de momentos inolvidables en nuestra lujosa villa con vista panorámica al mar, piscina privada y todas las comodidades.',
    bookNow: 'Reservar Ahora',
    fromPrice: 'Desde $70/noche',
    amenities: 'Comodidades',
    contact: 'Contactar',
    wifi: 'Wi-Fi Gratuito',
    parking: 'Estacionamiento',
    kitchen: 'Cocina Completa',
    pool: 'Piscina Privada',
    nav: {
      home: 'Inicio',
      about: 'Acerca',
      contact: 'Contacto'
    }
  },
  de: {
    brand: 'Villa Sunshine',
    tagline: 'Ihre Traumvilla in Florianópolis',
    hero: 'Exklusive Villa mit Meerblick',
    heroDesc: 'Genießen Sie unvergessliche Momente in unserer luxuriösen Villa mit Panoramablick auf das Meer, privatem Pool und allen Annehmlichkeiten.',
    bookNow: 'Jetzt Buchen',
    fromPrice: 'Ab $70/Nacht',
    amenities: 'Ausstattung',
    contact: 'Kontakt',
    wifi: 'Kostenloses Wi-Fi',
    parking: 'Parkplatz',
    kitchen: 'Vollküche',
    pool: 'Privater Pool',
    nav: {
      home: 'Start',
      about: 'Über uns',
      contact: 'Kontakt'
    }
  }
};

const propertyData = {
  id: 'villa-sunshine-1',
  name: 'Villa Sunshine',
  type: 'villa' as const,
  status: 'for-rent' as const,
  featured: true,
  dateAdded: new Date('2024-01-01').toISOString(),
  location: {
    country: 'Brasil',
    region: 'Santa Catarina',
    city: 'Florianópolis',
    address: 'Rua das Flores, 123',
    coordinates: { lat: -27.5954, lng: -48.5480 },
    zipCode: '88000-000'
  },
  specs: {
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    buildYear: 2020,
    parking: 2,
    pool: true,
    garden: true,
    balcony: true,
    terrace: true
  },
  pricing: {
    rentPrice: 350,
    currency: 'BRL'
  }
};

const propertyContent = {
  pt: {
    title: 'Villa Sunshine - Vista para o Mar',
    subtitle: 'Villa exclusiva em Florianópolis',
    description: 'Villa luxuosa com vista panorâmica para o mar, piscina privativa e todas as comodidades para uma estadia perfeita.',
    highlights: ['Vista panorâmica para o mar', 'Piscina privativa', 'Jardim amplo', '2 vagas de garagem'],
    rooms: {
      livingRoom: 'Sala ampla com vista para o mar',
      kitchen: 'Cozinha completa equipada',
      masterBedroom: 'Suíte master com varanda',
      bedrooms: '4 quartos espaçosos',
      bathrooms: '3 banheiros completos',
      outdoor: 'Área externa com piscina e jardim'
    },
    location: {
      description: 'Localizada em área nobre de Florianópolis',
      nearbyAttractions: ['Praia de Jurerê', 'Centro histórico', 'Shopping'],
      transportation: ['Ônibus', 'Táxi', 'Carro próprio']
    }
  },
  en: {
    title: 'Villa Sunshine - Ocean View',
    subtitle: 'Exclusive villa in Florianópolis',
    description: 'Luxury villa with panoramic ocean view, private pool and all amenities for a perfect stay.',
    highlights: ['Panoramic ocean view', 'Private pool', 'Large garden', '2 parking spaces'],
    rooms: {
      livingRoom: 'Spacious living room with ocean view',
      kitchen: 'Fully equipped kitchen',
      masterBedroom: 'Master suite with balcony',
      bedrooms: '4 spacious bedrooms',
      bathrooms: '3 full bathrooms',
      outdoor: 'Outdoor area with pool and garden'
    },
    location: {
      description: 'Located in upscale area of Florianópolis',
      nearbyAttractions: ['Jurerê Beach', 'Historic center', 'Shopping mall'],
      transportation: ['Bus', 'Taxi', 'Private car']
    }
  },
  es: {
    title: 'Villa Sunshine - Vista al Mar',
    subtitle: 'Villa exclusiva en Florianópolis',
    description: 'Villa de lujo con vista panorámica al mar, piscina privada y todas las comodidades para una estancia perfecta.',
    highlights: ['Vista panorámica al mar', 'Piscina privada', 'Jardín amplio', '2 plazas de aparcamiento'],
    rooms: {
      livingRoom: 'Amplia sala con vista al mar',
      kitchen: 'Cocina totalmente equipada',
      masterBedroom: 'Suite principal con balcón',
      bedrooms: '4 habitaciones amplias',
      bathrooms: '3 baños completos',
      outdoor: 'Área exterior con piscina y jardín'
    },
    location: {
      description: 'Ubicada en zona exclusiva de Florianópolis',
      nearbyAttractions: ['Playa Jurerê', 'Centro histórico', 'Centro comercial'],
      transportation: ['Autobús', 'Taxi', 'Coche privado']
    }
  },
  de: {
    title: 'Villa Sunshine - Meerblick',
    subtitle: 'Exklusive Villa in Florianópolis',
    description: 'Luxusvilla mit Panoramablick auf das Meer, privatem Pool und allen Annehmlichkeiten für einen perfekten Aufenthalt.',
    highlights: ['Panorama-Meerblick', 'Privater Pool', 'Großer Garten', '2 Parkplätze'],
    rooms: {
      livingRoom: 'Geräumiges Wohnzimmer mit Meerblick',
      kitchen: 'Voll ausgestattete Küche',
      masterBedroom: 'Master-Suite mit Balkon',
      bedrooms: '4 geräumige Schlafzimmer',
      bathrooms: '3 komplette Badezimmer',
      outdoor: 'Außenbereich mit Pool und Garten'
    },
    location: {
      description: 'In erstklassiger Lage von Florianópolis',
      nearbyAttractions: ['Jurerê Strand', 'Historisches Zentrum', 'Einkaufszentrum'],
      transportation: ['Bus', 'Taxi', 'Privatauto']
    }
  }
};

export default function HomePage() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('pt');

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[currentLocale];
    
    for (const k of keys) {
      result = result?.[k];
      if (!result) break;
    }
    
    return result || key;
  };

  const navigationItems = [
    { 
      key: 'home', 
      label: t('nav.home'), 
      onClick: () => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      key: 'amenities', 
      label: t('amenities'), 
      onClick: () => {
        document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      key: 'contact', 
      label: t('nav.contact'), 
      onClick: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  const amenitiesData = [
    { icon: Wifi, key: 'wifi' },
    { icon: Car, key: 'parking' },
    { icon: Coffee, key: 'kitchen' },
    { icon: Waves, key: 'pool' }
  ];

  return (
    <div className="villa-homepage">
      <Header
        brandName={t('brand')}
        currentLocale={currentLocale}
        onLanguageChange={setCurrentLocale}
        navigationItems={navigationItems}
        showLanguageSelector={true}
      />

      <section id="hero" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{t('hero')}</h1>
              <p className="hero-description">{t('heroDesc')}</p>
              <p className="hero-price">{t('fromPrice')}</p>
              <button 
                className="cta-button"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('bookNow')}
              </button>
            </div>
            
            <div className="hero-image">
              <div className="image-placeholder">
                <div className="image-content">
                  <h3>{t('brand')}</h3>
                  <p>{t('tagline')}</p>
                  <div className="features-mini">
                    <span>🏠 4 Quartos</span>
                    <span>🚿 3 Banheiros</span>
                    <span>👥 8 Pessoas</span>
                    <span>📐 250m²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="property-showcase">
        <div className="section-container">
          <h2 className="section-title">Nossa Villa</h2>
          
          <div className="property-card-container">
            <PropertyCard
              property={propertyData}
              content={propertyContent[currentLocale]}
              locale={currentLocale}
              heroImage="/images/hero.jpg"
              variant="featured"
              className="featured-property"
              onClick={() => {
                console.log('Property clicked');
              }}
            />
          </div>
        </div>
      </section>

      <section id="amenities" className="amenities-section">
        <div className="section-container">
          <h2 className="section-title">{t('amenities')}</h2>
          
          <div className="amenities-grid">
            {amenitiesData.map((amenity, index) => (
              <div key={index} className="amenity-card">
                <amenity.icon className="amenity-icon" size={48} />
                <h3>{t(amenity.key)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title">{t('contact')}</h2>
          
          <div className="contact-grid">
            <div className="contact-card">
              <Phone className="contact-icon" size={32} />
              <h3>Telefone</h3>
              <p>+55 48 9999-9999</p>
            </div>
            <div className="contact-card">
              <Mail className="contact-icon" size={32} />
              <h3>E-mail</h3>
              <p>contato@villasunshine.com</p>
            </div>
            <div className="contact-card">
              <MapPin className="contact-icon" size={32} />
              <h3>Localização</h3>
              <p>Florianópolis, SC</p>
            </div>
          </div>

          <div className="contact-cta">
            <button className="cta-button">
              {t('bookNow')}
            </button>
          </div>
        </div>
      </section>

      <Footer
        brandName={t('brand')}
        copyrightText={`© 2024 ${t('brand')}. Todos os direitos reservados.`}
      />
    </div>
  );
}