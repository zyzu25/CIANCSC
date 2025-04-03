import { User, Headset, Gamepad2 } from 'lucide-react';

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
  return (
    <div className="bg-gray-950 rounded-lg border border-gray-800 p-5 relative group shadow-md hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
      {/* Top left corner */}
      <div className="absolute top-0 left-0 w-7 h-7 border-t border-l border-primary opacity-40"></div>
      {/* Bottom right corner */}
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
        <div className="border border-dashed border-gray-700 rounded p-4 mt-3 text-center">
          <span className="text-gray-400 text-sm italic">This leadership position is currently vacant</span>
        </div>
      ) : (
        <div className="space-y-3 border-t border-gray-800 pt-3">
          <div className="flex items-center">
            <div className="w-7 mr-3 text-gray-500">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-0.5">{nameLabel}</div>
              <div className={`text-sm font-mono ${isRedacted ? 'redacted font-bold' : 'font-semibold'}`}>{name}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-7 mr-3 text-gray-500">
              <Headset className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-0.5">{discordLabel}</div>
              <div className={`text-sm font-mono ${isRedacted ? 'redacted' : ''}`}>{discord}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-7 mr-3 text-gray-500">
              <Gamepad2 className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-0.5">{robloxLabel}</div>
              <div className={`text-sm font-mono ${isRedacted ? 'redacted' : ''}`}>{roblox}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Security classification indicator */}
      {isRedacted && (
        <div className="absolute top-2 right-2">
          <div className="text-xs px-2 py-0.5 bg-primary text-white rounded-full opacity-70">
            CLASSIFIED
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipCard;
