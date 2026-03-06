'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import type { Vehicle } from '@/data/vehicle-types'
import { BADGE_OPTIONS, FUEL_OPTIONS, TRANSMISSION_OPTIONS } from '@/data/vehicle-types'

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCHF(amount: number): string {
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatKm(km: number): string {
  return new Intl.NumberFormat('fr-CH').format(km) + ' km'
}

interface VehicleFormData {
  id?: string
  make: string
  model: string
  year: number
  month: number | null
  km: number
  transmission: string
  fuel: string
  price: number
  badge: string
  badgeVariant: 'blue' | 'success' | 'grey'
  source: 'direct' | 'autoscout24'
  description: string
  /** Rétro-compatibilité — première image */
  image: string
  /** Toutes les images */
  images: string[]
  autoscoutUrl: string
  visible: boolean
}

const EMPTY_VEHICLE: VehicleFormData = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  month: null,
  km: 0,
  transmission: 'Auto',
  fuel: 'Essence',
  price: 0,
  badge: 'Disponible',
  badgeVariant: 'blue',
  source: 'direct',
  description: '',
  image: '',
  images: [],
  autoscoutUrl: '',
  visible: true,
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPOSANT : LOGIN
// ══════════════════════════════════════════════════════════════════════════════

function LoginForm({ onLogin }: { onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    onLogin(password)
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#F8F9FC] flex items-center justify-center p-4 overflow-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#DDE3F0] shadow-md p-8 w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 bg-[#1649C8] rounded-[5px] flex items-center justify-center font-bold text-[0.85rem] text-white">
            GB
          </div>
          <h1 className="font-bold text-lg text-[#080F28]">Administration</h1>
        </div>

        <label className="block text-sm font-medium text-[#3D4A66] mb-1.5">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#DDE3F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1649C8]/20 focus:border-[#1649C8] mb-4"
          placeholder="Entrez le mot de passe admin"
          autoFocus
        />

        {error && (
          <p className="text-sm text-red-600 mb-3">Mot de passe incorrect</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#1649C8] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#0D2E8F] transition-colors"
        >
          Connexion
        </button>
      </form>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPOSANT : UPLOAD MULTI-IMAGES
// ══════════════════════════════════════════════════════════════════════════════

interface MultiImageUploadProps {
  images: string[]
  password: string
  onImagesChange: (images: string[]) => void
}

function MultiImageUpload({ images, password, onImagesChange }: MultiImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')

  const handleUpload = async (files: FileList | File[]) => {
    setError(null)
    setUploading(true)

    try {
      const newUrls: string[] = []
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${password}` },
          body: formData,
        })

        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Erreur lors de l\'upload')
          continue
        }
        newUrls.push(data.url)
      }

      if (newUrls.length > 0) {
        onImagesChange([...images, ...newUrls])
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) handleUpload(files)
    // Reset pour pouvoir re-sélectionner le même fichier
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) handleUpload(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => setDragOver(false)

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return
    const updated = [...images]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    onImagesChange(updated)
  }

  const addUrl = () => {
    const trimmed = urlInput.trim()
    if (trimmed) {
      onImagesChange([...images, trimmed])
      setUrlInput('')
    }
  }

  return (
    <div>
      {/* Grille des images existantes */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {images.map((img, i) => (
            <div key={`${img}-${i}`} className="relative group aspect-[4/3] rounded-lg border border-[#DDE3F0] overflow-hidden bg-[#EAF0FF]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />

              {/* Badge "principale" */}
              {i === 0 && (
                <span className="absolute top-1 left-1 bg-[#1649C8] text-white text-[0.55rem] font-bold px-1.5 py-0.5 rounded-md z-10">
                  Principale
                </span>
              )}

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="w-6 h-6 rounded-full bg-white text-[#080F28] flex items-center justify-center text-xs shadow-md hover:bg-blue-50"
                    title="Déplacer avant"
                  >
                    ←
                  </button>
                )}
                {i < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i + 1)}
                    className="w-6 h-6 rounded-full bg-white text-[#080F28] flex items-center justify-center text-xs shadow-md hover:bg-blue-50"
                    title="Déplacer après"
                  >
                    →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shadow-md hover:bg-red-700"
                  title="Supprimer"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Zone de drop / upload */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all
          ${dragOver
            ? 'border-[#1649C8] bg-[#EAF0FF]'
            : 'border-[#DDE3F0] hover:border-[#1649C8]/40 hover:bg-[#F8F9FC]'
          }
          ${uploading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileSelect}
          multiple
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 border-3 border-[#1649C8] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#3D4A66]">Upload en cours...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7D89A3" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm text-[#3D4A66]">
              <span className="font-semibold text-[#1649C8]">Cliquez pour choisir</span> ou glissez {images.length > 0 ? 'd\'autres images' : 'des images'} ici
            </p>
            <p className="text-xs text-[#7D89A3]">JPG, PNG, WebP — max 10 MB — plusieurs fichiers possibles</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1.5">{error}</p>
      )}

      {/* OU : coller une URL */}
      <div className="mt-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex-1 h-px bg-[#DDE3F0]" />
          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#7D89A3]">ou coller une URL</span>
          <div className="flex-1 h-px bg-[#DDE3F0]" />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addUrl() } }}
            className="flex-1 border border-[#DDE3F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1649C8]/20 focus:border-[#1649C8]"
            placeholder="https://... ou /images/nom-fichier.jpg"
          />
          <button
            type="button"
            onClick={addUrl}
            disabled={!urlInput.trim()}
            className="px-3 py-2 bg-[#1649C8] text-white text-sm font-bold rounded-lg hover:bg-[#0D2E8F] transition-colors disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPOSANT : FORMULAIRE VÉHICULE
// ══════════════════════════════════════════════════════════════════════════════

interface VehicleFormProps {
  vehicle: VehicleFormData
  password: string
  onSave: (vehicle: VehicleFormData) => void
  onCancel: () => void
  isEditing: boolean
}

// ── Client-side AutoScout24 helpers ─────────────────────────────────────────

/** Known make slugs that need special mapping */
const MAKE_MAPPINGS: Record<string, string> = {
  vw: 'Volkswagen',
  bmw: 'BMW',
  mb: 'Mercedes-Benz',
  mercedes: 'Mercedes-Benz',
}

/**
 * Parse an AutoScout24 URL slug to extract make and model.
 * Example URL: https://www.autoscout24.ch/fr/d/volvo-xc90-20-t8-te-ultra-dark-eawd-12876739
 * → make: "Volvo", model: "XC90 2.0 T8 TE Ultra Dark eAWD"
 */
function parseAutoScoutUrl(url: string): { make: string; model: string } | null {
  try {
    const u = new URL(url)
    if (!u.hostname.includes('autoscout24')) return null

    // Extract the slug (last path segment)
    const pathParts = u.pathname.split('/').filter(Boolean)
    const slug = pathParts[pathParts.length - 1] // e.g. "volvo-xc90-20-t8-te-ultra-dark-eawd-12876739"
    if (!slug) return null

    // Split by hyphens
    const parts = slug.split('-')
    if (parts.length < 2) return null

    // The last part is typically the numeric ID — remove it
    const lastPart = parts[parts.length - 1]
    const slugParts = /^\d{5,}$/.test(lastPart) ? parts.slice(0, -1) : parts

    if (slugParts.length === 0) return null

    // First part is the make
    const rawMake = slugParts[0].toLowerCase()
    const make = MAKE_MAPPINGS[rawMake] ?? rawMake.charAt(0).toUpperCase() + rawMake.slice(1)

    // Rest is the model — capitalize each word, rejoin with spaces
    const modelParts = slugParts.slice(1).map((p) => {
      // Keep fully uppercase short strings (e.g. "xc90" → "XC90", "gti" → "GTI")
      if (p.length <= 4 && /^[a-z0-9]+$/i.test(p)) {
        return p.toUpperCase()
      }
      return p.charAt(0).toUpperCase() + p.slice(1)
    })

    // Re-join digits that look like engine specs: "20" after model name → "2.0"
    const model = modelParts
      .map((p) => {
        // Convert pure 2-digit numbers to X.X format (e.g. "20" → "2.0", "30" → "3.0")
        if (/^\d{2}$/.test(p)) {
          return p[0] + '.' + p[1]
        }
        return p
      })
      .join(' ')

    return { make, model }
  } catch {
    return null
  }
}

/**
 * Parse pasted AutoScout24 page text to extract vehicle details.
 * Users copy all text from the page (Cmd+A, Cmd+C) and paste it into a textarea.
 */
function parseAutoScoutText(text: string): {
  price?: number
  km?: number
  year?: number
  month?: number
  fuel?: string
  transmission?: string
} {
  const result: { price?: number; km?: number; year?: number; month?: number; fuel?: string; transmission?: string } = {}

  // ── Price: "CHF 45'900", "CHF 45 900", "45'900.–", "CHF45'900.–" ──
  const pricePatterns = [
    /CHF\s*([\d\s']+)(?:\.[-–])?/i,
    /([\d']{4,})\.[-–]/,
  ]
  for (const pat of pricePatterns) {
    const m = text.match(pat)
    if (m) {
      const cleaned = m[1].replace(/[\s'.,]/g, '')
      const val = parseInt(cleaned, 10)
      if (val > 0 && val < 10_000_000) {
        result.price = val
        break
      }
    }
  }

  // ── Km: "48'000 km", "48000 km", "48 000 km" ──
  const kmMatch = text.match(/([\d\s'.,]+)\s*km\b/i)
  if (kmMatch) {
    const cleaned = kmMatch[1].replace(/[\s'.,]/g, '')
    const val = parseInt(cleaned, 10)
    if (val > 0 && val < 10_000_000) {
      result.km = val
    }
  }

  // ── Year: "Première mise en circulation" + MM.YYYY, or standalone MM.YYYY ──
  const yearPatterns = [
    /(?:premi[eè]re mise en circulation|Erstinverkehrsetzung|1st registration)[:\s]*(\d{2})\.(\d{4})/i,
    /(\d{2})\.(\d{4})/,
  ]
  for (const pat of yearPatterns) {
    const m = text.match(pat)
    if (m) {
      const mo = parseInt(m[1], 10)
      const y = parseInt(m[2], 10)
      if (y >= 1990 && y <= 2030) {
        result.year = y
        if (mo >= 1 && mo <= 12) result.month = mo
        break
      }
    }
  }

  // ── Fuel type ──
  const fuelPatterns: { pattern: RegExp; value: string }[] = [
    { pattern: /\b[eé]lectrique\b/i, value: 'Électrique' },
    { pattern: /\bhybride rechargeable\b/i, value: 'Hybride' },
    { pattern: /\bhybride\b/i, value: 'Hybride' },
    { pattern: /\bdiesel\b/i, value: 'Diesel' },
    { pattern: /\bessence\b/i, value: 'Essence' },
    { pattern: /\bbenzin\b/i, value: 'Essence' },
    { pattern: /\bgpl\b|\blpg\b/i, value: 'GPL' },
    { pattern: /\bgaz naturel\b|\bcng\b/i, value: 'Gaz' },
  ]
  for (const { pattern, value } of fuelPatterns) {
    if (pattern.test(text)) {
      result.fuel = value
      break
    }
  }

  // ── Transmission ──
  const transPatterns: { pattern: RegExp; value: string }[] = [
    { pattern: /\bbo[iî]te automatique\b/i, value: 'Auto' },
    { pattern: /\bautomatique\b/i, value: 'Auto' },
    { pattern: /\bautomatic\b/i, value: 'Auto' },
    { pattern: /\btiptronic\b/i, value: 'Auto' },
    { pattern: /\bdsg\b/i, value: 'DSG' },
    { pattern: /\bs-tronic\b|\bstronic\b/i, value: 'S-Tronic' },
    { pattern: /\bcvt\b/i, value: 'CVT' },
    { pattern: /\bbo[iî]te manuelle\b/i, value: 'Manuelle' },
    { pattern: /\bmanuelle\b/i, value: 'Manuelle' },
    { pattern: /\bmanual\b/i, value: 'Manuelle' },
  ]
  for (const { pattern, value } of transPatterns) {
    if (pattern.test(text)) {
      result.transmission = value
      break
    }
  }

  return result
}

// ── VehicleForm component ───────────────────────────────────────────────────

function VehicleForm({ vehicle, password, onSave, onCancel, isEditing }: VehicleFormProps) {
  const [form, setForm] = useState(vehicle)
  const [importUrl, setImportUrl] = useState('')
  const [importText, setImportText] = useState('')
  const [importImageUrls, setImportImageUrls] = useState('')
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const [showTextArea, setShowTextArea] = useState(false)
  const [showImageUrls, setShowImageUrls] = useState(false)

  const handleChange = (field: string, value: string | number | boolean) => {
    // Convertir le mois vide en null
    if (field === 'month') {
      setForm((prev) => ({ ...prev, month: value === '' ? null : Number(value) }))
      return
    }
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleBadgeChange = (badgeLabel: string) => {
    const found = BADGE_OPTIONS.find((b) => b.value === badgeLabel)
    setForm((prev) => ({
      ...prev,
      badge: badgeLabel,
      badgeVariant: found?.variant ?? 'blue',
      source: badgeLabel === 'AutoScout24' ? 'autoscout24' : 'direct',
    }))
  }

  /** Client-side import: parse URL slug + optional pasted page text + image URLs */
  const handleImportAutoScout = async () => {
    setImportError(null)

    // Validate URL
    if (!importUrl || !importUrl.includes('autoscout24')) {
      setImportError('Collez une URL AutoScout24 valide')
      return
    }

    setImporting(true)

    try {
      // 1. Parse make/model from URL
      const urlData = parseAutoScoutUrl(importUrl)
      if (!urlData) {
        setImportError('Impossible de lire la marque/modèle depuis cette URL')
        setImporting(false)
        return
      }

      // 2. Parse details from pasted text (if provided)
      const textData = importText.trim() ? parseAutoScoutText(importText) : {}

      // 3. Download images from pasted URLs (if provided)
      const downloadedImages: string[] = []
      if (importImageUrls.trim()) {
        const urls = importImageUrls.split('\n').map((u) => u.trim()).filter(Boolean)
        for (const imgUrl of urls) {
          try {
            const res = await fetch('/api/upload', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${password}`,
              },
              body: JSON.stringify({ url: imgUrl }),
            })
            const data = await res.json()
            if (res.ok && data.url) {
              downloadedImages.push(data.url)
            }
          } catch {
            // Skip failed images silently
          }
        }
      }

      // 4. Fill the form
      setForm((prev) => ({
        ...prev,
        make: urlData.make || prev.make,
        model: urlData.model || prev.model,
        year: textData.year || prev.year,
        month: textData.month ?? prev.month,
        km: textData.km || prev.km,
        price: textData.price || prev.price,
        fuel: textData.fuel || prev.fuel,
        transmission: textData.transmission || prev.transmission,
        images: downloadedImages.length > 0 ? [...prev.images, ...downloadedImages] : prev.images,
        image: downloadedImages.length > 0 ? downloadedImages[0] : prev.image,
        autoscoutUrl: importUrl,
        source: 'autoscout24',
        badge: 'AutoScout24',
        badgeVariant: 'grey' as const,
      }))
    } catch {
      setImportError('Erreur lors de l\'import')
    } finally {
      setImporting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  const inputCls = 'w-full border border-[#DDE3F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1649C8]/20 focus:border-[#1649C8]'
  const labelCls = 'block text-xs font-bold uppercase tracking-wider text-[#3D4A66] mb-1'

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#DDE3F0] shadow-xl w-full max-w-2xl p-6 my-8">
        <h2 className="font-bold text-lg text-[#080F28] mb-4">
          {isEditing ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
        </h2>

        {/* ── Import AutoScout24 (client-side) ─────────────────── */}
        {!isEditing && (
          <div className="mb-5 p-4 bg-[#FFF8F0] rounded-lg border border-[#F5DFC1]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6914] mb-2">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                Lien AutoScout24
              </span>
            </label>

            {/* URL input */}
            <input
              type="text"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              className="w-full border border-[#F5DFC1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A030]/20 focus:border-[#D4A030] bg-white mb-2"
              placeholder="https://www.autoscout24.ch/fr/d/volvo-xc90-..."
            />

            {/* Collapsible paste-text section */}
            <button
              type="button"
              onClick={() => setShowTextArea(!showTextArea)}
              className="flex items-center gap-1.5 text-xs text-[#8B6914] hover:text-[#6B5010] transition-colors mb-2"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform ${showTextArea ? 'rotate-90' : ''}`}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Copier-coller le texte de l&apos;annonce
            </button>

            {showTextArea && (
              <div className="mb-2">
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="w-full border border-[#F5DFC1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A030]/20 focus:border-[#D4A030] bg-white min-h-[100px] resize-y"
                  placeholder="Ouvrez la page AutoScout24, faites Cmd+A puis Cmd+C, et collez ici le texte pour remplir automatiquement le prix, km, annee..."
                  rows={5}
                />
                <p className="text-xs text-[#8B6914]/60 mt-1">
                  Collez le texte de la page AutoScout24 pour remplir automatiquement les details (prix, km, mois, annee...).
                </p>
              </div>
            )}

            {/* Collapsible image URLs section */}
            <button
              type="button"
              onClick={() => setShowImageUrls(!showImageUrls)}
              className="flex items-center gap-1.5 text-xs text-[#8B6914] hover:text-[#6B5010] transition-colors mb-2"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform ${showImageUrls ? 'rotate-90' : ''}`}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Importer des photos (URLs)
            </button>

            {showImageUrls && (
              <div className="mb-2">
                <textarea
                  value={importImageUrls}
                  onChange={(e) => setImportImageUrls(e.target.value)}
                  className="w-full border border-[#F5DFC1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A030]/20 focus:border-[#D4A030] bg-white min-h-[80px] resize-y"
                  placeholder={"Clic droit sur chaque photo AutoScout24 → Copier l'adresse de l'image\nCollez les URLs ici, une par ligne :\nhttps://prod.pictures.autoscout24.net/..."}
                  rows={4}
                />
                <p className="text-xs text-[#8B6914]/60 mt-1">
                  Clic droit sur les photos → &laquo; Copier l&apos;adresse de l&apos;image &raquo;, puis collez ici (une URL par ligne).
                </p>
              </div>
            )}

            {/* Import button */}
            <button
              type="button"
              onClick={handleImportAutoScout}
              disabled={importing || !importUrl}
              className="w-full bg-[#D4A030] text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#B8891A] transition-colors disabled:opacity-50"
            >
              {importing ? 'Import en cours...' : 'Importer'}
            </button>

            {importError && (
              <p className="text-xs text-red-600 mt-1.5">{importError}</p>
            )}
            <p className="text-xs text-[#8B6914]/60 mt-1.5">
              La marque et le modele sont extraits du lien. Collez le texte pour les details, et les URLs des photos pour les importer.
            </p>
          </div>
        )}

        {/* Marque + Modèle */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Marque *</label>
            <input type="text" value={form.make} onChange={(e) => handleChange('make', e.target.value)} className={inputCls} required placeholder="Ex: Volkswagen" />
          </div>
          <div>
            <label className={labelCls}>Modèle *</label>
            <input type="text" value={form.model} onChange={(e) => handleChange('model', e.target.value)} className={inputCls} required placeholder="Ex: Golf VIII GTI" />
          </div>
        </div>

        {/* Année + Mois */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelCls}>Année *</label>
            <input type="number" value={form.year} onChange={(e) => handleChange('year', e.target.value)} className={inputCls} required min={1990} max={2030} />
          </div>
          <div>
            <label className={labelCls}>Mois</label>
            <select
              value={form.month ?? ''}
              onChange={(e) => handleChange('month', e.target.value ? Number(e.target.value) : '')}
              className={inputCls}
            >
              <option value="">—</option>
              {[
                'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
              ].map((name, i) => (
                <option key={i + 1} value={i + 1}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Kilométrage *</label>
            <input type="number" value={form.km} onChange={(e) => handleChange('km', e.target.value)} className={inputCls} required min={0} step={1} />
          </div>
        </div>

        {/* Prix */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelCls}>Prix CHF *</label>
            <input type="number" value={form.price} onChange={(e) => handleChange('price', e.target.value)} className={inputCls} required min={0} step={1} />
          </div>
        </div>

        {/* Transmission + Carburant */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Transmission</label>
            <select value={form.transmission} onChange={(e) => handleChange('transmission', e.target.value)} className={inputCls}>
              {TRANSMISSION_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Carburant</label>
            <select value={form.fuel} onChange={(e) => handleChange('fuel', e.target.value)} className={inputCls}>
              {FUEL_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        {/* Badge + Visibilité */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Statut / Badge</label>
            <select value={form.badge} onChange={(e) => handleBadgeChange(e.target.value)} className={inputCls}>
              {BADGE_OPTIONS.map((b) => <option key={b.value} value={b.value}>{b.value}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Visible sur le site</label>
            <select
              value={form.visible ? 'true' : 'false'}
              onChange={(e) => handleChange('visible', e.target.value === 'true')}
              className={inputCls}
            >
              <option value="true">Oui — visible</option>
              <option value="false">Non — masqué</option>
            </select>
          </div>
        </div>

        {/* ── PHOTOS DU VÉHICULE ────────────────────────────────────────── */}
        <div className="mb-5 p-4 bg-[#F8F9FC] rounded-lg border border-[#DDE3F0]">
          <label className={`${labelCls} mb-3`}>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Photos du véhicule ({form.images.length})
            </span>
          </label>
          <MultiImageUpload
            images={form.images}
            password={password}
            onImagesChange={(imgs) => setForm((prev) => ({ ...prev, images: imgs, image: imgs[0] || '' }))}
          />
        </div>

        {/* ── COMMENTAIRE LIBRE ─────────────────────────────────────────── */}
        <div className="mb-5">
          <label className={labelCls}>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Commentaire / Description
            </span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`${inputCls} min-h-[100px] resize-y`}
            placeholder="Ex: Véhicule en excellent état, carnet d'entretien complet, pneus neufs, contrôle technique OK..."
            rows={4}
          />
          <p className="text-xs text-[#7D89A3] mt-1">Visible sur la fiche véhicule publique. Décrivez l&apos;état, les options, l&apos;historique...</p>
        </div>

        {/* Lien AutoScout24 */}
        {form.source === 'autoscout24' && (
          <div className="mb-4">
            <label className={labelCls}>Lien AutoScout24</label>
            <input type="url" value={form.autoscoutUrl ?? ''} onChange={(e) => handleChange('autoscoutUrl', e.target.value)} className={inputCls} placeholder="https://www.autoscout24.ch/fr/d/..." />
          </div>
        )}

        {/* Boutons */}
        <div className="flex gap-3 pt-4 border-t border-[#DDE3F0]">
          <button
            type="submit"
            className="flex-1 bg-[#1649C8] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#0D2E8F] transition-colors"
          >
            {isEditing ? 'Enregistrer' : 'Ajouter le véhicule'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 border border-[#DDE3F0] text-[#3D4A66] font-medium text-sm py-2.5 rounded-lg hover:bg-[#F8F9FC] transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE ADMIN PRINCIPALE
// ══════════════════════════════════════════════════════════════════════════════

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null)
  const [authError, setAuthError] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<(VehicleFormData) | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const fetchVehicles = useCallback(async (pw: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/vehicles?all=true', {
        headers: { Authorization: `Bearer ${pw}` },
      })
      if (!res.ok) throw new Error('Auth failed')
      const data = await res.json()
      setVehicles(data)
      setAuthError(false)
    } catch {
      setAuthError(true)
      setPassword(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (password) fetchVehicles(password)
  }, [password, fetchVehicles])

  const handleLogin = (pw: string) => {
    setPassword(pw)
  }

  const handleSave = async (vehicleData: VehicleFormData) => {
    if (!password) return
    const isEditing = !!vehicleData.id

    const res = await fetch('/api/vehicles', {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify(vehicleData),
    })

    if (res.ok) {
      showToast(isEditing ? 'Véhicule modifié' : 'Véhicule ajouté')
      setShowForm(false)
      setEditingVehicle(null)
      fetchVehicles(password)
    }
  }

  const handleDelete = async (id: string) => {
    if (!password) return
    const res = await fetch('/api/vehicles', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({ id }),
    })

    if (res.ok) {
      showToast('Véhicule supprimé')
      setDeleteConfirm(null)
      fetchVehicles(password)
    }
  }

  const handleToggleVisibility = async (vehicle: Vehicle) => {
    if (!password) return
    const res = await fetch('/api/vehicles', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({ ...vehicle, visible: !vehicle.visible }),
    })

    if (res.ok) {
      showToast(vehicle.visible ? 'Véhicule masqué' : 'Véhicule rendu visible')
      fetchVehicles(password)
    }
  }

  // ── Pas connecté ──────────────────────────────────────────────────────────

  if (!password) {
    return <LoginForm onLogin={handleLogin} />
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────

  const visibleCount = vehicles.filter((v) => v.visible).length
  const hiddenCount = vehicles.length - visibleCount

  return (
    <div className="fixed inset-0 z-[200] bg-[#F8F9FC] overflow-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-[#0E9F6E] text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg animate-fade-up">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-[#DDE3F0] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1649C8] rounded-[5px] flex items-center justify-center font-bold text-[0.85rem] text-white">
              GB
            </div>
            <div>
              <h1 className="font-bold text-sm text-[#080F28]">Gestion des véhicules</h1>
              <p className="text-xs text-[#7D89A3]">{visibleCount} visible{visibleCount > 1 ? 's' : ''} · {hiddenCount} masqué{hiddenCount > 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/vehicules-occasion"
              target="_blank"
              className="text-xs font-medium text-[#1649C8] hover:underline px-3 py-2"
            >
              Voir le site
            </a>
            <button
              onClick={() => { setShowForm(true); setEditingVehicle(null) }}
              className="bg-[#1649C8] text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#0D2E8F] transition-colors flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Ajouter
            </button>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-20 text-[#7D89A3]">Chargement...</div>
        ) : authError ? (
          <div className="text-center py-20 text-red-600">Mot de passe incorrect. Rechargez la page.</div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#7D89A3] mb-4">Aucun véhicule pour le moment.</p>
            <button
              onClick={() => { setShowForm(true); setEditingVehicle(null) }}
              className="bg-[#1649C8] text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-[#0D2E8F] transition-colors"
            >
              Ajouter votre premier véhicule
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className={`bg-white border rounded-lg p-4 flex items-center gap-4 transition-all ${
                  v.visible ? 'border-[#DDE3F0]' : 'border-[#DDE3F0] opacity-50'
                }`}
              >
                {/* Image miniature */}
                <div className="w-20 h-14 rounded-md overflow-hidden bg-[#EAF0FF] shrink-0 flex items-center justify-center">
                  {(v.images?.length > 0 || v.image) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.images?.[0] || v.image!} alt={`${v.make} ${v.model}`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🚗</span>
                  )}
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-sm text-[#080F28] truncate">
                      {v.make} {v.model}
                    </h3>
                    <span className={`text-[0.6rem] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                      v.badgeVariant === 'success' ? 'bg-green-50 text-green-700' :
                      v.badgeVariant === 'blue' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {v.badge}
                    </span>
                    {!v.visible && (
                      <span className="text-[0.6rem] font-bold uppercase px-1.5 py-0.5 rounded-full bg-red-50 text-red-600">
                        Masqué
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#7D89A3]">
                    {v.month ? `${String(v.month).padStart(2, '0')}.${v.year}` : v.year} · {formatKm(v.km)} · {v.transmission} · {v.fuel} · {formatCHF(v.price)}
                    {v.images?.length > 1 && <span className="ml-1 text-[#1649C8]">· {v.images.length} photos</span>}
                  </p>
                  {v.description && (
                    <p className="text-xs text-[#7D89A3] mt-0.5 truncate max-w-md italic">
                      {v.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleToggleVisibility(v)}
                    className="p-2 rounded-md hover:bg-[#F8F9FC] text-[#7D89A3] hover:text-[#080F28] transition-colors"
                    title={v.visible ? 'Masquer' : 'Rendre visible'}
                  >
                    {v.visible ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      // Construire le tableau images (rétro-compatibilité)
                      const vehicleImages = (v.images && v.images.length > 0)
                        ? v.images
                        : v.image
                          ? [v.image]
                          : []
                      setEditingVehicle({
                        id: v.id,
                        make: v.make,
                        model: v.model,
                        year: v.year,
                        month: v.month ?? null,
                        km: v.km,
                        transmission: v.transmission,
                        fuel: v.fuel,
                        price: v.price,
                        badge: v.badge,
                        badgeVariant: v.badgeVariant,
                        source: v.source,
                        description: v.description ?? '',
                        image: v.image ?? '',
                        images: vehicleImages,
                        autoscoutUrl: v.autoscoutUrl ?? '',
                        visible: v.visible,
                      })
                      setShowForm(true)
                    }}
                    className="p-2 rounded-md hover:bg-[#F8F9FC] text-[#7D89A3] hover:text-[#1649C8] transition-colors"
                    title="Modifier"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>

                  {deleteConfirm === v.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition-colors"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-xs text-[#7D89A3] px-2 py-1 rounded hover:bg-[#F8F9FC] transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(v.id)}
                      className="p-2 rounded-md hover:bg-red-50 text-[#7D89A3] hover:text-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal formulaire */}
      {showForm && (
        <VehicleForm
          vehicle={editingVehicle ?? EMPTY_VEHICLE}
          password={password}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingVehicle(null) }}
          isEditing={!!editingVehicle?.id}
        />
      )}
    </div>
  )
}
