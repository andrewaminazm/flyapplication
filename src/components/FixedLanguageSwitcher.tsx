'use client';

import LanguageSwitcher from './LanguageSwitcher';

export default function FixedLanguageSwitcher() {
  return (
    <div className="fixed top-3 right-3 z-[100] sm:top-4 sm:right-4 md:top-6 md:right-6">
      <LanguageSwitcher />
    </div>
  );
}
