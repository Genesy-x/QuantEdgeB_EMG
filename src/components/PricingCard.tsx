import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  isPopular = false,
}) => {
  return (
    <div className={`
      relative overflow-hidden rounded-xl p-0.5
      ${isPopular ? 'bg-gradient-to-b from-blue-700 to-blue-900' : 'bg-gray-800'}
      transition-transform duration-300 hover:scale-105
    `}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-blue-700 text-xs uppercase py-1 px-3 text-white font-bold rounded-bl-lg">
          Popular
        </div>
      )}
      
      <div className="p-6 h-full bg-gray-900 rounded-[10px] flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <div className="mb-4">
            <span className="text-3xl font-bold text-white">{price}</span>
            {price !== 'Custom' && <span className="text-gray-400">/month</span>}
          </div>
        </div>
        
        <ul className="space-y-3 mb-6 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button 
          className={`
            w-full py-3 rounded-lg font-medium transition-all duration-300
            ${isPopular 
              ? 'bg-blue-700 text-white hover:bg-blue-600 shadow-lg hover:shadow-blue-700/20' 
              : 'bg-gray-800 text-white hover:bg-gray-700'}
          `}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};