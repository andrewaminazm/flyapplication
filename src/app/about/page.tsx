import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - FlyTravel | Your Trusted Travel Partner',
  description: 'Learn about FlyTravel - our story, mission, and commitment to providing exceptional travel experiences at the best prices.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">✈️ FlyTravel</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/#destinations" className="text-gray-700 hover:text-blue-600">Destinations</Link>
              <Link href="/#offers" className="text-gray-700 hover:text-blue-600">Offers</Link>
              <Link href="/about" className="text-blue-600 font-semibold">About</Link>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>
            <Link 
              href="/admin" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-96 pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              About FlyTravel
            </h1>
            <p className="text-xl text-white">
              Your trusted partner for unforgettable travel experiences
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-4">
                Founded with a passion for exploration and a commitment to excellence, FlyTravel has been helping travelers discover the world&apos;s most incredible destinations since day one.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                We believe that travel is more than just visiting new places—it&apos;s about creating memories, experiencing cultures, and connecting with people from around the globe.
              </p>
              <p className="text-gray-600 text-lg">
                Our team of travel experts carefully curates each destination and package to ensure you have the adventure of a lifetime.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop"
                alt="Travel destinations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To make extraordinary travel experiences accessible and affordable for everyone, 
              while providing exceptional service every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-3">Global Reach</h3>
              <p className="text-gray-600">
                Access to destinations worldwide with local expertise and partnerships in every region.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We handpick accommodations, experiences, and partners to ensure the highest standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority with 24/7 support and personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose FlyTravel?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Find a lower price? We&apos;ll match it and give you an extra 5% off.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Our travel specialists have visited every destination we offer.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Travel Protection</h3>
              <p className="text-gray-600">Comprehensive travel insurance and flexible booking options.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance wherever you are in the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Integrity</h3>
              <p className="text-blue-100">Honest, transparent pricing and communication always.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Excellence</h3>
              <p className="text-blue-100">Striving for perfection in every detail of your journey.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Innovation</h3>
              <p className="text-blue-100">Using technology to make travel planning effortless.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Sustainability</h3>
              <p className="text-blue-100">Promoting responsible travel and eco-friendly practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get in touch with our travel experts and let us help you plan the perfect getaway.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a 
              href="mailto:info@flytravel.com"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
              📧 Email Us
            </a>
            <a 
              href="tel:+15551234567"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition text-lg font-semibold"
            >
              📞 Call Us
            </a>
          </div>
          <div className="text-gray-600">
            <p className="mb-2">📧 info@flytravel.com</p>
            <p className="mb-2">📞 +1 (555) 123-4567</p>
            <p>📍 123 Travel Street, New York, NY 10001</p>
          </div>
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
                <li><Link href="/#destinations" className="hover:text-white">Destinations</Link></li>
                <li><Link href="/#offers" className="hover:text-white">Offers</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
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
