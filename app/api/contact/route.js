import { NextResponse } from 'next/server'

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map()

const noStore = { 'Cache-Control': 'no-store' }

function isRateLimited(ip) {
  const now = Date.now()
  const entry = hits.get(ip)

  if (hits.size > 5000) hits.clear()

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 })
    return false
  }

  entry.count += 1
  return entry.count > MAX_REQUESTS
}

function isText(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength
}

export async function POST(request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook no configurado' }, { status: 500, headers: noStore })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes' },
      { status: 429, headers: { ...noStore, 'Retry-After': '600' } },
    )
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400, headers: noStore })
  }

  if (payload.website) {
    return NextResponse.json({ ok: true }, { headers: noStore })
  }

  const nombre = typeof payload.nombre === 'string' ? payload.nombre.trim() : ''
  const zona = typeof payload.zona === 'string' ? payload.zona.trim() : ''
  const whatsapp = typeof payload.whatsapp === 'string' ? payload.whatsapp.replace(/[\s()+-]/g, '') : ''

  if (!isText(nombre, 120) || !isText(zona, 120) || !/^\d{6,15}$/.test(whatsapp)) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400, headers: noStore })
  }

  const cfClientId = process.env.CF_ACCESS_CLIENT_ID
  const cfClientSecret = process.env.CF_ACCESS_CLIENT_SECRET
  const headers = { 'Content-Type': 'application/json' }
  if (cfClientId && cfClientSecret) {
    headers['CF-Access-Client-Id'] = cfClientId
    headers['CF-Access-Client-Secret'] = cfClientSecret
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ nombre, whatsapp, zona }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    })

    if (!response.ok) throw new Error(`Webhook respondió ${response.status}`)

    return NextResponse.json({ ok: true }, { headers: noStore })
  } catch {
    return NextResponse.json({ error: 'No se pudo enviar' }, { status: 502, headers: noStore })
  }
}
