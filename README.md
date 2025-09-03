<<<<<<< HEAD
\# 🏠 Template de Site para Imóveis - Next.js 14



Uma estrutura moderna e reutilizável para criar sites individuais de imóveis com otimizações automáticas, SEO dinâmico e design responsivo.



\## ✨ Características Principais



\### 🚀 \*\*Performance \& Otimização\*\*

\- \*\*Next.js 14\*\* com App Router

\- \*\*Imagens otimizadas automaticamente\*\* (WebP, AVIF, lazy loading)

\- \*\*SEO dinâmico\*\* com meta tags e dados estruturados

\- \*\*Core Web Vitals\*\* otimizados

\- \*\*Lighthouse Score 90+\*\*



\### 🎨 \*\*Design Moderno\*\*

\- \*\*Tailwind CSS\*\* com configurações customizadas

\- \*\*Framer Motion\*\* para animações fluidas

\- \*\*Design responsivo\*\* (mobile-first)

\- \*\*Glassmorphism\*\* e efeitos modernos

\- \*\*Dark/Light theme\*\* suporte



\### 🔧 \*\*Funcionalidades\*\*

\- \*\*Galeria de imagens\*\* com lightbox

\- \*\*Mapa interativo\*\* (Leaflet)

\- \*\*Formulário de contato\*\* integrado

\- \*\*WhatsApp\*\* integration

\- \*\*Schema.org\*\* para SEO

\- \*\*Sitemap automático\*\*

\- \*\*PWA ready\*\*



\## 🛠️ Instalação Rápida



\### 1. Clone o Template

```bash

git clone https://github.com/seu-repo/property-template.git meu-imovel

cd meu-imovel

```



\### 2. Instale as Dependências

```bash

npm install

```



\### 3. Configure o Imóvel

Edite o arquivo `config/property.config.ts` com os dados do seu imóvel:



```typescript

export const propertyConfig = {

&nbsp; id: "apartamento-luxo-las-mercedes",

&nbsp; title: "Apartamento de Luxo em Las Mercedes",

&nbsp; price: {

&nbsp;   sale: 450000,

&nbsp;   currency: "USD"

&nbsp; },

&nbsp; location: {

&nbsp;   address: "Av. España 1234",

&nbsp;   city: "Asunción",

&nbsp;   coordinates: { lat: -25.2637, lng: -57.5759 }

&nbsp; },

&nbsp; // ... mais configurações

}

```



\### 4. Adicione as Imagens

Coloque suas imagens na pasta `public/images/`:

\- `hero.jpg` - Imagem principal

\- `living-room.jpg`, `kitchen.jpg`, etc. - Galeria



\### 5. Execute o Projeto

```bash

npm run dev

```



Acesse: `http://localhost:3000`



\## 📁 Estrutura do Projeto



```

property-template/

├── app/                    # Next.js App Router

│   ├── layout.tsx         # Layout principal

│   ├── page.tsx           # Página principal

│   ├── globals.css        # Estilos globais

│   └── api/               # API routes

├── components/            # Componentes React

│   ├── Hero.tsx           # Seção hero

│   ├── Gallery.tsx        # Galeria de imagens

│   ├── Contact.tsx        # Formulário de contato

│   └── OptimizedImage.tsx # Componente de imagem

├── config/                # Configurações

│   └── property.config.ts # Config do imóvel

├── lib/                   # Utilitários

│   └── seo.ts            # Funções de SEO

├── public/               # Arquivos estáticos

│   ├── images/           # Imagens do imóvel

│   └── icons/            # Ícones e favicons

└── scripts/              # Scripts de automação

&nbsp;   └── deploy.js         # Script de deploy

```



\## 🎯 Configuração Detalhada



\### Dados do Imóvel

O arquivo `config/property.config.ts` centraliza todas as informações:



