import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Stars, Detailed, Float } from '@react-three/drei';

// --- IMPORTAÇÃO DAS IMAGENS (Nomes conforme sua pasta assets) ---
import nexusImg from './assets/image_field.png';
import biotecaImg from './assets/image_bioteca.png';
import n8nImg from './assets/image_cielon8n.png';

// --- 1. Componentes do Cenário 3D ---

function ParticleVortex() {
  const count = 5000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorArray = ['#6d28d9', '#a855f7', '#d8b4fe', '#06b6d4']; 

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 * 3;
    const radius = Math.random() * 2 + 1;
    const x = Math.cos(angle) * radius * (Math.random() + 0.5);
    const y = Math.sin(angle) * radius * (Math.random() + 0.5);
    const z = (Math.random() - 0.5) * 2;
    positions.set([x, y, z], i * 3);

    const c = new THREE.Color(colorArray[Math.floor(Math.random() * colorArray.length)]);
    colors.set([c.r, c.g, c.b], i * 3);
  }

  const geometryRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(geometryRef.current) geometryRef.current.rotation.z = t * 0.1;
  });

  return (
    <points ref={geometryRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial attach="material" vertexColors size={0.03} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function FloatingPrism({ position, rotation, color, scale }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(mesh.current) {
        mesh.current.rotation.x = t * rotation[0];
        mesh.current.rotation.y = t * rotation[1];
        mesh.current.rotation.z = t * rotation[2];
        mesh.current.position.y += Math.sin(t * 1 + position[0]) * 0.01;
    }
  });
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshPhysicalMaterial color={color} transmission={0.8} ior={1.5} specularColor={'#ffffff'} specularIntensity={1} clearcoat={1} clearcoatRoughness={0.1} roughness={0.1} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function SurrealScene() {
  const prisms = [
    { position: [-6, 3, 2], rotation: [0.1, 0.2, 0.3], color: '#6d28d9', scale: [0.7, 0.7, 0.7] },
    { position: [7, 4, 3], rotation: [0.3, 0.1, 0.2], color: '#a855f7', scale: [0.8, 0.8, 0.8] },
    { position: [-8, -4, 1], rotation: [0.2, 0.3, 0.1], color: '#06b6d4', scale: [0.6, 0.6, 0.6] },
    { position: [6, -3, 2], rotation: [0.1, 0.1, 0.1], color: '#fff', scale: [0.5, 0.5, 0.5] },
  ];

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <color attach="background" args={['#030305']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Detailed distances={[0, 5, 10]}>
          <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}><ParticleVortex /></Float>
        </Detailed>
        {prisms.map((prism, index) => <FloatingPrism key={index} {...prism} />)}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={1.5} color={'#fff'} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color={'#6d28d9'} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color={'#06b6d4'} />
      </Canvas>
    </div>
  );
}

// --- 2. Cursor Trail ---

function CursorTrail() {
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      trailRef.current.push(newPoint);
      if (trailRef.current.length > 20) trailRef.current.shift();
      setTrail([...trailRef.current]);
    };
    const handleMouseLeave = () => { trailRef.current = []; setTrail([]); };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" style={{ cursor: 'none' }}>
      {trail.map((point, index) => (
        <div key={point.id} className="absolute h-1 w-1 rounded-full bg-cyan-400 opacity-50" style={{ left: `${point.x}px`, top: `${point.y}px`, transform: `translate(-50%, -50%) scale(${1 - index / trail.length})`, opacity: (trail.length - index) / trail.length, transition: 'transform 0.1s ease-out, opacity 0.1s ease-out' }} />
      ))}
      {trail.length > 0 && <div className="absolute h-3 w-3 rounded-full border border-cyan-400 bg-cyan-400/20" style={{ left: `${trail[trail.length - 1].x}px`, top: `${trail[trail.length - 1].y}px`, transform: 'translate(-50%, -50%)' }} />}
    </div>
  );
}

// --- 3. Telas Legais ---

