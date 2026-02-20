'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import SiteNav from '@/components/SiteNav';

export default function TermsPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <h1 className="text-4xl font-bold mb-2">{t('terms.title')}</h1>
        <p className="text-gray-500 mb-8">{t('terms.lastUpdated')}: February 2026</p>
        <p className="text-gray-600 mb-8">{t('terms.intro')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t('terms.s1Title')}</h2>
          <p className="text-gray-600">{t('terms.s1Body')}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t('terms.s2Title')}</h2>
          <p className="text-gray-600">{t('terms.s2Body')}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t('terms.s3Title')}</h2>
          <p className="text-gray-600">{t('terms.s3Body')}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t('terms.s4Title')}</h2>
          <p className="text-gray-600">{t('terms.s4Body')}</p>
        </section>

        <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
          ← {t('common.backToWebsite')}
        </Link>
      </div>
    </div>
  );
}
