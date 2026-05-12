import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- IMPORTAÇÃO DE COMPONENTES MODULARES ---
import SurrealScene from './components/SurrealScene';
import CursorTrail from './components/CursorTrail';
import { LegalPrivacy, LegalTerms } from './components/LegalPages';
import TerminalCaptacao from './components/TerminalCaptacao';

// --- IMPORTAÇÃO DAS IMAGENS ---
import nexusImg from './assets/image_field.png';
import biotecaImg from './assets/image_bioteca.png';
import n8nImg from './assets/image_cielon8n.png';
import logoVortex from './assets/logo_vortex-.png';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const scrollToContact = () => {
    setCurrentView('home'); 
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerOffset = 140; 
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 150); 
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-gray-200 selection:bg-purple-500 selection:text-white" style={{ cursor: 'none' }}>
      
      <SurrealScene />
      <CursorTrail />

      {/* --- HEADER --- */}
      <div className="fixed top-0 left-0 w-full z-[80] flex flex-col">
        {currentView === 'home' && (
          <div className="w-full bg-gradient-to-r from-purple-900 to-black text-center py-2 text-xs md:text-sm font-medium tracking-widest border-b border-purple-500/30">
            <span className="text-purple-300">⚡ ATENÇÃO:</span> APENAS 2 VAGAS NA AGENDA PARA ESTE MÊS.
          </div>
        )}
        <header className="py-2 px-6 w-full backdrop-blur-md bg-black/20 border-b border-white/5 shadow-lg shadow-purple-900/10">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div onClick={() => handleNavigation('home')} className="cursor-none hover:opacity-80 transition-opacity">
              <img src={logoVortex} alt="VORTEX.io Logo" className="h-16 md:h-20 w-auto scale-110 origin-left object-contain" />
            </div>
            {currentView === 'home' && (
              <button onClick={scrollToContact} className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105" style={{ cursor: 'none' }}>
                {submitted ? "Falar no WhatsApp" : "Fazer orçamento"}
              </button>
            )}
          </div>
        </header>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex flex-col items-center w-full pt-40 pb-32 relative z-10">
        
        {currentView === 'privacy' && <LegalPrivacy onBack={handleNavigation} />}
        {currentView === 'terms' && <LegalTerms onBack={handleNavigation} />}

        {currentView === 'home' && (
          <>
            {/* HERO SECTION COM ANIMAÇÃO */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-5xl mx-auto px-4 min-h-[80vh] flex flex-col justify-center items-center"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase"
              >
                Design Imersivo + Engenharia de Ponta
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                NÃO FAZEMOS SITES. <br />
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">FORJAMOS MÁQUINAS DE VENDA.</span>
              </h2>
              <p className="mt-8 text-xl max-w-3xl text-gray-300 font-light leading-relaxed">Ecossistemas digitais do absoluto zero. Interfaces surreais por fora, automações invisíveis por dentro.</p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-12 flex flex-col sm:flex-row gap-6"
              >
                <button onClick={scrollToContact} className="px-10 py-5 rounded-full bg-purple-600 text-white font-black text-lg hover:bg-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all transform hover:-translate-y-1" style={{ cursor: 'none' }}>
                  Quero um Projeto Único
                </button>
              </motion.div>
            </motion.section>

            {/* WHY US SECTION COM SCROLL REVEAL */}
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full bg-black/60 backdrop-blur-lg border-y border-white/5 py-24 mt-20"
            >
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-16">Por que sua marca está sendo ignorada?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="p-10 rounded-3xl border border-red-900/30 bg-red-900/5 text-left flex flex-col justify-center"
                  >
                    <h4 className="text-2xl font-bold text-red-400 mb-6">O Padrão Amador</h4>
                    <ul className="space-y-5 text-gray-400 text-sm">
                      <li className="flex items-start gap-3"><span>❌</span> <span>Templates genéricos que deixam seu site lento e comum.</span></li>
                      <li className="flex items-start gap-3"><span>❌</span> <span>Processos manuais sem integração real com seu fluxo.</span></li>
                      <li className="flex items-start gap-3"><span>❌</span> <span>Brechas de segurança por excesso de plugins desatualizados.</span></li>
                      <li className="flex items-start gap-3"><span>❌</span> <span>Design fraco que não transmite a autoridade da sua marca.</span></li>
                    </ul>
                  </motion.div>
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="p-10 rounded-3xl border border-cyan-500/30 bg-cyan-500/5 text-left relative overflow-hidden flex flex-col justify-center"
                  >
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-[100px]"></div>
                    <h4 className="text-2xl font-bold text-cyan-400 mb-6 relative z-10">O Padrão VORTEX</h4>
                    <ul className="space-y-5 text-gray-200 text-sm relative z-10">
                      <li className="flex items-start gap-3"><span>✔️</span> <span><strong>Código Puro:</strong> Performance brutal e SEO impecável.</span></li>
                      <li className="flex items-start gap-3"><span>✔️</span> <span><strong>Automação (n8n):</strong> Fluxos inteligentes e APIs nativas.</span></li>
                      <li className="flex items-start gap-3"><span>✔️</span> <span><strong>Security by Design:</strong> Arquitetura blindada contra ataques.</span></li>
                      <li className="flex items-start gap-3"><span>✔️</span> <span><strong>Identidade Única:</strong> UI/UX desenhado do zero para dominar.</span></li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* PORTFOLIO / ARSENAL COM STAGGER */}
            <section className="w-full py-20 max-w-7xl mx-auto px-4">
              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-white mb-16 text-center"
              >
                Arsenal Forjado
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  { img: nexusImg, title: "Nexus Field - Cocamar", desc: "Monitoramento geoespacial de alto nível para gestão de campo." },
                  { img: biotecaImg, title: "Videoteca corporativa", desc: "Streaming corporativo com infraestrutura de dados em nuvem." },
                  { img: n8nImg, title: "Automação de Pagamentos", desc: "Workflow invisível integrando Cielo e alertas em tempo real." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="group rounded-3xl overflow-hidden bg-gray-900/40 border border-gray-800 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="h-48 w-full relative overflow-hidden border-b border-gray-800">
                      <img src={item.img} alt={item.title} className="object-cover object-top w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FAQ SECTION */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl mx-auto px-4"
            >
              <h3 className="text-3xl md:text-5xl font-black text-white mb-10 text-center">Dúvidas Frequentes</h3>
              <div className="flex flex-col gap-4">
                <details className="group bg-gray-900/40 border border-gray-800 rounded-2xl open:border-purple-500/30 transition-all">
                  <summary className="font-bold text-lg text-white p-6 outline-none marker:content-none" style={{ cursor: 'none' }}>Vocês usam WordPress ou templates prontos?</summary>
                  <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4">Não. Desenvolvemos tudo do zero com código puro (React, Vite) para garantir que seu site seja o mais rápido, único e seguro do mercado.</div>
                </details>
                <details className="group bg-gray-900/40 border border-gray-800 rounded-2xl open:border-cyan-400/30 transition-all">
                  <summary className="font-bold text-lg text-white p-6 outline-none marker:content-none" style={{ cursor: 'none' }}>Como funcionam as "Automações Invisíveis"?</summary>
                  <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4">Conectamos o seu site aos sistemas que você já usa (CRM, Discord, WhatsApp, Gateways) via APIs e Webhooks. Quando algo acontece no site, sua equipe é avisada em milissegundos.</div>
                </details>
                <details className="group bg-gray-900/40 border border-gray-800 rounded-2xl open:border-purple-500/30 transition-all">
                  <summary className="font-bold text-lg text-white p-6 outline-none marker:content-none" style={{ cursor: 'none' }}>Os sistemas são seguros contra ataques?</summary>
                  <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4">Sim. Nossa engenharia foca em "Security by Design". Construímos back-ends robustos e protegidos com mentalidade de segurança ofensiva (Red Team).</div>
                </details>
                <details className="group bg-gray-900/40 border border-gray-800 rounded-2xl open:border-cyan-400/30 transition-all">
                  <summary className="font-bold text-lg text-white p-6 outline-none marker:content-none" style={{ cursor: 'none' }}>Vou conseguir atualizar o conteúdo sozinho?</summary>
                  <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4">Com certeza. Entregamos um painel administrativo intuitivo para você gerenciar textos, imagens e serviços sem precisar entender de código.</div>
                </details>
                <details className="group bg-gray-900/40 border border-gray-800 rounded-2xl open:border-purple-500/30 transition-all">
                  <summary className="font-bold text-lg text-white p-6 outline-none marker:content-none" style={{ cursor: 'none' }}>Qual é o prazo médio de entrega?</summary>
                  <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4">Como forjamos tudo sob medida, o prazo varia de 4 a 8 semanas, dependendo da complexidade das integrações e do design.</div>
                </details>
              </div>
            </motion.section>

            {/* FORMULÁRIO DE CAPTAÇÃO */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TerminalCaptacao submitted={submitted} setSubmitted={setSubmitted} />
            </motion.div>
            
          </>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-black/80 backdrop-blur-lg border-t border-white/5 pt-8 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src={logoVortex} alt="VORTEX.io Logo" className="h-16 md:h-20 w-auto mb-4 scale-110 origin-left object-contain" />
              <p className="text-gray-500 text-sm">Código puro e arquitetura blindada.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Menu</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                <li><button onClick={() => handleNavigation('home')} className="hover:text-cyan-400" style={{ cursor: 'none' }}>Início</button></li>
                <li><button onClick={scrollToContact} className="hover:text-purple-400" style={{ cursor: 'none' }}>Iniciar Projeto</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Contato</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                <li>contato@vortex.io</li>
                <li>Londrina - PR</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Legal</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                <li><button onClick={() => handleNavigation('terms')} className="hover:text-white" style={{ cursor: 'none' }}>Termos</button></li>
                <li><button onClick={() => handleNavigation('privacy')} className="hover:text-white" style={{ cursor: 'none' }}>Privacidade</button></li>
              </ul>
            </div>
          </div>
          <div className="text-xs text-gray-600 font-mono flex justify-between border-t border-white/5 pt-8">
            <p>© 2026 VORTEX.io</p>
            <p>Sistemas Online ● Londrina - PR</p>
          </div>
        </div>
      </footer>
    </div>
  );
}