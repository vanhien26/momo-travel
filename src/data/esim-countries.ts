import type { EsimCountry } from '@/types'

export const esimCountries: EsimCountry[] = [
  {
    id: 'thai-lan',
    slug: 'thai-lan',
    name: 'Thái Lan',
    flag: '🇹🇭',
    region: 'Đông Nam Á',
    popular: true,
    plans: [
      { id: 'th-3g', name: 'Gói 3 ngày', data: '3GB', days: 3, price: 135_000, speed: '4G LTE', carrier: 'DTAC/TrueMove', popular: false },
      { id: 'th-7g', name: 'Gói 7 ngày', data: '7GB', days: 7, price: 220_000, speed: '4G LTE', carrier: 'DTAC/TrueMove', popular: true },
      { id: 'th-15u', name: 'Gói 15 ngày Không giới hạn', data: 'Không giới hạn', days: 15, price: 380_000, speed: '4G LTE', carrier: 'TrueMove H', popular: false },
    ],
  },
  {
    id: 'singapore',
    slug: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    region: 'Đông Nam Á',
    popular: true,
    plans: [
      { id: 'sg-3g', name: 'Gói 3 ngày', data: '5GB', days: 3, price: 180_000, speed: '4G LTE', carrier: 'Singtel/StarHub', popular: false },
      { id: 'sg-7g', name: 'Gói 7 ngày', data: '10GB', days: 7, price: 290_000, speed: '4G LTE', carrier: 'Singtel', popular: true },
      { id: 'sg-15u', name: 'Gói 15 ngày Không giới hạn', data: 'Không giới hạn', days: 15, price: 490_000, speed: '4G LTE', carrier: 'Singtel', popular: false },
    ],
  },
  {
    id: 'nhat-ban',
    slug: 'nhat-ban',
    name: 'Nhật Bản',
    flag: '🇯🇵',
    region: 'Đông Bắc Á',
    popular: true,
    plans: [
      { id: 'jp-5g', name: 'Gói 5 ngày', data: '5GB', days: 5, price: 250_000, speed: '4G LTE', carrier: 'IIJ/NTT', popular: false },
      { id: 'jp-10g', name: 'Gói 10 ngày', data: '10GB', days: 10, price: 380_000, speed: '4G LTE', carrier: 'IIJ', popular: true },
      { id: 'jp-30u', name: 'Gói 30 ngày Không giới hạn', data: 'Không giới hạn', days: 30, price: 650_000, speed: '4G LTE', carrier: 'NTT Docomo', popular: false },
    ],
  },
  {
    id: 'han-quoc',
    slug: 'han-quoc',
    name: 'Hàn Quốc',
    flag: '🇰🇷',
    region: 'Đông Bắc Á',
    popular: true,
    plans: [
      { id: 'kr-5g', name: 'Gói 5 ngày', data: '5GB', days: 5, price: 220_000, speed: '5G/4G', carrier: 'SK Telecom', popular: false },
      { id: 'kr-10g', name: 'Gói 10 ngày', data: '10GB', days: 10, price: 360_000, speed: '5G/4G', carrier: 'SK Telecom', popular: true },
      { id: 'kr-30u', name: 'Gói 30 ngày Không giới hạn', data: 'Không giới hạn', days: 30, price: 590_000, speed: '5G/4G', carrier: 'KT/SK Telecom', popular: false },
    ],
  },
  {
    id: 'trung-quoc',
    slug: 'trung-quoc',
    name: 'Trung Quốc',
    flag: '🇨🇳',
    region: 'Đông Bắc Á',
    popular: false,
    plans: [
      { id: 'cn-7g', name: 'Gói 7 ngày', data: '7GB', days: 7, price: 280_000, speed: '4G LTE', carrier: 'China Mobile', popular: true },
      { id: 'cn-15g', name: 'Gói 15 ngày', data: '15GB', days: 15, price: 420_000, speed: '4G LTE', carrier: 'China Unicom', popular: false },
    ],
  },
  {
    id: 'dai-loan',
    slug: 'dai-loan',
    name: 'Đài Loan',
    flag: '🇹🇼',
    region: 'Đông Bắc Á',
    popular: false,
    plans: [
      { id: 'tw-5g', name: 'Gói 5 ngày', data: '5GB', days: 5, price: 190_000, speed: '4G LTE', carrier: 'Chunghwa', popular: false },
      { id: 'tw-10g', name: 'Gói 10 ngày', data: '10GB', days: 10, price: 310_000, speed: '4G LTE', carrier: 'Chunghwa', popular: true },
    ],
  },
  {
    id: 'malaysia',
    slug: 'malaysia',
    name: 'Malaysia',
    flag: '🇲🇾',
    region: 'Đông Nam Á',
    popular: false,
    plans: [
      { id: 'my-7g', name: 'Gói 7 ngày', data: '7GB', days: 7, price: 160_000, speed: '4G LTE', carrier: 'Maxis/Celcom', popular: true },
      { id: 'my-15u', name: 'Gói 15 ngày Không giới hạn', data: 'Không giới hạn', days: 15, price: 320_000, speed: '4G LTE', carrier: 'Maxis', popular: false },
    ],
  },
  {
    id: 'indonesia',
    slug: 'indonesia',
    name: 'Indonesia',
    flag: '🇮🇩',
    region: 'Đông Nam Á',
    popular: false,
    plans: [
      { id: 'id-7g', name: 'Gói 7 ngày', data: '7GB', days: 7, price: 155_000, speed: '4G LTE', carrier: 'Telkomsel', popular: true },
      { id: 'id-15u', name: 'Gói 15 ngày Không giới hạn', data: 'Không giới hạn', days: 15, price: 310_000, speed: '4G LTE', carrier: 'Indosat', popular: false },
    ],
  },
  {
    id: 'australia',
    slug: 'australia',
    name: 'Úc',
    flag: '🇦🇺',
    region: 'Châu Đại Dương',
    popular: false,
    plans: [
      { id: 'au-10g', name: 'Gói 10 ngày', data: '10GB', days: 10, price: 350_000, speed: '4G LTE', carrier: 'Optus', popular: true },
      { id: 'au-30u', name: 'Gói 30 ngày Không giới hạn', data: 'Không giới hạn', days: 30, price: 680_000, speed: '4G LTE', carrier: 'Telstra', popular: false },
    ],
  },
  {
    id: 'my',
    slug: 'phap',
    name: 'Pháp',
    flag: '🇫🇷',
    region: 'Châu Âu',
    popular: false,
    plans: [
      { id: 'fr-10g', name: 'Gói 10 ngày', data: '10GB', days: 10, price: 420_000, speed: '4G LTE', carrier: 'Orange', popular: true },
      { id: 'fr-eu30', name: 'Gói Châu Âu 30 ngày', data: '20GB', days: 30, price: 750_000, speed: '4G LTE', carrier: 'Orange EU', popular: false },
    ],
  },
]

export function getPopularEsimCountries(limit = 6): EsimCountry[] {
  return esimCountries.filter((c) => c.popular).slice(0, limit)
}

export function getEsimByRegion(region: string): EsimCountry[] {
  return esimCountries.filter((c) => c.region === region)
}

export function getCheapestPlan(country: EsimCountry) {
  return country.plans.reduce((min, p) => (p.price < min.price ? p : min), country.plans[0])
}