function LegalPrivacy({ onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-left bg-black/60 backdrop-blur-md rounded-3xl border border-white/5 my-20 relative z-10">
      <button onClick={() => onBack('home')} className="mb-8 flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors font-bold text-xs uppercase tracking-widest" style={{ cursor: 'none' }}>
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

function LegalTerms({ onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-left bg-black/60 backdrop-blur-md rounded-3xl border border-white/5 my-20 relative z-10">
      <button onClick={() => onBack('home')} className="mb-8 flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors font-bold text-xs uppercase tracking-widest" style={{ cursor: 'none' }}>
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

// --- 4. Aplicação Principal ---

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      nome: e.target[0].value,
      email: e.target[1].value,
      escopo: e.target[2].value,
      origem: "Landing Page Vortex",
      timestamp: new Date().toISOString()
    };

    try {
      // SUBSTITUA PELA SUA URL DO N8N AQUI
      await fetch('SUA_URL_DO_WEBHOOK_AQUI', {
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
    <div className="min-h-screen font-sans text-gray-200 selection:bg-purple-500 selection:text-white" style={{ cursor: 'none' }}>
      
      <SurrealScene />
      <CursorTrail />

      {/* HEADER FIXO */}
      <div className="fixed top-0 left-0 w-full z-[80] flex flex-col">
        {currentView === 'home' && (
          <div className="w-full bg-gradient-to-r from-purple-900 to-black text-center py-2 text-xs md:text-sm font-medium tracking-widest border-b border-purple-500/30">
            <span className="text-purple-300">⚡ ATENÇÃO:</span> APENAS 2 VAGAS NA AGENDA PARA ESTE MÊS.
          </div>
        )}
        <header className="p-6 w-full backdrop-blur-md bg-black/20 border-b border-white/5 shadow-lg shadow-purple-900/10">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 onClick={() => handleNavigation('home')} className="text-2xl font-black text-white hover:text-purple-400 transition-colors" style={{ cursor: 'none' }}>
              VORTEX <span className="text-purple-500">i.o</span>
            </h1>
            {currentView === 'home' && (
              <button onClick={scrollToContact} className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105" style={{ cursor: 'none' }}>
                {submitted ? "Falar no WhatsApp" : "Agendar Diagnóstico"}
              </button>
            )}
          </div>
        </header>
      </div>

      <main className="flex flex-col items-center w-full pt-40 pb-32 relative z-10">
        
        {currentView === 'privacy' && <LegalPrivacy onBack={handleNavigation} />}
        {currentView === 'terms' && <LegalTerms onBack={handleNavigation} />}

        {currentView === 'home' && (
          <>
            {/* HERO */}
            <section className="text-center max-w-5xl mx-auto px-4 min-h-[80vh] flex flex-col justify-center items-center">
              <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">Design Imersivo + Engenharia de Ponta</div>
              <h2 className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">NÃO FAZEMOS SITES. <br /><span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">FORJAMOS MÁQUINAS DE VENDA.</span></h2>
              <p className="mt-8 text-xl max-w-3xl text-gray-300 font-light leading-relaxed">Ecossistemas digitais do absoluto zero. Interfaces surreais por fora, automações invisíveis por dentro.</p>
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <button onClick={scrollToContact} className="px-10 py-5 rounded-full bg-purple-600 text-white font-black text-lg hover:bg-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all transform hover:-translate-y-1" style={{ cursor: 'none' }}>
                  Quero um Projeto Único
                </button>
              </div>
            </section>

            {/* CONTRASTE */}
            <section className="w-full bg-black/60 backdrop-blur-lg border-y border-white/5 py-24 mt-20">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-16">Por que sua marca está sendo ignorada?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="p-10 rounded-3xl border border-red-900/30 bg-red-900/5 text-left flex flex-col justify-center">
                    <h4 className="text-2xl font-bold text-red-400 mb-6">O Padrão Amador</h4>
                    <ul className="space-y-5 text-gray-400 text-sm">
                      <li className="flex items-start gap-3"><span>❌</span> <span>Templates genéricos que deixam seu site lento e comum.</span></li>
                      <li className="flex items-start gap-3"><span>❌</span> <span>Processos manuais sem integração real com seu fluxo.</span></li>
                      <li className="flex items-start gap-3"><span>❌</span> <span>Brechas de segurança por excesso de plugins desatualizados.</span></li>
                      <li className="flex items-start gap-3"><span>❌</span> <span>Design fraco que não transmite a autoridade da sua marca.</span></li>
                    </ul>
                  </div>
                  <div className="p-10 rounded-3xl border border-cyan-500/30 bg-cyan-500/5 text-left relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-[100px]"></div>
                    <h4 className="text-2xl font-bold text-cyan-400 mb-6 relative z-10">O Padrão VORTEX</h4>
                    <ul className="space-y-5 text-gray-200 text-sm relative z-10">
                      <li className="flex items-start gap-3"><span>✔️</span> <span><strong>Código Puro:</strong> Performance brutal e SEO impecável.</span></li>
                      <li className="flex items-start gap-3"><span>✔️</span> <span><strong>Automação (n8n):</strong> Fluxos inteligentes e APIs nativas.</span></li>
                      <li className="flex items-start gap-3"><span>✔️</span> <span><strong>Security by Design:</strong> Arquitetura blindada contra ataques.</span></li>
                      <li className="flex items-start gap-3"><span>✔️</span> <span><strong>Identidade Única:</strong> UI/UX desenhado do zero para dominar.</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ARSENAL FORJADO */}
            <section className="w-full py-20 max-w-7xl mx-auto px-4">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-16 text-center text-left">Arsenal Forjado</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="group rounded-3xl overflow-hidden bg-gray-900/40 border border-gray-800 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="h-48 w-full relative overflow-hidden border-b border-gray-800">
                    <img src={nexusImg} alt="Nexus Field" className="object-cover object-top w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold text-white mb-2">Nexus Field - Cocamar</h4>
                    <p className="text-sm text-gray-400">Monitoramento geoespacial de alto nível para gestão de campo.</p>
                  </div>
                </div>
                <div className="group rounded-3xl overflow-hidden bg-gray-900/40 border border-gray-800 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="h-48 w-full relative overflow-hidden border-b border-gray-800">
                    <img src={biotecaImg} alt="A Bioteca" className="object-cover object-top w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold text-white mb-2">A Bioteca - OTT</h4>
                    <p className="text-sm text-gray-400">Streaming corporativo com infraestrutura de dados em nuvem.</p>
                  </div>
                </div>
                <div className="group rounded-3xl overflow-hidden bg-gray-900/40 border border-gray-800 hover:border-white/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="h-48 w-full relative overflow-hidden border-b border-gray-800">
                    <img src={n8nImg} alt="Notificações n8n" className="object-cover object-top w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold text-white mb-2">Automação de Pagamentos</h4>
                    <p className="text-sm text-gray-400">Workflow invisível integrando Cielo e alertas em tempo real.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ EXPANDIDO (QUEBRA DE OBJEÇÕES) */}
            <section className="w-full max-w-4xl mx-auto px-4">
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
            </section>

            {/* TERMINAL DE CAPTAÇÃO */}
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
                    <a href="https://wa.me/5543999999999" target="_blank" className="px-10 py-5 rounded-full bg-[#25D366] text-white font-black hover:scale-105 transition-all shadow-[0_0_40px_rgba(37,211,102,0.3)]" style={{ cursor: 'none' }}>ACESSO VIP WHATSAPP</a>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {/* RODAPÉ */}
      <footer className="w-full bg-black/80 backdrop-blur-lg border-t border-white/5 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h1 className="text-2xl font-black text-white mb-4">VORTEX <span className="text-purple-500">i.o</span></h1>
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
                <li>Londrina / Ibiporã - PR</li>
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
            <p>© 2026 VORTEX i.o.</p>
            <p>Sistemas Online ● Londrina - PR</p>
          </div>
        </div>
      </footer>
    </div>
  );
}