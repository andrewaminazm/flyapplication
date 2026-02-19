# FlyTravel - Travel Agency Website

A modern, professional travel agency website with an admin dashboard to manage destinations and offers.

## ✨ Features

### Public Website
- **Beautiful Homepage** - Stunning hero section with call-to-action
- **Destinations Showcase** - Display popular travel destinations with images, prices, and durations
- **Special Offers Section** - Highlight active promotional offers
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design with smooth animations

### Admin Dashboard
- **Manage Destinations** - Add, edit, and delete travel destinations
- **Manage Offers** - Create and update special promotional offers
- **Featured Control** - Mark destinations as featured to show on homepage
- **Real-time Updates** - Changes appear instantly on the website
- **Statistics Overview** - Quick view of total destinations, active offers, etc.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 3. Access Admin Dashboard
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to manage content.

## 📁 Project Structure

```
flyapplication/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage (public website)
│   │   ├── admin/
│   │   │   └── page.tsx      # Admin dashboard
│   │   ├── api/
│   │   │   └── travels/
│   │   │       └── route.ts  # API endpoints for CRUD operations
│   │   └── data/
│   │       └── travels.json  # Data storage (destinations & offers)
│   └── ...
├── package.json
└── README.md
```

## 🎨 Customization

### Adding a New Destination
1. Go to Admin Dashboard (`/admin`)
2. Click "Destinations" tab
3. Click "Add New" button
4. Fill in:
   - Name (e.g., "Paris, France")
   - Description
   - Image URL (use Unsplash or your own)
   - Price
   - Duration
   - Check "Featured" to show on homepage
5. Click "Save Changes"

### Creating a Special Offer
1. Go to Admin Dashboard (`/admin`)
2. Click "Offers" tab
3. Click "Add New" button
4. Fill in:
   - Title
   - Description
   - Discount percentage
   - Valid until date
   - Check "Active" to show on website
5. Click "Save Changes"

### Changing Colors/Branding
Edit the Tailwind classes in:
- `src/app/page.tsx` - Main website
- `src/app/admin/page.tsx` - Admin dashboard

Replace `blue-600` with your brand color throughout the files.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - FREE)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy (takes 2 minutes)

### Option 2: Netlify (FREE)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Deploy

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload the `.next` folder and files to your hosting
3. Set up Node.js environment
4. Run `npm start`

## 💰 Cost Breakdown

- **Development**: FREE (Next.js + React are open source)
- **Hosting**: 
  - Vercel/Netlify: FREE (for hobby projects)
  - Traditional hosting: $3-10/month
- **Domain**: $10-15/year
- **Total First Year**: $10-150 depending on choices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Data Storage**: JSON file (can be upgraded to database later)

## 📝 Notes for Client Presentation

**Advantages of this solution:**
1. ✅ Very low cost (free hosting available)
2. ✅ Easy to manage - no coding needed for content updates
3. ✅ Modern, fast, and SEO-friendly
4. ✅ Mobile responsive
5. ✅ Can be expanded later (add booking system, payment, etc.)
6. ✅ Professional appearance

**Future Enhancements (if budget increases):**
- Add database (PostgreSQL, MongoDB)
- Online booking system
- Payment integration (Stripe, PayPal)
- Customer reviews
- Email notifications
- Multi-language support
- Blog section

## 🤝 Support

For questions or issues, contact your developer.

---

**Made with ❤️ for your Travel Agency**
