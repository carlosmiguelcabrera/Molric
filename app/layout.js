import './globals.css'

export const metadata = {
  title: 'Molric — Tu negocio siempre activo, sin perderte ningún cliente',
  description: 'Tu negocio no debería depender de que estés mirando el teléfono. Molric crea tu agente en WhatsApp que responde, califica y vende las 24hs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}