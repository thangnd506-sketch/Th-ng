
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import VietnamMap from './components/VietnamMap';
import AIPlanner from './components/AIPlanner';
import FoodExplorer from './components/FoodExplorer';
import Vietnam101 from './components/Vietnam101';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-8 pb-32 animate-in fade-in duration-500">
            {/* Header / Hero */}
            <div className="px-6 pt-12 pb-4">
              <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">Vietnam Explorer</p>
              <h1 className="text-3xl font-serif font-bold text-slate-900 leading-tight">
                Việt Nam hôm nay <br/>có gì mới?
              </h1>
            </div>

            {/* AI Call-to-action Card */}
            <div className="px-6">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-red-200 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Trợ lý AI Du lịch</h3>
                  <p className="text-sm text-red-100 mb-4 opacity-80 leading-relaxed">Để Gemini giúp bạn thiết kế chuyến đi hoàn hảo chỉ trong vài giây.</p>
                  <button 
                    onClick={() => setActiveTab('planner')}
                    className="bg-white text-red-600 px-6 py-3 rounded-2xl text-sm font-bold shadow-lg active:scale-95 transition-transform"
                  >
                    Bắt đầu ngay
                  </button>
                </div>
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
              </div>
            </div>

            {/* Smart Interactive Map Section */}
            <section id="map-section" className="px-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl font-bold text-slate-800">Bản đồ thông minh</h2>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                </div>
              </div>
              <VietnamMap />
            </section>

            {/* Quick Destinations Scroll */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-6">
                <h2 className="text-xl font-bold text-slate-800">Top điểm đến</h2>
                <span className="text-xs font-bold text-red-600">Xem hết</span>
              </div>
              <div className="flex overflow-x-auto px-6 space-x-4 no-scrollbar pb-4">
                {[
                  { name: 'Vịnh Hạ Long', tag: 'Kỳ quan', img: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=400' },
                  { name: 'Phố cổ Hội An', tag: 'Văn hóa', img: 'https://images.unsplash.com/photo-1599708153386-62e2d0903332?q=80&w=400' },
                  { name: 'Đà Lạt', tag: 'Lãng mạn', img: 'https://images.unsplash.com/photo-1585038896038-5117ad133671?q=80&w=400' }
                ].map(item => (
                  <div key={item.name} className="flex-shrink-0 w-64 h-80 relative rounded-[2rem] overflow-hidden shadow-xl active:scale-95 transition-transform">
                    <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="bg-red-600 text-[10px] font-black uppercase text-white px-2 py-1 rounded-lg mb-2 inline-block">
                        {item.tag}
                      </span>
                      <h4 className="text-xl font-bold text-white">{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nearby Food Teaser */}
            <section className="px-6">
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Đói bụng rồi? 🍲</h3>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">Hàng ngàn quán ăn ngon gần bạn đang chờ AI gợi ý.</p>
                    <button 
                      onClick={() => setActiveTab('food')}
                      className="bg-white text-slate-900 px-8 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-transform"
                    >
                      Tìm quán ngon
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 blur-[80px] rounded-full"></div>
               </div>
            </section>
          </div>
        );
      case 'planner': return <div className="pb-32"><AIPlanner /></div>;
      case 'food': return <div className="pb-32"><FoodExplorer /></div>;
      case 'guide': return <div className="pb-32"><Vietnam101 /></div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 max-w-md mx-auto shadow-2xl overflow-x-hidden relative">
      <main className="min-h-screen">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
