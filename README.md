# FlyTravel - Travel Agency Website

A modern, professional travel agency website with an admin dashboard to manage destinations and offers.

## ✨ Features

### Public Website
- **Beautiful Homepage** - Stunning hero section with call-to-action
- **Destinations Showcase** - Display popular travel destinations with images, prices, and durations
- **Special Offers Section** - Highlight active promotional offers
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design with smooth animations

### Admin Dashboard (password protected)
- **Secure Login** - Password-protected at `/admin/login`
- **Manage Destinations** - Add, edit, and delete travel destinations
- **Manage Offers** - Create and update special promotional offers
- **Manage Testimonials** - Add customer reviews (show on homepage)
- **Manage FAQ** - Add and reorder FAQ items for the FAQ page
- **Featured Control** - Mark destinations as featured to show on homepage
- **Real-time Updates** - Changes appear instantly on the website
- **Statistics Overview** - Quick view of content counts

### Public Pages
- **Homepage** - Hero, offers, featured destinations, testimonials
- **All Destinations** - [/destinations](/destinations) – list of every destination
- **Destination Detail** - [/destinations/[id]](/destinations/1) – full details and Book Now
- **About** - [/about](/about) – company story and mission
- **Contact** - [/contact](/contact) – contact form and info
- **FAQ** - [/faq](/faq) – frequently asked questions

### 🚀 Future Features (see [FEATURE_ROADMAP.md](FEATURE_ROADMAP.md))
- Contact form → email • Inquiries in admin • Search & filter
- Newsletter • Terms & Privacy • Booking & payments

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Admin Password (required for admin access)

Copy the example env file and set your admin password and session secret:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

```
ADMIN_PASSWORD=your-secure-password
ADMIN_SESSION_SECRET=any-long-random-string-for-sessions
```

