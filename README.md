# TradeMentor Pro — Full Stack MERN Trading Community Platform

A complete, production-ready MERN stack website for a professional day trader with YouTube live streams, free Telegram updates, and a paid premium Telegram channel.

---

## ⚠️ Legal Disclaimer

> **Trading involves risk. We do not guarantee profits. All content is for educational purposes only.**
> SEBI Registration is not held by this platform. All trade analysis shared is purely educational.

---

## 🛠️ Tech Stack

| Layer       | Technology                                          |
|-------------|-----------------------------------------------------|
| Frontend    | React 18 + Vite + Tailwind CSS + React Router v6    |
| Backend     | Node.js + Express.js                               |
| Database    | MongoDB + Mongoose                                  |
| Auth        | JWT (jsonwebtoken + bcryptjs)                       |
| Payments    | Razorpay (demo-ready)                               |
| Charts      | Recharts                                            |

---

## 📁 Project Structure

```
tradementor-pro/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── marketUpdateController.js
│   │   ├── pricingController.js
│   │   ├── testimonialController.js
│   │   ├── contactController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── auth.js                # JWT + admin + premium middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── MarketUpdate.js
│   │   ├── PricingPlan.js
│   │   ├── Testimonial.js
│   │   ├── ContactMessage.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── marketUpdates.js
│   │   ├── pricing.js
│   │   ├── testimonials.js
│   │   ├── contact.js
│   │   ├── payment.js
│   │   └── admin.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── DisclaimerBanner.jsx
    │   │   │   ├── LoadingSpinner.jsx
    │   │   │   └── PricingCard.jsx
    │   │   └── admin/
    │   │       └── AdminSidebar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── About.jsx
    │   │   ├── MarketUpdates.jsx
    │   │   ├── PremiumChannel.jsx
    │   │   ├── YouTubeLive.jsx
    │   │   ├── Pricing.jsx
    │   │   ├── Testimonials.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── UserDashboard.jsx
    │   │   └── admin/
    │   │       ├── AdminDashboard.jsx
    │   │       ├── AdminUsers.jsx
    │   │       ├── AdminMarketUpdates.jsx
    │   │       ├── AdminPlans.jsx
    │   │       ├── AdminTestimonials.jsx
    │   │       ├── AdminMessages.jsx
    │   │       └── AdminPayments.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- Razorpay account (test keys from [dashboard.razorpay.com](https://dashboard.razorpay.com))

---

### 1. Clone / Place the Project

```bash
cd tradementor-pro
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tradementor_pro
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

**Seed the database** (creates sample data + admin user):

```bash
npm run seed
```

**Start the backend server:**

```bash
npm run dev        # development (nodemon)
npm start          # production
```

Server runs on: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

### 4. Demo Credentials (after seeding)

| Role  | Email                      | Password  |
|-------|----------------------------|-----------|
| Admin | admin@tradementor.pro      | admin123  |
| User  | user@demo.com              | demo123   |

---

## 💳 Razorpay Integration

1. Sign up at [razorpay.com](https://razorpay.com)
2. Go to Settings → API Keys → Generate Test Keys
3. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to backend `.env`
4. The Razorpay checkout script is loaded dynamically from CDN on the Pricing page
5. Use test card: `4111 1111 1111 1111`, any future expiry, any CVV

---

## 🔒 API Endpoints

### Auth
| Method | Endpoint             | Access  |
|--------|----------------------|---------|
| POST   | /api/auth/register   | Public  |
| POST   | /api/auth/login      | Public  |
| GET    | /api/auth/me         | Private |
| PUT    | /api/auth/profile    | Private |

### Market Updates
| Method | Endpoint                    | Access       |
|--------|-----------------------------|--------------|
| GET    | /api/market-updates         | Public       |
| GET    | /api/market-updates/:id     | Public       |
| POST   | /api/market-updates         | Admin only   |
| PUT    | /api/market-updates/:id     | Admin only   |
| DELETE | /api/market-updates/:id     | Admin only   |

### Pricing Plans
| Method | Endpoint               | Access     |
|--------|------------------------|------------|
| GET    | /api/pricing           | Public     |
| GET    | /api/pricing/admin/all | Admin only |
| POST   | /api/pricing           | Admin only |
| PUT    | /api/pricing/:id       | Admin only |
| DELETE | /api/pricing/:id       | Admin only |

### Payments
| Method | Endpoint                      | Access  |
|--------|-------------------------------|---------|
| POST   | /api/payments/create-order    | Private |
| POST   | /api/payments/verify          | Private |
| GET    | /api/payments/my-payments     | Private |
| GET    | /api/payments/all             | Admin   |

### Admin
| Method | Endpoint              | Access     |
|--------|-----------------------|------------|
| GET    | /api/admin/dashboard  | Admin only |
| GET    | /api/admin/users      | Admin only |
| PUT    | /api/admin/users/:id  | Admin only |
| DELETE | /api/admin/users/:id  | Admin only |

---

## 🎨 Pages Overview

| Page             | Route              | Description                              |
|------------------|--------------------|------------------------------------------|
| Home             | /                  | Hero, stats, features, updates, CTA      |
| About            | /about             | Trader bio, timeline, credentials        |
| Market Updates   | /market-updates    | Free educational analysis posts          |
| Premium Channel  | /premium           | Premium features, free vs premium table  |
| YouTube Live     | /youtube-live      | Embedded live stream + schedule          |
| Pricing          | /pricing           | Plans + Razorpay payment + FAQ           |
| Testimonials     | /testimonials      | Member reviews                           |
| Contact          | /contact           | Contact form + social links              |
| Login / Register | /login /register   | JWT auth forms                           |
| User Dashboard   | /dashboard         | Membership status, payments, quick links |
| Admin Dashboard  | /admin             | Stats, revenue chart, quick actions      |
| Admin Users      | /admin/users       | CRUD users, toggle premium               |
| Admin Updates    | /admin/market-updates | CRUD market updates                   |
| Admin Plans      | /admin/plans       | CRUD pricing plans                       |
| Admin Testimonials | /admin/testimonials | CRUD testimonials                      |
| Admin Messages   | /admin/messages    | View & reply to contact messages         |
| Admin Payments   | /admin/payments    | View all transactions                    |

---

## 🔧 Customization

### Update YouTube Channel
In `frontend/src/pages/YouTubeLive.jsx`:
```js
const YOUTUBE_CHANNEL_ID = 'UCxxxxxx'; // Replace with real channel ID
const YOUTUBE_HANDLE = '@optionedge9'; // Replace with real handle
```

### Update Telegram Links
Search for `optionedgetelugu` and `tradementorpro_premium` across components and replace with your actual Telegram channel usernames.

### Update Contact Email
In `Footer.jsx` and `Contact.jsx`, update `support@tradementor.pro`.

---

## 🚢 Production Deployment

### Backend (e.g., Railway / Render / VPS)
```bash
npm start
```
Set all environment variables in your hosting dashboard.

### Frontend (e.g., Vercel / Netlify)
```bash
npm run build
```
Set `VITE_API_URL` if deploying frontend separately, and update `vite.config.js` proxy accordingly.

---

## 📜 License

MIT — Free to use and customize for your trading community.

---

*Built with ❤️ for the Indian trading community.*
