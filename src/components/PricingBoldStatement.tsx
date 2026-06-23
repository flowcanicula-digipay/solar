'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/lib/assetPath';

type Variant = 'light' | 'dark';

interface Props {
  variant?: Variant;
  label?: string;
  /** Parts array: each entry is { text, highlight? } */
  parts: { text: string; highlight?: boolean }[];
  caption?: string;
  /** Dark variant: right-column body paragraphs */
  bodyParagraphs?: string[];
  motif?: string;
}

export default function PricingBoldStatement({
  variant = 'light',
  label,
  parts,
  caption,
  bodyParagraphs,
  motif,
}: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (variant === 'dark') {
    return (
      <section className="relative overflow-hidden bg-navy-950 py-24">
        {/* Faint motif watermark */}
        {motif && (
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 select-none opacity-[0.04]">
            <Image
              src={withBasePath(motif)}
              alt=""
              aria-hidden="true"
              fill
              className="object-contain object-right"
            />
          </div>
        )}

        <div
          ref={ref}
          className="relative mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center"
        >
          {/* Left: large heading */}
          <div>
            {label && (
              <p
                className={`mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400 transition-all duration-700 ease-out motion-reduce:transition-none ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                {label}
              </p>
            )}
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-cream-50 sm:text-5xl lg:text-6xl">
              {parts.map((part, i) => (
                <span
                  key={i}
                  className={`inline transition-all duration-700 ease-out motion-reduce:transition-none ${
                    part.highlight ? 'text-amber-400' : ''
                  } ${
                    visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
                >
                  {part.text}
                </span>
              ))}
            </h2>
          </div>

          {/* Right: body */}
          {bodyParagraphs && bodyParagraphs.length > 0 && (
            <div className="space-y-5">
              {bodyParagraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-base leading-relaxed text-cream-50/70 transition-all duration-700 ease-out motion-reduce:transition-none ${
                    visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: visible ? `${(parts.length + i) * 80 + 100}ms` : '0ms' }}
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Bottom rule */}
        <div
          className={`mx-auto mt-16 max-w-7xl px-6 transition-all duration-1000 ease-out motion-reduce:transition-none ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: visible ? '600ms' : '0ms' }}
        >
          <div className="h-px w-full bg-cream-50/10" />
        </div>
      </section>
    );
  }

  /* Light variant */
  return (
    <section className="relative overflow-hidden bg-cream-50 py-24">
      {/* Watermark motif behind text */}
      {motif && (
        <div className="pointer-events-none absolute right-6 top-1/2 h-80 w-80 -translate-y-1/2 select-none opacity-[0.07]">
          <Image
            src={withBasePath(motif)}
            alt=""
            aria-hidden="true"
            fill
            className="object-contain"
          />
        </div>
      )}

      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        {/* Small hollow circle accent (SkogMoc-style) */}
        <div
          className={`mb-8 h-12 w-12 rounded-full border border-amber-400/40 transition-all duration-700 ease-out motion-reduce:transition-none ${
            visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        />

        {label && (
          <p
            className={`mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400 transition-all duration-700 ease-out motion-reduce:transition-none ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            — {label}
          </p>
        )}

        {/* Large statement — word-by-word reveal */}
        <h2 className="font-display text-4xl font-bold leading-[1.1] text-charcoal sm:text-5xl lg:text-[3.75rem]">
          {parts.map((part, i) => (
            <span
              key={i}
              className={`inline transition-all duration-700 ease-out motion-reduce:transition-none ${
                part.highlight ? 'text-amber-400' : ''
              } ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }}
            >
              {part.text}
            </span>
          ))}
        </h2>

        {caption && (
          <p
            className={`mt-8 max-w-xl font-sans text-sm italic text-charcoal/50 transition-all duration-700 ease-out motion-reduce:transition-none ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visible ? `${parts.length * 60 + 120}ms` : '0ms' }}
          >
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
