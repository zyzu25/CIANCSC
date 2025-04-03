import { ReactNode } from 'react';
import LeadershipCard from './LeadershipCard';

interface LeadershipSectionProps {
  title: string;
  description: string;
  titleBgColor: string;
  badgeColor: string;
  leaders: {
    role: string;
    nameLabel?: string;
    name: string;
    isRedacted?: boolean;
    discordLabel?: string;
    discord: string;
    robloxLabel?: string;
    roblox: string;
    vacant?: boolean;
    initials?: string;
  }[];
}

const LeadershipSection = ({ 
  title, 
  description, 
  titleBgColor, 
  badgeColor, 
  leaders 
}: LeadershipSectionProps) => {
  return (
    <div className="mb-12 bg-gray-900 rounded-lg overflow-hidden">
      <div className={`${titleBgColor} py-3 px-4`}>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leaders.map((leader, index) => (
            <LeadershipCard 
              key={index}
              role={leader.role}
              name={leader.name}
              isRedacted={leader.isRedacted}
              discord={leader.discord}
              roblox={leader.roblox}
              badge={{ color: badgeColor, text: "Command Staff" }}
              vacant={leader.vacant}
              initials={leader.initials}
              nameLabel={leader.nameLabel || "Name:"}
              discordLabel={leader.discordLabel || "Discord:"}
              robloxLabel={leader.robloxLabel || "Roblox:"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipSection;
