require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const MarketUpdate = require('./models/MarketUpdate');
const PricingPlan = require('./models/PricingPlan');
const Testimonial = require('./models/Testimonial');

const seed = async () => {
  await connectDB();

  // Clear existing
  await User.deleteMany({});
  await MarketUpdate.deleteMany({});
  await PricingPlan.deleteMany({});
  await Testimonial.deleteMany({});

  // Admin user
  await User.create({
    name: 'Admin User',
    email: 'admin@tradementor.pro',
    password: 'admin123',
    role: 'admin',
  });

  // Regular user
  await User.create({
    name: 'Rahul Sharma',
    email: 'user@demo.com',
    password: 'demo123',
    role: 'user',
    isPremium: true,
    premiumExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  // Market Updates
  await MarketUpdate.insertMany([
    {
      title: 'Nifty 50 Levels to Watch This Week',
      description: 'The Nifty 50 is trading near critical resistance at 22,400. A breakout above this level could push it to 22,800. Support is placed at 21,900. Traders should watch for volume confirmation before entering positions.',
      category: 'Index',
      tags: ['Nifty', 'Weekly Analysis'],
    },
    {
      title: 'Bank Nifty Technical Analysis — Short Setup',
      description: 'Bank Nifty has formed a bearish engulfing pattern on the daily chart near 47,500. RSI shows divergence. Watch for a pullback to 46,800 in the coming sessions.',
      category: 'Index',
      tags: ['Bank Nifty', 'Short Setup'],
    },
    {
      title: 'Reliance Industries — Breakout Watch',
      description: 'Reliance is consolidating in a tight range between 2,850–2,920. A clean breakout with volume above 2,920 could trigger a move towards 3,100. Stop loss at 2,820.',
      category: 'Equity',
      tags: ['Reliance', 'Breakout'],
    },
    {
      title: 'Gold MCX — Trend Analysis',
      description: 'Gold on MCX has held the 61,000 support firmly. The trend remains bullish. Target levels are 62,500 and 63,200. Safe entry on dips near 61,200.',
      category: 'Commodity',
      tags: ['Gold', 'MCX'],
    },
    {
      title: 'Crude Oil Update — Volatility Expected',
      description: 'Crude Oil futures are facing resistance near $85. OPEC+ meeting outcome this week could drive sharp moves. Risk management is crucial — keep position sizes small.',
      category: 'Commodity',
      tags: ['Crude Oil', 'OPEC'],
    },
  ]);

  // Pricing Plans
  await PricingPlan.insertMany([
    {
      name: 'Starter',
      price: 999,
      duration: 30,
      durationLabel: '1 Month',
      features: [
        'Premium Telegram Channel Access',
        'Daily Trade Setups',
        'Intraday & Swing Calls',
        'Risk Management Guidance',
        'Member Support Group',
      ],
      isActive: true,
      isPopular: false,
    },
    {
      name: 'Pro',
      price: 2499,
      duration: 90,
      durationLabel: '3 Months',
      features: [
        'Everything in Starter',
        'Options Strategy Calls',
        'F&O Trade Analysis',
        'Weekly Market Webinars',
        'Priority Support',
        'PDF Study Material',
      ],
      isActive: true,
      isPopular: true,
    },
    {
      name: 'Elite',
      price: 7999,
      duration: 365,
      durationLabel: '1 Year',
      features: [
        'Everything in Pro',
        'One-on-One Mentorship Session',
        'Personal Portfolio Review',
        'Exclusive Research Reports',
        'Lifetime Community Access',
        'Early Access to New Features',
      ],
      isActive: true,
      isPopular: false,
    },
  ]);

  // Testimonials
  await Testimonial.insertMany([
    {
      name: 'Ankit Verma',
      profession: 'Software Engineer, Hyderabad',
      message: 'Joined the premium channel 3 months ago. The trade setups are well-researched with clear entry/exit levels. My understanding of the market has improved significantly.',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ankit',
    },
    {
      name: 'Priya Nair',
      profession: 'CA, Mumbai',
      message: 'As a CA I was always skeptical of trading communities. TradeMentor Pro is different — transparent, educational, and the risk management advice alone is worth the subscription.',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    },
    {
      name: 'Rajesh Gupta',
      profession: 'Retired Professional, Delhi',
      message: 'The weekly webinars and PDF materials helped me understand options trading from scratch. Patient explanations and no unrealistic promises — very trustworthy.',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    },
    {
      name: 'Sneha Patil',
      profession: 'Marketing Manager, Pune',
      message: 'Started with the free Telegram channel and was so impressed I upgraded to Premium. The quality of analysis is consistent and the community is very supportive.',
      rating: 4,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    },
    {
      name: 'Karthik Rao',
      profession: 'Business Owner, Bangalore',
      message: 'The YouTube live streams during market hours are incredibly educational. I\'ve learned more in 2 months here than in 2 years of trading on my own.',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik',
    },
    {
      name: 'Meera Singh',
      profession: 'Teacher, Jaipur',
      message: 'Very happy with the one-on-one mentorship session. Got my portfolio reviewed and received practical, actionable advice specific to my risk appetite.',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
    },
  ]);

  console.log('✅ Seed data inserted successfully!');
  console.log('Admin: admin@tradementor.pro / admin123');
  console.log('User:  user@demo.com / demo123');
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
