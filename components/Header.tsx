'use client';

import { useState } from 'react';

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

interface HeaderProps {
  brandName: string;
  currentLocale: Locale;
  onLanguageChange: (locale: Locale) => void;
  navigationItems?: Array<{
    key: string;
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  showLanguageSelector?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Header({
  brandName,
  currentLocale,
  onLanguageChange,
  navigationItems = [],
  showLanguageSelector = true,
  className = '',
  style = {}
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const defaultStyle: React.CSSProperties = {
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    ...style
  };

  return (
    <header className={className} style={defaultStyle}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          {/* Brand/Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#111827',
              margin: 0,
              cursor: 'pointer'
            }}>
              {brandName}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px'
          }}>
            {/* Navigation Items */}
            <div style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center'
            }}>
              {navigationItems.map((item, index) => (
                <button
                  key={item.key || index}
                  onClick={item.onClick}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#374151',
                    fontSize: '16px',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.color = '#111827';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#374151';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language Selector */}
            {showLanguageSelector && (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#374151',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <span style={{ fontSize: '18px' }}>
                    {LOCALE_FLAGS[currentLocale]}
                  </span>
                  <span>{LOCALE_NAMES[currentLocale]}</span>
                  <svg
                    style={{
                      width: '16px',
                      height: '16px',
                      transform: isLanguageDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '4px',
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      minWidth: '150px',
                      zIndex: 100
                    }}>
                      {Object.entries(LOCALE_FLAGS).map(([locale, flag]) => (
                        <button
                          key={locale}
                          onClick={() => {
                            onLanguageChange(locale as Locale);
                            setIsLanguageDropdownOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '10px 16px',
                            background: locale === currentLocale ? '#f0f9ff' : 'transparent',
                            color: locale === currentLocale ? '#0369a1' : '#374151',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (locale !== currentLocale) {
                              e.currentTarget.style.background = '#f9fafb';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (locale !== currentLocale) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          <span style={{ fontSize: '18px' }}>{flag}</span>
                          <span>{LOCALE_NAMES[locale as Locale]}</span>
                          {locale === currentLocale && (
                            <svg
                              style={{ width: '16px', height: '16px', marginLeft: 'auto', color: '#0369a1' }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Overlay para fechar dropdown */}
                    <div
                      style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 50
                      }}
                      onClick={() => setIsLanguageDropdownOpen(false)}
                    />
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                flexDirection: 'column',
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
              className="mobile-menu-btn"
            >
              <span style={{ width: '20px', height: '2px', background: '#374151', borderRadius: '1px' }}></span>
              <span style={{ width: '20px', height: '2px', background: '#374151', borderRadius: '1px' }}></span>
              <span style={{ width: '20px', height: '2px', background: '#374151', borderRadius: '1px' }}></span>
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            display: 'block',
            padding: '20px 0',
            borderTop: '1px solid #e5e7eb',
            background: 'white'
          }} className="mobile-menu">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {navigationItems.map((item, index) => (
                <button
                  key={item.key || index}
                  onClick={() => {
                    item.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#374151',
                    fontSize: '16px',
                    cursor: 'pointer',
                    padding: '10px',
                    textAlign: 'left',
                    borderRadius: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS para responsividade */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          nav > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}