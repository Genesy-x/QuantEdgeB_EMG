import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string; 
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, position }) => {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/60 to-gray-900/60 backdrop-blur-sm 
                    border border-gray-700/50 shadow-lg">
      <div className="mb-4 text-blue-400">"</div>
      <p className="mb-6 text-gray-300 italic leading-relaxed">{quote}</p>
      <div>
        <p className="font-semibold text-white">{author}</p>
        <p className="text-gray-400 text-sm">{position}</p>
      </div>
    </div>
  );
};