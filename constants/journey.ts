/**
 * Hard-coded data for the /journey page.
 *
 * Add a chapter / certificate:
 *  1. Append an entry below (id must be unique).
 *  2. Add its text under `portfolio.journey.chapters.<id>` / `portfolio.journey.certificates.items.<id>`
 *     in BOTH `public/assets/language/en.json` and `vn.json`.
 *  3. Certificate images go in `public/assets/images/certificates/` (webp/jpg, ~1600px wide is plenty).
 */

export type JourneyChapter = {
  id: 'spark' | 'university' | 'research' | 'startup' | 'firstJob' | 'today'
  year: string
  emoji: string
  accent: string
  image?: string
}

export const JOURNEY_CHAPTERS: JourneyChapter[] = [
  { id: 'spark', year: 'Gia Lai', emoji: '💡', accent: '#67e8f9' },
  { id: 'university', year: '2018', emoji: '🎓', accent: '#818cf8' },
  { id: 'research', year: '2019', emoji: '🔬', accent: '#22d3ee' },
  { id: 'startup', year: '2020', emoji: '🚀', accent: '#a78bfa' },
  { id: 'firstJob', year: '2021', emoji: '💼', accent: '#38bdf8' },
  { id: 'today', year: String(new Date().getFullYear()), emoji: '🛰️', accent: '#2dd4bf' },
]

export type CertificateCategory = 'startup' | 'research' | 'award' | 'course'

export const CERTIFICATE_CATEGORY_STYLE: Record<CertificateCategory, { emoji: string; accent: string }> = {
  startup: { emoji: '🚀', accent: '#a78bfa' },
  research: { emoji: '🔬', accent: '#22d3ee' },
  award: { emoji: '🏆', accent: '#67e8f9' },
  course: { emoji: '📜', accent: '#818cf8' },
}

export type Certificate = {
  id: 'startupCert' | 'researchCert' | 'awardCert'
  category: CertificateCategory
  year: string
  /** e.g. '/assets/images/certificates/startup-2020.webp' — leave empty to show a placeholder card */
  image?: string
  /** Optional verify / news link */
  link?: string
}

export const CERTIFICATES: Certificate[] = [
  { id: 'startupCert', category: 'startup', year: '2020' },
  { id: 'researchCert', category: 'research', year: '2019' },
  { id: 'awardCert', category: 'award', year: '2021' },
]
