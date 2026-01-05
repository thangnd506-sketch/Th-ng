
import React from 'react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Khám phá', icon: '🏠' },
    { id: 'home', label: 'Bản đồ', icon: '📍', isMap: true }, // Map trigger
    { id: 'planner', label: 'Lịch trình', icon: '📅' },
    { id: 'food', label: 'Ẩm thực', icon: '🍲' },
    { id: 'guide', label: 'Cẩm nang', icon: '📖' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map(tab => (
          <button
            key={tab.label}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.isMap) {
                document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`flex flex-col items-center justify-center w-full transition-all ${
              activeTab === tab.id ? 'text-red-600 scale-110' : 'text-slate-400'
            }`}
          >
            <span className="text-xl mb-1">{tab.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
