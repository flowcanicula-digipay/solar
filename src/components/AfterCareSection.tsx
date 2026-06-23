'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { withBasePath } from '@/lib/assetPath';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AfterCareSection() {
  const t = useTranslations('home.warranty');
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const panels = container.querySelectorAll<HTMLElement>('[data-panel]');

    /* Start tiles covering the image, then shatter them away */
    gsap.set(panels, { scale: 1, transformOrigin: 'center' });
    gsap.set(titleRef.current, { y: 44, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 72%',
      },
    });

    tl.to(panels, {
      scale: 0,
      duration: 0.88,
      ease: 'power3.inOut',
      stagger: { each: 0.04, from: 'random' },
    }).to(
      titleRef.current,
      { y: 0, opacity: 1, duration: 0.95, ease: 'power2.out' },
      '-=0.38',
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* ── IMAGE BANNER with tile shatter ─────────────────────── */}
      <section
        ref={containerRef}
        className="relative h-[68vh] min-h-[440px] overflow-hidden"
        aria-labelledby="aftercare-heading"
      >
        <Image
          src={withBasePath('/assets/images/cta/aftercare-bg.jpg')}
          alt=""
          fill
          className="object-cover"
        />

        {/* Left-side gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(12,31,63,0.92) 0%, rgba(12,31,63,0.55) 45%, rgba(12,31,63,0) 70%)',
          }}
        />

        {/* Bottom gradient to blend into card section below */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />

        {/* Headline (slides up after tiles shatter) */}
        <div className="absolute inset-0 flex items-center">
          <div ref={titleRef} className="px-8 sm:px-[6vw]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-amber-400/80">
              {t('afterCare.label')}
            </p>
            <h2
              id="aftercare-heading"
              className="max-w-lg font-display text-4xl font-bold leading-[1.08] text-cream-50 sm:text-5xl lg:text-[3.6rem]"
            >
              {t('afterCare.title')}
            </h2>
          </div>
        </div>

        {/* Tile grid — starts at scale(1), GSAP shatters them to scale(0) */}
        <div
          className="absolute inset-0 z-20 grid grid-cols-6 grid-rows-3"
          aria-hidden="true"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} data-panel className="scale-0 bg-navy-950" />
          ))}
        </div>
      </section>

      {/* ── SUPPORT CARDS ──────────────────────────────────────── */}
      <section className="relative bg-navy-950 pb-16 pt-10 text-cream-50 md:pb-24 md:pt-14">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:max-w-2xl">
            {/* Year 1 */}
            <div className="flex flex-col gap-4 rounded-2xl border border-cream-50/8 bg-navy-800/50 p-7 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5E6C8]">
                <Image
                  src={withBasePath('/assets/motifs/consultation.svg')}
                  alt=""
                  width={28}
                  height={28}
                  aria-hidden="true"
                />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-400/75">
                {t('afterCare.year1Label')}
              </p>
              <p className="text-sm leading-relaxed text-cream-50/65">{t('support12mo')}</p>
            </div>

            {/* Year 2+ */}
            <div className="flex flex-col gap-4 rounded-2xl border border-cream-50/8 bg-navy-800/50 p-7 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5E6C8]">
                <Image
                  src={withBasePath('/assets/motifs/handover.svg')}
                  alt=""
                  width={28}
                  height={28}
                  aria-hidden="true"
                />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-400/75">
                {t('afterCare.year2Label')}
              </p>
              <p className="text-sm leading-relaxed text-cream-50/65">{t('note')}</p>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-sm italic text-cream-50/28">{t('closingLine')}</p>
        </div>
      </section>
    </>
  );
}
