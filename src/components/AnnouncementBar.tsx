import React from 'react';
import { HeroPill } from './ui/hero-pill';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center py-2 bg-black/20 backdrop-blur-sm pointer-events-none">
      <div className="pointer-events-auto">
        <HeroPill 
          href="/documentation"
          label="Get Free Indicators"
          announcement="🎁 Free"
          className="bg-blue-500/20 ring-blue-400/30 [&_div]:bg-blue-400/90 [&_div]:text-blue-900 [&_p]:text-blue-300 [&_svg_path]:fill-blue-300"
        />
      </div>
    </div>
  );
};