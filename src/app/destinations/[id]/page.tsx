import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

async function getData() {
  const filePath = path.join(process.cwd(), 'src/app/data/travels.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getData();
  const destination = data.destinations.find((d: { id: string }) => d.id === id);
  if (!destination) return { title: 'Destination Not Found' };
  return {
    title: `${destination.name} - FlyTravel`,
    description: destination.description,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData();
  const destination = data.destinations.find((d: { id: string }) => d.id === id);

  if (!destination) notFound();

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

      <div className="pt-16">
        <div className="relative h-[50vh] min-h-[300px]">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {destination.name}
              </h1>
              <p className="text-xl text-white/90 mt-2">{destination.duration}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About This Destination</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {destination.description}
              </p>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-8 sticky top-24">
                <p className="text-sm text-gray-500 mb-1">From</p>
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  ${destination.price}
                </p>
                <p className="text-gray-600 mb-6">per person</p>
                <Link
                  href="/contact"
                  className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
                <Link
                  href="tel:+15551234567"
                  className="block w-full text-center py-3 text-gray-600 hover:text-blue-600 mt-3"
                >
                  Or call us
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">{destination.duration}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/destinations"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← View all destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
