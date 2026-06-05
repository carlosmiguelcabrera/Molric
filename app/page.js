'use client'

import { useState, useEffect } from 'react'
import HeroParticles from './components/HeroParticles'

const DEMO_MESSAGES = [
  { role: 'client', text: '¿Hola, tenés zapatillas talle 42?' },
  { role: 'agent',  text: '¡Hola! Mi nombre es Isabella. 👟 Sí, tenemos en talle 42. ¿Qué modelo te interesa, el Runner X o el Urban Pro?' },
  { role: 'client', text: 'el Runner X, ¿cuánto sale?' },
  { role: 'agent',  text: 'El Runner X talle 42 está en $389.990. ¿Querés que te lo reserve? Tenemos stock limitado.' },
  { role: 'client', text: 'sí, lo quiero. te pago por transferencia' },
  { role: 'agent',  text: 'Perfecto ✅ Te mando los datos de pago ahora. ¡Gracias por elegirnos!' },
]

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    rubro: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

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
            rubro: formData.rubro,
          }),
        }
      )
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setSubmitStatus('success')
      setFormData({ nombre: '', whatsapp: '', rubro: '' })
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

  // Typing animation para demo
  useEffect(() => {
    const demoElement = document.querySelector('#demo')
    const demoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && visibleCount === 0) {
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
  }, [visibleCount])

  const animateTyping = async () => {
    for (let i = 1; i <= DEMO_MESSAGES.length; i++) {
      await new Promise((r) => setTimeout(r, i === 1 ? 1000 : 2000))
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
          <li><a href="#how">Proceso</a></li>
          <li><a href="#benefits">Beneficios</a></li>
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
        <a href="#how" onClick={closeMobileMenu}>Proceso</a>
        <a href="#benefits" onClick={closeMobileMenu}>Beneficios</a>
        <a href="#form" onClick={closeMobileMenu}>Contacto</a>
      </div>

      {/* HERO */}
      <section id="hero">
        <HeroParticles />
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-tag">WhatsApp · Automatización · Agente con nombre propio</span>
          <h1 className="hero-headline">
            Tu negocio, siempre activo.
          </h1>
          <p className="hero-subheadline">
            Tu negocio no debería depender de que estés mirando el teléfono.
          </p>
          <p className="hero-sub">
            Molric crea un agente en WhatsApp que responde, califica y te avisa solo cuando hay alguien listo para comprar.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="https://wa.me/5491178249449?text=Hola,%20quiero%20saber%20más%20sobre%20Molric">Quiero mi agente</a>
            <a className="btn-secondary" href="#demo">Ver cómo funciona</a>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section id="problem">
        <div className="reveal">
          <span className="section-tag">El problema</span>
          <h2 className="section-title">El teléfono no debería ser lo que frena tu negocio.</h2>
          <p className="section-sub">Cada vez que no podés responder a tiempo, alguien más lo hace por vos. Solo que ese alguien trabaja para la competencia.</p>
          <ul className="problem-list">
            <li className="problem-item">
              <span className="problem-icon">→</span>
              <div className="problem-text">
                <strong>Son las 11pm y llegó una consulta</strong>
                <p>La respondés mañana. Para entonces, el cliente ya eligió.</p>
              </div>
            </li>
            <li className="problem-item">
              <span className="problem-icon">◆</span>
              <div className="problem-text">
                <strong>Cada mensaje te interrumpe</strong>
                <p>Estás en el medio de algo importante y el celular no para. Atendés vos o perdés la venta.</p>
              </div>
            </li>
            <li className="problem-item">
              <span className="problem-icon">§</span>
              <div className="problem-text">
                <strong>Un bot genérico no te representa</strong>
                <p>Tus clientes lo notan. Respuestas frías, sin personalidad, sin la identidad de tu negocio.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="solution-right reveal reveal-delay-2">
          <span className="section-tag">La solución</span>
          <h2 className="section-title">Tu agente con nombre propio responde por vos.</h2>
            <div className="solution-card">
              <h4>Un agente, tu identidad</h4>
              <p>Le ponés nombre, lo entrenamos con la info de tu negocio y suena como vos. Tus clientes no hablan con un bot, hablan con tu agente.</p>
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
        <p className="section-sub reveal reveal-delay-1" style={{ margin: '0 auto 40px', textAlign: 'center' }}>Esta es <strong style={{ color: 'var(--accent)' }}>Isabella</strong>, el agente de una zapatería. Cada negocio tiene el suyo, con nombre y personalidad propia.</p>
        <div className="demo-card reveal reveal-delay-1">
          <div className="demo-chat-header">
            <div className="demo-chat-header-avatar">U</div>
            <div className="demo-chat-header-info">
              <span className="demo-chat-header-name">Isabella - Urban Runner</span>
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
                    {msg.role === 'agent' ? 'Isabella' : 'Cliente'}
                  </span>
                  <p className={msg.role === 'client' ? 'demo-line-client' : 'demo-line-molric'}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

          </div>
          <p className="demo-caption" style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '20px', lineHeight: '1.6', fontStyle: 'italic', opacity: visibleCount === DEMO_MESSAGES.length ? 1 : 0, transition: 'opacity 0.6s ease' }}>
            Isabella opera 24/7 con la información de la zapatería. Tu agente puede llamarse como quieras y hablar como habla tu marca.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="cta-glow"></div>
        <span className="section-tag reveal">¿Querés tu propio agente?</span>
        <h2 className="section-title reveal">Tu negocio, siempre activo.<br /><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Sin vos mirando el teléfono.</em></h2>
        <p className="section-sub reveal reveal-delay-1">Setup en días, no semanas. Mantenimiento incluido. Vos solo entrás a cerrar las ventas.</p>
        <div className="cta-actions reveal reveal-delay-2">
          <a className="btn-primary" href="https://wa.me/5491178249449?text=Hola,%20quiero%20saber%20más%20sobre%20Molric">Quiero mi agente</a>
          <a className="btn-secondary" href="#form">Prefiero que me contacten</a>
        </div>
      </section>

      {/* FORM */}
      <section id="form">
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
              <label className="form-label" htmlFor="rubro">Rubro</label>
              <input
                className="form-input"
                type="text"
                id="rubro"
                name="rubro"
                value={formData.rubro}
                onChange={handleChange}
                required
                placeholder="Ej: Inmobiliaria, Estética, Abogado..."
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
          <li><a href="#how">Proceso</a></li>
          <li><a href="#benefits">Beneficios</a></li>
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