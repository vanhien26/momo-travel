// Utility functions dành riêng cho trang điểm đến

import type { Destination, Country } from '@/types'

export function groupByCountry(
  destinations: Destination[]
): Record<string, Destination[]> {
  return destinations.reduce<Record<string, Destination[]>>((acc, dest) => {
    if (!acc[dest.country]) acc[dest.country] = []
    acc[dest.country].push(dest)
    return acc
  }, {})
}

export function groupByRegion(
  destinations: Destination[]
): { domestic: Destination[]; international: Destination[] } {
  return {
    domestic: destinations.filter((d) => d.region === 'domestic'),
    international: destinations.filter((d) => d.region === 'international'),
  }
}

export function filterByTag(destinations: Destination[], tag: string): Destination[] {
  return destinations.filter((d) => d.tags.includes(tag))
}

export function sortByPrice(destinations: Destination[], asc = true): Destination[] {
  return [...destinations].sort((a, b) =>
    asc ? a.flightFrom - b.flightFrom : b.flightFrom - a.flightFrom
  )
}

export function getPopular(destinations: Destination[], limit = 8): Destination[] {
  return destinations.filter((d) => d.popular).slice(0, limit)
}

export function getCountryBySlug(countries: Country[], slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug)
}

export function getDestinationsByCountry(
  destinations: Destination[],
  countrySlug: string
): Destination[] {
  return destinations.filter((d) => d.country === countrySlug)
}

// Format giá vé theo kiểu Việt Nam
export function formatPrice(price: number): string {
  if (price >= 1_000_000)
    return `${(price / 1_000_000).toFixed(1).replace('.0', '')}tr`
  return `${Math.round(price / 1_000)}k`
}
