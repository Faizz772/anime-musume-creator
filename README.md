# Clan Anime Musume Creator

Website resmi Clan Anime Musume Creator. Berisi halaman Home, Tentang, Tim Inti, Galeri, Seleksi, dan Kontak.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion
- Deploy di Vercel

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Build

Di Linux/macOS, Turbopack aktif secara default:

```bash
npm run build
```

Di Termux/Android (arm64) Turbopack belum tersedia, pakai webpack:

```bash
npx next build --webpack
```

## Deploy ke Vercel

1. Buka https://vercel.com/new
2. Import repo `Faizz772/anime-musume-creator`
3. Framework preset: Next.js (otomatis)
4. Deploy

## Struktur

- `src/app` halaman App Router
- `src/components` komponen bersama
- `src/lib/clan.ts` data tim inti dan tautan WhatsApp
