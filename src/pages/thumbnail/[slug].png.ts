import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sudahTerbit } from '../../site';
import { buatThumbnail } from '../../thumbnail';

export async function getStaticPaths() {
  const semua = await getCollection('artikel', ({ data }) => sudahTerbit(data));
  return semua.map((a) => ({ params: { slug: a.id }, props: { a } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { a } = props as { a: { data: { judulSeo: string; judul: string; kategori: string; kitab: string } } };
  // Judul pendek (judulSeo) lebih terbaca di thumbnail.
  const png = await buatThumbnail({ judul: a.data.judulSeo, kategori: a.data.kategori, kitab: a.data.kitab });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
