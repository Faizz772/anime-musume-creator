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
3. Hangat, bukan biru. Tidak ada biru sebagai warna aksen.
4. Datar dengan sengaja. Tidak ada gradient latar penuh halaman, tidak ada glow tersebar.

## Warna

| Peran | Hex | Nama |
|---|---|---|
| Latar | `#14100f` | arang hangat |
| Permukaan | `#1d1817` | arang naik |
| Permukaan tinggi | `#272120` | arang terang |
| Teks | `#f2ece4` | gading |
| Teks redup | `#a89e94` | gading pudar |
| Aksen | `#bd3d28` | vermilion |
| Aksen terang | `#e0644a` | vermilion muda |
| Bahaya | `#d95445` | vermilion bahaya |

Aturan:

- Aksen maksimal 2 kemunculan per layar.
- Teks aksen di atas latar gelap memakai `accent-2` (#e0644a), karena `accent`
  hanya lolos 3.5:1 terhadap latar dan tidak memenuhi 4.5:1 untuk teks normal.
- Tidak ada gradient latar. `.page-bg` diganti warna solid.
- Tidak ada gradient teks.
- Glow maksimal 1 elemen (logo).
- `backdrop-blur` hanya di header.

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

- Gradient biru ke ungu, atau biru sebagai aksen.
- Gradient latar penuh halaman.
- Gradient pada teks.
- Border tipis pada kartu sebagai pemisah utama.
- Glow pada lebih dari satu elemen.
- Merah Tailwind default (`red-400`, `red-300`) untuk error; pakai token bahaya.
