import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const artikel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artikel' }),
  schema: z.object({
    judul: z.string(), // H1 di halaman
    judulSeo: z.string().max(60), // <title>
    deskripsi: z.string().max(160), // meta description
    kategori: z.enum(['Tauhid', 'Akhlak', 'Manhaj']),
    tag: z.array(z.string()).default([]),
    tanggal: z.coerce.date(),
    diperbarui: z.coerce.date().optional(),
    penulis: z.string().default('Tim Faidah Kitab'),
    pemeriksa: z.string().optional(),
    kitab: z.string(), // sumber utama
    faq: z
      .array(z.object({ tanya: z.string(), jawab: z.string() }))
      .default([]),
    draft: z.boolean().default(false), // true = tidak ikut terbit
  }),
});

export const collections = { artikel };
