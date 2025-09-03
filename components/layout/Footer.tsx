'use client';

interface FooterLink {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  url: string;
  icon: string; // Emoji ou símbolo
}

interface FooterProps {
  brandName: string;
  description?: string;
  copyrightText: string;
  poweredByText?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  showBackToTop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Footer({
  brandName,
  description,
  copyrightText,
  poweredByText,
  sections = [],
  socialLinks = [],
  showBackToTop = true,
  className = '',
  style = {}
}: FooterProps) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultStyle: React.CSSProperties = {
    background: 'white',
    borderTop: '1px solid #e5e7eb',
    marginTop: 'auto',
    ...style
  };

  return (
    <footer className={className} style={defaultStyle}>
      {/* Main Footer Content */}
      {(sections.length > 0 || description || socialLinks.length > 0) && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {/* Brand Section */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '16px'
              }}>
                {brandName}
              </h3>
              
              {description && (
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  {description}
                </p>
              )}

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '12px'
                  }}>
                    Conecte-se conosco
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.name || index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          background: '#f3f4f6',
                          color: '#374151',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#e5e7eb';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#f3f4f6';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <span style={{ fontSize: '16px' }}>{social.icon}</span>
                        <span>{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Sections */}
            {sections.map((section, sectionIndex) => (
              <div key={section.title || sectionIndex}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '16px'
                }}>
                  {section.title}
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {section.links.map((link, linkIndex) => (
                    <li key={link.key || linkIndex} style={{ marginBottom: '8px' }}>
                      <button
                        onClick={link.onClick}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#6b7280',
                          cursor: 'pointer',
                          fontSize: '14px',
                          padding: '4px 0',
                          textAlign: 'left',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#374151';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#6b7280';
                        }}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <div style={{
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            {copyrightText} © {new Date().getFullYear()}
            {poweredByText && (
              <>
                {' • '}
                <span style={{ color: '#374151' }}>{poweredByText}</span>
              </>
            )}
          </div>

          {/* Back to Top Button */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>↑</span>
              <span>Topo</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

// Componente Footer Simples (versão compacta)
export function SimpleFooter({
  brandName,
  copyrightText,
  poweredByText,
  className = '',
  style = {}
}: {
  brandName: string;
  copyrightText: string;
  poweredByText?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Footer
      brandName={brandName}
      copyrightText={copyrightText}
      poweredByText={poweredByText}
      className={className}
      style={style}
      showBackToTop={false}
    />
  );
}