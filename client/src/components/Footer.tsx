import { Lock, AlertTriangle, Mail } from 'lucide-react';
import { SiDiscord } from "react-icons/si";
import { useTheme } from "../hooks/useTheme";
import ncscLogo from "../assets/ncsc-logo.png";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className="bg-card border-t border-border/50 mt-12 relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={ncscLogo} alt="NCSC Logo" className="h-8 w-8 mr-2" />
            <span className="text-sm font-bold tracking-wider">NCSC INTELLIGENCE HUB</span>
          </div>
          
          <div className="flex space-x-8 text-xs text-muted-foreground">
            <div className="flex flex-col items-center">
              <div className="mb-1 text-foreground/80 font-semibold">FOUNDED</div>
              <div>2025</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-1 text-foreground/80 font-semibold">JURISDICTION</div>
              <div>USDCE</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-1 text-foreground/80 font-semibold">CLASSIFICATION</div>
              <div className="text-primary">TOP SECRET</div>
            </div>
          </div>
        </div>
        

        
        {/* Security classification bar */}
        <div className="border-t border-border/50 pt-4 pb-1 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-xs text-muted-foreground font-mono mb-3 sm:mb-0">
            SECURITY CLASSIFICATION: <span className="text-primary">RESTRICTED</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-xs text-muted-foreground">
              <Lock className="h-3 w-3 mr-1" />
              <span>ENCRYPTED COMMS</span>
            </div>
            
            <div className="flex items-center text-xs text-primary font-mono font-semibold px-3 py-1 border border-primary/30 rounded-sm">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>USDCE EYES ONLY</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom copyright bar */}
      <div className="dark:bg-black bg-secondary/30 py-2 text-center text-xs text-muted-foreground font-mono">
        NATIONAL COUNTERINTELLIGENCE & SECURITY CENTER • UNAUTHORIZED ACCESS PROHIBITED
      </div>
    </footer>
  );
};

export default Footer;
