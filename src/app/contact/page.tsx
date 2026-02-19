import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - FlyTravel | Get In Touch',
  description: 'Contact FlyTravel for bookings, inquiries, or travel assistance. Available 24/7 to help plan your perfect vacation.',
};

export default function ContactPage() {
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
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-blue-600 font-semibold">Contact</Link>
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
      <div className="relative h-80 pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-white">
              We&apos;re here to help plan your perfect journey
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-2xl font-bold mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us your questions anytime</p>
              <a 
                href="mailto:info@flytravel.com" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                info@flytravel.com
              </a>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-2xl font-bold mb-3">Call Us</h3>
              <p className="text-gray-600 mb-4">Available 24/7 for support</p>
              <a 
                href="tel:+15551234567" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                +1 (555) 123-4567
              </a>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-2xl font-bold mb-3">Visit Us</h3>
              <p className="text-gray-600 mb-4">Stop by our office</p>
              <p className="text-gray-800 font-semibold">
                123 Travel Street<br />
                New York, NY 10001
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Send Us A Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Booking inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your travel plans..."
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold inline-flex items-center"
                >
                  <span className="mr-2">✉️</span>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Office Hours</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="font-semibold text-gray-800">Monday - Friday</span>
                <span className="text-gray-600">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="font-semibold text-gray-800">Saturday</span>
                <span className="text-gray-600">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="font-semibold text-gray-800">Sunday</span>
                <span className="text-gray-600">12:00 PM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="font-semibold text-gray-800">Emergency Support</span>
                <span className="text-blue-600 font-semibold">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">How do I book a trip?</h3>
              <p className="text-gray-600">
                You can book by calling us, emailing, or filling out the contact form above. 
                Our travel experts will guide you through the entire process.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and bank transfers. 
                Payment plans are also available for qualifying bookings.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Can I cancel or modify my booking?</h3>
              <p className="text-gray-600">
                Yes! Our flexible booking policy allows modifications up to 48 hours before departure. 
                Cancellation terms vary by destination - contact us for specific details.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Do you offer travel insurance?</h3>
              <p className="text-gray-600">
                Absolutely! We highly recommend travel insurance and can help you choose the right coverage 
                for your trip during the booking process.
              </p>
            </div>
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
                <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Facebook">📘</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Instagram">📸</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Twitter">🐦</a>
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
