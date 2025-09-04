'use client';

import { useState, useEffect } from 'react';
import { MapPin, Wifi, Car, Coffee, Waves, Users, Bed, Bath, Home, Phone, Mail } from 'lucide-react';

export default function VillaSunshine() {
  const [currentLang, setCurrentLang] = useState('pt');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const translations = {
    pt: {
      brand: 'Villa Sunshine',
      tagline: 'Sua villa dos sonhos em Florianópolis',
      hero: 'Villa Exclusiva com Vista para o Mar',
      heroDesc: 'Desfrute de momentos inesquecíveis em nossa luxuosa villa com vista panorâmica para o mar.',
      bookNow: 'Reserve Agora',
      fromPrice: 'A partir de R$ 350/noite',
      amenities: 'Comodidades',
      location: 'Localização Privilegiada',
      locationDesc: 'Localizada na paradisíaca Florianópolis, nossa villa oferece fácil acesso às melhores praias.',
      contact: 'Entre em Contato',
      phone: 'Telefone',
      email: 'E-mail',
      wifi: 'Wi-Fi Gratuito',
      parking: 'Estacionamento',
      kitchen: 'Cozinha Completa',
      pool: 'Piscina Privativa'
    },
    en: {
      brand: 'Villa Sunshine',
      tagline: 'Your dream villa in Florianópolis',
      hero: 'Exclusive Villa with Ocean View',
      heroDesc: 'Enjoy unforgettable moments in our luxurious villa with panoramic ocean views.',
      bookNow: 'Book Now',
      fromPrice: 'Starting from $70/night',
      amenities: 'Amenities',
      location: 'Prime Location',
      locationDesc: 'Located in paradisiacal Florianópolis, our villa offers easy access to the best beaches.',
      contact: 'Get in Touch',
      phone: 'Phone',
      email: 'E-mail',
      wifi: 'Free Wi-Fi',
      parking: 'Parking',
      kitchen: 'Full Kitchen',
      pool: 'Private Pool'
    },
    es: {
      brand: 'Villa Sunshine',
      tagline: 'Tu villa soñada en Florianópolis',
      hero: 'Villa Exclusiva con Vista al Mar',
      heroDesc: 'Disfruta de momentos inolvidables en nuestra lujosa villa con vista panorámica.',
      bookNow: 'Reservar Ahora',
      fromPrice: 'Desde $70/noche',
      amenities: 'Comodidades',
      location: 'Ubicación Privilegiada',
      locationDesc: 'Ubicada en la paradisíaca Florianópolis, nuestra villa ofrece fácil acceso.',
      contact: 'Contactar',
      phone: 'Teléfono',
      email: 'E-mail',
      wifi: 'Wi-Fi Gratuito',
      parking: 'Estacionamiento',
      kitchen: 'Cocina Completa',
      pool: 'Piscina Privada'
    },
    de: {
      brand: 'Villa Sunshine',
      tagline: 'Ihre Traumvilla in Florianópolis',
      hero: 'Exklusive Villa mit Meerblick',
      heroDesc: 'Genießen Sie unvergessliche Momente in unserer luxuriösen Villa mit Panoramablick.',
      bookNow: 'Jetzt Buchen',
      fromPrice: 'Ab $70/Nacht',
      amenities: 'Ausstattung',
      location: 'Privilegierte Lage',
      locationDesc: 'In dem paradiesischen Florianópolis gelegen, bietet unsere Villa einfachen Zugang.',
      contact: 'Kontakt',
      phone: 'Telefon',
      email: 'E-Mail',
      wifi: 'Kostenloses Wi-Fi',
      parking: 'Parkplatz',
      kitchen: 'Vollküche',
      pool: 'Privater Pool'
    }
  };

 const t = (key: string): string => {
  const lang = currentLang as keyof typeof translations;
  const langTranslations = translations[lang];
  return (langTranslations as any)[key] || key;
};

  const styles = {
    container: {
      fontFamily: 'system-ui, sans-serif',
      margin: 0,
      padding: 0,
      width: '100%',
      overflowX: 'hidden' as const,
      backgroundColor: 'white'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px',
      flexWrap: 'wrap'
    },
    logo: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb'
    },
    nav: {
      display: isMobile ? 'none' : 'flex',
      gap: '2rem'
    },
    langButtons: {
      display: 'flex',
      gap: '0.25rem',
      flexWrap: 'wrap'
    },
    langButton: {
      padding: '0.5rem',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      fontSize: '0.75rem',
      transition: 'all 0.2s',
      minWidth: '40px'
    },
    hero: {
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
      padding: isMobile ? '3rem 1rem' : '5rem 2rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    heroContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '2rem' : '3rem',
      alignItems: 'center'
    },
    heroText: {
      flex: 1,
      color: '#111827'
    },
    heroTitle: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      lineHeight: '1.2'
    },
    heroDesc: {
      fontSize: isMobile ? '1rem' : '1.25rem',
      color: '#4b5563',
      marginBottom: '1.5rem',
      lineHeight: '1.6'
    },
    price: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: '600',
      color: '#2563eb',
      marginBottom: '2rem'
    },
    button: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.2s',
      width: isMobile ? '100%' : 'auto'
    },
    card: {
      flex: isMobile ? 'none' : '0 0 400px',
      width: isMobile ? '100%' : '400px',
      background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
      borderRadius: '1rem',
      padding: '2rem',
      color: 'white',
      boxShadow: '0 20px 25px rgba(0,0,0,0.15)'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    cardSubtitle: {
      color: '#dbeafe',
      marginBottom: '1.5rem',
      fontSize: '0.9rem'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem'
    },
    section: {
      padding: isMobile ? '3rem 1rem' : '5rem 2rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    sectionContent: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '3rem',
      color: '#111827'
    },
    amenitiesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem'
    },
    amenityCard: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    amenityIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: '#eff6ff',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '1rem',
      flexShrink: 0
    },
    contactSection: {
      backgroundColor: '#111827',
      color: 'white'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    contactCard: {
      textAlign: 'center',
      padding: '1.5rem',
      backgroundColor: '#1f2937',
      borderRadius: '0.5rem'
    },
    footer: {
      backgroundColor: '#111827',
      borderTop: '1px solid #374151',
      padding: '2rem 1rem',
      textAlign: 'center',
      color: '#9ca3af'
    }
  };

  const amenitiesList = [
    { icon: Wifi, label: t('wifi') },
    { icon: Car, label: t('parking') },
    { icon: Coffee, label: t('kitchen') },
    { icon: Waves, label: t('pool') }
  ];

  const languages = [
    { code: 'pt', flag: '🇧🇷', name: 'PT' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'de', flag: '🇩🇪', name: 'DE' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>{t('brand')}</h1>
          
          {!isMobile && (
            <nav style={styles.nav}>
              <a href="#inicio" style={{color: '#374151', textDecoration: 'none'}}>Início</a>
              <a href="#sobre" style={{color: '#374151', textDecoration: 'none'}}>Sobre</a>
              <a href="#contato" style={{color: '#374151', textDecoration: 'none'}}>Contato</a>
            </nav>
          )}

          <div style={styles.langButtons}>
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                style={{
                  ...styles.langButton,
                  backgroundColor: currentLang === lang.code ? '#eff6ff' : 'transparent',
                  color: currentLang === lang.code ? '#2563eb' : '#6b7280'
                }}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h2 style={styles.heroTitle}>{t('hero')}</h2>
            <p style={styles.heroDesc}>{t('heroDesc')}</p>
            <p style={styles.price}>{t('fromPrice')}</p>
            <button 
              style={styles.button}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              {t('bookNow')}
            </button>
          </div>
          
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>{t('brand')}</h3>
            <p style={styles.cardSubtitle}>{t('tagline')}</p>
            
            <div style={styles.features}>
              <div style={styles.feature}>
                <Bed size={16} />
                <span>4 Quartos</span>
              </div>
              <div style={styles.feature}>
                <Bath size={16} />
                <span>3 Banheiros</span>
              </div>
              <div style={styles.feature}>
                <Users size={16} />
                <span>8 Pessoas</span>
              </div>
              <div style={styles.feature}>
                <Home size={16} />
                <span>250m²</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section style={{...styles.section, backgroundColor: '#f9fafb'}}>
        <div style={styles.sectionContent}>
          <h3 style={styles.sectionTitle}>{t('amenities')}</h3>
          
          <div style={styles.amenitiesGrid}>
            {amenitiesList.map((amenity, index) => (
              <div key={index} style={styles.amenityCard}>
                <div style={styles.amenityIcon}>
                  <amenity.icon size={20} color="#2563eb" />
                </div>
                <h4 style={{margin: 0, color: '#111827', fontWeight: '600'}}>{amenity.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{...styles.section, ...styles.contactSection}}>
        <div style={styles.sectionContent}>
          <h3 style={{...styles.sectionTitle, color: 'white'}}>{t('contact')}</h3>
          
          <div style={styles.contactGrid}>
            <div style={styles.contactCard}>
              <Phone size={24} color="#60a5fa" style={{marginBottom: '1rem'}} />
              <h4 style={{marginBottom: '0.5rem', fontSize: '1rem'}}>{t('phone')}</h4>
              <p style={{color: '#60a5fa', margin: 0, fontSize: '0.9rem'}}>+55 48 9999-9999</p>
            </div>
            
            <div style={styles.contactCard}>
              <Mail size={24} color="#60a5fa" style={{marginBottom: '1rem'}} />
              <h4 style={{marginBottom: '0.5rem', fontSize: '1rem'}}>{t('email')}</h4>
              <p style={{color: '#60a5fa', margin: 0, fontSize: '0.9rem'}}>contato@villasunshine.com</p>
            </div>
            
            <div style={styles.contactCard}>
              <MapPin size={24} color="#60a5fa" style={{marginBottom: '1rem'}} />
              <h4 style={{marginBottom: '0.5rem', fontSize: '1rem'}}>Endereço</h4>
              <p style={{color: '#60a5fa', margin: 0, fontSize: '0.9rem'}}>Florianópolis, SC</p>
            </div>
          </div>

          <div style={{textAlign: 'center'}}>
            <button 
              style={styles.button}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              {t('bookNow')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <h4 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#60a5fa', marginBottom: '1rem'}}>{t('brand')}</h4>
        <p style={{fontSize: '0.875rem'}}>© 2024 Villa Sunshine. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}