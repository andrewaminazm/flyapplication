'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { formatDate } from '@/app/utils/formatDate';
import SiteNav from '@/components/SiteNav';

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
      <SiteNav active="offers" />

      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
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
