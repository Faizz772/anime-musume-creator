# Clan Anime Musume Creator

Website resmi Clan Anime Musume Creator. Berisi halaman Home, Tentang, Tim Inti, Galeri, Seleksi, Kontak, dan panel admin untuk menambah karya galeri.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion
- Supabase (Postgres + Storage)
- Deploy di Vercel

## Environment variables

Buat `.env.local` untuk lokal dan isi di Vercel untuk produksi:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service-role-key
ADMIN_PASSWORD=password-pilihanmu
ADMIN_SESSION_SECRET=string-acak-panjang
```

`SUPABASE_SERVICE_ROLE_KEY` hanya dipakai di server, jangan pernah diekspos ke browser.

## Setup Supabase

1. Buat project di https://supabase.com.
2. Buka SQL Editor, tempel dan jalankan isi `supabase/schema.sql`.
   Script ini membuat tabel `gallery`, policy baca publik, dan bucket storage `gallery`.
3. Ambil `Project URL` dan `service_role` key di Project Settings > API.
4. Isi env di atas.

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Panel admin di http://localhost:3000/admin.

Di Termux/Android (arm64) Turbopack belum tersedia, script sudah memakai webpack.

## Menambah karya

1. Buka `/admin`, masukkan password admin.
2. Isi judul, tag (pisahkan dengan koma), dan pilih gambar.
3. Klik "Tambah ke galeri". Karya langsung tampil di `/galeri` dan beranda.
4. Karya bisa dihapus dari daftar di panel admin.

## Deploy ke Vercel

1. Buka https://vercel.com/new
2. Import repo `Faizz772/anime-musume-creator`
3. Framework preset: Next.js (otomatis)
4. Tambahkan semua environment variables di atas
5. Deploy

Setiap `git push` ke `main` akan auto-deploy.

## Struktur

- `src/app` halaman App Router
- `src/app/admin` panel admin
- `src/app/api` API login, galeri, upload
- `src/components` komponen bersama
- `src/lib/clan.ts` data tim inti dan tautan WhatsApp
- `src/lib/gallery.ts` akses data galeri
- `supabase/schema.sql` skema database dan storage
