'use client';

import Image from 'next/image';
import { withBasePath } from '@/lib/assetPath';

export default function MarqueeTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y border-royal-600/20 bg-navy-950 py-3"
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-400/75"
          >
            {item}
            <Image
              src={withBasePath('/assets/motifs/lotus-seal.svg')}
              alt=""
              width={14}
              height={14}
              className="opacity-35 flex-shrink-0"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
