import { ReactNode, useState, useEffect } from "react";
import { RefreshCw, Lock, Shield, FileText, AlertTriangle } from "lucide-react";
import Footer from "./Footer";
import { useTheme } from "../hooks/useTheme";

interface LayoutProps {
  children: ReactNode;
  navigateToAbout: () => void;
  navigateToRecruitment: () => void;
}

const Layout = ({ children, navigateToAbout, navigateToRecruitment }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();
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
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'light-theme' : ''}`}>
      {/* Navigation */}
      <nav className="bg-background border-b border-primary relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary opacity-30"></div>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={handleRefresh}
              className="text-white mr-4 p-1 hover:bg-secondary rounded transition-colors flex items-center space-x-1"
              aria-label="Refresh page"
            >
              <RefreshCw className="h-5 w-5" />
              <span className="text-xs font-mono hidden md:inline">REFRESH</span>
            </button>
            
            <a href="#" className="text-white font-bold flex items-center">
              <div className="h-7 w-7 bg-black rounded-full border border-primary mr-2 flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="font-mono tracking-wide">NATIONAL COUNTERINTELLIGENCE & SECURITY CENTER</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex text-xs font-mono text-gray-500 mr-4 border border-gray-800 rounded px-2 py-1">
              <span>{formattedTime}</span>
              <span className="mx-2">|</span>
              <span>{formattedDate}</span>
            </div>
            
            <button 
              onClick={navigateToAbout} 
              onMouseEnter={() => setNavHovered("about")}
              onMouseLeave={() => setNavHovered("")}
              className="text-gray-300 px-3 py-1 hover:text-white transition-colors rounded-md relative overflow-hidden"
            >
              <span className={`absolute inset-0 bg-primary ${navHovered === "about" ? "opacity-20" : "opacity-0"} transition-opacity`}></span>
              About
            </button>
            
            <button 
              onClick={navigateToRecruitment} 
              onMouseEnter={() => setNavHovered("recruitment")}
              onMouseLeave={() => setNavHovered("")}
              className="text-gray-300 px-3 py-1 hover:text-white transition-colors rounded-md relative overflow-hidden"
            >
              <span className={`absolute inset-0 bg-primary ${navHovered === "recruitment" ? "opacity-20" : "opacity-0"} transition-opacity`}></span>
              <div className="flex items-center">
                <span>Recruitment</span>
                <Lock className="h-3 w-3 ml-1" />
              </div>
            </button>
            
            <button
              onClick={toggleTheme}
              className="text-gray-300 p-2 hover:text-white transition-colors rounded-md bg-gray-900"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? '🌑' : '💡'}
            </button>
          </div>
        </div>
        
        {/* Status Indicator Bar */}
        <div className="bg-gray-900 text-xs border-t border-gray-800">
          <div className="container mx-auto px-4 py-1 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-gray-400">System Operational</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-1"></div>
                <span className="text-gray-400">Secure Connection</span>
              </div>
            </div>
            
            <div className="text-gray-400 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
              <span>USDCE CLEARANCE REQUIRED</span>
            </div>
          </div>
        </div>
      </nav>
      
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
