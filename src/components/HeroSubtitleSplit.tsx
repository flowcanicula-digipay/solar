'use client';

/**
 * Splits subtitle text into individual words and animates each with an
 * upward slide (translateY 110% → 0), masked by per-word overflow:hidden
 * wrappers — the SkogMoc subtitle reveal pattern.
 * Stagger: 0.02s per word, starting after the H1 explosion settles (~1.4s).
 */

const SUBTITLE_BASE_DELAY = 1.35;
const STAGGER = 0.02;

interface Props {
  text: string;
  className?: string;
}

export default function HeroSubtitleSplit({ text, className = '' }: Props) {
  const words = text.split(' ').filter(Boolean);

  return (
    <p className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            className="inline-block animate-word-slide-up"
            style={{ animationDelay: `${SUBTITLE_BASE_DELAY + i * STAGGER}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </p>
  );
}
