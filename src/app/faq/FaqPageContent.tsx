'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import SiteNav from '@/components/SiteNav';
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
      <SiteNav active="faq" />

      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">{t('faq.title')}</h1>
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
