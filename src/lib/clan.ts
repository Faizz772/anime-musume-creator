export const WHATSAPP_URL =
  "https://chat.whatsapp.com/GDxl0lvttTw6ooFsb11xN0?s=cl&p=a&iam=2";

export type Member = {
  name: string;
  role: "Owner" | "Admin";
  initials: string;
  username: string;
  avatar: string;
  task: string;
};

export const owner: Member = {
  name: "Amuy",
  role: "Owner",
  initials: "AM",
  username: "@amuy.snp",
  avatar: "/team/amuy.webp",
  task: "Mengelola seluruh sistem Anime Musume Creator, mengambil keputusan utama, mengatur jalannya komunitas, serta menangani seluruh operasional apabila admin sedang berhalangan.",
};

export const admins: Member[] = [
  {
    name: "Faiz",
    role: "Admin",
    initials: "FZ",
    username: "@faizprst7",
    avatar: "/team/faiz.webp",
    task: "Bertanggung jawab terhadap seluruh identitas visual Anime Musume Creator, mulai dari branding, desain, UI, poster, banner, logo, serta seluruh kebutuhan visual komunitas.",
  },
  {
    name: "Ichiro",
    role: "Admin",
    initials: "IC",
    username: "@ic1ro",
    avatar: "/team/ichiro.webp",
    task: "Membantu seluruh pekerjaan Lead Designer, menyempurnakan desain, memberikan ide kreatif, serta membantu seluruh kebutuhan visual komunitas.",
  },
  {
    name: "Haikal",
    role: "Admin",
    initials: "HK",
    username: "@ekallwk_",
    avatar: "/team/haikal.webp",
    task: "Mengurus seluruh konten meme, bahan konten JJ, dokumentasi, ide konten, serta kebutuhan media kreatif Anime Musume Creator.",
  },
];

export const coreTeam: Member[] = [owner, ...admins];

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/tentang", label: "Tentang" },
  { href: "/tim", label: "Tim Inti" },
  { href: "/galeri", label: "Galeri" },
  { href: "/seleksi", label: "Seleksi" },
  { href: "/kontak", label: "Kontak" },
];
