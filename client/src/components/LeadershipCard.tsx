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
    <div className="bg-gray-950 rounded p-4">
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 rounded-full ${badge.color} mr-3 flex items-center justify-center`}>
          <span className="text-xs">{initials}</span>
        </div>
        <div>
          <h4 className="text-sm font-bold">{role}</h4>
          <span className={`text-xs ${badge.color} px-2 py-0.5 rounded`}>{badge.text}</span>
        </div>
      </div>
      
      {vacant ? (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <span className="text-gray-400 col-span-3 text-center italic">POSITION VACANT</span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <span className="text-gray-400">{nameLabel}</span>
          <span className={`col-span-2 font-bold ${isRedacted ? 'redacted' : ''}`}>{name}</span>
          
          <span className="text-gray-400">{discordLabel}</span>
          <span className={`col-span-2 ${isRedacted ? 'redacted' : ''}`}>{discord}</span>
          
          <span className="text-gray-400">{robloxLabel}</span>
          <span className={`col-span-2 ${isRedacted ? 'redacted' : ''}`}>{roblox}</span>
        </div>
      )}
    </div>
  );
};

export default LeadershipCard;
