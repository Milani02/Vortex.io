import React from 'react';

export function LegalPrivacy({ onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-left bg-black/60 backdrop-blur-md rounded-3xl border border-white/5 my-20 relative z-10">
      <button 
        onClick={() => onBack('home')} 
        className="mb-8 flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors font-bold text-xs uppercase tracking-widest" 
        style={{ cursor: 'none' }}
      >
        <span className="text-lg leading-none">&larr;</span> Voltar ao Início
      </button>
      <h2 className="text-4xl font-black text-white mb-8">Política de Privacidade</h2>
      <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
        <p>A <strong>VORTEX i.o</strong> está comprometida em proteger a sua privacidade em conformidade com a LGPD (Lei nº 13.709/2018).</p>
        <h3 className="text-lg font-bold text-white mt-6">1. Coleta de Dados</h3>
        <p>Coletamos dados fornecidos voluntariamente via formulário exclusivamente para análise de viabilidade técnica e contato comercial.</p>
        <h3 className="text-lg font-bold text-white mt-6">2. Uso e Automação</h3>
        <p>Seus dados podem transitar via Webhooks para nossos sistemas de triagem interna. Nunca comercializamos seus dados.</p>
        <p className="mt-8 text-xs font-mono">Última atualização: Maio de 2026.</p>
      </div>
    </div>
  );
}

export function LegalTerms({ onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-left bg-black/60 backdrop-blur-md rounded-3xl border border-white/5 my-20 relative z-10">
      <button 
        onClick={() => onBack('home')} 
        className="mb-8 flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors font-bold text-xs uppercase tracking-widest" 
        style={{ cursor: 'none' }}
      >
        <span className="text-lg leading-none">&larr;</span> Voltar ao Início
      </button>
      <h2 className="text-4xl font-black text-white mb-8">Termos de Serviço</h2>
      <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
        <p>Ao utilizar o site da <strong>VORTEX i.o</strong>, você concorda com nossos termos de propriedade intelectual e uso de serviços.</p>
        <h3 className="text-lg font-bold text-white mt-6">1. Natureza do Serviço</h3>
        <p>O envio de formulários configura uma "Aplicação de Projeto" sujeita a triagem técnica e não garante a contratação imediata.</p>
        <h3 className="text-lg font-bold text-white mt-6">2. Foro</h3>
        <p>Fica eleito o foro da comarca de Ibiporã / Londrina, Estado do Paraná.</p>
      </div>
    </div>
  );
}