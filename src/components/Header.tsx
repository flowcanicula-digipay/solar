'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SunIcon from './SunIcon';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common.nav');
  const cta = useTranslations('common.cta');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t('home') },
    { href: '/pricing', label: t('pricing') },
    { href: '/regulations', label: t('regulations') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-navy-800/10 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo/logo.jpg"
            alt="TNP Co.,Ltd"
            width={36}
            height={36}
            className="h-9 w-auto rounded-md"
          />
          <SunIcon size={20} />
          <span className="font-display text-lg font-semibold text-navy-950">
            SolarTNP
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/80 hover:text-royal-700"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-md bg-royal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-royal-600"
          >
            {cta('freeAssessment')}
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-navy-800/10 bg-cream-50 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-charcoal/80 hover:text-royal-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-md bg-royal-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-royal-600"
            >
              {cta('freeAssessment')}
            </Link>
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
