'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function PrivacyPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ✈️ FlyTravel
            </Link>
            <div className="hidden md:flex gap-6">
                <Link href="/destinations" className="text-gray-700 hover:text-blue-600">{t('nav.destinations')}</Link>
                <Link href="/#offers" className="text-gray-700 hover:text-blue-600">{t('nav.offers')}</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600">{t('nav.about')}</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">{t('nav.contact')}</Link>
                <Link href="/faq" className="text-gray-700 hover:text-blue-600">{t('nav.faq')}</Link>
            </div>
            <Link href="/admin/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                {t('nav.admin')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-2">{t('privacy.title')}</h1>
        <p className="text-gray-500 mb-8">{t('privacy.lastUpdated')}: February 2026</p>
        <p className="text-gray-600 mb-8">{t('privacy.intro')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t('privacy.s1Title')}</h2>
          <p className="text-gray-600">{t('privacy.s1Body')}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t('privacy.s2Title')}</h2>
          <p className="text-gray-600">{t('privacy.s2Body')}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t('privacy.s3Title')}</h2>
          <p className="text-gray-600">{t('privacy.s3Body')}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t('privacy.s4Title')}</h2>
          <p className="text-gray-600">{t('privacy.s4Body')}</p>
        </section>

        <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
          ← {t('common.backToWebsite')}
        </Link>
      </div>
    </div>
  );
}
