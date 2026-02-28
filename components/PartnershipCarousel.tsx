
import React from 'react';

const partners = [
  { name: 'Caro Faroured College', color: 'text-emerald-400', icon: 'shield' },
  { name: 'Deldiv School', color: 'text-cyan-400', icon: 'book' },
  { name: 'Zion Anglican School', color: 'text-slate-200', icon: 'cap' },
  { name: 'Chuzza Eaglet College', color: 'text-yellow-500', icon: 'shield' },
  { name: 'Cardoso Cathalic School', color: 'text-green-500', icon: 'book' },
  { name: 'Tos Fadun College', color: 'text-orange-400', icon: 'cap' },
  { name: 'Dandic Leader School', color: 'text-blue-400', icon: 'shield' },
  { name: 'UCEE College', color: 'text-blue-400', icon: 'book' },
  { name: 'Righteous View School', color: 'text-blue-400', icon: 'cap' },
  { name: 'Sucvic College', color: 'text-cyan-400', icon: 'shield' },
  { name: 'Bequest College', color: 'text-blue-400', icon: 'book' },
];

const SchoolIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'shield':
      return (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      );
    case 'book':
      return (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4zm12 16H6V4h5v9l2.5-1.5L16 13V4h2v16z" />
        </svg>
      );
    case 'cap':
      return (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.85 9L12 4.55 20.15 9 12 13.45 3.85 9zM12 15.11l-5-2.73v3.12c0 .9.67 1.63 1.5 1.63s1.5-.73 1.5-1.63v-3.12l2 1.09 2-1.09v3.12c0 .9.67 1.63 1.5 1.63s1.5-.73 1.5-1.63v-3.12l-5 2.73z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L1 12l11 10 11-10L12 2zm0 18.5L3.5 12 12 5.5l8.5 6.5-8.5 6.5z" />
        </svg>
      );
  }
};

const PartnershipCarousel: React.FC = () => {
  // Duplicate the array to create the infinite scroll effect
  const extendedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="w-full bg-slate-900 overflow-hidden border-y border-slate-800 py-12 relative">
      {/* Decorative gradient overlays for soft fade-out effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

      {/* Scroller Container */}
      <div className="flex animate-infinite-scroll group hover:[animation-play-state:paused]">
        {extendedPartners.map((partner, index) => (
          <div
            key={index}
            className="flex-none flex items-center space-x-3 px-12 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-110 cursor-default"
          >
            {/* Logo Placeholder */}
            <div className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner ${partner.color}`}>
               <SchoolIcon type={partner.icon || ''} />
            </div>
            {/* Brand Name */}
            <span className="text-xl font-black tracking-tight text-slate-500 hover:text-white transition-colors">
              {partner.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
      
      <div className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50">
        Some of the Schools, we've partnered with
      </div>
    </div>
  );
};

export default PartnershipCarousel;
