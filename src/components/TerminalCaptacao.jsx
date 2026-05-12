import React from 'react';

export default function TerminalCaptacao({ submitted, setSubmitted }) {
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nomeRaw = e.target[0].value;
    const emailRaw = e.target[1].value;
    const escopoRaw = e.target[2].value;

    const sanitize = (str) => str.replace(/<[^>]*>?/gm, '').trim();

    const formData = {
      nome: sanitize(nomeRaw),
      email: sanitize(emailRaw).toLowerCase(),
      escopo: sanitize(escopoRaw),
      origem: "Landing Page Vortex",
      timestamp: new Date().toISOString()
    };

    if (formData.nome.length < 2 || formData.escopo.length < 5) {
      alert("Erro no Sistema: Dados insuficientes para processamento.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Acesso Negado: Formato de e-mail inválido.");
      return;
    }

    try {
      await fetch('https://n8n.biodinamica.com.br/webhook/vortex-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Erro no terminal:", error);
      alert("Erro ao conectar. Tente novamente.");
    }
  };

  return (
    <section id="contact" className="w-full max-w-5xl mx-auto px-4 mt-20 mb-20">
      <div className="p-10 md:p-16 rounded-[3rem] bg-gray-900/40 border border-purple-500/20 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(109,40,217,0.1)]">
        {!submitted ? (
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-left">
            <div>
              <h3 className="text-4xl font-black text-white mb-6">Inicie a sua <span className="text-purple-400">Evolução.</span></h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">Nossa arquitetura roda em background. Envie seu escopo e nossos webhooks iniciarão a triagem.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input type="text" required placeholder="Nome / Empresa" className="w-full bg-black/50 border border-gray-800 focus:border-purple-500 rounded-2xl px-6 py-4 text-white outline-none" style={{ cursor: 'none' }} />
              <input type="email" required placeholder="E-mail Corporativo" className="w-full bg-black/50 border border-gray-800 focus:border-cyan-400 rounded-2xl px-6 py-4 text-white outline-none" style={{ cursor: 'none' }} />
              <textarea rows="3" required placeholder="Escopo do Projeto..." className="w-full bg-black/50 border border-gray-800 focus:border-purple-500 rounded-2xl px-6 py-4 text-white outline-none resize-none" style={{ cursor: 'none' }}></textarea>
              <button type="submit" className="py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 text-white font-black hover:scale-[1.02] transition-all" style={{ cursor: 'none' }}>FORJAR SISTEMA</button>
            </form>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center text-center py-10">
            <h3 className="text-4xl font-black text-white mb-4">CONEXÃO <span className="text-cyan-400">ESTABELECIDA</span></h3>
            <p className="text-gray-400 text-lg mb-8">Triagem técnica iniciada. Quer prioridade na análise?</p>
            <a href="https://wa.me/5543991327878" target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-full bg-[#25D366] text-white font-black hover:scale-105 transition-all shadow-[0_0_40px_rgba(37,211,102,0.3)]" style={{ cursor: 'none' }}>ACESSO VIP WHATSAPP</a>
          </div>
        )}
      </div>
    </section>
  );
}