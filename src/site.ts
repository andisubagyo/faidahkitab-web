export const SITE = {
  nama: 'Faidah Kitab',
  tagline: 'Faedah ilmiah dari kitab para ulama, dalam bahasa yang mudah dipahami',
  telegram: 'https://t.me/faidahkitab',
  kategori: ['Tauhid', 'Akhlak', 'Manhaj'] as const,
};

export const slugKategori = (k: string) => k.toLowerCase();

export const formatTanggal = (d: Date) =>
  d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

// Artikel tampil jika bukan draf dan tanggalnya sudah tiba (zona waktu WIB, UTC+7).
// Contoh: tanggal 2026-11-09 mulai tampil 9 Nov 2026 pukul 00.00 WIB,
// setelah situs dibangun ulang (otomatis setiap hari lewat GitHub Actions).
const WIB_MS = 7 * 60 * 60 * 1000;
export const sudahTerbit = (data: { draft: boolean; tanggal: Date }) =>
  !data.draft && data.tanggal.getTime() <= Date.now() + WIB_MS;
