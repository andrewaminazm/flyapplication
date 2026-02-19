'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';

export default function AboutPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">✈️ FlyTravel</Link>
            <div className="hidden md:flex gap-6">
                <Link href="/destinations" className="text-gray-700 hover:text-blue-600">{t('nav.destinations')}</Link>
                <Link href="/#offers" className="text-gray-700 hover:text-blue-600">{t('nav.offers')}</Link>
                <Link href="/about" className="text-blue-600 font-semibold">{t('nav.about')}</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">{t('nav.contact')}</Link>
                <Link href="/faq" className="text-gray-700 hover:text-blue-600">{t('nav.faq')}</Link>
            </div>
            <Link href="/admin/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">{t('nav.admin')}</Link>
          </div>
        </div>
      </nav>

      <div className="relative h-96 pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{t('about.title')}</h1>
            <p className="text-xl text-white">{t('about.subtitle')}</p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">{t('about.ourStory')}</h2>
              <p className="text-gray-600 text-lg mb-4">{t('about.ourStory1')}</p>
              <p className="text-gray-600 text-lg mb-4">{t('about.ourStory2')}</p>
              <p className="text-gray-600 text-lg">{t('about.ourStory3')}</p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop"
                alt="Travel"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('about.ourMission')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('about.ourMissionSub')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-3">{t('about.globalReach')}</h3>
              <p className="text-gray-600">{t('about.globalReachDesc')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-3">{t('about.qualityFirst')}</h3>
              <p className="text-gray-600">{t('about.qualityFirstDesc')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-3">{t('about.customerFocus')}</h3>
              <p className="text-gray-600">{t('about.customerFocusDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{t('about.whyChooseUs')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">{t('about.bestPriceGuarantee')}</h3>
              <p className="text-gray-600">{t('about.bestPriceGuaranteeDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">{t('about.expertGuidance')}</h3>
              <p className="text-gray-600">{t('about.expertGuidanceDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">{t('about.travelProtection')}</h3>
              <p className="text-gray-600">{t('about.travelProtectionDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">{t('about.support24')}</h3>
              <p className="text-gray-600">{t('about.support24Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{t('about.valuesTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">{t('about.integrity')}</h3>
              <p className="text-blue-100">{t('about.integrityDesc')}</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">{t('about.excellence')}</h3>
              <p className="text-blue-100">{t('about.excellenceDesc')}</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">{t('about.innovation')}</h3>
              <p className="text-blue-100">{t('about.innovationDesc')}</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">{t('about.sustainability')}</h3>
              <p className="text-blue-100">{t('about.sustainabilityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('about.readyTitle')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t('about.readySub')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a href="mailto:info@flytravel.com" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
              📧 {t('about.emailUs')}
            </a>
            <a href="tel:+15551234567" className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition text-lg font-semibold">
              📞 {t('about.callUs')}
            </a>
          </div>
          <div className="text-gray-600">
            <p className="mb-2">📧 info@flytravel.com</p>
            <p className="mb-2">📞 +1 (555) 123-4567</p>
            <p>📍 123 Travel Street, New York, NY 10001</p>
          </div>
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
                <li><Link href="/#destinations" className="hover:text-white">{t('nav.destinations')}</Link></li>
                <li><Link href="/#offers" className="hover:text-white">{t('nav.offers')}</Link></li>
                <li><Link href="/about" className="hover:text-white">{t('nav.about')}</Link></li>
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
