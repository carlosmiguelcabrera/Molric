import './globals.css'

const SITE_URL = 'https://molric.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Molric — Agente de WhatsApp con IA para tu negocio | Responde y vende 24/7',
    template: '%s | Molric',
  },
  description:
    'Molric crea un agente personalizado en WhatsApp con inteligencia artificial que responde, califica leads y vende por tu negocio las 24 horas. Setup en días, resultados inmediatos.',
  keywords: [
    'agente whatsapp',
    'chatbot whatsapp',
    'automatizacion whatsapp',
    'atencion al cliente whatsapp',
    'ia para whatsapp',
    'bot whatsapp negocio',
    'ventas por whatsapp',
    'agente virtual whatsapp',
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
    title: 'Molric — Agente de WhatsApp con IA para tu negocio',
    description:
      'Tu negocio no debería depender de que estés mirando el teléfono. Molric crea tu agente en WhatsApp que responde, califica y vende las 24hs.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Molric - Agente de WhatsApp con Inteligencia Artificial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Molric — Agente de WhatsApp con IA para tu negocio',
    description:
      'Molric crea un agente personalizado en WhatsApp que responde, califica leads y vende por tu negocio las 24 horas.',
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
    '@type': 'Organization',
    name: 'Molric',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      'Molric crea agentes personalizados en WhatsApp con inteligencia artificial para negocios. Responde, califica leads y vende las 24 horas.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54-9-11-7824-9449',
      contactType: 'sales',
      areaServed: 'AR',
      availableLanguage: 'Spanish',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Argentina',
    },
    offers: {
      '@type': 'Offer',
      description: 'Agente personalizado de WhatsApp con IA para tu negocio',
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
