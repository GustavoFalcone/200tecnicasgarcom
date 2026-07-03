import React, { useEffect, useRef, useState } from 'react';

const asset = (name) => `/assets/${name}`;
const completeOfferImage = asset('plano-completo-novo-opt.png');

const imageSizes = {
  'hero-material-opt.jpg': [533, 800],
  'demo-pages-opt.jpg': [1100, 825],
  'bonus-guia-uso-opt.jpg': [1100, 825],
  'bonus-ficha-controle-opt.jpg': [1100, 825],
  'bonus-materiais-opt.jpg': [1100, 825],
  'bonus-certificado-opt.jpg': [1100, 825],
  'plano-completo-novo-opt.png': [520, 325],
  'checkout-seguranca-opt.png': [560, 206]
};

const CHECKOUTS = {
  basicFull: 'https://www.zuckpay.com.br/checkout/250-atividades-de-reabilitacao-pos-avc-plano-basico',
  completeFull: 'https://zuckpay.com.br/checkout/250-atividades-de-reabilitacao-pos-avc-plano-completo',
  basicDownsell: 'https://www.zuckpay.com.br/checkout/250-atividades-de-reabilitacao-pos-avc-plano-basico-1',
  completeDownsell: 'https://www.zuckpay.com.br/checkout/250-atividades-de-reabilitacao-pos-avc-plano-completo-1'
};

const audienceCards = [
  [
    'Familiares',
    'Para quem acompanha adultos e idosos no dia a dia e precisa de atividades prontas.'
  ],
  [
    'Cuidadores',
    'Para organizar uma rotina simples, visual e fácil de aplicar com calma.'
  ],
  [
    'Profissionais',
    'Para ter folhas de apoio prontas para imprimir e usar em atendimentos.'
  ],
  [
    'Uso impresso',
    'Para quem prefere um material físico, direto e fácil de consultar.'
  ]
];

const bonuses = [
  {
    title: 'Guia visual de uso das atividades',
    text: 'Um guia simples para entender como escolher, aplicar e organizar as atividades.',
    image: 'bonus-guia-uso-opt.jpg',
    value: 'R$ 27,00'
  },
  {
    title: 'Ficha de controle das atividades realizadas',
    text: 'Uma ficha prática para marcar data, atividade feita, dificuldade e observações.',
    image: 'bonus-ficha-controle-opt.jpg',
    value: 'R$ 17,00'
  },
  {
    title: 'Guia visual de materiais simples',
    text: 'Objetos comuns que podem ser usados nas atividades físicas.',
    image: 'bonus-materiais-opt.jpg',
    value: 'R$ 23,00'
  },
  {
    title: 'Certificado de conclusão',
    text: 'Uma página final para preencher ao concluir o material.',
    image: 'bonus-certificado-opt.jpg',
    value: 'R$ 20,00'
  }
];

const basicItems = [
  ['yes', '+250 atividades de coordenação e escrita para adultos e idosos em reabilitação pós-AVC'],
  ['no', 'Guia visual de uso das atividades'],
  ['no', 'Ficha de controle das atividades realizadas'],
  ['no', 'Guia visual de materiais simples'],
  ['no', 'Suporte VIP'],
  ['no', 'Acesso Vitalício'],
  ['no', 'Pronto para imprimir']
];

const completeItems = [
  '+250 atividades de coordenação e escrita para adultos e idosos em reabilitação pós-AVC',
  'Guia visual de uso das atividades',
  'Ficha de controle das atividades realizadas',
  'Guia visual de materiais simples',
  'Suporte VIP',
  'Acesso Vitalício',
  'Pronto para imprimir'
];

const upsellItems = [
  '+250 atividades de coordenação e escrita',
  'Guia visual de uso das atividades',
  'Ficha de controle das atividades realizadas',
  'Guia visual de materiais simples',
  'Suporte VIP',
  'Acesso vitalício',
  'Pronto para imprimir'
];

