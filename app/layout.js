import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const SITE_URL = 'https://molric.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Molric — Agente de WhatsApp para Estéticas | Responde y Vende 24/7',
    template: '%s | Molric',
  },
  description:
    'Recuperá las clientas que dejaste de ver, sin que toques el teléfono. Molric crea un agente personalizado en WhatsApp que responde, califica leads y vende por tu estética las 24 horas.',
  keywords: [
    'agente whatsapp estética',
    'chatbot whatsapp peluquería',
    'automatizacion whatsapp belleza',
    'atencion al cliente estética',
    'recuperar clientas estética',
    'ventas por whatsapp belleza',
    'agente virtual estética',
    'turnos automáticos estética',
    'molric',
  ],
  authors: [{ name: 'Molric' }],
  creator: 'Molric',
  publisher: 'Molric',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: 'Molric',
    title: 'Molric — Agente de WhatsApp para Estéticas',
    description:
      'Recuperá las clientas que dejaste de ver, sin que toques el teléfono. Tu estética atiende 24/7 mientras vos estás en un turno.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Molric - Agente de WhatsApp con Inteligencia Artificial para Estéticas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Molric — Agente de WhatsApp para Estéticas',
    description:
      'Recuperá las clientas que dejaste de ver, sin que toques el teléfono. Tu estética atiende 24/7.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Molric - Agente de WhatsApp para Estéticas',
    description: 'Agente personalizado de WhatsApp que responde, califica leads y vende por tu estética las 24 horas.',
    provider: {
      '@type': 'Organization',
      name: 'Molric',
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+54-9-11-7824-9449',
        contactType: 'sales',
        areaServed: 'AR',
        availableLanguage: 'Spanish',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Argentina',
    },
    serviceType: 'Agente de WhatsApp con IA',
    hasGuarantee: {
      '@type': 'Offer',
      name: 'Garantía de 10 Turnos',
      description: 'Si durante los primeros 30 días de funcionamiento tu agente no logra agendar al menos 10 turnos reales, te devolvemos el 100% de la tarifa de setup.',
      price: '0',
      priceCurrency: 'USD',
    },
    offers: {
      '@type': 'Offer',
      price: '149',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '149',
        priceCurrency: 'USD',
        billingDuration: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON',
        },
      },
      availability: 'https://schema.org/InStock',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Planes Molric',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Plan Starter',
            description: '1 local: estética, gym, clínica simple',
          },
          price: '149',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Plan Pro',
            description: 'Volumen alto, flujos múltiples, inbox Chatwoot',
          },
          price: '249',
          priceCurrency: 'USD',
        },
      ],
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Necesito saber de tecnología para usar Molric?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Nosotros nos encargamos de todo: configuramos tu agente, lo entrenamos con la información de tu estética y lo dejamos listo para usar. Vos solo seguís recibiendo los mensajes como siempre.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Mis clientas van a notar que es un agente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A diferencia de los bots con opciones numeradas, nuestro agente conversa como lo harías vos: por nombre, con contexto, como una persona de verdad. Las clientas sienten que hablan con una recepcionista real.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué pasa si mi cliente pregunta algo que el agente no sabe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El agente deriva automáticamente a un humano cuando detecta que la consulta es compleja. Nunca pierde una venta por no saber responder.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Mis datos quedan seguros?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Todo queda a tu nombre desde el día uno: el número de WhatsApp, la cuenta de Meta, tu base de clientas. Si en algún momento decidís salir, te entrego todo. No hay lock-in.',
        },
      },
    ],
  }

  return (
    <html lang="es" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}