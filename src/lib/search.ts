import type { Destination } from '@/types'

const DIACRITICS_MAP: Record<string, string> = {
  'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  'đ': 'd',
  'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
}

export function removeDiacritics(str: string): string {
  return str
    .toLowerCase()
    .split('')
    .map((char) => DIACRITICS_MAP[char] || char)
    .join('')
}

export function searchDestinations(query: string, destinations: Destination[]): Destination[] {
  const normalized = removeDiacritics(query.trim())
  if (!normalized) return []

  type ScoredDest = { dest: Destination; score: number }
  const results: ScoredDest[] = []

  for (const dest of destinations) {
    const nameNorm = removeDiacritics(dest.name)
    const shortDescNorm = removeDiacritics(dest.shortDesc)
    const tagsNorm = dest.tags.map(removeDiacritics)

    let score = 0

    // Tên trùng chính xác
    if (nameNorm === normalized) {
      score = 100
    }
    // Tên bắt đầu bằng query
    else if (nameNorm.startsWith(normalized)) {
      score = 80
    }
    // Tên chứa query
    else if (nameNorm.includes(normalized)) {
      score = 60
    }
    // Tag match
    else if (tagsNorm.some((t) => t.includes(normalized))) {
      score = 40
    }
    // Mô tả chứa query
    else if (shortDescNorm.includes(normalized)) {
      score = 20
    }

    if (score > 0) {
      results.push({ dest, score })
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.dest)
}
