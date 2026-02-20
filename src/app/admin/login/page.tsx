'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const redirect = searchParams.get('redirect') || '/admin';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t('admin.loginFailed'));
        setLoading(false);
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError(t('admin.errorGeneric'));
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ✈️ FlyTravel
        </Link>
        <h1 className="text-2xl font-bold mt-4 text-gray-900">{t('admin.loginTitle')}</h1>
        <p className="text-gray-500 mt-2">{t('admin.loginSubtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            {t('admin.username')}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            autoComplete="username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="admin"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {t('admin.password')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? t('admin.loggingIn') : t('admin.login')}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500">
        <Link href="/" className="text-blue-600 hover:text-blue-700">
          ← {t('admin.backToWebsite')}
        </Link>
      </p>
    </>
  );
}

export default function AdminLoginPage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <Suspense fallback={<div className="text-center text-gray-500 py-8">{t('admin.loading')}</div>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
