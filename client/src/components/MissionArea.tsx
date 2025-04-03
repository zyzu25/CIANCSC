import { ReactNode } from "react";

interface MissionAreaProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const MissionArea = ({ title, description, icon }: MissionAreaProps) => {
  return (
    <div className="bg-gray-950 p-6 rounded-lg border border-gray-800 shadow-md transition-all duration-300 hover:shadow-primary/10 hover:border-gray-700 relative group">
      {/* Corner elements */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
      
      <div className="flex items-center mb-4 relative">
        {/* Icon with decorative circle */}
        <div className="h-12 w-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mr-4 text-primary shadow-md group-hover:scale-110 transition-transform duration-300">
          {icon}
          <div className="absolute inset-0 rounded-full border border-primary opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
        
        <h3 className="text-lg font-bold tracking-wide group-hover:text-primary transition-colors duration-300">{title}</h3>
      </div>
      
      <div className="pl-4 border-l border-gray-800 group-hover:border-primary/30 transition-colors duration-300">
        <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
      </div>
      
      {/* Subtle indicator at bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary opacity-0 group-hover:opacity-50 group-hover:w-full transition-all duration-300 rounded-b-lg"></div>
    </div>
  );
};

export default MissionArea;
