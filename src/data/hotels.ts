// src/data/hotels.ts

import { COUNTRIES } from './destinations';

export type HotelType = 'Resort' | 'Hotel' | 'Homestay';

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  countrySlug: string;
  countryName: string;
  citySlug: string;
  cityName: string;
  type: HotelType;
  stars: number;
  address: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  cashbackPercent: number;
}

export const HOTELS: Hotel[] = COUNTRIES.flatMap((country) =>
  country.locations.map((loc, index) => {
    const baseId = `${country.slug}-${loc.slug}`;
    const basePrice = loc.hotelPrice;

    const variants: Hotel[] = [
      {
        id: `${baseId}-v1`,
        name: `Vinpearl Resort ${loc.name}`,
        slug: `${loc.slug}-vinpearl`,
        countrySlug: country.slug,
        countryName: country.name,
        citySlug: loc.slug,
        cityName: loc.name,
        type: 'Resort',
        stars: 5,
        address: `Khu nghỉ dưỡng ven biển tại ${loc.name}`,
        image: loc.image,
        originalPrice: Math.round(basePrice * 1.4),
        discountedPrice: Math.round(basePrice * 1.1),
        cashbackPercent: 8,
      },
      {
        id: `${baseId}-v2`,
        name: `Central ${loc.name} Hotel`,
        slug: `${loc.slug}-central-hotel`,
        countrySlug: country.slug,
        countryName: country.name,
        citySlug: loc.slug,
        cityName: loc.name,
        type: 'Hotel',
        stars: 4,
        address: `Gần trung tâm ${loc.name}`,
        image: loc.image,
        originalPrice: Math.round(basePrice * 1.2),
        discountedPrice: basePrice,
        cashbackPercent: 5,
      },
      {
        id: `${baseId}-v3`,
        name: `Homestay View Đồi ${loc.name}`,
        slug: `${loc.slug}-homestay`,
        countrySlug: country.slug,
        countryName: country.name,
        citySlug: loc.slug,
        cityName: loc.name,
        type: 'Homestay',
        stars: 3,
        address: `Khu homestay yên tĩnh tại ${loc.name}`,
        image: loc.image,
        originalPrice: Math.round(basePrice * 0.9),
        discountedPrice: Math.round(basePrice * 0.75),
        cashbackPercent: 4,
      },
    ];

    return index % 2 === 0 ? variants.slice(0, 2) : variants.slice(1, 3);
  }),
).flat();

