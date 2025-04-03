import { ReactNode } from 'react';
import LeadershipCard from './LeadershipCard';
import { Shield, CornerDownRight, User } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import ncscLogoPath from '../assets/NCSC.png';
import agentIconPath from '../assets/agent-icon.png';
import doiLogoPath from '../assets/DOI.webp';

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
    vacant?: boolean;
    initials?: string;
    profileImage?: string;
  }[];
}

const LeadershipSection = ({ 
  title, 
  description, 
  titleBgColor, 
  badgeColor, 
  leaders 
}: LeadershipSectionProps) => {
  const { isDark } = useTheme();
  
  return (
    <div className="mb-12 bg-card rounded-lg overflow-hidden border border-border shadow-lg relative corner-box">
      <div className={`${titleBgColor} py-3 px-4 flex items-center border-b border-border`}>
        {title === "HUMINT Division" && (
          <img src={agentIconPath} alt="Agent Icon" className="h-5 w-5 mr-2" />
        )}
        {title === "REDACTED" && (
          <img src={agentIconPath} alt="Agent Icon" className="h-5 w-5 mr-2" />
        )}
        {title === "Intelligence Directorate" && (
          <img src={doiLogoPath} alt="Directorate of Intelligence" className="h-5 w-5 mr-2" />
        )}
        {title !== "HUMINT Division" && title !== "REDACTED" && title !== "Intelligence Directorate" && (
          <img src={ncscLogoPath} alt="NCSC Logo" className="h-5 w-5 mr-2" />
        )}
        <h3 className="font-bold tracking-wide">{title}</h3>
      </div>
      
      <div className="p-6">
        <div className="flex items-start mb-6">
          <CornerDownRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Fancy connecting lines between cards */}
          <div className="absolute inset-0 hidden md:block">
            <div className="w-full h-full border-t border-dashed border-border opacity-30 transform translate-y-1/2"></div>
            <div className="h-full w-0 border-l border-dashed border-border opacity-30 transform translate-x-1/2"></div>
          </div>
          
          {leaders.map((leader, index) => (
            <LeadershipCard 
              key={index}
              role={leader.role}
              name={leader.name}
              isRedacted={leader.isRedacted}
              discord={leader.discord}
              badge={{ color: badgeColor, text: title }}
              vacant={leader.vacant}
              initials={leader.initials}
              nameLabel={leader.nameLabel || "Name:"}
              discordLabel={leader.discordLabel || "Discord:"}
              profileImage={leader.profileImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipSection;
