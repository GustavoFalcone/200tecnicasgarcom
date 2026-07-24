import { useEffect, useState } from 'react';

const BASIC_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/200-tecnicas-para-servir-como-um-garcom-profissional-plano-basico';
const COMPLETE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/200-tecnicas-para-servir-como-um-garcom-profissional-plano-completo';
const UPGRADE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/200-tecnicas-para-servir-como-um-garcom-profissional-plano-completo-1';

const audienceCards = [
  ['Garçons que estão começando', 'Para quem quer ganhar mais segurança e entender melhor como servir, carregar e recolher no dia a dia.'],
  ['Quem ainda aprende no improviso', 'Para quem aprendeu observando outros garçons, mas sente que ainda faltam técnicas mais claras e organizadas.'],
  ['Quem quer ganhar mais agilidade', 'Para quem deseja fazer menos idas e voltas, reduzir movimentos desnecessários e acompanhar melhor o ritmo do salão.'],
  ['Quem quer passar mais presença', 'Para quem quer parar de parecer inseguro e se movimentar, servir e atender com mais firmeza diante dos clientes.'],
];

const bonuses = [
  { title: 'Guia de Memorização e Agilidade no Salão', text: 'Técnicas simples para organizar mentalmente mesas, pedidos e prioridades, reduzir esquecimentos e trabalhar com mais eficiência.', value: 'R$ 27,00', slot: 'BÔNUS 01 — MEMORIZAÇÃO E AGILIDADE', file: 'bonus-01-memorizacao-agilidade.webp' },
  { title: 'Checklists do Serviço Profissional', text: 'Listas rápidas para conferir uniforme, praça, mesas, bandeja, pedidos, recolhimento e encerramento do turno.', value: 'R$ 17,00', slot: 'BÔNUS 02 — CHECKLISTS', file: 'bonus-02-checklists.webp' },
  { title: 'Postura e Presença de um Garçom Profissional', text: 'Aprenda como caminhar, se posicionar, se aproximar da mesa e transmitir mais segurança e elegância durante o atendimento.', value: 'R$ 23,00', slot: 'BÔNUS 03 — POSTURA E PRESENÇA', file: 'bonus-03-postura-presenca.webp' },
  { title: 'Certificado de Conclusão', text: 'Um certificado digital para preencher após concluir o material de aprimoramento profissional.', value: 'R$ 20,00', slot: 'CERTIFICADO DE CONCLUSÃO', file: 'certificado-conclusao.webp' },
];

const deliverablePages = Array.from({ length: 9 }, (_, index) => `/assets/deliverable-pages/deliverable-${String(index + 1).padStart(2, '0')}.png`);

const basicItems = [
  ['yes', '+200 técnicas para Garçons'],
  ['yes', 'Acesso digital imediato'], ['no', '30 roteiros práticos de serviço'],
  ['no', 'Guia de Memorização e Agilidade no Salão'], ['no', 'Checklists do Serviço Profissional'],
  ['no', 'Postura e Presença de um Garçom Profissional'], ['no', 'Certificado de Conclusão'],
];

const completeItems = [
  '+200 técnicas para Garçons', '30 roteiros práticos de serviço',
  'Guia de Memorização e Agilidade no Salão', 'Checklists do Serviço Profissional',
  'Postura e Presença de um Garçom Profissional', 'Certificado de Conclusão',
  'Acesso digital imediato', 'Pagamento único',
];

