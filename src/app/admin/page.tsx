'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate } from '../utils/formatDate';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  featured: boolean;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  active: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'destinations' | 'offers'>('destinations');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Destination | Offer | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/travels');
      const data = await response.json();
      setDestinations(data.destinations);
      setOffers(data.offers);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    if (activeTab === 'destinations') {
      setEditingItem({
        id: Date.now().toString(),
        name: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
        price: 0,
        duration: '',
        featured: false,
      });
    } else {
      setEditingItem({
        id: Date.now().toString(),
        title: '',
        description: '',
        discount: '',
        validUntil: '',
        active: true,
      });
    }
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch('/api/travels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          data: editingItem,
        }),
      });

      if (response.ok) {
        await fetchData();
        setShowForm(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch('/api/travels', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          id: id,
        }),
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">🔧 Admin Dashboard</span>
            </div>
            <Link href="/" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              ← Back to Website
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Destinations</p>
                <p className="text-3xl font-bold">{destinations.length}</p>
              </div>
              <div className="text-4xl">🌍</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Offers</p>
                <p className="text-3xl font-bold">{offers.filter(o => o.active).length}</p>
              </div>
              <div className="text-4xl">🎁</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Featured</p>
                <p className="text-3xl font-bold">{destinations.filter(d => d.featured).length}</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('destinations')}
                className={`py-4 px-8 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'destinations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Destinations
              </button>
              <button
                onClick={() => setActiveTab('offers')}
                className={`py-4 px-8 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'offers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Offers
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeTab === 'destinations' ? 'Manage Destinations' : 'Manage Offers'}
              </h2>
              <button
                onClick={handleAddNew}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <span className="mr-2">+</span> Add New
              </button>
            </div>

            {/* Destinations Table */}
            {activeTab === 'destinations' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {destinations.map((dest) => (
                      <tr key={dest.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{dest.name}</div>
                          <div className="text-sm text-gray-500">{dest.description.substring(0, 50)}...</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">${dest.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{dest.duration}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            dest.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {dest.featured ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(dest);
                              setShowForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(dest.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Offers Table */}
            {activeTab === 'offers' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {offers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{offer.title}</div>
                          <div className="text-sm text-gray-500">{offer.description}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{offer.discount}%</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDate(offer.validUntil)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            offer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {offer.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(offer);
                              setShowForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(offer.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showForm && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">
              {activeTab === 'destinations' ? 'Destination Details' : 'Offer Details'}
            </h3>

            {activeTab === 'destinations' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={(editingItem as Destination).name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value } as Destination)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={(editingItem as Destination).description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value } as Destination)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={(editingItem as Destination).image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value } as Destination)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={(editingItem as Destination).price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) } as Destination)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={(editingItem as Destination).duration}
                      onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value } as Destination)}
                      placeholder="e.g., 7 Days / 6 Nights"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(editingItem as Destination).featured}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked } as Destination)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Show on homepage (Featured)
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={(editingItem as Offer).title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value } as Offer)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={(editingItem as Offer).description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value } as Offer)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                    <input
                      type="text"
                      value={(editingItem as Offer).discount}
                      onChange={(e) => setEditingItem({ ...editingItem, discount: e.target.value } as Offer)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
                    <input
                      type="date"
                      value={(editingItem as Offer).validUntil}
                      onChange={(e) => setEditingItem({ ...editingItem, validUntil: e.target.value } as Offer)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(editingItem as Offer).active}
                    onChange={(e) => setEditingItem({ ...editingItem, active: e.target.checked } as Offer)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Active (Show on website)
                  </label>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
