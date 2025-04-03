import { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import Footer from "./Footer";
import { useTheme } from "../hooks/useTheme";

interface LayoutProps {
  children: ReactNode;
  navigateToAbout: () => void;
  navigateToRecruitment: () => void;
}

const Layout = ({ children, navigateToAbout, navigateToRecruitment }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();
  
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'light-theme' : ''}`}>
      {/* Navigation */}
      <nav className="bg-background border-b border-primary">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={handleRefresh}
              className="text-white mr-4 p-1 hover:bg-secondary rounded-sm transition-colors"
              aria-label="Refresh page"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <a href="#" className="text-white font-bold">NCSC Intel Hub</a>
          </div>
          
          <div className="flex">
            <button 
              onClick={navigateToAbout} 
              className="text-gray-300 mx-2 hover:text-white transition-colors"
            >
              About
            </button>
            <button 
              onClick={navigateToRecruitment} 
              className="text-gray-300 mx-2 hover:text-white transition-colors"
            >
              Recruitment
            </button>
            <button
              onClick={toggleTheme}
              className="text-gray-300 mx-2 hover:text-white transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? '🌑' : '💡'}
            </button>
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
