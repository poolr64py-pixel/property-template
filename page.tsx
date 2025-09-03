// app/app/[locale]/test/page.tsx

import pt from '../../../../locales/pt/common.json';
import es from '../../../../locales/es/common.json';
import en from '../../../../locales/en/common.json';
import de from '../../../../locales/de/common.json';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <h1 className="text-white text-6xl">TESTE - NOVO DESIGN</h1>
    </div>
  );
}
