'use client';

import Image from 'next/image';
import { withBasePath } from '@/lib/assetPath';

const handles = [
  {
    label: 'Phone & Zalo',
    value: '+84 90 333 37 29',
    sub: 'Call or message on Zalo',
    photo: '/assets/images/process/step1-consult.jpg',
    motif: '/assets/motifs/consultation.svg',
  },
  {
    label: 'WhatsApp',
    value: '+84 90 333 37 29',
    sub: 'Available 8AM–5:30PM GMT+7',
    photo: '/assets/images/process/step3-install.jpg',
    motif: '/assets/motifs/hand-bell.svg',
  },
  {
    label: 'Email',
    value: 'thuy@tnpgr.vn',
    sub: 'Reply within one business day',
    photo: '/assets/images/quality/japanese-precision.jpg',
    motif: '/assets/motifs/envelope-seal.svg',
  },
  {
    label: 'Office',
    value: 'Phú Nhuận, HCM',
    sub: '529/14 Huỳnh Văn Bánh',
    photo: '/assets/images/process/step4-support.jpg',
    motif: '/assets/motifs/viet-home.svg',
  },
];

export default function ContactHandlesStrip() {
  return (
    <div className="flex overflow-x-auto">
      {handles.map((handle, i) => (
        <div
          key={handle.label}
          className="group relative min-w-[200px] flex-1"
        >
          {/* Portrait photo */}
          <div className="relative h-[360px] w-full overflow-hidden md:h-[420px]">
            <Image
              src={withBasePath(handle.photo)}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover brightness-[0.45] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.65]"
            />
            {/* Dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent" />
            {/* Vertical separator */}
            {i < handles.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-px bg-cream-50/10" />
            )}
            {/* Motif — centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110">
                <Image
                  src={withBasePath(handle.motif)}
                  alt=""
                  aria-hidden="true"
                  width={64}
                  height={64}
                  className="opacity-75 drop-shadow-lg"
                />
              </div>
            </div>
            {/* Value — inside photo at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
              <p className="font-mono text-sm font-bold text-cream-50 transition-colors duration-300 group-hover:text-amber-400">
                {handle.value}
              </p>
              <p className="mt-0.5 text-[11px] text-cream-50/50">{handle.sub}</p>
            </div>
          </div>

          {/* Label below photo */}
          <div className="border-t border-cream-50/10 bg-navy-950 px-4 py-4">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-cream-50/60 transition-colors duration-300 group-hover:text-amber-400">
              {handle.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
