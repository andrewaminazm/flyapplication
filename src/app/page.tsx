import Link from 'next/link';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import { formatDate } from './utils/formatDate';
import NewsletterBlock from '@/components/NewsletterBlock';

async function getData() {
  const filePath = path.join(process.cwd(), 'src/app/data/travels.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getData();
  const featuredDestinations = data.destinations.filter((dest: any) => dest.featured);
  const activeOffers = data.offers.filter((offer: any) => offer.active);
  const featuredTestimonials = (data.testimonials || []).filter((t: any) => t.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">✈️ FlyTravel</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/destinations" className="text-gray-700 hover:text-blue-600">Destinations</Link>
              <a href="#offers" className="text-gray-700 hover:text-blue-600">Offers</a>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              <Link href="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link>
            </div>
            <Link 
              href="/admin/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Explore The World With Us
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Discover amazing places at exclusive deals. Your adventure starts here!
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
              Book Your Trip Now
            </button>
          </div>
        </div>
      </div>

      {/* Special Offers */}
      {activeOffers.length > 0 && (
        <section id="offers" className="py-16 bg-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">🎉 Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeOffers.map((offer: any) => (
                <div key={offer.id} className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-400">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                      <p className="text-gray-600">{offer.description}</p>
                    </div>
                    <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-xl font-bold">
                      {offer.discount}% OFF
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Valid until: {formatDate(offer.validUntil)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Destinations */}
      <section id="destinations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Popular Destinations</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Handpicked destinations for your next adventure</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination: any) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 block"
              >
                <div className="relative h-64">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{destination.duration}</p>
                      <p className="text-2xl font-bold text-blue-600">${destination.price}</p>
                    </div>
                    <span className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block">
                      Book Now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/destinations" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
              View all destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose FlyTravel?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">We guarantee the lowest prices on all packages</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Quality Service</h3>
              <p className="text-gray-600">24/7 customer support for all your needs</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your safety is our top priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Real experiences from real travelers</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((t: any) => (
                <div key={t.id} className="bg-gray-50 rounded-xl p-8 shadow-sm">
                  <div className="flex text-yellow-500 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-semibold text-gray-900">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to book your dream vacation? Our travel experts are here to help!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold mb-2">Email Us</h3>
              <a href="mailto:info@flytravel.com" className="text-blue-600 hover:text-blue-700">
                info@flytravel.com
              </a>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-700">
                +1 (555) 123-4567
              </a>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Travel Street, NY 10001</p>
            </div>
          </div>
          <Link 
            href="/about"
            className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
          >
            Learn more about us →
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterBlock />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">✈️ FlyTravel</h3>
              <p className="text-gray-400">Your trusted travel partner for unforgettable adventures</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/destinations" className="hover:text-white">Destinations</Link></li>
                <li><a href="#offers" className="hover:text-white">Offers</a></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@flytravel.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 123 Travel Street, NY</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📸</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">🐦</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FlyTravel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