const faqs = [
  [
    'O material é físico ou digital?',
    'É digital. Você recebe o acesso e pode imprimir as páginas.'
  ],
  [
    'Serve para pessoas pós-AVC?',
    'O material não substitui acompanhamento profissional. Ele é um apoio visual com atividades simples.'
  ],
  [
    'Precisa imprimir?',
    'Você pode consultar no digital, mas ele foi pensado para impressão e uso em folha.'
  ],
  [
    'Quem pode usar?',
    'Familiares, cuidadores, profissionais e pessoas que precisam de um apoio visual simples para a rotina.'
  ],
  [
    'Substitui acompanhamento profissional?',
    'Não. O material não substitui acompanhamento profissional. Ele é um apoio visual com atividades simples.'
  ],
  [
    'O acesso é imediato?',
    'Sim. Após a compra, o acesso é digital.'
  ],
  [
    'Tem certificado?',
    'Sim. O plano completo inclui uma página de certificado de conclusão.'
  ]
];

function getBrasiliaRemaining() {
  const parts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const hours = Number(values.hour === '24' ? 0 : values.hour);
  const minutes = Number(values.minute);
  const seconds = Number(values.second);
  const elapsed = hours * 3600 + minutes * 60 + seconds;
  return Math.max(0, 86400 - elapsed);
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

function CountdownBar() {
  const [remaining, setRemaining] = useState(getBrasiliaRemaining());

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = getBrasiliaRemaining();
      setRemaining(next === 0 ? 86400 : next);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="topCountdown" aria-label="Oferta exclusiva apenas hoje">
      <div className="topCountdownInner">
        <strong>OFERTA EXCLUSIVA APENAS HOJE</strong>
        <span>FALTAM {formatTime(remaining)}</span>
      </div>
    </div>
  );
}

function CTA({ children = 'Quero acessar o material', className = '', href = '#checkout', onClick }) {
  return (
    <a className={`cta ${className}`} href={href} onClick={onClick}>
      {children}
    </a>
  );
}

function ImageBlock({ src, alt, className = '', loading = 'lazy', fetchPriority = 'auto' }) {
  const [width, height] = imageSizes[src] || [];

  return (
    <figure className={`imageBlock ${className}`}>
      <img
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </figure>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M16.02 3.2A12.73 12.73 0 0 0 5.1 22.48L3.8 28.8l6.47-1.7A12.72 12.72 0 1 0 16.02 3.2Zm0 22.95a10.1 10.1 0 0 1-5.15-1.42l-.37-.22-3.84 1.01.82-3.76-.24-.39a10.09 10.09 0 1 1 8.78 4.78Zm5.54-7.56c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.65-.94-2.26-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.8-.74 2.05-1.45.25-.71.25-1.32.18-1.45-.08-.13-.28-.2-.58-.35Z"
      />
    </svg>
  );
}