```typescript

export interface PropertyConfig {

&nbsp; // Informações básicas

&nbsp; id: string;

&nbsp; title: string;

&nbsp; description: string;

&nbsp; 

&nbsp; // Preço

&nbsp; price: {

&nbsp;   sale?: number;

&nbsp;   rent?: number;

&nbsp;   currency: 'USD' | 'BRL' | 'EUR';

&nbsp; };

&nbsp; 

&nbsp; // Localização

&nbsp; location: {

&nbsp;   address: string;

&nbsp;   city: string;

&nbsp;   coordinates: { lat: number; lng: number };

&nbsp; };

&nbsp; 

&nbsp; // Características

&nbsp; features: {

&nbsp;   bedrooms: number;

&nbsp;   bathrooms: number;

&nbsp;   area: number;

&nbsp;   parking: number;

&nbsp; };

&nbsp; 

&nbsp; // SEO

&nbsp; seo: {

&nbsp;   metaTitle: string;

&nbsp;   metaDescription: string;

&nbsp;   keywords: string\[];

&nbsp; };

&nbsp; 

&nbsp; // Contato

&nbsp; agent: {

&nbsp;   name: string;

&nbsp;   phone: string;

&nbsp;   email: string;

&nbsp;   whatsapp?: string;

&nbsp; };

}

```



\### Otimização de Imagens



\#### Formatos Suportados

\- \*\*WebP\*\* (padrão)

\- \*\*AVIF\*\* (melhor compressão)

\- \*\*JPEG\*\* (fallback)



\#### Configurações Automáticas

\- \*\*Lazy loading\*\* nativo

\- \*\*Responsive images\*\* automático

\- \*\*Blur placeholder\*\* gerado automaticamente

\- \*\*Compressão inteligente\*\*



\#### CDN Integration (Opcional)

Suporte para:

\- \*\*Cloudinary\*\*

\- \*\*ImageKit\*\*

\- \*\*Vercel Image Optimization\*\*



\### SEO Avançado



\#### Dados Estruturados (Schema.org)

```json

{

&nbsp; "@context": "https://schema.org",

&nbsp; "@type": "RealEstate",

&nbsp; "name": "Apartamento de Luxo",

&nbsp; "address": {...},

&nbsp; "geo": {...},

&nbsp; "offers": {...}

}

```



\#### Meta Tags Dinâmicas

\- Open Graph (Facebook)

\- Twitter Cards

\- Meta description otimizada

\- Canonical URLs



\## 🚀 Deploy Automatizado



\### Script de Deploy

```bash

\# Criar nova propriedade

npm run deploy new minha-propriedade



\# Build com otimizações

npm run deploy build



\# Deploy completo

npm run deploy deploy

```



\### Plataformas Suportadas



\#### Vercel (Recomendado)

```bash

npm run deploy deploy

```

\- Deploy automático

\- Otimização de imagens nativa

\- SSL automático

\- CDN global



\#### Netlify

```bash

\# Em deploy.config.json

{

&nbsp; "platform": "netlify"

}

npm run deploy deploy

```



\#### GitHub Pages

```bash

\# Em deploy.config.json  

{

&nbsp; "platform": "github-pages"

}

npm run deploy deploy

```



\## ⚡ Performance



\### Core Web Vitals

\- \*\*LCP\*\*: < 1.2s (otimização de imagens)

\- \*\*FID\*\*: < 100ms (code splitting)

\- \*\*CLS\*\*: < 0.1 (dimensões fixas)



\### Otimizações Implementadas

\- \*\*Tree shaking\*\* automático

\- \*\*Code splitting\*\* por rotas

\- \*\*Preload\*\* de recursos críticos

\- \*\*Compressão\*\* Gzip/Brotli

\- \*\*Caching\*\* inteligente



\### Bundle Analysis

```bash

npm run analyze

```



\## 📱 PWA \& Mobile



\### Progressive Web App

\- \*\*Manifest.json\*\* automático

\- \*\*Service Worker\*\* (opcional)

\- \*\*Offline capability\*\*

\- \*\*Install prompt\*\*



\### Responsive Design

\- \*\*Mobile-first\*\* approach

\- \*\*Touch-friendly\*\* interactions

\- \*\*Viewport\*\* otimizado

\- \*\*Performance\*\* mobile



\## 🔧 Customização



\### Cores e Branding

