'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate } from '../utils/formatDate';
import { useLocale } from '@/contexts/LocaleContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

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

interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  featured: boolean;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

type TabType = 'destinations' | 'offers' | 'testimonials' | 'faq' | 'inquiries' | 'subscribers';

export default function AdminDashboard() {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<TabType>('destinations');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Destination | Offer | Testimonial | FaqItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/travels');
      const data = await response.json();
      setDestinations(data.destinations || []);
      setOffers(data.offers || []);
      setTestimonials(data.testimonials || []);
      setFaq((data.faq || []).sort((a: FaqItem, b: FaqItem) => a.order - b.order));
      setInquiries(data.inquiries || []);
      setSubscribers(data.subscribers || []);
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
    } else if (activeTab === 'offers') {
      setEditingItem({
        id: Date.now().toString(),
        title: '',
        description: '',
        discount: '',
        validUntil: '',
        active: true,
      });
    } else if (activeTab === 'testimonials') {
      setEditingItem({
        id: Date.now().toString(),
        author: '',
        text: '',
        rating: 5,
        featured: true,
      });
    } else if (activeTab === 'faq') {
      setEditingItem({
        id: Date.now().toString(),
        question: '',
        answer: '',
        order: faq.length + 1,
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
          id,
        }),
      });

      if (response.ok) await fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'destinations': return t('admin.manageDestinations');
      case 'offers': return t('admin.manageOffers');
      case 'testimonials': return t('admin.manageTestimonials');
      case 'faq': return t('admin.manageFaq');
      case 'inquiries': return t('admin.contactInquiries');
      case 'subscribers': return t('admin.newsletterSubscribers');
      default: return '';
    }
  };

  const handleInquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/travels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'inquiry_update', data: { id, status } }),
      });
      if (res.ok) await fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">{t('admin.loading')}</div>
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
              <span className="text-2xl font-bold">🔧 {t('admin.dashboardTitle')}</span>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={async () => {
                  await fetch('/api/admin/logout', { method: 'POST' });
                  window.location.href = '/admin/login';
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                {t('admin.logout')}
              </button>
              <Link href="/" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                ← {t('admin.backToWebsite')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t('admin.totalDestinations')}</p>
                <p className="text-3xl font-bold">{destinations.length}</p>
              </div>
              <div className="text-4xl">🌍</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t('admin.activeOffers')}</p>
                <p className="text-3xl font-bold">{offers.filter(o => o.active).length}</p>
              </div>
              <div className="text-4xl">🎁</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t('admin.featured')}</p>
                <p className="text-3xl font-bold">{destinations.filter(d => d.featured).length}</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex -mb-px min-w-max">
              {([
                  'destinations',
                  'offers',
                  'testimonials',
                  'faq',
                  'inquiries',
                  'subscribers',
                ] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab === 'destinations' && t('admin.tabDestinations')}
                    {tab === 'offers' && t('admin.tabOffers')}
                    {tab === 'testimonials' && t('admin.tabTestimonials')}
                    {tab === 'faq' && t('admin.tabFaq')}
                    {tab === 'inquiries' && t('admin.tabInquiries')}
                    {tab === 'subscribers' && t('admin.tabSubscribers')}
                  </button>
                ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{getTabTitle()}</h2>
              {activeTab !== 'inquiries' && activeTab !== 'subscribers' && (
                <button
                  onClick={handleAddNew}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <span className="mr-2">+</span> {t('admin.addNew')}
                </button>
              )}
            </div>

            {/* Destinations Table */}
            {activeTab === 'destinations' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.name')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.price')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.duration')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.featured')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.actions')}</th>
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
                            {dest.featured ? t('admin.yes') : t('admin.no')}
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
                            {t('admin.edit')}
                          </button>
                          <button
                            onClick={() => handleDelete(dest.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            {t('admin.delete')}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.title')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.discount')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.validUntil')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.status')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.actions')}</th>
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
                            {offer.active ? t('admin.active') : t('admin.inactive')}
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
                            {t('admin.edit')}
                          </button>
                          <button
                            onClick={() => handleDelete(offer.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            {t('admin.delete')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Testimonials Table */}
            {activeTab === 'testimonials' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.author')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.review')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.rating')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.featured')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {testimonials.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.author}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.text}</td>
                        <td className="px-6 py-4 text-sm">{item.rating} ★</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.featured ? t('admin.yes') : t('admin.no')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          <button onClick={() => { setEditingItem(item); setShowForm(true); }} className="text-blue-600 hover:text-blue-900">{t('admin.edit')}</button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">{t('admin.delete')}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* FAQ Table */}
            {activeTab === 'faq' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.order')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.question')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.answer')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {faq.map((f) => (
                      <tr key={f.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{f.order}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{f.question}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">{f.answer}</td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          <button onClick={() => { setEditingItem(f); setShowForm(true); }} className="text-blue-600 hover:text-blue-900">{t('admin.edit')}</button>
                          <button onClick={() => handleDelete(f.id)} className="text-red-600 hover:text-red-900">{t('admin.delete')}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Inquiries Table */}
            {activeTab === 'inquiries' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.date')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.name')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.email')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.subject')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.status')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{inq.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{inq.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{inq.subject}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            inq.status === 'contacted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {inq.status === 'contacted' ? t('admin.contacted') : inq.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          {inq.status !== 'contacted' && (
                            <button
                              onClick={() => handleInquiryStatus(inq.id, 'contacted')}
                              className="text-green-600 hover:text-green-900"
                            >
                              {t('admin.markContacted')}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(inq.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            {t('admin.delete')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {inquiries.length === 0 && (
                  <p className="py-8 text-center text-gray-500">{t('admin.noInquiries')}</p>
                )}
              </div>
            )}

            {/* Subscribers Table */}
            {activeTab === 'subscribers' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.date')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.email')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{sub.email}</td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            {t('admin.delete')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {subscribers.length === 0 && (
                  <p className="py-8 text-center text-gray-500">{t('admin.noSubscribers')}</p>
                )}
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
              {activeTab === 'destinations' && t('admin.destinationDetails')}
              {activeTab === 'offers' && t('admin.offerDetails')}
              {activeTab === 'testimonials' && t('admin.testimonial')}
              {activeTab === 'faq' && t('admin.faqItem')}
            </h3>

            {activeTab === 'destinations' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.name')}</label>
                  <input
                    type="text"
                    value={(editingItem as Destination).name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value } as Destination)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.description')}</label>
                  <textarea
                    value={(editingItem as Destination).description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value } as Destination)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.imageUrl')}</label>
                  <input
                    type="text"
                    value={(editingItem as Destination).image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value } as Destination)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.priceDollar')}</label>
                    <input
                      type="number"
                      value={(editingItem as Destination).price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) } as Destination)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.duration')}</label>
                    <input
                      type="text"
                      value={(editingItem as Destination).duration}
                      onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value } as Destination)}
                      placeholder={t('admin.durationPlaceholder')}
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
                    {t('admin.showOnHomepageFeatured')}
                  </label>
                </div>
              </div>
            ) : activeTab === 'offers' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.title')}</label>
                  <input
                    type="text"
                    value={(editingItem as Offer).title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value } as Offer)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.description')}</label>
                  <textarea
                    value={(editingItem as Offer).description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value } as Offer)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.discountPercent')}</label>
                    <input
                      type="text"
                      value={(editingItem as Offer).discount}
                      onChange={(e) => setEditingItem({ ...editingItem, discount: e.target.value } as Offer)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.validUntil')}</label>
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
                    {t('admin.activeShowOnWebsite')}
                  </label>
                </div>
              </div>
            ) : activeTab === 'testimonials' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.authorName')}</label>
                  <input
                    type="text"
                    value={(editingItem as Testimonial).author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value } as Testimonial)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. John D."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.reviewText')}</label>
                  <textarea
                    value={(editingItem as Testimonial).text}
                    onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value } as Testimonial)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="What did the customer say?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.rating15')}</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={(editingItem as Testimonial).rating}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) } as Testimonial)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(editingItem as Testimonial).featured}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked } as Testimonial)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    {t('admin.showOnHomepage')}
                  </label>
                </div>
              </div>
            ) : activeTab === 'faq' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.question')}</label>
                  <input
                    type="text"
                    value={(editingItem as FaqItem).question}
                    onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value } as FaqItem)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. How do I book?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.answer')}</label>
                  <textarea
                    value={(editingItem as FaqItem).answer}
                    onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value } as FaqItem)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.displayOrder')}</label>
                  <input
                    type="number"
                    min={1}
                    value={(editingItem as FaqItem).order}
                    onChange={(e) => setEditingItem({ ...editingItem, order: Number(e.target.value) } as FaqItem)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                {t('admin.cancel')}
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t('admin.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
