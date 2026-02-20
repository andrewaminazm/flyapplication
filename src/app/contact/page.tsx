'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import SiteNav from '@/components/SiteNav';
import ContactForm from '@/components/ContactForm';
import NewsletterBlock from '@/components/NewsletterBlock';

export default function ContactPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-white">
      <SiteNav active="contact" />

      <div className="relative h-56 sm:h-80 pt-14 sm:pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4">{t('contact.title')}</h1>
            <p className="text-base sm:text-xl text-white">{t('contact.subtitle')}</p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-2xl font-bold mb-3">{t('home.emailUs')}</h3>
              <a href="mailto:info@flytravel.com" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">info@flytravel.com</a>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-2xl font-bold mb-3">{t('home.callUs')}</h3>
              <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">+1 (555) 123-4567</a>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-2xl font-bold mb-3">{t('home.visitUs')}</h3>
              <p className="text-gray-800 font-semibold">123 Travel Street, New York, NY 10001</p>
            </div>
          </div>

          <ContactForm />
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
                <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Facebook">📘</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Instagram">📸</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Twitter">🐦</a>
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