```typescript

branding: {

&nbsp; primaryColor: "#1a365d",

&nbsp; secondaryColor: "#2d5a87", 

&nbsp; accentColor: "#ed8936"

}

```



\### Componentes Personalizáveis

\- \*\*Hero\*\* section

\- \*\*Gallery\*\* layout

\- \*\*Contact\*\* form

\- \*\*Map\*\* integration



\### Estilo Global

```css

/\* globals.css \*/

:root {

&nbsp; --color-primary: #1a365d;

&nbsp; --color-secondary: #2d5a87;

&nbsp; --color-accent: #ed8936;

}

```



\## 📊 Analytics \& Tracking



\### Google Analytics 4

```typescript

// Em layout.tsx

<Script src="https://www.googletagmanager.com/gtag/js?id=GA\_MEASUREMENT\_ID" />

```



\### Facebook Pixel

```typescript

// Configuração automática via config

tracking: {

&nbsp; googleAnalytics: "GA\_MEASUREMENT\_ID",

&nbsp; facebookPixel: "PIXEL\_ID"

}

```



\## 🛠️ Desenvolvimento



\### Comandos Úteis

```bash

\# Desenvolvimento

npm run dev



\# Build de produção

npm run build



\# Preview do build

npm run start



\# Lint

npm run lint



\# Otimizar imagens

npm run optimize-images



\# Gerar sitemap

npm run generate-sitemap

```



\### Extensões VS Code Recomendadas

\- \*\*ES7+ React/Redux/React-Native snippets\*\*

\- \*\*Tailwind CSS IntelliSense\*\*

\- \*\*TypeScript Importer\*\*

\- \*\*Auto Rename Tag\*\*



\## 📝 Checklist de Deploy



\### Antes do Deploy

\- \[ ] Configurar `property.config.ts`

\- \[ ] Adicionar todas as imagens

\- \[ ] Testar responsividade

\- \[ ] Verificar SEO (meta tags)

\- \[ ] Testar formulário de contato

\- \[ ] Configurar domínio personalizado



\### Otimizações

\- \[ ] Comprimir imagens

\-

=======
\# 🏠 Template de Site para Imóveis - Next.js 14



Uma estrutura moderna e reutilizável para criar sites individuais de imóveis com otimizações automáticas, SEO dinâmico e design responsivo.



\## ✨ Características Principais



\### 🚀 \*\*Performance \& Otimização\*\*

\- \*\*Next.js 14\*\* com App Router

\- \*\*Imagens otimizadas automaticamente\*\* (WebP, AVIF, lazy loading)

\- \*\*SEO dinâmico\*\* com meta tags e dados estruturados

\- \*\*Core Web Vitals\*\* otimizados

\- \*\*Lighthouse Score 90+\*\*



\### 🎨 \*\*Design Moderno\*\*

\- \*\*Tailwind CSS\*\* com configurações customizadas

\- \*\*Framer Motion\*\* para animações fluidas

\- \*\*Design responsivo\*\* (mobile-first)

\- \*\*Glassmorphism\*\* e efeitos modernos

\- \*\*Dark/Light theme\*\* suporte



\### 🔧 \*\*Funcionalidades\*\*

\- \*\*Galeria de imagens\*\* com lightbox

\- \*\*Mapa interativo\*\* (Leaflet)

\- \*\*Formulário de contato\*\* integrado

\- \*\*WhatsApp\*\* integration

\- \*\*Schema.org\*\* para SEO

\- \*\*Sitemap automático\*\*

\- \*\*PWA ready\*\*



\## 🛠️ Instalação Rápida



\### 1. Clone o Template

```bash

git clone https://github.com/seu-repo/property-template.git meu-imovel

cd meu-imovel

```



\### 2. Instale as Dependências

```bash

npm install

```



\### 3. Configure o Imóvel

Edite o arquivo `config/property.config.ts` com os dados do seu imóvel:



