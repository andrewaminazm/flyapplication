'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { formatDate } from '@/app/utils/formatDate';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  active: boolean;
}

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLocale();
  const id = params?.id as string;
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch('/api/travels')
      .then((res) => res.json())
      .then((data) => {
        const found = (data.offers || []).find((o: Offer) => o.id === id);
        setOffer(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">{t('common.loading')}</p>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-500">{t('offer.notFound')}</p>
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
          {t('common.backToWebsite')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">✈️ FlyTravel</Link>
            <div className="hidden md:flex gap-6">
                <Link href="/destinations" className="text-gray-700 hover:text-blue-600">{t('nav.destinations')}</Link>
                <Link href="/#offers" className="text-blue-600 font-semibold">{t('nav.offers')}</Link>
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

      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-8 md:p-12">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{offer.title}</h1>
              <span className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-full text-xl font-bold whitespace-nowrap">
                {offer.discount}% {t('offer.off')}
              </span>
            </div>
            <p className="text-lg text-gray-700 mb-6">{offer.description}</p>
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">{t('home.validUntil')}</span> {formatDate(offer.validUntil)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {t('offer.claimOffer')}
              </Link>
              <Link
                href="/destinations"
                className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                {t('offer.viewDestinations')}
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/#offers" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← {t('offer.backToOffers')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
