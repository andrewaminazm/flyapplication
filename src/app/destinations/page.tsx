import Link from 'next/link';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';

async function getData() {
  const filePath = path.join(process.cwd(), 'src/app/data/travels.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export const metadata = {
  title: 'All Destinations - FlyTravel',
  description: 'Explore all our travel destinations. Find your perfect vacation package.',
};

export default async function AllDestinationsPage() {
  const data = await getData();
  const destinations = data.destinations || [];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ✈️ FlyTravel
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/destinations" className="text-blue-600 font-semibold">Destinations</Link>
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

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">All Destinations</h1>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Explore our full range of travel packages. Click on any destination to see details and book.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination: { id: string; name: string; description: string; image: string; price: number; duration: string; featured?: boolean }) => (
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
                  {destination.featured && (
                    <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{destination.name}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{destination.duration}</p>
                      <p className="text-2xl font-bold text-blue-600">${destination.price}</p>
                    </div>
                    <span className="text-blue-600 font-semibold">View details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {destinations.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-xl">No destinations yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