```typescript

export const propertyConfig = {

&nbsp; id: "apartamento-luxo-las-mercedes",

&nbsp; title: "Apartamento de Luxo em Las Mercedes",

&nbsp; price: {

&nbsp;   sale: 450000,

&nbsp;   currency: "USD"

&nbsp; },

&nbsp; location: {

&nbsp;   address: "Av. España 1234",

&nbsp;   city: "Asunción",

&nbsp;   coordinates: { lat: -25.2637, lng: -57.5759 }

&nbsp; },

&nbsp; // ... mais configurações

}

```



\### 4. Adicione as Imagens

Coloque suas imagens na pasta `public/images/`:

\- `hero.jpg` - Imagem principal

\- `living-room.jpg`, `kitchen.jpg`, etc. - Galeria



\### 5. Execute o Projeto

```bash

npm run dev

```



Acesse: `http://localhost:3000`



\## 📁 Estrutura do Projeto



```

property-template/

├── app/                    # Next.js App Router

│   ├── layout.tsx         # Layout principal

│   ├── page.tsx           # Página principal

│   ├── globals.css        # Estilos globais

│   └── api/               # API routes

├── components/            # Componentes React

│   ├── Hero.tsx           # Seção hero

│   ├── Gallery.tsx        # Galeria de imagens

│   ├── Contact.tsx        # Formulário de contato

│   └── OptimizedImage.tsx # Componente de imagem

├── config/                # Configurações

│   └── property.config.ts # Config do imóvel

├── lib/                   # Utilitários

│   └── seo.ts            # Funções de SEO

├── public/               # Arquivos estáticos

│   ├── images/           # Imagens do imóvel

│   └── icons/            # Ícones e favicons

└── scripts/              # Scripts de automação

&nbsp;   └── deploy.js         # Script de deploy

```



\## 🎯 Configuração Detalhada



\### Dados do Imóvel

O arquivo `config/property.config.ts` centraliza todas as informações:



```typescript

export interface PropertyConfig {

&nbsp; // Informações básicas

&nbsp; id: string;

&nbsp; title: string;

&nbsp; description: string;

&nbsp; 

&nbsp; // Preço

&nbsp; price: {

&nbsp;   sale?: number;

&nbsp;   rent?: number;

&nbsp;   currency: 'USD' | 'BRL' | 'EUR';

&nbsp; };

&nbsp; 

&nbsp; // Localização

&nbsp; location: {

&nbsp;   address: string;

&nbsp;   city: string;

&nbsp;   coordinates: { lat: number; lng: number };

&nbsp; };

&nbsp; 

&nbsp; // Características

&nbsp; features: {

&nbsp;   bedrooms: number;

&nbsp;   bathrooms: number;

&nbsp;   area: number;

&nbsp;   parking: number;

&nbsp; };

&nbsp; 

&nbsp; // SEO

&nbsp; seo: {

&nbsp;   metaTitle: string;

&nbsp;   metaDescription: string;

&nbsp;   keywords: string\[];

&nbsp; };

&nbsp; 

&nbsp; // Contato

&nbsp; agent: {

&nbsp;   name: string;

&nbsp;   phone: string;

&nbsp;   email: string;

&nbsp;   whatsapp?: string;

&nbsp; };

}

```



\### Otimização de Imagens



\#### Formatos Suportados

\- \*\*WebP\*\* (padrão)

\- \*\*AVIF\*\* (melhor compressão)

\- \*\*JPEG\*\* (fallback)



\#### Configurações Automáticas

\- \*\*Lazy loading\*\* nativo

\- \*\*Responsive images\*\* automático

\- \*\*Blur placeholder\*\* gerado automaticamente

\- \*\*Compressão inteligente\*\*



\#### CDN Integration (Opcional)

Suporte para:

\- \*\*Cloudinary\*\*

\- \*\*ImageKit\*\*

\- \*\*Vercel Image Optimization\*\*



\### SEO Avançado



\#### Dados Estruturados (Schema.org)

```json

{

&nbsp; "@context": "https://schema.org",

&nbsp; "@type": "RealEstate",

&nbsp; "name": "Apartamento de Luxo",

&nbsp; "address": {...},

&nbsp; "geo": {...},

&nbsp; "offers": {...}

}

```



\#### Meta Tags Dinâmicas

\- Open Graph (Facebook)

\- Twitter Cards

