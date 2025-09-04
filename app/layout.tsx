import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TranslationProvider } from '../lib/hooks/useTranslation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Villa Sunshine - Aluguel por Temporada',
  description: 'Villa exclusiva em Florianópolis para aluguel por temporada.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}