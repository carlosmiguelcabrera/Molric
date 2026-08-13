'use client'

import { useState, useEffect } from 'react'
import HeroParticles from './components/HeroParticles'

const DEMO_MESSAGES = [
  { role: 'client', text: 'Hola, ¿tienen lugar para una depilación láser el sábado?' },
  { role: 'agent',  text: '¡Hola Marta! 🌸 Sí, tenemos disponibilidad el sábado a las 10hs o a las 15hs. ¿Qué horario te conviene más?' },
  { role: 'client', text: 'a las 15 está bien, ¿cuánto sale la sesiones?' },
  { role: 'agent',  text: 'La sesión de depilación láser de axilas está en $18.000. ¿Querés que te agende? Tenemos un 10% de descuento si pagás el pack de 4 sesiones.' },
  { role: 'client', text: 'sí, agendame. ¿puedo pagar por transferencia?' },
  { role: 'agent',  text: 'Perfecto ✅ Te agendé para el sábado a las 15hs. Te mando los datos de pago por aquí. ¡Nos vemos!' },
]

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    zona: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setVisibleCount(1), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)
    try {
      const response = await fetch(
        'https://n8n.molric.com/webhook/d4b8c178-75c8-4fce-8ef2-32ba6839cfee',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formData.nombre,
            whatsapp: formData.whatsapp,
            zona: formData.zona,
          }),
        }
      )
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setSubmitStatus('success')
      setFormData({ nombre: '', whatsapp: '', zona: '' })
    } catch (err) {
      console.error('Error al enviar formulario:', err)
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
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

  useEffect(() => {
    const demoElement = document.querySelector('#demo')
    const demoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && visibleCount <= 1) {
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
  }, [visibleCount])

  useEffect(() => {
    if (visibleCount >= 5) {
      const container = document.querySelector('.demo-messages')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }
  }, [visibleCount])

  const animateTyping = async () => {
    setVisibleCount(1)
    for (let i = 2; i <= DEMO_MESSAGES.length; i++) {
      await new Promise((r) => setTimeout(r, 2000))
      setVisibleCount(i)
    }
  }

  return (
    <div>
      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#" style={{ textTransform: 'lowercase' }}>molr<span style={{ color: 'var(--accent)' }}>i</span>c</a>
        <ul className="nav-links">
          <li><a href="#problem">Problema</a></li>
          <li><a href="#demo">Demo</a></li>
          <li><a href="#pricing">Precios</a></li>
        </ul>
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
        <a href="#demo" onClick={closeMobileMenu}>Demo</a>
        <a href="#pricing" onClick={closeMobileMenu}>Precios</a>
        <a href="#form" onClick={closeMobileMenu}>Contacto</a>
      </div>

      {/* HERO */}
      <section id="hero" aria-label="Presentación principal">
        <HeroParticles />
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-tag">Estéticas · WhatsApp · Reactivación de clientas</span>
          <h1 className="hero-headline">
            Recuperá las clientas que dejaste de ver.
          </h1>
          <p className="hero-subheadline">
            Sin que toques el teléfono. Sin contratar recepcionista.
          </p>
          <p className="hero-sub">
            Molric crea un agente en WhatsApp que responde, califica y reactiva clientas por tu estética las 24 horas. Como una recepcionista real, pero sin vacaciones.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="https://wa.me/5491178249449?text=Hola,%20quiero%20saber%20más%20sobre%20Molric">Quiero mi agente</a>
            <a className="btn-secondary" href="#demo">Ver cómo funciona</a>
          </div>
        </div>
      </section>

      {/* PROBLEM + SOLUTION */}
      <section id="problem" aria-label="Problema y solución">
        <div className="reveal">
          <span className="section-tag">El problema</span>
          <h2 className="section-title">Tu WhatsApp no debería perder clientas por vos.</h2>
          <p className="section-sub">Cada vez que no podés responder a tiempo, una clienta se va a la competencia. Y no vuelve.</p>
          <ul className="problem-list">
            <li className="problem-item">
              <span className="problem-icon">→</span>
              <div className="problem-text">
                <strong>Son las 11pm y llegó una consulta</strong>
                <p>La respondés mañana. Para entonces, la clienta ya pidió turno en otro lado.</p>
              </div>
            </li>
            <li className="problem-item">
              <span className="problem-icon">◆</span>
              <div className="problem-text">
                <strong>Cada mensaje te interrumpe en un turno</strong>
                <p>Estás en el medio de una depilación y el celular no para. Atendés vos o perdés la venta.</p>
              </div>
            </li>
            <li className="problem-item">
              <span className="problem-icon">§</span>
              <div className="problem-text">
                <strong>Un bot genérico no te representa</strong>
                <p>Tus clientas lo notan. "Escribí 1 para turnos, 2 para precios". Eso ya no funciona.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="solution-right reveal reveal-delay-2">
          <span className="section-tag">La solución</span>
          <h2 className="section-title">Un agente que habla como vos y reactiva por vos.</h2>
            <div className="solution-card">
              <h3>Tu identidad, no un bot</h3>
              <p>Le ponés nombre, lo entrenamos con tu información y suena como tu recepcionista. Tus clientas no hablan con un bot, hablan con alguien que las conoce.</p>
            </div>
          <div className="solution-card">
            <h3>Reactivación automática</h3>
            <p>Tu agente detecta qué clienta no asiste hace 30 días y le escribe para reagendarla. Eso es plata que ya tenías perdida.</p>
          </div>
          <div className="solution-card">
            <h3>Menos estrés, más turnos</h3>
            <p>Tu agente filtra, responde y te avisa solo cuando hay una clienta lista para comprar. Dejá de estar pegado al celular.</p>
          </div>
        </div>
      </section>

      {/* DEMO - Moved up for social proof */}
      <section id="demo" aria-label="Demostración del agente">
        <span className="section-tag">Ejemplo real</span>
        <h2 className="section-title">Así atiende tu agente mientras vos estás con un cliente.</h2>
        <p className="section-sub" style={{ margin: '0 auto 40px', textAlign: 'center' }}>Esta es <strong style={{ color: 'var(--accent)' }}>Camila</strong>, el agente de una estética. Cada negocio tiene la suya, con nombre y personalidad propia.</p>
        <div className="demo-card">
          <div className="demo-chat-header">
            <div className="demo-chat-header-avatar">C</div>
            <div className="demo-chat-header-info">
              <span className="demo-chat-header-name">Camila - Estética Lumina</span>
              <span className="demo-chat-header-status">en línea</span>
            </div>
          </div>
          <div className="demo-messages" style={{ textAlign: 'left', fontSize: '13px' }}>
            {DEMO_MESSAGES.map((msg, idx) => (
              <div
                key={idx}
                className={`demo-msg-wrapper ${msg.role}`}
                style={{
                  opacity: idx < visibleCount ? 1 : 0,
                  transform: idx < visibleCount ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <div className={`demo-bubble-group ${msg.role}`}>
                  <span className="demo-sender-name">
                    {msg.role === 'agent' ? 'Camila' : 'Marta'}
                  </span>
                  <p className={msg.role === 'client' ? 'demo-line-client' : 'demo-line-molric'}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="demo-caption" style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '24px', maxWidth: '600px', margin: '24px auto 0', lineHeight: '1.6', fontStyle: 'italic', opacity: visibleCount === DEMO_MESSAGES.length ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          Camila atiende 24/7 con la información de la estética. Tu agente puede llamarse como quieras y hablar como habla tu marca.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" aria-label="Cómo funciona">
        <span className="section-tag reveal">Proceso</span>
        <h2 className="section-title reveal">Tres pasos simples.</h2>
        <p className="section-sub reveal reveal-delay-1">Instalación rápida, resultados inmediatos.</p>
        <div className="steps">
          <div className="step reveal">
            <div className="step-circle">01</div>
            <h3>Nos contás tu estética</h3>
            <p>Nos cuentas sobre tus servicios, horarios y precios. Nosotros nos encargamos del resto.</p>
          </div>
          <div className="step reveal reveal-delay-1">
            <div className="step-circle">02</div>
            <h3>Creamos tu agente</h3>
            <p>Configuramos un agente con el nombre y personalidad que vos elijas, entrenado con tu información.</p>
          </div>
          <div className="step reveal reveal-delay-2">
            <div className="step-circle">03</div>
            <h3>Tu agente empieza a atender</h3>
            <p>En pocos días, tu agente está respondiendo 24/7 y vos solo recibís las notificaciones de clientas listas para agendar.</p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" aria-label="Beneficios">
        <span className="section-tag reveal">Beneficios</span>
        <h2 className="section-title reveal">Lo que vas a lograr.</h2>
        <div className="benefits-grid">
          <div className="benefit-card reveal">
            <span className="benefit-icon">⚡</span>
            <h3>Recuperás clientas dormidas</h3>
            <p>Tu agente detecta qué clienta no asiste hace 30 días y le escribe para reagendarla. Eso es plata que ya tenías perdida.</p>
          </div>
          <div className="benefit-card reveal reveal-delay-1">
            <span className="benefit-icon">🎯</span>
            <h3>Tus clientas no notan la diferencia</h3>
            <p>Habla de forma natural, entiende contexto y se siente como una persona real. No como esos bots numerados que ya probaste.</p>
          </div>
          <div className="benefit-card reveal reveal-delay-2">
            <span className="benefit-icon">💰</span>
            <h3>Ahorro real vs. una recepcionista</h3>
            <p>Una recepcionista part-time cuesta $400–600 USD/mes. Molric cuesta $149, atiende 24/7 y nunca agarra vacaciones.</p>
          </div>
          <div className="benefit-card reveal reveal-delay-3">
            <span className="benefit-icon">🌙</span>
            <h3>Dejás de estar atado al celular</h3>
            <p>El agente atiende mientras estás con un cliente, mientras dormís, o un domingo de sol. Tu teléfono deja de sonar.</p>
          </div>
        </div>
      </section>

      {/* PRICING - Optimized with anchoring */}
      <section id="pricing" aria-label="Precios">
        <span className="section-tag reveal">Inversión</span>
        <h2 className="section-title reveal">¿Cuánto cuesta recuperar clientas?</h2>
        <p className="section-sub reveal reveal-delay-1" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
          Si logramos rescatar apenas 3 turnos que antes se perdían por no responder a tiempo, ya se paga solo.
        </p>
        <div className="pricing-card reveal reveal-delay-2">
          <div className="pricing-header">
            <span className="pricing-badge">Para estéticas</span>
            <h3 className="pricing-price">Desde $149 USD<span style={{ fontSize: '16px', opacity: 0.7 }}>/mes</span></h3>
            <p className="pricing-setup">Setup inicial: $500 USD (única vez)</p>
          </div>
          <ul className="pricing-features">
            <li>✓ Agente personalizado con nombre y personalidad</li>
            <li>✓ Respuestas 24/7 de forma natural</li>
            <li>✓ Reactivación automática de clientas</li>
            <li>✓ Digitalización de tu base de contactos</li>
            <li>✓ Soporte dedicado y monitoreo</li>
            <li>🛡️ <strong>Garantía de 10 turnos:</strong> Si el primer mes no logramos al menos 10 turnos reales, te devolvemos el valor del setup.</li>
          </ul>
          <div className="pricing-cta">
            <a className="btn-primary" href="https://wa.me/5491178249449?text=Hola,%20quiero%20saber%20más%20sobre%20Molric">Quiero mi agente</a>
            <p className="pricing-note">Setup en días, no semanas. Sin contratos a largo plazo.</p>
          </div>
        </div>
        <p className="pricing-comparison reveal reveal-delay-3" style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
          <strong>Compará:</strong> Una recepcionista part-time cuesta $400–600 USD/mes. Molric cuesta $149 USD, atiende 24/7 y nunca agarra vacaciones.
        </p>
      </section>

      {/* ROI ANCHOR */}
      <section id="roi" aria-label="Cálculo de retorno de inversión" style={{ background: 'var(--accent-dim)', borderRadius: '16px', padding: '64px 40px', margin: '0 auto', maxWidth: '800px' }}>
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag reveal">El cálculo es simple</span>
          <h2 className="section-title reveal" style={{ fontSize: '32px' }}>3 turnos recuperados = $149 recuperados.</h2>
          <p className="section-sub reveal reveal-delay-1" style={{ margin: '0 auto 32px', maxWidth: '600px' }}>
            Si tu ticket promedio es de $50 USD, con rescatar <strong>3 clientas</strong> que dejaron de venir, el servicio se paga solo. Lo que venga después es ganancia pura.
          </p>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>3</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>turnos para pagar el mes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>$149</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>USD/mes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>24/7</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>siempre atendiendo</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY ASSURANCE & GUARANTEE */}
      <section id="guarantee" aria-label="Garantía de servicio" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span className="section-tag">Nuestra Garantía</span>
          <h2 className="section-title">Probá sin riesgo.</h2>
          <p className="section-sub" style={{ marginBottom: '32px' }}>
            Queremos que la decisión sea fácil para vos. Por eso respaldamos nuestro servicio con una garantía de resultados clara.
          </p>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', textAlign: 'left', display: 'flex', gap: '24px', alignItems: 'flex-start', boxShadow: '0 4px 20px rgba(13,13,15,0.03)' }}>
            <span style={{ fontSize: '32px', lineHeight: 1 }}>🛡️</span>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text)', fontFamily: 'var(--font-display)' }}>Compromiso de 10 Turnos Garantizados</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Si durante los primeros 30 días de funcionamiento tu agente personalizado de WhatsApp no logra agendar al menos <strong>10 turnos reales</strong> para tu estética, te devolvemos el 100% de la tarifa de setup de manera inmediata. Sin preguntas, sin vueltas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-label="Preguntas frecuentes">
        <span className="section-tag reveal">Preguntas frecuentes</span>
        <h2 className="section-title reveal">¿Tenés dudas?</h2>
        <p className="section-sub reveal reveal-delay-1" style={{ margin: '0 auto 48px', textAlign: 'center' }}>
          Acá respondemos las preguntas más comunes de nuestras clientas.
        </p>
        <div className="faq-container reveal reveal-delay-2">
          <div className="faq-item">
            <h3 className="faq-question">¿Necesito saber de tecnología para usar Molric?</h3>
            <p className="faq-answer">No. Nosotros nos encargamos de todo: configuramos tu agente, lo entrenamos con la información de tu estética y lo dejamos listo para usar. Vos solo seguís recibiendo los mensajes como siempre.</p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">¿Mis clientas van a notar que es un agente?</h3>
            <p className="faq-answer">No. A diferencia de los bots con opciones numeradas, nuestro agente conversa como lo harías vos: por nombre, con contexto, como una persona de verdad. Las clientas sienten que hablan con una recepcionista real.</p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">¿Qué pasa si mi cliente pregunta algo que el agente no sabe?</h3>
            <p className="faq-answer">El agente deriva automáticamente a un humano cuando detecta que la consulta es compleja. Nunca pierde una venta por no saber responder.</p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">¿Mis datos quedan seguros?</h3>
            <p className="faq-answer">Todo queda a tu nombre desde el día uno: el número de WhatsApp, la cuenta de Meta, tu base de clientas. Si en algún momento decidís salir, te entrego todo. No hay lock-in.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" aria-label="Llamado a la acción">
        <div className="cta-glow"></div>
        <span className="section-tag reveal">¿Querés tu propio agente?</span>
        <h2 className="section-title reveal">Tu negocio, siempre activo.<br /><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Sin vos mirando el teléfono.</em></h2>
        <p className="section-sub reveal reveal-delay-1">Setup en días, no semanas. Operación 100% gestionada. Vos solo entrás a cerrar las ventas.</p>
        <div className="cta-actions reveal reveal-delay-2">
          <a className="btn-primary" href="https://wa.me/5491178249449?text=Hola,%20quiero%20saber%20más%20sobre%20Molric">Quiero mi agente</a>
          <a className="btn-secondary" href="#form">Prefiero que me contacten</a>
        </div>
        <p className="reveal reveal-delay-3" style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--accent)' }}>Cupos limitados para configuración.</strong> Setup en 3-5 días hábiles.
        </p>
      </section>

      {/* FORM */}
      <section id="form" aria-label="Formulario de contacto">
        <span className="section-tag reveal" style={{ textAlign: 'center' }}>Contacto</span>
        <h2 className="section-title reveal" style={{ textAlign: 'center' }}>Contanos de tu negocio.</h2>
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
              <label className="form-label" htmlFor="zona">Zona</label>
              <input
                className="form-input"
                type="text"
                id="zona"
                name="zona"
                value={formData.zona}
                onChange={handleChange}
                required
                placeholder="Ej: Belgrano, Palermo, Caballito..."
              />
            </div>
            <button className="form-submit" type="submit" disabled={submitting}>
              {submitting ? 'Enviando…' : 'Quiero mi agente'}
            </button>
            {submitStatus === 'success' && (
              <p style={{ marginTop: '16px', color: 'var(--accent)', textAlign: 'center', fontWeight: 600 }}>
                ✅ ¡Recibido! Te contactaremos pronto.
              </p>
            )}
            {submitStatus === 'error' && (
              <p style={{ marginTop: '16px', color: '#ff6b6b', textAlign: 'center', fontWeight: 600 }}>
                ❌ Ocurrió un error. Por favor intentá de nuevo.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <a className="footer-logo" href="#" style={{ textTransform: 'lowercase' }}>molr<span style={{ color: 'var(--accent)' }}>i</span>c</a>
        <ul className="footer-links">
          <li><a href="#problem">Problema</a></li>
          <li><a href="#demo">Demo</a></li>
          <li><a href="#pricing">Precios</a></li>
          <li><a href="#form">Contacto</a></li>
        </ul>
        <span className="footer-copy">2026 Molric. Todos los derechos reservados.</span>
      </footer>

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/5491178249449?text=Hola,%20quiero%20saber%20más%20sobre%20Molric"
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
