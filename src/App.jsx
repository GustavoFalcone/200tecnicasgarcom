import React, { useEffect, useState } from 'react';

const asset = (name) => `/assets/${name}`;

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
    image: 'bonus-guia-uso.png',
    value: 'R$ 27,00'
  },
  {
    title: 'Ficha de controle das atividades realizadas',
    text: 'Uma ficha prática para marcar data, atividade feita, dificuldade e observações.',
    image: 'bonus-ficha-controle.png',
    value: 'R$ 17,00'
  },
  {
    title: 'Guia visual de materiais simples',
    text: 'Objetos comuns que podem ser usados nas atividades físicas.',
    image: 'bonus-materiais.png',
    value: 'R$ 23,00'
  },
  {
    title: 'Certificado de conclusão',
    text: 'Uma página final para preencher ao concluir o material.',
    image: 'bonus-certificado.png',
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

function CTA({ children = 'Quero acessar o material', className = '' }) {
  return (
    <a className={`cta ${className}`} href="#checkout">
      {children}
    </a>
  );
}

function ImageBlock({ src, alt, className = '' }) {
  return (
    <figure className={`imageBlock ${className}`}>
      <img src={asset(src)} alt={alt} loading="lazy" />
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

function FloatingActions() {
  return (
    <div className="floatingActions">
      <a className="floatingPrice" href="#checkout">Ver planos</a>
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

export default function App() {
  useEffect(() => {
    if (window.location.hash) {
      window.setTimeout(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' });
      }, 120);
    }
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
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

  return (
    <>
      <CountdownBar />
      <main className="mobileShell">
        <section className="hero reveal">
          <p className="eyebrow">MATERIAL DIGITAL PRONTO PARA IMPRIMIR</p>
          <h1>
            <span>+250 atividades de reabilitação</span> prontas para imprimir e aplicar
          </h1>
          <p className="subheadline">
            Um material visual, simples e organizado para usar no dia a dia com adultos e idosos.
          </p>
          <ImageBlock
            src="hero-material.png"
            alt="Mockup do material impresso com páginas de atividades"
            className="heroImage"
          />
          <CTA className="pulseCta">Quero acessar o material</CTA>
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
            src="demo-pages.png"
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
          <div className="bonusValueStack">
            <span>Valor dos bônus</span>
            <strong>R$ 87,00</strong>
            <em>incluídos no Plano Completo</em>
          </div>
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
            <a className="secondaryButton" href="#checkout">Quero o Plano Básico</a>
          </article>

          <article className="completeCard">
            <div className="featuredBadge">Mais escolhido</div>
            <div className="planTopline">PAGAMENTO ÚNICO</div>
            <h3>Plano Completo</h3>
            <p className="planSub">Para ter o material completo com bônus</p>
            <ImageBlock
              src="plano-completo-novo.png"
              alt="Imagem do material completo com bônus"
              className="planProductImage"
            />
            <div className="priceAnchor">
              <span>De R$97,00</span>, por apenas:
            </div>
            <div className="completePrice">R$ 27,90</div>
            <div className="guaranteeMiniSeal">
              <strong>Garantia</strong>
              <span>7 dias</span>
            </div>
            <ul className="planList completeList">
              {completeItems.map((item) => (
                <li key={item}>
                  <span>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <ImageBlock
              src="checkout-seguranca.png"
              alt="Compra segura e acesso digital"
              className="checkoutSecureImage"
            />
            <CTA className="completeCta">Quero o Plano Completo</CTA>
          </article>
        </section>

        <section className="section guarantee reveal">
          <div className="guaranteeSeal">7 dias</div>
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
          <CTA className="pulseCta">Quero acessar agora</CTA>
        </section>
      </main>
      <FloatingActions />
    </>
  );
}
