'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';
import { formatDate } from './utils/formatDate';
import NewsletterBlock from '@/components/NewsletterBlock';
import SiteNav from '@/components/SiteNav';

interface HomeContentProps {
  data: {
    destinations: any[];
    offers: any[];
    testimonials: any[];
  };
}

export default function HomeContent({ data }: HomeContentProps) {
  const { t, locale } = useLocale();
  const featuredDestinations = data.destinations.filter((d: any) => d.featured);
  const getDestDisplay = (d: any) => ({
    name: locale === 'ar' && d.nameAr ? d.nameAr : d.name,
    description: locale === 'ar' && d.descriptionAr ? d.descriptionAr : d.description,
    duration: locale === 'ar' && d.durationAr ? d.durationAr : d.duration,
  });
  const activeOffers = data.offers.filter((o: any) => o.active);
  const featuredTestimonials = (data.testimonials || []).filter((x: any) => x.featured);

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <div className="relative h-screen pt-14 sm:pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">{t('home.heroTitle')}</h1>
            <p className="text-base sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 px-1">{t('home.heroSub')}</p>
            <Link href="/destinations" className="inline-block bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 active:scale-100">
              {t('home.bookNow')}
            </Link>
          </div>
        </div>
      </div>

      {activeOffers.length > 0 && (
        <section id="offers" className="py-10 sm:py-16 bg-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">🎉 {t('home.specialOffers')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeOffers.map((offer: any) => (
                <Link key={offer.id} href={`/offers/${offer.id}`} className="block bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-400 hover:shadow-xl transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                      <p className="text-gray-600">{offer.description}</p>
                    </div>
                    <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-xl font-bold">
                      {offer.discount}% {t('offer.off')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{t('home.validUntil')}: {formatDate(offer.validUntil)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="destinations" className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">{t('home.popularDestinations')}</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-base sm:text-lg">{t('home.handpicked')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((dest: any) => {
              const disp = getDestDisplay(dest);
              return (
              <Link key={dest.id} href={`/destinations/${dest.id}`} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 block">
                <div className="relative h-64">
                  <Image src={dest.image} alt={disp.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{disp.name}</h3>
                  <p className="text-gray-600 mb-4">{disp.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{disp.duration}</p>
                      <p className="text-2xl font-bold text-blue-600">${dest.price}</p>
                    </div>
                    <span className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block">{t('common.bookNow')}</span>
                  </div>
                </div>
              </Link>
            );})}
          </div>
          <div className="text-center mt-8">
            <Link href="/destinations" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">{t('home.viewAllDestinations')}</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{t('home.whyChoose')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">{t('home.bestPrices')}</h3>
              <p className="text-gray-600">{t('home.bestPricesDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">{t('home.qualityService')}</h3>
              <p className="text-gray-600">{t('home.qualityServiceDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">{t('home.safeSecure')}</h3>
              <p className="text-gray-600">{t('home.safeSecureDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {featuredTestimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4">{t('home.testimonialsTitle')}</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">{t('home.testimonialsSub')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((item: any) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-8 shadow-sm">
                  <div className="flex text-yellow-500 mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (<span key={i}>★</span>))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">&ldquo;{item.text}&rdquo;</p>
                  <p className="font-semibold text-gray-900">— {item.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('home.getInTouch')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t('home.getInTouchSub')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold mb-2">{t('home.emailUs')}</h3>
              <a href="mailto:info@flytravel.com" className="text-blue-600 hover:text-blue-700">info@flytravel.com</a>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-bold mb-2">{t('home.callUs')}</h3>
              <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-700">+1 (555) 123-4567</a>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-bold mb-2">{t('home.visitUs')}</h3>
              <p className="text-gray-600">123 Travel Street, NY 10001</p>
            </div>
          </div>
          <Link href="/about" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">{t('home.learnMore')}</Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterBlock />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">✈️ FlyTravel</h3>
              <p className="text-gray-400">{t('footer.tagline')}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/destinations" className="hover:text-white">{t('nav.destinations')}</Link></li>
                <li><a href="#offers" className="hover:text-white">{t('nav.offers')}</a></li>
                <li><Link href="/about" className="hover:text-white">{t('nav.about')}</Link></li>
                <li><Link href="/contact" className="hover:text-white">{t('nav.contact')}</Link></li>
                <li><Link href="/faq" className="hover:text-white">{t('nav.faq')}</Link></li>
                <li><Link href="/terms" className="hover:text-white">{t('nav.terms')}</Link></li>
                <li><Link href="/privacy" className="hover:text-white">{t('nav.privacy')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@flytravel.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 123 Travel Street, NY</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.followUs')}</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📸</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">🐦</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FlyTravel. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
