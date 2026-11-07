// Membuat thumbnail artikel (PNG 1200x630) saat build, dengan satori + resvg.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const fontDir = join(process.cwd(), 'node_modules/@fontsource/plus-jakarta-sans/files');
const font700 = readFileSync(join(fontDir, 'plus-jakarta-sans-latin-700-normal.woff'));
const font800 = readFileSync(join(fontDir, 'plus-jakarta-sans-latin-800-normal.woff'));

// Motif bintang delapan, sama dengan header situs.
const pola =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <defs><pattern id="p" width="96" height="96" patternUnits="userSpaceOnUse">
        <g fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1.4">
          <rect x="27" y="27" width="42" height="42"/>
          <rect x="27" y="27" width="42" height="42" transform="rotate(45 48 48)"/>
          <circle cx="48" cy="48" r="9"/>
        </g></pattern></defs>
      <rect width="1200" height="630" fill="url(#p)"/>
    </svg>`,
  ).toString('base64');

const bintang =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 2l4.1 5.9L27 9l-2.4 6.6L27 22.4l-6.9 1.1L16 30l-4.1-6.5L5 22.4l2.4-6.8L5 9l6.9-1.1z" fill="none" stroke="#E2C77A" stroke-width="1.8" stroke-linejoin="round"/><circle cx="16" cy="16" r="4.2" fill="#E2C77A"/></svg>`,
  ).toString('base64');

type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (El | string)[]): El => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

export async function buatThumbnail(o: { judul: string; kategori: string; kitab: string }) {
  const ukuranJudul = o.judul.length > 70 ? 54 : o.judul.length > 45 ? 62 : 70;
  const tree = h(
    'div',
    {
      width: 1200, height: 630, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '64px 72px', color: '#fff', fontFamily: 'Jakarta',
      backgroundImage: 'linear-gradient(135deg, #0E2A3B 0%, #0F4C4A 55%, #0F6B5C 100%)',
      position: 'relative',
    },
    { type: 'img', props: { src: pola, width: 1200, height: 630, style: { position: 'absolute', top: 0, left: 0 } } },
    h(
      'div',
      { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 1056 },
      h(
        'div',
        { display: 'flex', alignItems: 'center', fontSize: 30, fontWeight: 800 },
        { type: 'img', props: { src: bintang, width: 46, height: 46, style: { marginRight: 16 } } },
        'Faidah Kitab',
      ),
      h(
        'div',
        { display: 'flex', background: '#E2C77A', color: '#0E2A3B', fontSize: 26, fontWeight: 700, padding: '8px 24px', borderRadius: 999 },
        o.kategori,
      ),
    ),
    h(
      'div',
      { display: 'flex', fontSize: ukuranJudul, fontWeight: 800, lineHeight: 1.12, letterSpacing: -1.5, width: 1000 },
      o.judul,
    ),
    h(
      'div',
      { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.78)', width: 1056 },
      h('div', { display: 'flex', width: 700 }, o.kitab),
      h('div', { display: 'flex', color: '#E2C77A' }, 'faidahkitab.pages.dev'),
    ),
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Jakarta', data: font700, weight: 700, style: 'normal' },
      { name: 'Jakarta', data: font800, weight: 800, style: 'normal' },
    ],
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
