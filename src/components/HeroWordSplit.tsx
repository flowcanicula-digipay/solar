'use client';

/**
 * Splits a string into individual words and animates each with the
 * SkogMoc-inspired word-explosion entrance: scale(5) + blur(24px) +
 * random rotation → normal, staggered by 0.09s per word.
 *
 * Rotation values are pre-computed (not Math.random) to avoid
 * server/client hydration mismatches.
 */

const ROTATIONS = [-22, 14, -8, 28, -18, 7, 25, -12, 20, -5, 16, -24, 11, -19, 8, 23, -14];

interface Props {
  text: string;
  /** Tailwind classes applied to the block wrapper (font-size, color, etc.) */
  className?: string;
  /** Seconds before the first word starts animating */
  baseDelay?: number;
}

export default function HeroWordSplit({ text, className = '', baseDelay = 0.7 }: Props) {
  const words = text.split(' ').filter(Boolean);

  return (
    <span className={`block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <span
            className="inline-block animate-word-explode-in"
            style={
              {
                animationDelay: `${baseDelay + i * 0.09}s`,
                '--wrot': `${ROTATIONS[i % ROTATIONS.length]}deg`,
              } as React.CSSProperties
            }
          >
            {word}
          </span>
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </span>
  );
}
