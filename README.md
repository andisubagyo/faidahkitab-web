# faidahkitab-web

Situs artikel Faidah Kitab, dibangun dengan [Astro](https://astro.build) dan di-hosting gratis di Cloudflare Pages.

## Menambah artikel

1. Buat file baru di `src/content/artikel/`, misalnya `tiga-landasan-agama.md`. Nama file menjadi alamat artikel: `/tiga-landasan-agama/`.
2. Salin bagian atas (frontmatter) dari artikel contoh, lalu isi judul, deskripsi, kategori (`Tauhid`, `Akhlak`, atau `Manhaj`), tanggal, kitab, pemeriksa, dan FAQ.
3. `draft: true` = artikel tidak ikut terbit. Ubah menjadi `false` setelah disetujui ustadz.
4. Teks Arab ditulis dalam `<p class="arab" lang="ar">...</p>`.
5. Catatan kaki ditulis dengan `[^1]` di dalam teks dan `[^1]: isi catatan` di bagian bawah.

Setiap perubahan yang disimpan (commit) ke cabang `main` akan otomatis diterbitkan ulang oleh Cloudflare Pages.

## Pengaturan Cloudflare Pages

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`

## Setelah situs online

Ganti alamat situs di `astro.config.mjs` (`SITE_URL`) dan di `public/robots.txt` sesuai alamat yang diberikan Cloudflare atau domain sendiri.
