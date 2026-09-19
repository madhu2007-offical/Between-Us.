import React from 'react';
import { Home, MessageCircleHeart, PlusCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  id: 'home' | 'log' | 'ask';
  label: string;
  icon: typeof Home;
  sublabel: string;
  highlight?: boolean;
}

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      sublabel: 'Rhythm'
    },
    {
      id: 'log',
      label: 'Log Today',
      icon: PlusCircle,
      sublabel: '3-Tap',
      highlight: true
    },
    {
      id: 'ask',
      label: 'Ask Sister',
      icon: MessageCircleHeart,
      sublabel: 'Q&A'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF8]/95 backdrop-blur-md border-t border-blush-100 pb-safe font-sans">
      <div className="max-w-md mx-auto grid grid-cols-3 px-3 py-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <div key={item.id} className="flex flex-col items-center justify-center">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center -mt-4 w-14 h-14 rounded-full shadow-petal transition-all transform active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-tr from-plum-950 to-plum-800 text-cream-50 ring-4 ring-blush-200'
                      : 'bg-gradient-to-tr from-plum-800 to-blush-500 text-cream-50 hover:brightness-105'
                  }`}
                  aria-label="Log Today's Flow and Mood"
                >
                  <Icon size={26} strokeWidth={2.4} />
                </button>
                <span className={`text-[11px] font-bold mt-1 tracking-tight ${
                  isActive ? 'text-plum-950 font-extrabold' : 'text-plum-700'
                }`}>
                  Log Today
                </span>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 min-h-[48px] rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? 'text-plum-950 font-bold bg-blush-50/80 shadow-xs'
                  : 'text-plum-600/80 hover:text-plum-950'
              }`}
              aria-label={`Go to ${item.label}`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-bold mt-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
