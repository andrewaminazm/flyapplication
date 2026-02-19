import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import FaqAccordion from './FaqAccordion';

async function getData() {
  const filePath = path.join(process.cwd(), 'src/app/data/travels.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export const metadata = {
  title: 'FAQ - FlyTravel | Frequently Asked Questions',
  description: 'Find answers to common questions about booking, payments, cancellations, and travel insurance.',
};

export default async function FAQPage() {
  const data = await getData();
  const faqItems = (data.faq || []).sort((a: { order: number }, b: { order: number }) => a.order - b.order);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ✈️ FlyTravel
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/destinations" className="text-gray-700 hover:text-blue-600">Destinations</Link>
              <Link href="/#offers" className="text-gray-700 hover:text-blue-600">Offers</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              <Link href="/faq" className="text-blue-600 font-semibold">FAQ</Link>
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

      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Everything you need to know about booking with FlyTravel
          </p>

          {faqItems.length > 0 ? (
            <FaqAccordion items={faqItems} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No FAQ items yet. Check back soon!</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
