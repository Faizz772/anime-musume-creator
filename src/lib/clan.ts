export const WHATSAPP_URL =
  "https://chat.whatsapp.com/GDxl0lvttTw6ooFsb11xN0?s=cl&p=a&iam=2";

export type Member = {
  name: string;
  role: "Owner" | "Admin";
  initials: string;
};

export const owner: Member = {
  name: "Amuy",
  role: "Owner",
  initials: "AM",
};

export const admins: Member[] = [
  { name: "Faiz", role: "Admin", initials: "FZ" },
  { name: "Ichiro", role: "Admin", initials: "IC" },
  { name: "Haikal", role: "Admin", initials: "HK" },
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