const faqs = [
  ['O material é físico ou digital?', 'É digital. Após a compra, você recebe o acesso e pode consultar o material pelo celular, computador ou tablet.'],
  ['É indicado para quem já trabalha como garçom?', 'Sim. O foco é ajudar garçons que já conhecem o básico e querem aprimorar a forma de servir, recolher, se movimentar e se posicionar.'],
  ['Serve para restaurantes, bares, hotéis, buffets e eventos?', 'Sim. O material reúne técnicas aplicáveis em diferentes ambientes de atendimento e serviço.'],
  ['Preciso assistir aulas longas?', 'Não. O conteúdo é visual, direto e organizado para consulta rápida.'],
  ['As técnicas são fáceis de aplicar?', 'As técnicas possuem orientações curtas e foco em aplicação prática. Cada profissional deve respeitar as regras, os padrões e os limites de segurança do local onde trabalha.'],
  ['Os 30 roteiros estão incluídos?', 'Sim. Os 30 roteiros práticos fazem parte do produto principal.'],
  ['O acesso é imediato?', 'Sim. Após a confirmação do pagamento, o acesso é liberado digitalmente.'],
  ['Tem certificado?', 'Sim. O certificado de conclusão está incluído no Plano Completo.'],
];

function getBrasiliaRemaining() {
  const parts = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const elapsed = Number(values.hour === '24' ? 0 : values.hour) * 3600 + Number(values.minute) * 60 + Number(values.second);
  return Math.max(0, 86400 - elapsed);
}

const formatTime = (seconds) => [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60].map((n) => String(n).padStart(2, '0')).join(':');

function CountdownBar() {
  const [remaining, setRemaining] = useState(getBrasiliaRemaining());
  useEffect(() => { const timer = setInterval(() => setRemaining(getBrasiliaRemaining() || 86400), 1000); return () => clearInterval(timer); }, []);
  return <div className="topCountdown" role="timer" aria-label={`Oferta exclusiva apenas hoje, faltam ${formatTime(remaining)}`}><strong>OFERTA EXCLUSIVA APENAS HOJE</strong><span>•</span><b>FALTAM {formatTime(remaining)}</b></div>;
}

function ImagePlaceholder({ label, hint, ratio = '4/3', file, className = '' }) {
  const assetBySlot = {
    'bonus-01-memorizacao-agilidade.webp': '/assets/bonus-01.png',
    'bonus-02-checklists.webp': '/assets/bonus-02.png',
    'bonus-03-postura-presenca.webp': '/assets/bonus-03.png',
    'certificado-conclusao.webp': '/assets/bonus-04.png',
    'plano-completo.webp': 'https://i.postimg.cc/sx6tWJy8/Chat-GPT-Image-16-de-jul-de-2026-16-57-24-removebg-preview.png',
    'selos-formas-pagamento.webp': '/assets/checkout-seguranca-opt.png',
  };
  const asset = assetBySlot[file];
  if (asset) return <figure className={`imagePlaceholder imageAsset ${className}`} style={{ '--ratio': ratio }} aria-label={`${label}: ${hint}`}>
    <img src={asset} alt={hint} loading="lazy" />
  </figure>;
  // Arquivo futuro sugerido é informado em cada uso via propriedade `file`.
  return <figure className={`imagePlaceholder ${className}`} style={{ '--ratio': ratio }} data-image-slot={label} aria-label={`${label}: ${hint}`}>
    <span className="imageIcon" aria-hidden="true"><svg viewBox="0 0 32 32"><rect x="4" y="5" width="24" height="22" rx="3"/><circle cx="11" cy="12" r="2"/><path d="m7 23 6-6 4 4 3-3 5 5"/></svg></span>
    <strong>{label}</strong><small>{hint}</small><code>{file}</code>
  </figure>;
}

function DeliverableCarousel() {
  const renderRow = (items, className) => <div className="carouselRow" aria-hidden="true"><div className={`deliverableTrack ${className}`}>
    {[0, 1, 2].map((loop) => <div className="deliverableLoopGroup" key={`${className}-group-${loop}`}>{items.map((src, index) => <figure className="deliverablePreview" key={`${className}-${loop}-${index}`}><img src={src} alt="" loading="eager" decoding="async" fetchPriority={index === 0 && loop === 0 ? 'high' : 'low'} /></figure>)}</div>)}
  </div></div>;
  return <div className="deliverableCarousel" role="group" aria-label="Prévia de páginas internas do material">
    <div className="carouselGlow" aria-hidden="true" />
    <div className="deliverableViewport">{renderRow(deliverablePages.slice(0, 5), 'trackForward')}{renderRow(deliverablePages.slice(5), 'trackReverse')}</div>
  </div>;
}

