'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';
import SiteNav from '@/components/SiteNav';

interface Destination {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  image: string;
  price: number;
  duration: string;
  durationAr?: string;
}

function getDisplay(d: Destination, locale: string) {
  return {
    name: locale === 'ar' && d.nameAr ? d.nameAr : d.name,
    description: locale === 'ar' && d.descriptionAr ? d.descriptionAr : d.description,
    duration: locale === 'ar' && d.durationAr ? d.durationAr : d.duration,
  };
}

export default function DestinationDetailContent({ destination }: { destination: Destination }) {
  const { t, locale } = useLocale();
  const display = getDisplay(destination, locale);

return (
    <div className="min-h-screen bg-white">
      <SiteNav active="destinations" />

      <div className="pt-14 sm:pt-16">
        <div className="relative h-[50vh] min-h-[300px]">
          <Image
            src={destination.image}
            alt={display.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">{display.name}</h1>
              <p className="text-base sm:text-xl text-white/90 mt-2">{display.duration}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">{t('destination.aboutDestination')}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{display.description}</p>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 lg:sticky lg:top-24">
                <p className="text-sm text-gray-500 mb-1">{t('destination.from')}</p>
                <p className="text-4xl font-bold text-blue-600 mb-2">${destination.price}</p>
                <p className="text-gray-600 mb-6">{t('destination.perPerson')}</p>
                <Link
                  href="/contact"
                  className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {t('common.bookNow')}
                </Link>
                <Link
                  href="tel:+15551234567"
                  className="block w-full text-center py-3 text-gray-600 hover:text-blue-600 mt-3"
                >
                  {t('destination.orCall')}
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">{t('destination.duration')}</p>
                  <p className="font-semibold">{display.duration}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/destinations" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← {t('destination.viewAllDestinations')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
