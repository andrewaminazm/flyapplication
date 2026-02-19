'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import FaqAccordion from './FaqAccordion';

interface FaqItem {
  id: string;
  question: string;
  questionAr?: string;
  answer: string;
  answerAr?: string;
  order: number;
}

function getLocalizedItems(items: FaqItem[], locale: string): FaqItem[] {
  return items.map((item) => ({
    ...item,
    question: locale === 'ar' && item.questionAr ? item.questionAr : item.question,
    answer: locale === 'ar' && item.answerAr ? item.answerAr : item.answer,
  }));
}

export default function FaqPageContent({ faqItems }: { faqItems: FaqItem[] }) {
  const { t, locale } = useLocale();
  const displayItems = getLocalizedItems(faqItems, locale);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">✈️ FlyTravel</Link>
            <div className="hidden md:flex gap-6">
                <Link href="/destinations" className="text-gray-700 hover:text-blue-600">{t('nav.destinations')}</Link>
                <Link href="/#offers" className="text-gray-700 hover:text-blue-600">{t('nav.offers')}</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600">{t('nav.about')}</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">{t('nav.contact')}</Link>
                <Link href="/faq" className="text-blue-600 font-semibold">{t('nav.faq')}</Link>
            </div>
            <Link href="/admin/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">{t('nav.admin')}</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">{t('faq.title')}</h1>
          <p className="text-center text-gray-600 mb-12 text-lg">{t('faq.subtitle')}</p>

          {displayItems.length > 0 ? (
            <FaqAccordion items={displayItems} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>{t('faq.noFaq')}</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">{t('faq.stillQuestions')}</p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {t('faq.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
