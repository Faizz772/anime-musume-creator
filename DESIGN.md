# DESIGN.md

Arah desain anime-musume-creator. Sumber kebenaran untuk warna, tipografi, dan rasa.
Dokumen ini ditulis oleh pemilik proyek lewat sesi 2026-11-04, bukan dibuat otomatis.

## Identitas

Situs komunitas penggemar anime. Bukan produk SaaS, bukan dashboard. Nada bicaranya
tenang dan hangat, seperti zine cetak: ruang kosong yang lapang, tinta pekat, satu warna
tegas yang dipakai hemat.

## Prinsip

1. Permukaan, bukan garis. Kartu dipisahkan oleh perbedaan nada dan jarak, bukan border.
2. Satu aksen, satu tempat. Vermilion hanya untuk hal yang benar-benar ingin ditunjuk.
3. Biru malam yang rata, bukan biru bergradien. Latar biru tua pekat dengan satu nada,
   aksen biru laut lebih pekat, teks putih kebiruan. Yang dihindari adalah latar biru
   terang bergradien ke ungu, bukan biru itu sendiri.
4. Datar dengan sengaja. Tidak ada gradient latar penuh halaman, tidak ada glow tersebar.

## Warna

Palet Furina: biru laut malam, putih kebiruan, emas opera.

| Peran | Hex | Nama |
|---|---|---|
| Latar | `#0f1826` | biru malam |
| Permukaan | `#16233a` | biru malam naik |
| Permukaan tinggi | `#1e2f4d` | biru malam terang |
| Teks | `#e8f1f8` | putih kebiruan |
| Teks redup | `#a8bdcf` | biru kelabu |
| Aksen | `#2e6890` | biru laut |
| Aksen terang | `#7fb8d9` | biru langit |
| Emas | `#c9a961` | emas opera |
| Bahaya | `#d95445` | merah bahaya |

Aturan:

- Emas hanya untuk ornamen kecil: penanda label section, nomor index halaman,
  garis aksen. Bukan untuk tombol, bukan untuk teks isi.
- Tombol terisi memakai `accent` dengan teks `ice` (5.26:1).
- Teks aksen memakai `accent-2` (8.28:1 di latar).
- Aksen maksimal 2 kemunculan per layar di luar ornamen emas.
- Tidak ada gradient latar. `.page-bg` warna solid.
- Tidak ada gradient teks.
- Glow maksimal 1 elemen (logo).

## Tipografi

- Heading: Archivo, bobot 900, tracking rapat. Sudah dipakai, dipertahankan.
- Body: Noto Sans. Sudah dipakai, dipertahankan.
- Tanpa font mono dekoratif. Tanpa uppercase tracking lebar.

## Bentuk

- Kartu konten: `rounded-2xl`, radius 16px.
- Kontrol (chip, tombol kecil): `rounded-full`.
- Input: `rounded-lg`, satu-satunya tempat border tipis masih dipakai.
- Tidak ada border pada kartu. Tidak ada `ring` dekoratif.

## Elevasi

- Permukaan utama: tanpa shadow.
- Permukaan yang perlu mengambang (dock, dialog): satu shadow netral, bukan berwarna.
- Glow hanya pada logo.

## Gerak

MOTION 2. Transisi halaman dan hover saja. Tidak ada loop tanpa akhir selain
logo breathe dan blossom-spin (motif identitas, bukan dekorasi).

## Dials

ENERGY 2 / RHYTHM 2 / MOTION 2.

## Larangan keras

- Gradient biru ke ungu, atau latar bergradien biru.
- Gradient latar penuh halaman.
- Gradient pada teks.
- Border tipis pada kartu sebagai pemisah utama.
- Glow pada lebih dari satu elemen.
- Merah Tailwind default (`red-400`, `red-300`) untuk error; pakai token bahaya.
