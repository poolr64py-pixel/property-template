'use client';

import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PropertyCard } from '../components/property/PropertyCard';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { MapPin, Wifi, Car, Coffee, Waves, Users, Bed, Bath, Home, Phone, Mail } from 'lucide-react';

type Locale = 'pt' | 'en' | 'es' | 'de';

// Traduções usando a mesma estrutura dos componentes existentes
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
    nav: {
      home: 'Start',
      about: 'Über uns',
      contact: 'Kontakt'
    }
  }
};

// Dados mock da propriedade usando os tipos existentes
const propertyData = {
  id: 'villa-sunshine-1',
  type: 'villa' as const,
  status: 'for-rent' as const,
  featured: true,
  location: {
    address: 'Florianópolis, SC',
    city: 'Florianópolis',
    region: 'Santa Catarina',
    country: 'Brasil',
    zipCode: '88000-000',
    coordinates: { lat: -27.5954, lng: -48.5480 }
  },
  specs: {
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    pool: true,
    garden: true,
    parking: true
  },
  pricing: {
    rentPrice: 350,
    currency: 'BRL'
  }
};

const propertyContent = {
  pt: {
    title: 'Villa Sunshine - Vista para o Mar',
    description: 'Villa luxuosa com vista panorâmica',
    shortDescription: 'Villa exclusiva em Florianópolis'
  },
  en: {
    title: 'Villa Sunshine - Ocean View',
    description: 'Luxury villa with panoramic view',
    shortDescription: 'Exclusive villa in Florianópolis'
  },
  es: {
    title: 'Villa Sunshine - Vista al Mar',
    description: 'Villa de lujo con vista panorámica',
    shortDescription: 'Villa exclusiva en Florianópolis'
  },
  de: {
    title: 'Villa Sunshine - Meerblick',
    description: 'Luxusvilla mit Panoramablick',
    shortDescription: 'Exklusive Villa in Florianópolis'
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
    { key: 'home', label: t('nav.home'), onClick: () => console.log('Home') },
    { key: 'about', label: t('nav.about'), onClick: () => console.log('About') },
    { key: 'contact', label: t('nav.contact'), onClick: () => console.log('Contact') }
  ];

  return (
    <div className="villa-homepage">
      {/* Header usando o componente existente */}
      <Header
        brandName={t('brand')}
        currentLocale={currentLocale}
        onLanguageChange={setCurrentLocale}
        navigationItems={navigationItems}
        showLanguageSelector={true}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{t('hero')}</h1>
              <p className="hero-description">{t('heroDesc')}</p>
              <p className="hero-price">{t('fromPrice')}</p>
              <button className="cta-button">{t('bookNow')}</button>
            </div>
            
            <div className="hero-image">
              <OptimizedImage
                src="/images/villa-hero.jpg"
                alt={t('hero')}
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Property Card Section */}
      <section className="property-showcase">
        <div className="section-container">
          <h2 className="section-title">Nossa Villa</h2>
          
          <div className="property-card-container">
            <PropertyCard
              property={propertyData}
              content={propertyContent[currentLocale]}
              locale={currentLocale}
              heroImage="/images/villa-main.jpg"
              variant="featured"
              onClick={() => console.log('Property clicked')}
            />
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="section-container">
          <h2 className="section-title">{t('amenities')}</h2>
          
          <div className="amenities-grid">
            <div className="amenity-card">
              <Wifi className="amenity-icon" />
              <h3>Wi-Fi Gratuito</h3>
            </div>
            <div className="amenity-card">
              <Car className="amenity-icon" />
              <h3>Estacionamento</h3>
            </div>
            <div className="amenity-card">
              <Coffee className="amenity-icon" />
              <h3>Cozinha Completa</h3>
            </div>
            <div className="amenity-card">
              <Waves className="amenity-icon" />
              <h3>Piscina Privativa</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="section-container">
          <h2 className="section-title">{t('contact')}</h2>
          
          <div className="contact-grid">
            <div className="contact-card">
              <Phone className="contact-icon" />
              <h3>Telefone</h3>
              <p>+55 48 9999-9999</p>
            </div>
            <div className="contact-card">
              <Mail className="contact-icon" />
              <h3>E-mail</h3>
              <p>contato@villasunshine.com</p>
            </div>
            <div className="contact-card">
              <MapPin className="contact-icon" />
              <h3>Localização</h3>
              <p>Florianópolis, SC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer usando o componente existente */}
      <Footer
        brandName={t('brand')}
        copyrightText={`© 2024 ${t('brand')}. Todos os direitos reservados.`}
      />

      <style jsx>{`
        .villa-homepage {
          min-height: 100vh;
          background: white;
        }

        .hero-section {
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          padding: 80px 20px;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-text {
          max-width: 500px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .hero-description {
          font-size: 1.25rem;
          color: #4b5563;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .hero-price {
          font-size: 1.75rem;
          font-weight: 600;
          color: #2563eb;
          margin-bottom: 32px;
        }

        .cta-button {
          background: #2563eb;
          color: white;
          padding: 16px 32px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0,0,0,0.2);
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 48px;
          color: #111827;
        }

        .property-showcase {
          padding: 80px 20px;
          background: white;
        }

        .property-card-container {
          display: flex;
          justify-content: center;
        }

        .amenities-section {
          padding: 80px 20px;
          background: #f9fafb;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .amenity-card {
          background: white;
          padding: 32px 24px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .amenity-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .amenity-icon {
          width: 48px;
          height: 48px;
          color: #2563eb;
          margin: 0 auto 16px;
        }

        .amenity-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .contact-section {
          padding: 80px 20px;
          background: #111827;
          color: white;
        }

        .contact-section .section-title {
          color: white;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }

        .contact-card {
          background: #1f2937;
          padding: 32px 24px;
          border-radius: 12px;
          text-align: center;
        }

        .contact-icon {
          width: 48px;
          height: 48px;
          color: #60a5fa;
          margin: 0 auto 16px;
        }

        .contact-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin: 0 0 8px 0;
        }

        .contact-card p {
          color: #60a5fa;
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.1rem;
          }
          
          .hero-price {
            font-size: 1.5rem;
          }
          
          .cta-button {
            width: 100%;
            max-width: 300px;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}