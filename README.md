# 🤖 Molric - Automatización de WhatsApp para tu Negocio

Una **landing page moderna y persuasiva** para Molric, el servicio que automatiza respuestas en WhatsApp y recupera las ventas que se te escapan todos los días.

## 🎯 ¿Qué es Molric?

Molric es una solución de IA que responde automáticamente en WhatsApp, disponible las 24/7. Mantiene a tus clientes enganchados, califica leads y te avisa solo cuando hay alguien listo para comprar.

**El problema:** Pierdes clientes porque no respondés a tiempo.  
**La solución:** Molric responde por ti, de forma inteligente y personalizada.

## ✨ Características

- 🎨 **Diseño Premium**: Dark theme con acentos cyan inspirado en Axader
- 📱 **100% Responsive**: Funciona perfectamente en desktop, tablet y mobile
- ⚡ **Animaciones Fluidas**: Efectos fade-up, scroll reveals y typing animation
- 💬 **Demo Interactiva**: Chat animado que muestra cómo funciona Molric
- 📝 **Formulario de Contacto**: Captura leads directamente desde la página
- 🔗 **Integración WhatsApp**: CTA buttons con link directo a WhatsApp
- 🎯 **Neurobranding**: Copywriting persuasivo en español (rioplatense)

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router)
- **Estilos**: CSS Puro (sin frameworks, todo custom)
- **Tipografía**: 
  - Exo 2 (Headers)
  - IBM Plex Mono (Body/UI)
- **Estado**: React Hooks (useState, useEffect)
- **Animaciones**: CSS @keyframes + JavaScript timing
- **Responsive**: Single breakpoint a 900px

## 📦 Instalación

### Requisitos
- Node.js 16+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/carlosmiguelcabrera/Molric.git
cd Molric
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```
Abre [http://localhost:3003](http://localhost:3003) en tu navegador.

4. **Build para producción**
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
Molric/
├── app/
│   ├── page.js              # Página principal (todos los componentes)
│   ├── layout.js            # Layout raíz
│   ├── globals.css          # Estilos globales + CSS variables
│   └── not-found.js         # Página 404
├── package.json             # Dependencias
├── next.config.js           # Config de Next.js
├── postcss.config.js        # Config de PostCSS
└── tailwind.config.js       # Config de Tailwind (no usado, CSS puro)
```

## 🎯 Secciones de la Landing

1. **NAV**: Header fijo con logo y links de navegación
2. **HERO**: Headline principal con grid background animado
3. **PROBLEM/SOLUTION**: Two-column layout mostrando el problema y la solución
4. **HOW IT WORKS**: 3 pasos del proceso (Conectar → Responder → Notificar)
5. **BENEFITS**: 4 tarjetas con beneficios principales
6. **DEMO**: Chat animado mostrando una conversación real
7. **CTA**: Call-to-action para cambiar
8. **FORM**: Formulario de contacto con validación
9. **FOOTER**: Información de pie de página + botón flotante de WhatsApp

## 🎨 Paleta de Colores

```css
--bg: #07070f              /* Background principal (casi negro) */
--surface: #0d0d1c         /* Superficies (cards, etc) */
--accent: #00e5ff          /* Cyan (acentos, highlights) */
--text: #e4e4f0            /* Text principal (gris claro) */
--text-muted: #6b6b8a      /* Text secundario (gris oscuro) */
--border: rgba(255,255,255,0.06) /* Borders sutiles */
```

## 🚀 Animaciones Clave

- **Fade Up**: Elementos se revelan con transición suave al hacer scroll
- **Pulse Glow**: Efecto de pulso en botones principales
- **Typing Animation**: Chat tipo máquina de escribir (20ms por carácter)
- **Hamburger Menu**: Animación de transformación en mobile

## 📱 Responsive Breakpoints

- **Desktop**: 900px+
- **Tablet/Mobile**: < 900px (hamburger menu activado)

## 🔌 Integración WhatsApp

Los botones de CTA incluyen enlaces de WhatsApp que abren directamente un chat:

```
https://wa.me/5491234567890?text=Hola,%20quiero%20saber%20más%20sobre%20Molric
```

**⚠️ Nota**: Reemplaza `5491234567890` con tu número real de WhatsApp.

## 📝 Formulario de Contacto

Captura 3 datos:
- Nombre
- Número de WhatsApp
- Tipo de negocio

Actualmente muestra un `alert` - **integra tu webhook (n8n, Make, Zapier, etc)** en `handleSubmit()`.

## 🎬 Demo Chat

La sección demo muestra una conversación realista:

```
Cliente: ¿tenés eso en stock?
Molric: ¡Hola! Sí, tenemos. ¿Cuántas unidades querés?
Cliente: 2
Molric: Perfecto Son $X. ¿Te los reservo?
Cliente: sí, te pago por transferencia
```

El texto descriptivo aparece con fade-in al finalizar la última interacción.

## 🚢 Deployment

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Otras plataformas
- Netlify
- Railway
- Render
- Cualquier host que soporte Node.js

## 📊 Performance

- **Route Size**: 4.7 kB (página principal)
- **First Load JS**: 92.3 kB
- **Build Time**: ~15 segundos
- **Lighthouse**: Optimizado para performance y accessibility

## 🔄 Variables de Entorno

Crea un `.env.local`:

```env
# Si integras con n8n/webhooks
NEXT_PUBLIC_WEBHOOK_URL=https://tu-webhook.com/api/...
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Abre un PR o issue si encontrás algo que mejorar.

## 📄 Licencia

MIT

## 📞 Contacto

- 📧 Email: dev@molric.com
- 💬 WhatsApp: [Abre chat](https://wa.me/5491234567890)
- 🔗 Github: [@carlosmiguelcabrera](https://github.com/carlosmiguelcabrera)

---

**Construído con ❤️ para pequeños negocios que quieren crecer sin complicaciones.**

*Molric - La IA que vende por ti mientras dormís.*
