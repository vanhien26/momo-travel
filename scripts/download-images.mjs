#!/usr/bin/env node

/**
 * scripts/download-images.mjs
 *
 * Tác vụ:
 * - Đọc danh sách địa danh từ src/data/destinations.ts (COUNTRIES.locations)
 * - Với mỗi location, gọi Unsplash API để lấy 1 ảnh landscape đẹp (ưu tiên 1200x800)
 * - Lưu về public/images/destinations/[locationSlug].jpg
 * - Nếu file đã tồn tại thì bỏ qua (tránh tốn quota)
 *
 * Yêu cầu:
 * - Node 18+ (có sẵn fetch) hoặc cài thêm node-fetch nếu muốn.
 * - Đặt API key Unsplash trong biến môi trường:
 *   UNSPLASH_ACCESS_KEY=<access_key>
 *
 * Chạy:
 *   node scripts/download-images.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DESTINATIONS_PATH = path.join(ROOT_DIR, 'src', 'data', 'destinations.ts');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'images', 'destinations');

const UNSPLASH_ACCESS_KEY =
  process.env.UNSPLASH_ACCESS_KEY || 'v0VhJVJ1Y3MwA_bM_cAPBL1kG1s5l1qtOH7gatoAnFI';

if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
  console.error(
    '❌ Thiếu UNSPLASH_ACCESS_KEY. Hãy đặt biến môi trường UNSPLASH_ACCESS_KEY trước khi chạy.',
  );
  process.exit(1);
}

/**
 * Đọc src/data/destinations.ts và trích ra danh sách { name, slug } từ COUNTRIES.locations
 */
async function readLocationsFromDestinations() {
  const content = await fs.readFile(DESTINATIONS_PATH, 'utf8');

  const locations = [];

  // Tìm từng block locations: [ { ... }, { ... } ]
  const locationsArrayRegex = /locations\s*:\s*\[(.*?)\]/gs;
  let match;

  while ((match = locationsArrayRegex.exec(content)) !== null) {
    const block = match[1];

    // Bên trong block, tìm các object có name + slug
    const locationRegex =
      /{[^}]*name:\s*'([^']+)'[^}]*slug:\s*'([^']+)'[^}]*}|{[^}]*slug:\s*'([^']+)'[^}]*name:\s*'([^']+)'[^}]*}/g;

    let locMatch;
    while ((locMatch = locationRegex.exec(block)) !== null) {
      // Regex trên có 2 nhánh nên ta normalize lại
      const name = locMatch[1] || locMatch[4];
      const slug = locMatch[2] || locMatch[3];
      if (!name || !slug) continue;

      // Tránh trùng lặp slug
      if (!locations.find((l) => l.slug === slug)) {
        locations.push({ name, slug });
      }
    }
  }

  return locations;
}

async function ensureOutputDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function searchUnsplashImage(query) {
  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('per_page', '1');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      'Accept-Version': 'v1',
    },
  });

  if (!res.ok) {
    console.error(`❌ Unsplash search error ${res.status} for query "${query}"`);
    return null;
  }

  const data = await res.json();
  const photo = data.results?.[0];
  if (!photo) {
    console.warn(`⚠️ Không tìm thấy ảnh phù hợp cho "${query}"`);
    return null;
  }

  // Dùng urls.raw và ép kích thước 1200x800
  const rawUrl = photo.urls?.raw || photo.urls?.full || photo.urls?.regular;
  if (!rawUrl) return null;

  const downloadUrl = `${rawUrl}&w=1200&h=800&fit=crop`;
  return downloadUrl;
}

async function downloadImage(imageUrl, outputPath) {
  const res = await fetch(imageUrl);
  if (!res.ok) {
    console.error(`❌ Lỗi tải ảnh từ Unsplash: ${res.status}`);
    return false;
  }
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(outputPath, buffer);
  return true;
}

async function main() {
  console.log('🔎 Đọc danh sách địa danh từ src/data/destinations.ts...');
  const locations = await readLocationsFromDestinations();
  console.log(`✅ Tìm thấy ${locations.length} địa danh.`);

  await ensureOutputDir();

  for (const loc of locations) {
    const outputPath = path.join(OUTPUT_DIR, `${loc.slug}.jpg`);
    if (await fileExists(outputPath)) {
      console.log(`⏩ Bỏ qua ${loc.slug} (đã có file).`);
      continue;
    }

    const query = `${loc.name} city landscape hotel`;
    console.log(`📷 Tìm ảnh cho "${loc.name}" (${loc.slug})...`);
    const imageUrl = await searchUnsplashImage(query);
    if (!imageUrl) {
      console.warn(`⚠️ Bỏ qua ${loc.slug} vì không lấy được URL ảnh.`);
      continue;
    }

    console.log(`⬇️  Đang tải ảnh cho ${loc.slug}...`);
    try {
      const ok = await downloadImage(imageUrl, outputPath);
      if (ok) {
        console.log(`✅ Lưu thành công: ${path.relative(ROOT_DIR, outputPath)}`);
      }
    } catch (err) {
      console.error(`❌ Lỗi khi lưu ảnh cho ${loc.slug}:`, err);
    }
  }

  console.log('🎉 Hoàn tất tải ảnh từ Unsplash.');
}

main().catch((err) => {
  console.error('❌ Lỗi không mong muốn:', err);
  process.exit(1);
});

