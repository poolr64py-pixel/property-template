// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { propertyConfig } from '@/config/property.config';
import './globals.css';

// Metadata dinâmica baseada na configuração
export const metadata: Metadata = {
  title: propertyConfig.seo.metaTitle,
  description: propertyConfig.seo.metaDescription,
  keywords: propertyConfig.seo.keywords.join(', '),
  
  // Open Graph
  openGraph: {
    title: propertyConfig.seo.metaTitle,
    description: propertyConfig.seo.metaDescription,
    siteName: propertyConfig.title,
    images: [
      {
        url: propertyConfig.seo.ogImage || propertyConfig.images.hero,
        width: 1200,
        height: 630,
        alt: propertyConfig.title,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: propertyConfig.seo.metaTitle,
    description: propertyConfig.seo.metaDescription,
    images: [propertyConfig.seo.ogImage || propertyConfig.images.hero],
  },
  
  // Metadados adicionais
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: propertyConfig.branding.primaryColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="pt-BR" 
      className="scroll-smooth"
      style={{
        '--color-primary': propertyConfig.branding.primaryColor,
        '--color-secondary': propertyConfig.branding.secondaryColor,
        '--color-accent': propertyConfig.branding.accentColor,
      } as React.CSSProperties}
    >
      <head>
        {/* Google Fonts via CSS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body 
        className="font-inter antialiased bg-white text-gray-900 overflow-x-hidden"
        suppressHydrationWarning={true}
      >
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}