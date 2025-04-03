import { User, Headset, Gamepad2 } from 'lucide-react';
import { SiDiscord, SiRoblox } from "react-icons/si";
import { useTheme } from '../hooks/useTheme';

interface LeadershipCardProps {
  role: string;
  name: string;
  isRedacted?: boolean;
  discord: string;
  roblox: string;
  badge: {
    color: string;
    text: string;
  };
  vacant?: boolean;
  initials?: string;
  nameLabel: string;
  discordLabel: string;
  robloxLabel: string;
}

const LeadershipCard = ({ 
  role, 
  name, 
  isRedacted = false,
  discord, 
  roblox, 
  badge,
  vacant = false,
  initials = "",
  nameLabel,
  discordLabel,
  robloxLabel
}: LeadershipCardProps) => {
  const { isDark } = useTheme();
  
  return (
    <div className="card-hover rounded-lg p-5 relative group">
      {/* Corners for classified look */}
      <div className="absolute top-0 left-0 w-7 h-7 border-t border-l border-primary opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-7 h-7 border-b border-r border-primary opacity-40"></div>
      
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-full ${badge.color} mr-4 flex items-center justify-center shadow-lg relative overflow-hidden`}>
          {vacant ? (
            <span className="text-xs uppercase font-mono tracking-wider">Open</span>
          ) : (
            <>
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <span className="text-lg font-bold relative z-10">{initials}</span>
            </>
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold mb-1">{role}</h4>
          <span className={`text-xs ${badge.color} px-2 py-0.5 rounded-full text-white font-mono tracking-tight shadow-sm`}>
            {badge.text}
          </span>
        </div>
      </div>
      
      {vacant ? (
        <div className="border border-dashed border-border rounded p-4 mt-3 text-center">
          <span className="text-muted-foreground text-sm italic">This leadership position is currently vacant</span>
        </div>
      ) : (
        <div className="space-y-3 border-t border-border/50 pt-3">
          <div className="flex items-center">
            <div className="w-7 mr-3 text-muted-foreground">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-0.5">{nameLabel}</div>
              <div className={`text-sm font-mono ${isRedacted ? 'redacted font-bold' : 'font-semibold'}`}>{name}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-7 mr-3 text-muted-foreground">
              <SiDiscord className="h-4 w-4 discord-icon" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-0.5">{discordLabel}</div>
              <div className={`text-sm font-mono ${isRedacted ? 'redacted' : ''}`}>{discord}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-7 mr-3 text-muted-foreground">
              <SiRoblox className="h-4 w-4 roblox-icon" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-0.5">{robloxLabel}</div>
              <div className={`text-sm font-mono ${isRedacted ? 'redacted' : ''}`}>{roblox}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Security classification indicator */}
      {isRedacted && (
        <div className="absolute top-2 right-2">
          <div className="text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded-full opacity-80">
            CLASSIFIED
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipCard;
