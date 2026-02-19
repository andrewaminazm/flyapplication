'use client';

import LanguageSwitcher from './LanguageSwitcher';

export default function FixedLanguageSwitcher() {
  return (
    <div className="fixed top-4 right-4 z-[100] md:top-6 md:right-6">
      <LanguageSwitcher />
    </div>
  );
}
