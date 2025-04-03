import { ReactNode, useState, useEffect } from "react";
import { RefreshCw, Lock, Shield, AlertTriangle, FileText, Moon, Sun, ExternalLink, MailIcon } from "lucide-react";
import { SiDiscord, SiRoblox } from "react-icons/si";
import Footer from "./Footer";
import { useTheme } from "../hooks/useTheme";

interface LayoutProps {
  children: ReactNode;
  navigateToAbout: () => void;
  navigateToRecruitment: () => void;
  navigateToContact: () => void;
  onApplicationClick?: () => void;
}

const Layout = ({ children, navigateToAbout, navigateToRecruitment, navigateToContact, onApplicationClick }: LayoutProps) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [navHovered, setNavHovered] = useState("");
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleRefresh = () => {
    window.location.reload();
  };

  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation */}
      <nav className="bg-card border-b border-border relative">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-primary opacity-30"></div>
        <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={handleRefresh}
              className="text-foreground mr-4 p-1 hover:bg-secondary rounded-md transition-colors flex items-center space-x-1"
              aria-label="Refresh page"
            >
              <RefreshCw className="h-5 w-5" />
              <span className="text-xs font-mono hidden md:inline">REFRESH</span>
            </button>
            
            <a href="#" className="text-foreground font-bold flex items-center">
              <div className="h-8 w-8 dark:bg-black bg-white rounded-full border border-primary mr-2 flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="font-mono tracking-wide text-sm md:text-base">NATIONAL COUNTERINTELLIGENCE & SECURITY CENTER</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
            <div className="hidden md:flex text-xs font-mono text-muted-foreground border border-border/30 rounded-md px-2 py-1 bg-background/50">
              <span>{formattedTime}</span>
              <span className="mx-2">|</span>
              <span>{formattedDate}</span>
            </div>
            
            <button 
              onClick={navigateToAbout} 
              onMouseEnter={() => setNavHovered("about")}
              onMouseLeave={() => setNavHovered("")}
              className="text-foreground/90 px-3 py-1.5 hover:text-foreground transition-colors rounded-md relative overflow-hidden"
            >
              <span className={`absolute inset-0 bg-primary ${navHovered === "about" ? "opacity-10" : "opacity-0"} transition-opacity`}></span>
              About
            </button>
            
            <button 
              onClick={navigateToRecruitment} 
              onMouseEnter={() => setNavHovered("recruitment")}
              onMouseLeave={() => setNavHovered("")}
              className="text-foreground/90 px-3 py-1.5 hover:text-foreground transition-colors rounded-md relative overflow-hidden"
            >
              <span className={`absolute inset-0 bg-primary ${navHovered === "recruitment" ? "opacity-10" : "opacity-0"} transition-opacity`}></span>
              <div className="flex items-center">
                <span>Recruitment</span>
                <Lock className="h-3 w-3 ml-1" />
              </div>
            </button>
            
            <button 
              onClick={navigateToContact} 
              onMouseEnter={() => setNavHovered("contact")}
              onMouseLeave={() => setNavHovered("")}
              className="text-foreground/90 px-3 py-1.5 hover:text-foreground transition-colors rounded-md relative overflow-hidden"
            >
              <span className={`absolute inset-0 bg-primary ${navHovered === "contact" ? "opacity-10" : "opacity-0"} transition-opacity`}></span>
              <div className="flex items-center">
                <span>Contact</span>
                <MailIcon className="h-3 w-3 ml-1" />
              </div>
            </button>
            
            {onApplicationClick && (
              <button 
                onClick={onApplicationClick}
                onMouseEnter={() => setNavHovered("apply")}
                onMouseLeave={() => setNavHovered("")}
                className="button-hover px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
              >
                <span>Apply</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </button>
            )}
            
            <button
              onClick={toggleTheme}
              className="text-foreground/90 p-2 hover:text-foreground transition-colors rounded-md bg-secondary/50"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        {/* Status Indicator Bar */}
        <div className="bg-secondary/50 text-xs border-t border-border/30">
          <div className="container mx-auto px-4 py-1 flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-success mr-1"></div>
                <span className="text-muted-foreground">System Operational</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-1"></div>
                <span className="text-muted-foreground">Secure Connection</span>
              </div>
            </div>
            
            <div className="text-muted-foreground flex items-center mt-1 md:mt-0">
              <AlertTriangle className="h-3 w-3 mr-1 text-accent" />
              <span>USDCE CLEARANCE REQUIRED</span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Platform Icons bar in dark mode only */}
      <div className="dark:block hidden bg-black/90 py-1.5 border-b border-primary/20">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex items-center">
            <span className="text-xs text-gray-400">For inquiries, use the <span className="text-white">Contact</span> page</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;