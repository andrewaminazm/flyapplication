'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export type NavActive = 'destinations' | 'offers' | 'about' | 'contact' | 'faq' | null;

interface SiteNavProps {
  active?: NavActive;
}

const navLinks: { href: string; key: NavActive; hash?: boolean }[] = [
  { href: '/destinations', key: 'destinations' },
  { href: '/#offers', key: 'offers', hash: true },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
  { href: '/faq', key: 'faq' },
];

export default function SiteNav({ active = null }: SiteNavProps) {
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const linkClass = (key: NavActive) =>
    `block py-3 px-4 rounded-lg transition md:py-0 md:px-0 ${
      active === key
        ? 'text-blue-600 font-semibold bg-blue-50 md:bg-transparent'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent'
    }`;

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pr-14 md:pr-6">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-blue-600 shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              ✈️ FlyTravel
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex gap-6 items-center">
              {navLinks.map(({ href, key, hash }) =>
                hash ? (
                  <a key={key} href={href} className={linkClass(key)}>
                    {t(`nav.${key}`)}
                  </a>
                ) : (
                  <Link key={key} href={href} className={linkClass(key)}>
                    {t(`nav.${key}`)}
                  </Link>
                )
              )}
              <Link
                href="/admin/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                {t('nav.admin')}
              </Link>
            </div>

            {/* Mobile: hamburger (admin moves to menu) */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 aria-expanded={mobileOpen}"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white md:hidden transition-opacity duration-200 pt-14 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col h-full overflow-auto px-4 pb-8">
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">{t('nav.menu')}</span>
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col gap-1 pt-4">
            {navLinks.map(({ href, key, hash }) =>
              hash ? (
                <a
                  key={key}
                  href={href}
                  className={linkClass(key)}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(`nav.${key}`)}
                </a>
              ) : (
                <Link
                  key={key}
                  href={href}
                  className={linkClass(key)}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(`nav.${key}`)}
                </Link>
              )
            )}
            <Link
              href="/admin/login"
              className="block py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold text-center mt-4 hover:bg-blue-700"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop for body scroll lock when menu open */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
