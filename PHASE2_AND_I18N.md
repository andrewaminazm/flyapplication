# Phase 2 & Multilingual (EN/AR)

## Phase 2 – Leads & Trust

### 1. Contact form (saves to admin)
- **Submit:** Contact form posts to `POST /api/contact` and saves to `travels.json` → `inquiries`.
- **Admin:** **Inquiries** tab shows all submissions (date, name, email, subject, message, status).
- **Actions:** “Mark contacted” and “Delete”.

### 2. Inquiries list in admin
- **Location:** Admin → **Inquiries** tab.
- **Columns:** Date, Name, Email, Subject, Status, Actions.
- **Status:** `new` or `contacted` (toggle with “Mark contacted”).

### 3. Terms & Privacy pages
- **Terms:** [/terms](/terms) – Terms of Service (translated EN/AR).
- **Privacy:** [/privacy](/privacy) – Privacy Policy (translated EN/AR).
- Linked from contact and homepage footers.

### 4. Newsletter (optional)
- **Block:** Newsletter block on **Homepage** (above footer) and **Contact** page.
- **Submit:** `POST /api/newsletter` → saves to `travels.json` → `subscribers`.
- **Admin:** **Subscribers** tab lists email and date; “Delete” only.

---

## Multilingual (English & Arabic)

### Behaviour
- **Languages:** English (EN) and Arabic (AR).
- **Switcher:** Fixed top-right on all pages (EN | AR).
- **Persistence:** Choice stored in cookie `flytravel_locale`.
- **RTL:** For Arabic, `dir="rtl"` and `lang="ar"` are set on `<html>` (layout and script).

### Where translations apply
- **Fully translated:** Contact page, Terms, Privacy, Newsletter block, Contact form labels/messages.
- **Partially translated:** Nav/footer on Terms and Privacy; fixed switcher everywhere.
- **Homepage/rest:** Copy is still in English; switcher and layout (e.g. RTL) work. You can add more keys to `src/locales/en.json` and `src/locales/ar.json` and use `t('key')` in client components.

### Files
- **Locales:** `src/locales/en.json`, `src/locales/ar.json` (flat keys like `nav.contact`, `contact.title`).
- **Context:** `src/contexts/LocaleContext.tsx` – `LocaleProvider`, `useLocale()`, `t(key)`.
- **Switcher:** `src/components/LanguageSwitcher.tsx`, `src/components/FixedLanguageSwitcher.tsx`.
- **Root layout:** Wraps app with `LocaleProvider` and a small script to set `dir`/`lang` from cookie before paint.

### Adding more translations
1. Add entries to `src/locales/en.json` and `src/locales/ar.json` (same keys).
2. In any **client** component: `const { t } = useLocale();` then `t('your.key')`.

---

## New API routes

| Route | Method | Auth | Purpose |
|-------|--------|------|--------|
| `/api/contact` | POST | No | Save contact form submission (inquiries). |
| `/api/newsletter` | POST | No | Save newsletter email (subscribers). |
| `/api/travels` | POST | Yes | `type: 'inquiry_update'`, `data: { id, status }` to mark inquiry contacted. |
| `/api/travels` | DELETE | Yes | `type: 'inquiries'` or `type: 'subscribers'`, `id` to delete. |

---

## Data shape (`travels.json`)

```json
{
  "inquiries": [
    {
      "id": "...",
      "name": "...",
      "email": "...",
      "phone": "...",
      "subject": "...",
      "message": "...",
      "status": "new",
      "createdAt": "2026-02-16T..."
    }
  ],
  "subscribers": [
    { "id": "...", "email": "...", "createdAt": "2026-02-16T..." }
  ]
}
```

---

## Quick test

1. **Contact:** Submit form on `/contact` → Admin → Inquiries: new row; mark contacted / delete.
2. **Newsletter:** Submit email on homepage or contact → Admin → Subscribers: new row; delete.
3. **Terms/Privacy:** Open `/terms` and `/privacy`, switch EN/AR and check RTL on AR.
4. **Language:** Use EN/AR switcher; reload and confirm language and RTL persist.
