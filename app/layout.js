import './globals.css'

export const metadata = {
  title: 'Molric - Responde automáticamente tus WhatsApp',
  description: 'No pierdas más clientes por no responder a tiempo. Molric responde por vos 24/7.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}