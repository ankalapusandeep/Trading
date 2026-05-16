import React from 'react';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

// Replace CHANNEL_ID with actual YouTube channel ID
const YOUTUBE_CHANNEL_ID = 'UCxxxxxx';
const YOUTUBE_HANDLE = '@tradementorpro';
const FEATURED_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'Nifty & Bank Nifty Analysis — Weekly Outlook' },
  { id: 'dQw4w9WgXcQ', title: 'Options Trading for Beginners — Live Session' },
  { id: 'dQw4w9WgXcQ', title: 'How to Read Charts Like a Pro Trader' },
];

export default function YouTubeLive() {
  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <DisclaimerBanner />
      <section className="py-16 mesh-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="live-dot inline-flex items-center text-red-400 text-sm font-medium mb-3">LIVE</span>
          <h1 className="section-title">YouTube <span className="gradient-text">Live Sessions</span></h1>
          <p className="section-subtitle">Watch live market analysis and trading education sessions on YouTube.</p>
          <p className="text-amber-400/70 text-xs mt-3">⚠️ Educational content only. Not financial advice.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://www.youtube.com/${YOUTUBE_HANDLE}/live`} target="_blank" rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 flex items-center justify-center gap-2">
              ▶ Watch Live on YouTube
            </a>
            <a href={`https://www.youtube.com/${YOUTUBE_HANDLE}`} target="_blank" rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2">
              Subscribe to Channel
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        {/* Live Stream Embed */}
        <div className="mb-12">
          <h2 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Current / Recent Live Stream
          </h2>
          <div className="relative w-full rounded-2xl overflow-hidden bg-dark-600 border border-white/5" style={{paddingTop: '56.25%'}}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}`}
              title="TradeMentor Pro Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-slate-500 text-xs mt-2 text-center">If no live stream is active, the latest video will show. Subscribe and set notifications to never miss a session.</p>
        </div>

        {/* Featured Videos */}
        <h2 className="text-white font-semibold text-xl mb-4">Recent Educational Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_VIDEOS.map((v, i) => (
            <div key={i} className="card group">
              <div className="relative rounded-lg overflow-hidden bg-dark-600" style={{paddingTop:'56.25%'}}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="text-white text-sm font-medium mt-3 group-hover:text-brand-400 transition-colors">{v.title}</h3>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div className="mt-12 card border-brand-500/20">
          <h3 className="text-white font-semibold text-lg mb-4">📅 Live Session Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { day: 'Mon – Fri', time: '9:00 AM – 10:00 AM', label: 'Pre-Market Analysis' },
              { day: 'Mon – Fri', time: '12:00 PM – 1:00 PM', label: 'Intraday Mid-Session' },
              { day: 'Sunday', time: '6:00 PM – 7:30 PM', label: 'Weekly Market Outlook' },
            ].map((s, i) => (
              <div key={i} className="bg-dark-600 rounded-lg p-4">
                <p className="text-brand-400 font-medium text-sm">{s.label}</p>
                <p className="text-white font-semibold mt-1">{s.time}</p>
                <p className="text-slate-400 text-xs mt-0.5">{s.day}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-4">Times are in IST. Schedule may vary. Subscribe with notifications enabled to get alerts.</p>
        </div>
      </section>
    </div>
  );
}
