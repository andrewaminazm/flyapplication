'use client';

import { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full px-4 sm:px-6 py-4 min-h-[48px] text-start font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 flex justify-between items-center gap-3"
          >
            <span>{item.question}</span>
            <span className="text-2xl text-gray-400">
              {openId === item.id ? '−' : '+'}
            </span>
          </button>
          {openId === item.id && (
            <div className="px-4 sm:px-6 py-4 bg-white text-gray-600 border-t border-gray-200 text-start">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