Use a strong password and a long random string (e.g. 32+ characters) for `ADMIN_SESSION_SECRET`. Without these, the admin login will not work.

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 4. Access Admin Dashboard
Visit [http://localhost:3000/admin](http://localhost:3000/admin). You will be redirected to the login page; use the password you set in `.env.local`.

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

### ⭐ Option 1: Vercel (STRONGLY Recommended - FREE & EASIEST)

**Best for Next.js - Made by the Next.js team! Works perfectly with zero configuration.**

**Deploy:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign up with GitHub
4. Click "Add New..." → "Project"
5. Import your repository
6. Click "Deploy" (Vercel auto-detects settings)
7. **Done in 2 minutes!** ✅

**After Deployment:**
- ✅ Vercel gives you a **FREE URL** like: `https://your-project.vercel.app`
- ✅ **WORKS IMMEDIATELY** - No configuration needed
- ✅ Perfect Next.js support (SSR, API routes, everything)
- 🌐 **Share this URL** with your client to show the live website
- 🔗 You can add a custom domain later (e.g., `www.yourcompany.com`)
- 📊 View analytics and logs in Vercel dashboard
- 🚀 Auto-deploys when you push to GitHub

**Access Your Site:**
```
Live Website: https://your-project.vercel.app
Admin Panel:  https://your-project.vercel.app/admin
About Page:   https://your-project.vercel.app/about
Contact Page: https://your-project.vercel.app/contact
```

**Why Vercel?**
- ✅ Zero configuration (just click deploy)
- ✅ Made for Next.js
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN (super fast worldwide)
- ✅ Free forever for projects like this
- ✅ Auto-deploys on git push
- ✅ Preview deployments for testing

---

### Option 2: Netlify (Requires Configuration)

**⚠️ Important:** Netlify needs extra configuration for Next.js 16.

**If you already deployed to Netlify and got "Page not found" error:**
- See `NETLIFY_FIX.md` for detailed fix instructions
- Or switch to Vercel (easier and recommended)

**To use Netlify:**
1. Make sure `netlify.toml` file exists (already created)
2. Install dependencies: `npm install`
3. Push to GitHub
4. Go to [netlify.com](https://netlify.com)
5. Connect your repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Deploy"

**After Deployment:**
- ✅ Netlify gives you a **FREE URL** like: `https://random-name-123.netlify.app`
- 📝 You can **change the name** in Site Settings: `https://yourcompany.netlify.app`
- 🌐 **Share this URL** with your client
- 🔗 Add custom domain in Domain Settings

**Note:** If you get errors, Vercel is much easier for Next.js projects!

---

### Option 3: Traditional Hosting (Advanced)
1. Run `npm run build`
2. Upload the `.next` folder and files to your hosting
3. Set up Node.js environment
4. Run `npm start`
5. Access via your hosting provider's URL or domain

**Not recommended unless you have specific hosting requirements.**

## 💰 Cost Breakdown

- **Development**: FREE (Next.js + React are open source)
- **Hosting**: 
  - Vercel/Netlify: FREE (for hobby projects)
  - Traditional hosting: $3-10/month
- **Domain**: $10-15/year
- **Total First Year**: $10-150 depending on choices

## 📤 How to Show/Share Your Deployed Website

### Getting Your Live URL

**After deploying to Vercel or Netlify, you'll get a FREE URL:**

**Vercel:**
```
Format: https://your-project-name.vercel.app
Example: https://flytravel.vercel.app
```

**Netlify:**
```
Format: https://your-site-name.netlify.app
Example: https://flytravel.netlify.app
```

### Sharing With Your Client

**Option 1: Email/Message Template**
```
Hi [Client Name],

Your travel agency website is now LIVE! 🎉

🌐 Website URL: https://flytravel.vercel.app
🔧 Admin Panel: https://flytravel.vercel.app/admin

What you can do:
✅ View your website from any device
✅ Share the link with customers
✅ Login to admin panel to manage content
✅ Test booking inquiries

The website includes:
- Beautiful homepage with destinations
- Special offers section
- About Us page
- Contact form
- Easy-to-use admin dashboard

Let me know what you think!
```

**Option 2: Demo Meeting**
1. Open the live URL in browser
2. Share your screen (Zoom, Teams, etc.)
3. Walk through:
   - Homepage features
   - Destinations showcase
   - Admin dashboard
   - Mobile responsive design (resize browser)

**Option 3: QR Code**
- Generate QR code from the URL at: https://qr-code-generator.com
- Client can scan with phone to see mobile version instantly

### All Your Live URLs

Once deployed, share these links:

| Page | URL | Purpose |
|------|-----|---------|
| **Homepage** | `https://yoursite.vercel.app` | Show customers |
| **About Us** | `https://yoursite.vercel.app/about` | Company info |
| **Contact** | `https://yoursite.vercel.app/contact` | Get inquiries |
| **Admin** | `https://yoursite.vercel.app/admin` | Manage content |

### Adding a Custom Domain (Optional)

**After client approves, you can add their custom domain:**

1. **Buy domain** (e.g., `www.flytravel.com`) from:
   - Namecheap.com ($10-15/year)
   - GoDaddy.com
   - Google Domains

2. **Connect to Vercel/Netlify:**
   - In Vercel/Netlify dashboard
   - Go to "Domains" or "Domain Settings"
   - Add custom domain
   - Follow DNS configuration steps

3. **Result:**
   - Free URL still works: `https://flytravel.vercel.app`
   - Custom domain works: `https://www.flytravel.com`
   - Both point to same website!

### Testing Before Showing Client

**Checklist before sharing:**
- [ ] Homepage loads properly
- [ ] All images display
- [ ] Destinations show correctly
- [ ] Admin panel works
- [ ] Contact form displays
- [ ] Mobile version looks good (test on phone)
- [ ] No console errors (F12)
- [ ] Fast loading speed

### Troubleshooting

**If client says "website not loading":**
1. Make sure deployment finished (check Vercel/Netlify dashboard)
2. Wait 2-3 minutes after deployment
3. Try incognito/private browser window
4. Try different device/network
5. Check URL spelling (https://, not http://)

**If images not showing:**
- Check `next.config.ts` has correct image domains
- Redeploy after fixing

**Common client questions:**
- Q: "How do I update content?"
  A: Login to `/admin` page with credentials you provide

- Q: "Can I use my own domain?"
  A: Yes! After approval, we'll connect your custom domain

- Q: "Is this the final version?"
  A: Yes, this is live! We can make changes and redeploy anytime.

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
