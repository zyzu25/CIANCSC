import { ReactNode } from "react";

interface MissionAreaProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const MissionArea = ({ title, description, icon }: MissionAreaProps) => {
  return (
    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 card-hover">
      <div className="flex items-start mb-3">
        <div className="text-blue-500 mr-2">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default MissionArea;