function scrollToPlans(event) { event?.preventDefault(); document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

function CTA({ children, className = '' }) { return <a href="#checkout" className={`cta ${className}`} onClick={scrollToPlans}>{children}</a>; }

function PlanList({ items, basic = false }) { return <ul className="planList">{items.map((item) => { const [type, text] = basic ? item : ['yes', item]; return <li className={type === 'no' ? 'notIncluded' : ''} key={text}><span className="planIcon" aria-hidden="true">{type === 'no' ? '×' : '✓'}</span><span className="planItemText">{text}</span></li>; })}</ul>; }

function UpgradeModal({ onClose }) {
  return <div className="upgradeOverlay" role="presentation" onMouseDown={onClose}>
    <section className="upgradeModal" role="dialog" aria-modal="true" aria-labelledby="upgrade-title" onMouseDown={(event) => event.stopPropagation()}>
      <button className="upgradeClose" type="button" onClick={onClose} aria-label="Fechar oferta">×</button>
      <p className="upgradeEyebrow">OFERTA ESPECIAL</p><h2 id="upgrade-title">Leve o Plano Completo por R$ 14,90</h2>
      <p>Por apenas mais R$ 7,90, você desbloqueia tudo o que deixa o serviço mais organizado, elegante e seguro.</p>
      <img src="https://i.postimg.cc/sx6tWJy8/Chat-GPT-Image-16-de-jul-de-2026-16-57-24-removebg-preview.png" alt="Plano Completo com técnicas e materiais complementares" />
      <p className="upgradeValueCopy">Você leva os 4 bônus que, juntos, normalmente custam <b>R$ 87,00</b> — além das 200 técnicas e dos roteiros práticos.</p>
      <ul><li>+200 técnicas visuais</li><li>30 roteiros práticos</li><li>4 bônus incluídos</li><li>Certificado de conclusão</li></ul>
      <strong>R$ 14,90</strong><a className="upgradeButton" href={UPGRADE_CHECKOUT_URL}>QUERO O PLANO COMPLETO</a>
      <a className="upgradeDecline" href={BASIC_CHECKOUT_URL}>Continuar apenas com o Plano Básico</a>
    </section>
  </div>;
}

export default function App() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('isVisible'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -35px' });
    elements.forEach((el) => observer.observe(el)); return () => observer.disconnect();
  }, []);

  return <>
    <CountdownBar />
    <main>
      <section className="hero reveal">
        <div className="heroCopy"><h1><span><em>+200 Técnicas</em> para Garçons</span><span>servirem com mais agilidade e presença</span></h1><p className="lead">Um material visual, direto e fácil de aplicar para garçons que querem servir, recolher e se movimentar com mais rapidez, elegância e segurança.</p></div>
        <div className="heroMedia"><img className="heroImage" src="https://i.postimg.cc/YSzgCLqK/Chat-GPT-Image-16-de-jul-de-2026-16-45-27.png" alt="Material com mais de 200 técnicas para servir como um garçom profissional" width="600" height="800" loading="eager" fetchPriority="high" /><CTA className="primaryPulse">ACESSAR AS TÉCNICAS</CTA><p className="microcopy">Acesso digital imediato • Pagamento único</p></div>
      </section>

      <section className="section reveal"><h2>Para quem é este material?</h2><div className="audienceGrid">{audienceCards.map(([title, text]) => <article className="audienceCard" key={title}><span className="check">✓</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="section demoSection reveal"><p className="eyebrow">CONTEÚDO PARA O PRÓXIMO TURNO</p><h2>Visual, organizado e pronto para aplicar</h2><p className="sectionLead">As técnicas são apresentadas de forma rápida e demonstrativa para você entender o movimento, consultar pelo celular e aplicar no próximo turno.</p><DeliverableCarousel /><div className="pillRow"><span>Fácil de entender</span><span>Rápido de consultar</span><span>Pronto para aplicar</span></div></section>

      <section className="section bonusSection reveal"><p className="eyebrow">BÔNUS DO PLANO COMPLETO</p><h2>Além das +200 técnicas, você também recebe</h2><div className="bonusGrid">{bonuses.map((bonus, index) => <article className="bonusCard" key={bonus.title}><span className="bonusNumber">BÔNUS {String(index + 1).padStart(2, '0')}</span><ImagePlaceholder label={bonus.slot} hint="Capa visual do bônus" file={bonus.file} /><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonusPrice"><s>{bonus.value}</s><strong>GRÁTIS</strong></div></article>)}</div><div className="bonusTotal"><span className="bonusTotalTag">PRESENTES INCLUÍDOS</span><h3>Somando tudo o que você vai levar:</h3><div className="bonusBreakdown">{bonuses.map((bonus, index) => <div key={bonus.title}><span>Bônus {String(index + 1).padStart(2, '0')}</span><s>{bonus.value}</s></div>)}</div><div className="bonusSum"><span>VALOR TOTAL DOS BÔNUS</span><strong>R$ 87,00</strong></div><p>Mas hoje, tudo sairá por:</p><b>R$ 0 <small>(GRÁTIS)</small></b></div></section>

      <section className="priceSection" id="checkout"><div className="priceIntro reveal"><p className="eyebrow">ACESSO DIGITAL IMEDIATO</p><h2>Escolha seu acesso</h2><p>Comece pelo material principal ou leve o aprimoramento completo com todos os bônus.</p></div>
        <article className="basicCard reveal"><p className="planEyebrow">PAGAMENTO ÚNICO</p><h3>Plano Básico</h3><p>Para acessar apenas o material principal</p><div className="basicPrice">R$ 10,00</div><PlanList items={basicItems} basic /><button className="planButton basicButton" type="button" onClick={() => setShowUpgrade(true)}>QUERO APENAS O PLANO BÁSICO</button></article>
        <article className="completeCard reveal"><span className="featuredBadge">MAIS ESCOLHIDO</span><p className="planEyebrow">PAGAMENTO ÚNICO</p><h3>Plano Completo</h3><p>Para ter o aprimoramento completo com todos os bônus</p><ImagePlaceholder className="productImage" label="IMAGEM DO PLANO COMPLETO" hint="Composição do produto e todos os bônus" ratio="16/9" file="plano-completo.webp" /><p className="priceAnchor">De R$ 97,00, por apenas:</p><div className="completePrice">R$ 19,90</div><PlanList items={completeItems} /><a className="planButton completeButton" href={COMPLETE_CHECKOUT_URL}>QUERO O PLANO COMPLETO</a><p className="microcopy">Acesso imediato • Pagamento seguro</p></article>
      </section>

      <section className="section guarantee reveal"><div className="guaranteeSeal"><strong>7</strong><span>DIAS</span></div><div><h2>Garantia simples de 7 dias</h2><p>Você pode acessar o material e conferir se ele faz sentido para o seu aprimoramento. Se não for o que esperava, poderá solicitar o reembolso dentro do prazo de garantia.</p></div></section>

      <section className="section faqSection reveal"><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas frequentes</h2><div className="faqGrid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="finalCta reveal"><p className="eyebrow">ELEVE O SEU SERVIÇO</p><h2>Aprenda os detalhes que fazem o serviço parecer muito mais profissional</h2><p>Tenha técnicas visuais e práticas para servir, recolher e atender com mais agilidade, segurança e elegância.</p><CTA>QUERO ME APRIMORAR AGORA</CTA></section>
      <footer>As técnicas devem ser aplicadas respeitando os protocolos, utensílios, regras de higiene e padrões de cada estabelecimento.</footer>
    </main>{showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
  </>;
}
