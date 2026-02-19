'use client';

import { useLocale } from '@/contexts/LocaleContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-300 bg-gray-50">
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 text-sm font-medium ${locale === 'en' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('ar')}
        className={`px-3 py-1.5 text-sm font-medium ${locale === 'ar' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        AR
      </button>
    </div>
  );
}
