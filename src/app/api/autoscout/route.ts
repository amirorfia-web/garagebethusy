import { NextResponse } from 'next/server'

// ──────────────────────────────────────────────────────────────────────────────
// This API route is DEPRECATED.
//
// AutoScout24.ch uses Cloudflare protection that blocks all server-side fetch
// requests (403 error). The import feature has been moved to a 100% client-side
// approach that parses the URL slug and optional pasted page text directly in
// the browser. See: src/app/admin/page.tsx (VehicleForm component).
// ──────────────────────────────────────────────────────────────────────────────

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Cette route API n\'est plus utilisée. L\'import AutoScout24 se fait désormais côté client. Veuillez mettre à jour votre interface.',
    },
    { status: 410 },
  )
}
