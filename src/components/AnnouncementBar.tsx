import React from 'react';
import { HeroPill } from './ui/hero-pill';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center py-3 pointer-events-none">
      {/* Glassy background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-blue-950/30 to-slate-900/20 backdrop-blur-xl border-b border-blue-900/20"></div>
      
      {/* Content */}
      <div className="relative pointer-events-auto">
        <HeroPill 
          href="/documentation"
          label="Get Free Indicators"
          announcement="🎁 Free"
          className="bg-gradient-to-r from-blue-950/40 via-blue-900/50 to-blue-950/40 backdrop-blur-md ring-1 ring-blue-400/20 border border-blue-500/10 shadow-lg shadow-blue-900/20 [&_div]:bg-gradient-to-r [&_div]:from-blue-400/90 [&_div]:to-blue-500/90 [&_div]:text-blue-950 [&_div]:font-semibold [&_div]:shadow-sm [&_p]:text-blue-200 [&_p]:font-medium [&_svg_path]:fill-blue-200 hover:ring-blue-400/40 hover:shadow-blue-900/40 hover:[&_div]:from-blue-300/95 hover:[&_div]:to-blue-400/95 hover:[&_p]:text-blue-100 hover:[&_svg_path]:fill-blue-100"
        />
      </div>
    </div>
  );
};