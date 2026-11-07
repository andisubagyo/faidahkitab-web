export const SITE = {
  nama: 'Faidah Kitab',
  tagline: 'Faedah ilmiah dari kitab para ulama, dalam bahasa yang mudah dipahami',
  telegram: 'https://t.me/faidahkitab',
  kategori: ['Tauhid', 'Akhlak', 'Manhaj'] as const,
};

export const slugKategori = (k: string) => k.toLowerCase();

export const formatTanggal = (d: Date) =>
  d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

// Artikel tampil jika bukan draf dan sudah lewat pukul 19.00 WIB pada tanggalnya.
// Contoh: tanggal 2026-11-09 mulai tampil 9 Nov 2026 pukul 19.00 WIB
// (= 12.00 UTC), setelah situs dibangun ulang otomatis lewat GitHub Actions.
const JAM_TERBIT_UTC_MS = 12 * 60 * 60 * 1000; // 19.00 WIB
export const sudahTerbit = (data: { draft: boolean; tanggal: Date }) =>
  !data.draft && data.tanggal.getTime() + JAM_TERBIT_UTC_MS <= Date.now();
