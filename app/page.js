'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    negocio: ''
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [demoMessages, setDemoMessages] = useState([])
  const [demoAnimationComplete, setDemoAnimationComplete] = useState(false)
  const [theme, setTheme] = useState('dark')

  // Initialize theme from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'dark'
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  // Update theme when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Enviando:', formData)
    alert('Gracias! Te contactaremos pronto.')
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })
    reveals.forEach((el) => observer.observe(el))
  }, [])

  // Typing animation para demo
  useEffect(() => {
    const demoElement = document.querySelector('#demo')
    const demoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && demoMessages.length === 0) {
          // Inicia la animación de typing
          animateTyping()
          demoObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })

    if (demoElement) {
      demoObserver.observe(demoElement)
    }

    return () => {
      if (demoElement) demoObserver.unobserve(demoElement)
    }
  }, [demoMessages.length, demoAnimationComplete])

  const animateTyping = async () => {
    const messages = [
      { role: 'client', text: '¿Hola, tenés zapatillas talle 42?' },
      { delay: 600 },
      { role: 'agent', text: '¡Hola! 👟 Sí, tenemos en talle 42. ¿Qué modelo te interesa, el Runner X o el Urban Pro?' },
      { role: 'client', text: 'el Runner X, ¿cuánto sale?' },
      { role: 'agent', text: 'El Runner X talle 42 está en $89.990. ¿Querés que te lo reserve? Tenemos stock limitado.' },
      { role: 'client', text: 'sí, lo quiero. te pago por transferencia' },
      { role: 'agent', text: 'Perfecto ✅ Te mando los datos de pago ahora. ¡Gracias por elegirnos!' },
    ]

    for (let msgIdx = 0; msgIdx < messages.length; msgIdx++) {
      const message = messages[msgIdx]
      if (message.delay) {
        await new Promise((r) => setTimeout(r, message.delay))
        continue
      }

      const text = message.text
      let displayText = ''

      for (let i = 0; i <= text.length; i++) {
        displayText = text.substring(0, i)
        setDemoMessages([...messages.slice(0, msgIdx).filter(m => m.role), { ...message, text: displayText }])
        await new Promise((r) => setTimeout(r, 20))
      }

      setDemoMessages((prev) => prev.map(m => m === messages[msgIdx] ? { ...message, text: text } : m))
      await new Promise((r) => setTimeout(r, 250))
    }
    setDemoAnimationComplete(true)
  }

  return (
    <div>
      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#">MOLRIC</a>
        <ul className="nav-links">
          <li><a href="#problem">Problema</a></li>
          <li><a href="#how">Proceso</a></li>
          <li><a href="#benefits">Beneficios</a></li>
        </ul>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
        <a className="nav-cta" href="#form">Contacto</a>
        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#problem" onClick={closeMobileMenu}>Problema</a>
        <a href="#how" onClick={closeMobileMenu}>Proceso</a>
        <a href="#benefits" onClick={closeMobileMenu}>Beneficios</a>
        <a href="#form" onClick={closeMobileMenu}>Contacto</a>
      </div>

      {/* HERO */}
      <section id="hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-content">
          <span className="hero-tag">WhatsApp · Automatización · IA · Agente con nombre propio</span>
          <h1 className="hero-headline">
            Creá tu agente de ventas<br />
            en WhatsApp y dejá de<br />
            <em>perder clientes.</em>
          </h1>
          <p className="hero-sub">
            Con Molric creás un agente personalizado —con nombre, tono y conocimiento de tu negocio— que responde al instante, filtra consultas y te avisa cuando alguien está listo para comprar.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="https://wa.me/5491234567890?text=Hola,%20quiero%20saber%20más%20sobre%20Molric">Consultar por WhatsApp</a>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section id="problem">
        <div className="reveal">
          <span className="section-tag">El problema</span>
          <h2 className="section-title">Tu negocio puede estar perdiendo ventas por no responder a tiempo.</h2>
          <p className="section-sub">Cada consulta que no respondés a tiempo es un cliente que se va con la competencia.</p>
          <ul className="problem-list">
            <li className="problem-item">
              <span className="problem-icon">→</span>
              <div className="problem-text">
                <strong>Respuestas tardías</strong>
                <p>Te escriben y respondés horas después, cuando ya es tarde.</p>
              </div>
            </li>
            <li className="problem-item">
              <span className="problem-icon">◆</span>
              <div className="problem-text">
                <strong>Clientes perdidos</strong>
                <p>Cuando contestás, el cliente ya compró en otro lado.</p>
              </div>
            </li>
            <li className="problem-item">
              <span className="problem-icon">§</span>
              <div className="problem-text">
                <strong>Sin identidad propia</strong>
                <p>Los bots genéricos no representan tu marca ni tu forma de hablar.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="solution-right reveal reveal-delay-2">
          <span className="section-tag">La solución</span>
          <h2 className="section-title">Tu agente con nombre propio responde por vos.</h2>
          <div className="solution-card">
            <h4>Un agente, tu identidad</h4>
            <p>Le ponés nombre, entrenás con la info de tu negocio y suena como vos. Tus clientes no hablan con un bot, hablan con tu agente.</p>
          </div>
          <div className="solution-card">
            <h4>Menos estrés, más ventas</h4>
            <p>Tu agente filtra, responde y te avisa solo cuando hay una oportunidad real. Dejá de estar pegado al celular.</p>
          </div>
          <div className="solution-card">
            <h4>Todo ordenado</h4>
            <p>Consultas priorizadas, contactos guardados, historial completo gestionado por Molric.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <span className="section-tag reveal">Proceso</span>
        <h2 className="section-title reveal">Tres pasos simples.</h2>
        <p className="section-sub reveal reveal-delay-1">Instalación rápida, resultados inmediatos.</p>
        <div className="steps">
          <div className="step reveal">
            <div className="step-circle">01</div>
            <h3>El cliente escribe</h3>
            <p>Tu cliente manda un mensaje a tu WhatsApp, como siempre.</p>
          </div>
          <div className="step reveal reveal-delay-1">
            <div className="step-circle">02</div>
            <h3>Tu agente responde</h3>
            <p>Tu agente —con nombre y tono propio— contesta al instante con la info de tu negocio.</p>
          </div>
          <div className="step reveal reveal-delay-2">
            <div className="step-circle">03</div>
            <h3>Vos cerrás la venta</h3>
            <p>Molric te notifica solo cuando hay un cliente listo para comprar. Vos entrás a cerrar.</p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits">
        <span className="section-tag reveal">Beneficios</span>
        <h2 className="section-title reveal">Lo que vas a lograr.</h2>
        <div className="benefits-grid">
          <div className="benefit-card reveal">
            <span className="benefit-icon">⚡</span>
            <h3>Respuestas al instante</h3>
            <p>Tu agente contesta en segundos, las 24 horas. Ninguna consulta queda sin respuesta.</p>
          </div>
          <div className="benefit-card reveal reveal-delay-1">
            <span className="benefit-icon">🎯</span>
            <h3>Solo leads calificados</h3>
            <p>Tu agente filtra y califica. Vos solo recibís los que ya quieren comprar.</p>
          </div>
          <div className="benefit-card reveal reveal-delay-2">
            <span className="benefit-icon">🪪</span>
            <h3>Identidad de marca</h3>
            <p>Tu agente tiene nombre, personalidad y habla como tu negocio. No como un bot genérico.</p>
          </div>
          <div className="benefit-card reveal reveal-delay-3">
            <span className="benefit-icon">📋</span>
            <h3>Todo bajo control</h3>
            <p>Molric organiza cada conversación: historial, prioridades y seguimiento en un solo lugar.</p>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo">
        <span className="section-tag reveal">Ejemplo real</span>
        <h2 className="section-title reveal">Así atiende tu agente mientras vos hacés otra cosa.</h2>
        <p className="section-sub reveal reveal-delay-1" style={{ margin: '0 auto 40px', textAlign: 'center' }}>Este es <strong style={{ color: 'var(--accent)' }}>Sofía</strong>, el agente de una zapatería. Cada negocio tiene el suyo, con nombre y personalidad propia.</p>
        <div className="demo-card reveal reveal-delay-1">
          <div style={{ textAlign: 'left', fontSize: '13px', lineHeight: '2.2' }}>
            {demoMessages.map((msg, idx) => (
              msg.role === 'client' ? (
                <div key={idx}>
                  <p className="demo-line-client">
                    <strong style={{ color: 'var(--text-muted)' }}>Cliente:</strong> {msg.text}
                  </p>
                </div>
              ) : msg.role === 'agent' ? (
                <div key={idx}>
                  <p className="demo-line-molric">
                    <strong style={{ color: 'var(--accent)' }}>Sofía:</strong> {msg.text}
                  </p>
                </div>
              ) : null
            ))}
          </div>
          {demoAnimationComplete && (
            <p className="demo-caption" style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '20px', lineHeight: '1.6', fontStyle: 'italic' }}>
              Sofía opera 24/7 con la información de la zapatería. Tu agente puede llamarse como quieras y hablar como habla tu marca.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="cta-glow"></div>
        <span className="section-tag reveal">¿Querés tu propio agente?</span>
        <h2 className="section-title reveal">Creá tu agente hoy<br /><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>y no pierdas más oportunidades.</em></h2>
        <p className="section-sub reveal reveal-delay-1">Setup rápido, mantenimiento incluido. Tu agente funcionando en días, no semanas.</p>
        <div className="cta-actions reveal reveal-delay-2">
          <a className="btn-primary" href="#form">Quiero mi agente</a>
        </div>
      </section>

      {/* FORM */}
      <section id="form">
        <span className="section-tag reveal">Contacto</span>
        <h2 className="section-title reveal">Empezá a crear tu agente.</h2>
        <div className="form-container reveal reveal-delay-1">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="nombre">Nombre</label>
              <input
                className="form-input"
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="whatsapp">WhatsApp</label>
              <input
                className="form-input"
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="Tu número de WhatsApp"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="negocio">Negocio</label>
              <input
                className="form-input"
                type="text"
                id="negocio"
                name="negocio"
                value={formData.negocio}
                onChange={handleChange}
                required
                placeholder="Nombre de tu negocio"
              />
            </div>
            <button className="form-submit" type="submit">Quiero mi agente</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <a className="footer-logo" href="#">MOLRIC</a>
        <ul className="footer-links">
          <li><a href="#problem">Problema</a></li>
          <li><a href="#how">Proceso</a></li>
          <li><a href="#benefits">Beneficios</a></li>
          <li><a href="#form">Contacto</a></li>
        </ul>
        <span className="footer-copy">2026 Molric. Todos los derechos reservados.</span>
      </footer>

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/5491234567890?text=Hola,%20quiero%20saber%20más%20sobre%20Molric"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'var(--accent)',
          color: '#050510',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px var(--accent-glow)',
          textDecoration: 'none',
          zIndex: 1000,
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        aria-label="Contactar por WhatsApp"
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      </a>
    </div>
  )
}