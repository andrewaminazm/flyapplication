'use client';

import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';

export default function NewsletterBlock() {
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold mb-2">{t('newsletter.title')}</h3>
      {status === 'success' && (
        <p className="mb-4 text-blue-100">{t('newsletter.success')}</p>
      )}
      {status === 'error' && (
        <p className="mb-4 text-yellow-200">{t('newsletter.error')}</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.placeholder')}
          required
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
        >
          {status === 'loading' ? t('common.loading') : t('newsletter.subscribe')}
        </button>
      </form>
    </div>
  );
}