function FloatingActions({ onPlansClick }) {
  return (
    <div className="floatingActions">
      <a
        className="floatingOffer"
        href="#checkout"
        aria-label="Ver planos a partir de R$10"
        onClick={onPlansClick}
      >
        <span>A partir de R$10</span>
        <strong>Ver Planos</strong>
      </a>
      <a
        className="floatingWhatsapp"
        href="https://wa.me/5584994257596?text=Oi%2C%20queria%20tirar%20uma%20d%C3%BAvida%20sobre%20as%20%2B250%20atividades%20de%20reabilita%C3%A7%C3%A3o%21"
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

function ModalShell({ children, onClose, variant = '' }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modalOpen');

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modalOpen');
    };
  }, [onClose]);

  return (
    <div className={`modalOverlay ${variant}`} onMouseDown={onClose} role="presentation">
      <div
        className="modalPanel"
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modalClose" type="button" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function ModalBenefitList({ items, compact = false }) {
  return (
    <ul className={`modalBenefitList ${compact ? 'compact' : ''}`}>
      {items.map((item) => (
        <li key={item}>
          <span>✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function BasicPlanUpsellModal({ onClose, onCheckout }) {
  return (
    <ModalShell onClose={onClose} variant="upsellOverlay">
      <div className="upsellModal">
        <p className="modalKicker">Oferta especial</p>
        <h2>Libere o Plano Completo por apenas R$ 17,90</h2>
        <p className="modalLead">
          Por mais R$ 7,90, você recebe todos os bônus e o material completo para imprimir e
          usar com mais facilidade.
        </p>
        <img
          className="modalProductImage"
          src={completeOfferImage}
          alt="Plano completo com material e bônus"
          width="520"
          height="325"
          loading="lazy"
          decoding="async"
        />
        <ModalBenefitList items={upsellItems} />
        <div className="upsellPrice">R$ 17,90</div>
        <p className="modalReinforce">Upgrade único antes de finalizar seu acesso.</p>
        <a
          className="modalPrimaryCta"
          href={CHECKOUTS.completeDownsell}
          onClick={() => onCheckout('completeDownsell')}
        >
          SIM! Quero liberar tudo por R$ 17,90 <span>→</span>
        </a>
        <a
          className="modalSecondaryLink"
          href={CHECKOUTS.basicFull}
          onClick={() => onCheckout('basicFull')}
        >
          Não, obrigado. Quero apenas o Plano Básico por R$ 10,00
        </a>
      </div>
    </ModalShell>
  );
}

function ExitPlanList({ items }) {
  return (
    <ul className="exitPlanList">
      {items.map(([type, text]) => (
        <li className={type === 'no' ? 'notIncluded' : ''} key={text}>
          <span>{type === 'no' ? '×' : '✓'}</span>
          {text}
        </li>
      ))}
    </ul>
  );
}

function ExitOfferPage({ onContinue }) {
  const completeExitItems = upsellItems.map((item) => ['yes', item]);

  const handleCheckoutClick = () => {
    window.sessionStorage.setItem('checkout-clicked', 'true');
  };

  return (
    <>
      <CountdownBar />
      <main className="exitPageShell">
        <section className="exitPageHero reveal isVisible">
          <p className="modalKicker">Oferta especial</p>
          <h1>Antes de sair, escolha com desconto</h1>
          <p className="subheadline">Você pode acessar o material com um valor especial agora.</p>
        </section>

        <section className="exitPagePlans">
          <article className="exitBasicPlan">
            <h3>Plano Básico</h3>
            <p>Para uma necessidade pontual</p>
            <div className="exitOldPrice">De R$ 10,00</div>
            <div className="exitPrice darkText">R$ 5,90</div>
            <ExitPlanList items={basicItems} />
            <a
              className="exitBasicButton"
              href={CHECKOUTS.basicDownsell}
              onClick={handleCheckoutClick}
            >
              Quero o Básico por R$ 5,90
            </a>
          </article>

          <article className="exitCompletePlan">
            <div className="featuredBadge">Mais escolhido</div>
            <h3>Plano Completo</h3>
            <p>Material completo com bônus</p>
            <img
              className="exitProductImage"
              src={completeOfferImage}
              alt="Plano completo com material e bônus"
              width="520"
              height="325"
              loading="lazy"
              decoding="async"
            />
            <div className="exitOldPrice light">De R$ 27,90</div>
            <div className="exitPrice">R$ 17,90</div>
            <small>Oferta especial antes de sair</small>
            <ExitPlanList items={completeExitItems} />
            <a
              className="exitCompleteButton"
              href={CHECKOUTS.completeDownsell}
              onClick={handleCheckoutClick}
            >
              Quero o Completo por R$ 17,90
            </a>
          </article>
        </section>

        {onContinue ? (
          <button className="exitReturnLink" type="button" onClick={onContinue}>
            Continuar navegando
          </button>
        ) : (
          <a className="exitReturnLink" href="/">
            Continuar navegando
          </a>
        )}
      </main>
    </>
  );
}

function LandingPage() {
  const isExitOfferPage = false;
  const [isBasicUpsellOpen, setIsBasicUpsellOpen] = useState(false);
  const [hasClickedCheckout, setHasClickedCheckout] = useState(false);
  const [showExitOfferPage, setShowExitOfferPage] = useState(false);
  const suppressExitUntilRef = useRef(0);

  const markCheckoutClick = () => {
    setHasClickedCheckout(true);
    window.sessionStorage.setItem('checkout-clicked', 'true');
  };

  const suppressExitIntent = (duration = 1800) => {
    const until = Date.now() + duration;
    suppressExitUntilRef.current = until;
    window.sessionStorage.setItem('suppress-exit-until', String(until));
  };

  const handlePlansClick = (event) => {
    event.preventDefault();
    suppressExitIntent(2200);
    window.history.replaceState(window.history.state, '', '#checkout');
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const redirectToExitOffer = () => {
    const alreadyRedirected = window.sessionStorage.getItem('exit-redirect-used') === 'true';
    const checkoutClicked =
      hasClickedCheckout || window.sessionStorage.getItem('checkout-clicked') === 'true';
    const suppressedUntil = Math.max(
      suppressExitUntilRef.current,
      Number(window.sessionStorage.getItem('suppress-exit-until') || 0)
    );

    if (
      isExitOfferPage ||
      alreadyRedirected ||
      checkoutClicked ||
      isBasicUpsellOpen ||
      showExitOfferPage ||
      Date.now() < suppressedUntil
    ) {
      return false;
    }

    window.sessionStorage.setItem('exit-redirect-used', 'true');
    setShowExitOfferPage(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return true;
  };

  useEffect(() => {
    if (window.location.hash) {
      window.setTimeout(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' });
      }, 120);
    }
  }, []);

  useEffect(() => {
    const openBasicUpsell = () => {
      setIsBasicUpsellOpen(true);
    };

    window.addEventListener('landing:open-basic-upsell', openBasicUpsell);
    return () => window.removeEventListener('landing:open-basic-upsell', openBasicUpsell);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(
      '.reveal, .audienceCard, .bonusCard, .basicCard, .completeCard, .faqStack details'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseLeave = (event) => {
      if (event.clientY <= 10) {
        redirectToExitOffer();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasClickedCheckout, isBasicUpsellOpen, showExitOfferPage]);

  useEffect(() => {
    const stateKey = 'landing-exit-guard';

    if (!window.history.state?.[stateKey]) {
      window.history.pushState({ [stateKey]: true }, '', window.location.href);
    }

    const handlePopState = () => {
      redirectToExitOffer();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [hasClickedCheckout, isBasicUpsellOpen, showExitOfferPage]);

  if (showExitOfferPage) {
    return <ExitOfferPage onContinue={() => setShowExitOfferPage(false)} />;
  }

  return (
    <>
      <CountdownBar />
      <main className="mobileShell">
        <section className="hero reveal">
          <h1>
            <span>+250 atividades de reabilitação</span> prontas para imprimir e aplicar
          </h1>
          <p className="subheadline">
            Um material visual, simples e organizado para usar no dia a dia com adultos e idosos.
          </p>
          <ImageBlock
            src="hero-material-opt.jpg"
            alt="Mockup do material impresso com páginas de atividades"
            className="heroImage"
            loading="eager"
            fetchPriority="high"
          />
          <CTA className="pulseCta" onClick={handlePlansClick}>Acessar as Atividades</CTA>
          <p className="accessNote">Acesso digital imediato</p>
        </section>

        <section className="section audienceSection reveal">
          <h2>Para quem é este material?</h2>
          <div className="audienceStack">
            {audienceCards.map(([title, text]) => (
              <article className="audienceCard" key={title}>
                <div className="checkIcon">✓</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section demoSection reveal">
          <h2>Visual, organizado e pronto para imprimir</h2>
          <p>
            As páginas foram pensadas para serem simples de entender, com instruções curtas,
            espaços de escrita e atividades bem separadas.
          </p>
          <ImageBlock
            src="demo-pages-opt.jpg"
            alt="Páginas internas demonstrativas do material"
            className="demoImage"
          />
          <div className="pillRow">
            <span>Fácil de consultar</span>
            <span>Fácil de imprimir</span>
            <span>Fácil de aplicar</span>
          </div>
        </section>

        <section className="section bonusSection reveal">
          <p className="sectionKicker">Bônus do plano completo</p>
          <h2>Além das +250 atividades, você também recebe</h2>
          <div className="bonusStack">
            {bonuses.map((bonus, index) => (
              <article className="bonusCard" key={bonus.title}>
                <ImageBlock
                  src={bonus.image}
                  alt={bonus.title}
                  className="bonusImage"
                />
                <span className="bonusNumber">Bônus {String(index + 1).padStart(2, '0')}</span>
                <h3>{bonus.title}</h3>
                <p>{bonus.text}</p>
                <div className="bonusPrice">
                  <span>{bonus.value}</span>
                  <strong>GRÁTIS</strong>
                </div>
              </article>
            ))}
          </div>
          <div className="bonusValueStack">
            <span>Valor total dos bônus</span>
            <strong>R$ 87,00</strong>
          </div>
        </section>

        <section className="priceSection reveal" id="checkout">
          <div className="priceIntro">
            <p className="sectionKicker">Acesso digital</p>
            <h2>Escolha seu acesso</h2>
            <p>Comece pelo básico ou leve o material completo com todos os bônus.</p>
          </div>

          <article className="basicCard">
            <div className="planTopline">PAGAMENTO ÚNICO</div>
            <h3>Plano Básico</h3>
            <p className="planSub">Para uma necessidade pontual</p>
            <div className="basicPrice">R$ 10,00</div>
            <ul className="planList basicList">
              {basicItems.map(([type, text]) => (
                <li className={type === 'no' ? 'notIncluded' : ''} key={text}>
                  <span>{type === 'no' ? '×' : '✓'}</span>
                  {text}
                </li>
              ))}
            </ul>
            <button
              className="secondaryButton"
              type="button"
              data-open-basic-upsell
              data-no-initiate-checkout
              data-utmify-ignore
              onClick={() => setIsBasicUpsellOpen(true)}
            >
              Quero o Plano Básico
            </button>
          </article>

          <article className="completeCard">
            <div className="featuredBadge">Mais escolhido</div>
            <div className="planTopline">PAGAMENTO ÚNICO</div>
            <h3>Plano Completo</h3>
            <p className="planSub">Para ter o material completo com bônus</p>
            <ImageBlock
              src="plano-completo-novo-opt.png"
              alt="Imagem do material completo com bônus"
              className="planProductImage"
            />
            <div className="priceAnchor">
              <span>De R$97,00</span>, por apenas:
            </div>
            <div className="completePrice">R$ 27,90</div>
            <ul className="planList completeList">
              {completeItems.map((item) => (
                <li key={item}>
                  <span>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <ImageBlock
              src="checkout-seguranca-opt.png"
              alt="Compra segura e acesso digital"
              className="checkoutSecureImage"
            />
            <CTA
              className="completeCta pulseCta"
              href={CHECKOUTS.completeFull}
              onClick={markCheckoutClick}
            >
              Quero o Plano Completo
            </CTA>
          </article>
        </section>

        <section className="section guarantee reveal">
          <div className="guaranteeSeal">
            <img src={asset('garantia-7-dias-opt.png')} alt="Selo de garantia de 7 dias" width="240" height="240" loading="lazy" decoding="async" />
          </div>
          <h2>Garantia simples de 7 dias</h2>
          <p>
            Você pode acessar o material e verificar se ele faz sentido para sua necessidade.
            Se não for o que esperava, pode solicitar reembolso dentro do prazo de garantia.
          </p>
        </section>

        <section className="section faq reveal">
          <h2>Perguntas frequentes</h2>
          <div className="faqStack">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="finalCta reveal">
          <h2>Tenha um material pronto para consultar, imprimir e aplicar</h2>
          <p>+250 atividades visuais e 4 bônus para apoiar a rotina com mais organização.</p>
          <CTA className="pulseCta" onClick={handlePlansClick}>Quero acessar agora</CTA>
        </section>
      </main>
      <FloatingActions onPlansClick={handlePlansClick} />
      {isBasicUpsellOpen && (
        <BasicPlanUpsellModal
          onClose={() => setIsBasicUpsellOpen(false)}
          onCheckout={markCheckoutClick}
        />
      )}
    </>
  );
}

export default function App() {
  const isExitOfferPage = window.location.pathname.replace(/\/+$/, '') === '/oferta-especial';

  if (isExitOfferPage) {
    return <ExitOfferPage />;
  }

  return <LandingPage />;
}
