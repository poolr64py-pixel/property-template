export default function TestSimple() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🔍 Teste Simples</h1>
      <p>Se você consegue ver esta página, o Next.js está funcionando.</p>
      
      <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <strong>✅ Servidor funcionando!</strong>
      </div>
      
      <button onClick={() => alert('Funciona!')}>
        Testar JavaScript
      </button>
    </div>
  );
}