'use client';
import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Navigation, Breadcrumb, ContextMenu } from '../components/layout/Navigation';

// Tipos simples
type Locale = 'pt' | 'en' | 'es' | 'de';

const LOCALE_FLAGS = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸', 
  de: '🇩🇪'
};

const LOCALE_NAMES = {
  pt: 'Português',
  en: 'English', 
  es: 'Español',
  de: 'Deutsch'
};

// Função para carregar traduções
async function loadTranslations(locale: Locale) {
  try {
    let module;
    switch (locale) {
      case 'en':
        module = await import('../locales/en/common.json');
        break;
      case 'es':
        module = await import('../locales/es/common.json');
        break;
      case 'de':
        module = await import('../locales/de/common.json');
        break;
      default:
        module = await import('../locales/pt/common.json');
    }
    return module.default;
  } catch (error) {
    console.error('Error loading translations:', error);
    return {};
  }
}

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((curr, key) => curr?.[key], obj) || path;
}

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await loadTranslations(locale);
      setTranslations(data);
      setIsLoading(false);
    };
    load();
  }, [locale]);

  const t = (key: string): string => {
    if (isLoading) return key;
    return getNestedValue(translations, key);
  };

  const switchLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  // Dados para os componentes
  const navigationItems = [
    {
      key: 'home',
      label: t('nav.home'),
      icon: '🏠',
      isActive: currentSection === 'home',
      onClick: () => setCurrentSection('home')
    },
    {
      key: 'about',
      label: t('nav.about'),
      icon: '📋',
      isActive: currentSection === 'about',
      onClick: () => setCurrentSection('about')
    },
    {
      key: 'services',
      label: t('nav.services'),
      icon: '⚙️',
      isActive: currentSection === 'services',
      onClick: () => setCurrentSection('services'),
      children: [
        {
          key: 'web-dev',
          label: 'Desenvolvimento Web',
          onClick: () => setCurrentSection('web-dev')
        },
        {
          key: 'mobile-dev',
          label: 'Desenvolvimento Mobile',
          onClick: () => setCurrentSection('mobile-dev')
        }
      ]
    },
    {
      key: 'contact',
      label: t('nav.contact'),
      icon: '📞',
      isActive: currentSection === 'contact',
      onClick: () => setCurrentSection('contact')
    }
  ];

  const breadcrumbItems = [
    { label: t('nav.home'), onClick: () => setCurrentSection('home') },
    { label: t('demo.title'), isActive: true }
  ];

  const footerSections = [
    {
      title: t('footer.sections.company.title'),
      links: [
        { key: 'about', label: t('footer.sections.company.about'), onClick: () => setCurrentSection('about') },
        { key: 'team', label: t('footer.sections.company.team'), onClick: () => alert('Em desenvolvimento') },
        { key: 'careers', label: t('footer.sections.company.careers'), onClick: () => alert('Em desenvolvimento') }
      ]
    },
    {
      title: t('footer.sections.resources.title'),
      links: [
        { key: 'docs', label: t('footer.sections.resources.documentation'), onClick: () => alert('Documentação') },
        { key: 'tutorials', label: t('footer.sections.resources.tutorials'), onClick: () => alert('Tutoriais') },
        { key: 'examples', label: t('footer.sections.resources.examples'), onClick: () => alert('Exemplos') }
      ]
    },
    {
      title: t('footer.sections.support.title'),
      links: [
        { key: 'help', label: t('footer.sections.support.help'), onClick: () => alert('Central de Ajuda') },
        { key: 'contact', label: t('footer.sections.support.contact'), onClick: () => setCurrentSection('contact') },
        { key: 'feedback', label: t('footer.sections.support.feedback'), onClick: () => alert('Feedback') }
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: '🐱', url: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' }
  ];

  const contextMenuItems = [
    { key: 'copy', label: 'Copiar', icon: '📋', onClick: () => alert('Copiado!') },
    { key: 'share', label: 'Compartilhar', icon: '🔗', onClick: () => alert('Compartilhado!') },
    { key: 'print', label: 'Imprimir', icon: '🖨️', onClick: () => window.print() }
  ];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '3px solid #f3f4f6',
            borderTop: '3px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #e0e7ff 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Reutilizável */}
      <Header
        brandName={t('brand.name')}
        currentLocale={locale}
        onLanguageChange={switchLanguage}
        navigationItems={navigationItems}
        showLanguageSelector={true}
      />

      {/* Breadcrumb */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px',
        width: '100%'
      }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Conteúdo Principal */}
      <main 
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px 40px',
          flex: 1,
          width: '100%'
        }}
        onContextMenu={handleContextMenu}
      >
        {/* Hero Section */}
        <div style={{ 
          textAlign: 'center',
          background: 'white',
          padding: '60px 40px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '20px'
          }}>
            {t('demo.title')}
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            {t('demo.subtitle')}
          </p>
        </div>

        {/* Demonstração de Navegações */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Navegação Horizontal */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#111827' }}>
              Navegação Horizontal
            </h3>
            <Navigation
              items={navigationItems}
              variant="horizontal"
            />
          </div>

          {/* Navegação Vertical */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#111827' }}>
              Navegação Vertical
            </h3>
            <Navigation
              items={navigationItems}
              variant="vertical"
            />
          </div>

          {/* Sidebar */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#111827' }}>
              Sidebar
            </h3>
            <Navigation
              items={navigationItems}
              variant="sidebar"
            />
          </div>
        </div>

        {/* Recursos */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ 
              background: 'white', 
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ 
                fontSize: '48px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {t(`features.items.${i}.icon`)}
              </div>
              <h3 style={{ 
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                {t(`features.items.${i}.title`)}
              </h3>
              <p style={{ 
                color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {t(`features.items.${i}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Status do Sistema */}
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#16a34a', marginBottom: '15px', fontSize: '24px' }}>
            ✅ Todos os Componentes Funcionando!
          </h3>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            <strong>Idioma atual:</strong> {LOCALE_FLAGS[locale]} {LOCALE_NAMES[locale]}
          </p>
          <p style={{ color: '#6b7280' }}>
            Clique com o botão direito em qualquer lugar para ver o menu de contexto
          </p>
        </div>
      </main>

      {/* Footer Reutilizável */}
      <Footer
        brandName={t('brand.name')}
        description={t('brand.description')}
        copyrightText={t('footer.copyright')}
        poweredByText={t('footer.poweredBy')}
        sections={footerSections}
        socialLinks={socialLinks}
        showBackToTop={true}
      />

      {/* Menu de Contexto */}
      <ContextMenu
        items={contextMenuItems}
        isVisible={contextMenu.visible}
        position={{ x: contextMenu.x, y: contextMenu.y }}
        onClose={() => setContextMenu({ ...contextMenu, visible: false })}
      />

      {/* CSS para animações */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}