export const SITE = {
  nama: 'Faidah Kitab',
  tagline: 'Faedah ilmiah dari kitab para ulama, dalam bahasa yang mudah dipahami',
  telegram: 'https://t.me/faidahkitab',
  kategori: ['Tauhid', 'Akhlak', 'Manhaj'] as const,
};

export const slugKategori = (k: string) => k.toLowerCase();

export const formatTanggal = (d: Date) =>
  d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
