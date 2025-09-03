// components/SEO/SEO.tsx
'use client';

import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

export default function SEO({ title, description, keywords }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
