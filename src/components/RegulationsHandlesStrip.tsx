import Image from 'next/image';
import { withBasePath } from '@/lib/assetPath';

const handleItems = [
  {
    label: 'System sized to your load',
    motif: '/assets/motifs/blueprint-seal.svg',
    photo: '/assets/images/process/step2-design.jpg',
  },
  {
    label: 'DOIT notification prepared',
    motif: '/assets/motifs/documentation.svg',
    photo: '/assets/images/process/step4-support.jpg',
  },
  {
    label: 'EVN grid connection approval',
    motif: '/assets/motifs/handover.svg',
    photo: '/assets/images/process/step3-install.jpg',
  },
  {
    label: '20% surplus cap documented',
    motif: '/assets/motifs/inspect-mark.svg',
    photo: '/assets/images/process/step1-consult.jpg',
  },
  {
    label: 'No install on non-compliant buildings',
    motif: '/assets/motifs/lotus-seal.svg',
    photo: '/assets/images/quality/japanese-precision.jpg',
  },
];

export default function RegulationsHandlesStrip() {
  return (
    <div className="mt-14 flex overflow-x-auto">
      {handleItems.map((item, i) => (
        <div
          key={item.label}
          className="group relative min-w-[200px] flex-1"
        >
          {/* Portrait photo */}
          <div className="relative h-[380px] w-full overflow-hidden md:h-[460px]">
            <Image
              src={withBasePath(item.photo)}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover brightness-[0.50] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.65]"
            />
            {/* Dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
            {/* Vertical separator */}
            {i < handleItems.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-px bg-cream-50/10" />
            )}
            {/* Motif — centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110">
                <Image
                  src={withBasePath(item.motif)}
                  alt=""
                  aria-hidden="true"
                  width={68}
                  height={68}
                  className="opacity-75 drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Label below photo */}
          <div className="border-t border-cream-50/10 bg-navy-950 px-4 py-4">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-cream-50/70 transition-colors duration-300 group-hover:text-amber-400">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
