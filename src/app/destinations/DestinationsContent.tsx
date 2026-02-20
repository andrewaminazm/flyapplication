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
  featured?: boolean;
}

function getDisplay(d: Destination, locale: string) {
  return {
    name: locale === 'ar' && d.nameAr ? d.nameAr : d.name,
    description: locale === 'ar' && d.descriptionAr ? d.descriptionAr : d.description,
    duration: locale === 'ar' && d.durationAr ? d.durationAr : d.duration,
  };
}

export default function DestinationsContent({ destinations }: { destinations: Destination[] }) {
  const { t, locale } = useLocale();

  return (
    <div className="min-h-screen bg-white">
      <SiteNav active="destinations" />

      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">{t('destinations.title')}</h1>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">{t('destinations.subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => {
              const display = getDisplay(destination, locale);
              return (
              <Link
                key={destination.id}
                href={`/destinations/${destination.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 block"
              >
                <div className="relative h-64">
                  <Image
                    src={destination.image}
                    alt={display.name}
                    fill
                    className="object-cover"
                  />
                  {destination.featured && (
                    <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {t('destinations.popular')}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{display.name}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{display.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{display.duration}</p>
                      <p className="text-2xl font-bold text-blue-600">${destination.price}</p>
                    </div>
                    <span className="text-blue-600 font-semibold">{t('destinations.viewDetails')} →</span>
                  </div>
                </div>
              </Link>
            );})}
          </div>

          {destinations.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-xl">{t('destinations.noDestinations')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
