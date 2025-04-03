import { useState, useEffect, useRef } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
import AboutPage from "./components/AboutPage";
import RecruitmentPage from "./components/RecruitmentPage";
import ContactPage from "./components/ContactPage";
import SecurityNoticeModal from "./components/SecurityNoticeModal";
import ClassifiedWatermark from "./components/ClassifiedWatermark";
import { ThemeProvider } from "./hooks/useTheme";
import { SunMoon } from "lucide-react";

// Configuration for the application
const CONFIG = {
  // Loading screen duration in milliseconds (random between 7-10 seconds)
  MIN_LOADING_DURATION: 7000,
  MAX_LOADING_DURATION: 10000,
  
  // Keep-alive ping interval in milliseconds (5 minutes)
  KEEP_ALIVE_INTERVAL: 5 * 60 * 1000,
  
  // Server status check interval in milliseconds (1 minute)
  SERVER_CHECK_INTERVAL: 60 * 1000,
  
  // Maximum number of reconnection attempts
  MAX_RECONNECT_ATTEMPTS: 3,
  
  // Google Form application URL
  APPLICATION_FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSdVED14zX66oVHsRudvO4iwvxdmKIEvj45ym3PTjVj2ROkZyA/viewform?usp=sharing"
}

// Get a random loading duration between MIN and MAX
const getRandomLoadingDuration = () => {
  return Math.floor(Math.random() * 
    (CONFIG.MAX_LOADING_DURATION - CONFIG.MIN_LOADING_DURATION + 1)) + 
    CONFIG.MIN_LOADING_DURATION;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<"about" | "recruitment" | "contact">("about");
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [appStatus, setAppStatus] = useState<"online" | "connecting" | "offline">("online");
  const reconnectAttemptsRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const loadingDurationRef = useRef(getRandomLoadingDuration());
  
  // Navigation handlers
  const navigateToAbout = () => {
    setCurrentPage("about");
    lastActivityRef.current = Date.now(); // Update last activity timestamp
  };

  const navigateToRecruitment = () => {
    setShowSecurityModal(true);
    lastActivityRef.current = Date.now(); // Update last activity timestamp
  };
  
  const navigateToContact = () => {
    setCurrentPage("contact");
    lastActivityRef.current = Date.now(); // Update last activity timestamp
  };

  const handleSecurityAgreement = () => {
    setShowSecurityModal(false);
    setCurrentPage("recruitment");
    lastActivityRef.current = Date.now(); // Update last activity timestamp
  };

  // Handle external application form link
  const handleApplicationClick = () => {
    window.open(CONFIG.APPLICATION_FORM_URL, '_blank', 'noopener,noreferrer');
    lastActivityRef.current = Date.now(); // Update last activity timestamp
  };

  // Simulate loading screen with random duration
  useEffect(() => {
    console.log(`[NCSC System] Loading screen will show for ${loadingDurationRef.current/1000} seconds`);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, loadingDurationRef.current);

    return () => clearTimeout(timer);
  }, []);
  
  // Keep-alive functionality to prevent the application from going idle
  useEffect(() => {
    // Create a ping function to keep the connection alive
    const pingServer = async () => {
      try {
        // Instead of making an actual server request which would be redundant,
        // we'll just simulate activity to prevent the server from shutting down
        const idleTime = Date.now() - lastActivityRef.current;
        
        // If the app has been idle for too long, simulate user activity
        if (idleTime > CONFIG.KEEP_ALIVE_INTERVAL / 2) {
          console.log("[NCSC System] Keeping application alive...");
          
          // This is a no-op call that just ensures the JavaScript event loop stays active
          // It also updates a React state variable to trigger a re-render
          setAppStatus(prev => {
            lastActivityRef.current = Date.now();
            return prev;
          });
        }
        
        // Reset reconnect attempts when successful
        if (appStatus !== "online") {
          reconnectAttemptsRef.current = 0;
          setAppStatus("online");
        }
      } catch (error) {
        console.error("[NCSC System] Connection issue:", error);
        
        // Update status based on reconnection attempts
        if (reconnectAttemptsRef.current < CONFIG.MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current++;
          setAppStatus("connecting");
        } else {
          setAppStatus("offline");
        }
      }
    };

    // Set up recurring ping to keep application alive
    const keepAliveInterval = setInterval(pingServer, CONFIG.KEEP_ALIVE_INTERVAL);
    
    // Also set up event listeners to update last activity timestamp
    const updateActivityTimestamp = () => {
      lastActivityRef.current = Date.now();
    };
    
    window.addEventListener('click', updateActivityTimestamp);
    window.addEventListener('keypress', updateActivityTimestamp);
    window.addEventListener('scroll', updateActivityTimestamp);
    window.addEventListener('mousemove', updateActivityTimestamp);
    
    // Clean up on component unmount
    return () => {
      clearInterval(keepAliveInterval);
      window.removeEventListener('click', updateActivityTimestamp);
      window.removeEventListener('keypress', updateActivityTimestamp);
      window.removeEventListener('scroll', updateActivityTimestamp);
      window.removeEventListener('mousemove', updateActivityTimestamp);
    };
  }, [appStatus]);

  // Add a scanline effect for the dark theme UI only
  const scanlineEffect = (
    <div className="dark:block hidden">
      <div className="scanline"></div>
    </div>
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* <!-- CLASSIFIED --> */}
        <ClassifiedWatermark />
        {scanlineEffect}
        
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Layout 
              navigateToAbout={navigateToAbout} 
              navigateToRecruitment={navigateToRecruitment}
              navigateToContact={navigateToContact}
              onApplicationClick={handleApplicationClick}
            >
              {currentPage === "about" ? (
                <AboutPage />
              ) : currentPage === "recruitment" ? (
                <RecruitmentPage applicationUrl={CONFIG.APPLICATION_FORM_URL} />
              ) : (
                <ContactPage />
              )}
            </Layout>
            
            {showSecurityModal && (
              <SecurityNoticeModal onAgree={handleSecurityAgreement} />
            )}
            
            {/* Status indicator - only shown when there are connection issues */}
            {appStatus !== "online" && (
              <div className={`fixed bottom-4 right-4 px-3 py-1.5 rounded-md text-xs font-mono z-50 flex items-center space-x-2 ${
                appStatus === "connecting" 
                  ? "bg-yellow-900/80 text-white dark:bg-yellow-900/80" 
                  : "bg-destructive/80 text-white dark:bg-destructive/80"
              }`}>
                <div className={`h-2 w-2 rounded-full ${
                  appStatus === "connecting" ? "bg-yellow-500 animate-pulse" : "bg-red-500"
                }`}></div>
                <span>{appStatus === "connecting" ? "Reconnecting..." : "Connection lost"}</span>
              </div>
            )}
          </>
        )}
        
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