\- Meta description otimizada

\- Canonical URLs



\## 🚀 Deploy Automatizado



\### Script de Deploy

```bash

\# Criar nova propriedade

npm run deploy new minha-propriedade



\# Build com otimizações

npm run deploy build



\# Deploy completo

npm run deploy deploy

```



\### Plataformas Suportadas



\#### Vercel (Recomendado)

```bash

npm run deploy deploy

```

\- Deploy automático

\- Otimização de imagens nativa

\- SSL automático

\- CDN global



\#### Netlify

```bash

\# Em deploy.config.json

{

&nbsp; "platform": "netlify"

}

npm run deploy deploy

```



\#### GitHub Pages

```bash

\# Em deploy.config.json  

{

&nbsp; "platform": "github-pages"

}

npm run deploy deploy

```



\## ⚡ Performance



\### Core Web Vitals

\- \*\*LCP\*\*: < 1.2s (otimização de imagens)

\- \*\*FID\*\*: < 100ms (code splitting)

\- \*\*CLS\*\*: < 0.1 (dimensões fixas)



\### Otimizações Implementadas

\- \*\*Tree shaking\*\* automático

\- \*\*Code splitting\*\* por rotas

\- \*\*Preload\*\* de recursos críticos

\- \*\*Compressão\*\* Gzip/Brotli

\- \*\*Caching\*\* inteligente



\### Bundle Analysis

```bash

npm run analyze

```



\## 📱 PWA \& Mobile



\### Progressive Web App

\- \*\*Manifest.json\*\* automático

\- \*\*Service Worker\*\* (opcional)

\- \*\*Offline capability\*\*

\- \*\*Install prompt\*\*



\### Responsive Design

\- \*\*Mobile-first\*\* approach

\- \*\*Touch-friendly\*\* interactions

\- \*\*Viewport\*\* otimizado

\- \*\*Performance\*\* mobile



\## 🔧 Customização



\### Cores e Branding

```typescript

branding: {

&nbsp; primaryColor: "#1a365d",

&nbsp; secondaryColor: "#2d5a87", 

&nbsp; accentColor: "#ed8936"

}

```



\### Componentes Personalizáveis

\- \*\*Hero\*\* section

\- \*\*Gallery\*\* layout

\- \*\*Contact\*\* form

\- \*\*Map\*\* integration



\### Estilo Global

```css

/\* globals.css \*/

:root {

&nbsp; --color-primary: #1a365d;

&nbsp; --color-secondary: #2d5a87;

&nbsp; --color-accent: #ed8936;

}

```



\## 📊 Analytics \& Tracking



\### Google Analytics 4

```typescript

// Em layout.tsx

<Script src="https://www.googletagmanager.com/gtag/js?id=GA\_MEASUREMENT\_ID" />

```



\### Facebook Pixel

```typescript

// Configuração automática via config

tracking: {

&nbsp; googleAnalytics: "GA\_MEASUREMENT\_ID",

&nbsp; facebookPixel: "PIXEL\_ID"

}

```



\## 🛠️ Desenvolvimento



\### Comandos Úteis

```bash

\# Desenvolvimento

npm run dev



\# Build de produção

npm run build



\# Preview do build

npm run start



\# Lint

npm run lint



\# Otimizar imagens

npm run optimize-images



\# Gerar sitemap

npm run generate-sitemap

```



\### Extensões VS Code Recomendadas

\- \*\*ES7+ React/Redux/React-Native snippets\*\*

\- \*\*Tailwind CSS IntelliSense\*\*

\- \*\*TypeScript Importer\*\*

\- \*\*Auto Rename Tag\*\*



\## 📝 Checklist de Deploy



\### Antes do Deploy

\- \[ ] Configurar `property.config.ts`

\- \[ ] Adicionar todas as imagens

\- \[ ] Testar responsividade

\- \[ ] Verificar SEO (meta tags)

\- \[ ] Testar formulário de contato

\- \[ ] Configurar domínio personalizado



\### Otimizações

\- \[ ] Comprimir imagens

\-

>>>>>>> 228e52862bd1487979d8c411c9e94465e04f3bce
