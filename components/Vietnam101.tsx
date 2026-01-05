
import React, { useState } from 'react';

const Vietnam101: React.FC = () => {
  const [activeSub, setActiveSub] = useState<'before' | 'after'>('before');

  const guides = {
    before: [
      { title: 'Visa Requirements', icon: '🎫', content: 'Most nationalities can apply for an E-visa (30-90 days). Check your country specific status.' },
      { title: 'Currency & Exchange', icon: '💵', content: 'VND is the currency. Avoid exchanging at airports; look for gold shops in the city for better rates.' },
      { title: 'SIM & Connectivity', icon: '📶', content: 'Viettel has the best coverage. Buy at authorized shops, avoid tourist stalls for better pricing.' }
    ],
    after: [
      { title: 'Essential Apps', icon: '📱', content: 'Grab, Be, and Xanh SM (EV taxis) are must-haves for transport and food delivery.' },
      { title: 'Cultural Etiquette', icon: '🏮', content: 'Dress modestly at temples. Take off shoes when entering homes. Smile is the best currency.' },
      { title: 'Emergency Numbers', icon: '🆘', content: 'Police: 113, Ambulance: 115, Fire: 114. Keep your embassy address saved.' }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Vietnam 101</h2>
        <p className="text-slate-600">Essential knowledge for every traveler in Vietnam.</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-slate-200 p-1 rounded-2xl flex">
          <button 
            onClick={() => setActiveSub('before')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeSub === 'before' ? 'bg-white shadow-lg text-red-600' : 'text-slate-500'}`}
          >
            Before You Go
          </button>
          <button 
            onClick={() => setActiveSub('after')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeSub === 'after' ? 'bg-white shadow-lg text-red-600' : 'text-slate-500'}`}
          >
            When You Arrive
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {guides[activeSub].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="text-4xl mb-6">{item.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.content}</p>
            <button className="mt-6 text-red-600 font-bold text-sm flex items-center hover:translate-x-2 transition-transform">
              Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        ))}
      </div>

      {activeSub === 'after' && (
        <div className="mt-16 bg-red-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl font-serif font-bold mb-4">Basic Vietnamese Phrases</h3>
              <p className="mb-8 text-red-100">Connect with locals with these simple words.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { vi: 'Xin chào', en: 'Hello' },
                  { vi: 'Cảm ơn', en: 'Thank you' },
                  { vi: 'Bao nhiêu?', en: 'How much?' },
                  { vi: 'Ngon lắm!', en: 'Delicious!' }
                ].map(phrase => (
                  <div key={phrase.vi} className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
                    <p className="font-bold text-xl">{phrase.vi}</p>
                    <p className="text-sm text-red-200">{phrase.en}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
               <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
        </div>
      )}
    </div>
  );
};

export default Vietnam101;
