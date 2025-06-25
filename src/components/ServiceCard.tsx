import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-blue-900/60 
                   hover:shadow-[0_0_15px_rgba(30,64,175,0.15)] transition-all duration-300 h-full 
                   flex flex-col group">
      <div className="mb-4 p-3 rounded-full bg-blue-900/20 w-fit group-hover:bg-blue-900/30 
                     transition-all duration-300">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-white 
                     transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};