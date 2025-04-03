import { useState, useEffect } from "react";
import { Shield, LockKeyhole, Database, Search } from "lucide-react";

const LoadingScreen = () => {
  // Facts to rotate through
  const facts = [
    "Founded 2025 under USDCE jurisdiction",
    "HUMINT operates under CIA Intelligence Directorate",
    "4 active units: Command Center, NCSCIA || Intelligence Agents, [REDACTED], [REDACTED]",
    "Specialized in counterintelligence operations",
    "USDCE Clearance Level CF-3 required for personnel"
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bootupPhase, setBootupPhase] = useState(0);
  
  // Boot-up messages that appear in sequence
  const bootSequence = [
    "INITIALIZING SECURE CONNECTION...",
    "LOADING ENCRYPTED PROTOCOLS...",
    "ESTABLISHING SECURE CHANNEL...",
    "VERIFYING CREDENTIALS...",
    "AUTHENTICATING SECURE ACCESS..."
  ];

  // Rotate through facts every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % facts.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Simulate loading progress and boot sequence
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 100);
    
    // Progress through boot sequence phases
    const phaseInterval = setInterval(() => {
      setBootupPhase(prev => {
        if (prev >= bootSequence.length - 1) {
          clearInterval(phaseInterval);
          return bootSequence.length - 1;
        }
        return prev + 1;
      });
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
    };
  }, []);
  
  // Current date and time
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* <!-- CLASSIFIED --> */}
      
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      {/* Static/noise background texture */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        pointerEvents: 'none'
      }}></div>
      
      {/* Status indicators */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 text-xs font-mono text-gray-500">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
          <span>SECURE CONNECTION</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-1"></div>
          <span>ENCRYPTING</span>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 flex items-center space-x-3 text-xs font-mono text-gray-500">
        <span>{formattedDate}</span>
        <span className="text-primary">{formattedTime}</span>
      </div>
      
      {/* NCSC Logo with enhanced effects */}
      <div className="w-40 h-40 rounded-full border-2 border-white p-3 mb-8 flex items-center justify-center shadow-[0_0_25px_rgba(179,0,0,0.5)] relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary opacity-30 rotating-badge"></div>
        
        {/* Inner rotating ring */}
        <div className="absolute inset-4 rounded-full border border-dashed border-primary opacity-20 rotation-reverse"></div>
        
        <svg width="130" height="130" xmlns="http://www.w3.org/2000/svg">
          <circle cx="65" cy="65" r="60" fill="#000" stroke="#b30000" strokeWidth="3"/>
          <circle cx="65" cy="65" r="50" fill="none" stroke="#b30000" strokeWidth="1" opacity="0.6"/>
          <text x="65" y="70" fontFamily="Courier New" fontSize="16" fontWeight="bold" fill="#fff" textAnchor="middle">NCSC</text>
          <path d="M65 15 A50 50 0 0 1 65 115 A50 50 0 0 1 65 15" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="3,3"/>
          
          {/* Add small dots around the circle */}
          {Array.from({length: 12}).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x = 65 + 60 * Math.cos(angle);
            const y = 65 + 60 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="1.5" fill={i % 3 === 0 ? "#b30000" : "#fff"} />;
          })}
        </svg>
      </div>
      
      {/* Title with better styling */}
      <div className="relative mb-6">
        <h1 className="text-3xl text-center font-bold tracking-wider">NCSC INTELLIGENCE HUB</h1>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      </div>
      
      {/* System status */}
      <div className="mb-2 text-xs text-gray-400 font-mono">
        System Status: <span className="text-green-500">OPERATIONAL</span> | 
        Security Level: <span className="text-primary">RESTRICTED</span>
      </div>
      
      {/* Rotating Facts with better styling */}
      <div className="text-sm mb-6 w-96 text-center min-h-[50px] px-4 py-3 border border-gray-800 rounded-md bg-gray-900/50 font-mono relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        <div className="terminal-text">
          <span className="text-primary">INTEL:</span> {facts[currentFactIndex]}
        </div>
      </div>
      
      {/* Boot sequence messages */}
      <div className="text-xs text-gray-400 mb-3 font-mono h-5 text-center terminal-text">
        {bootSequence[bootupPhase]}
      </div>
      
      {/* Loading Bar with percentage */}
      <div className="w-80 mb-6 flex flex-col items-center">
        <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800 mb-1">
          <div className="loader-bar rounded-full h-full"></div>
        </div>
        <div className="w-full flex justify-between text-xs text-gray-500 font-mono">
          <span>INITIALIZING</span>
          <span>{loadingProgress}%</span>
        </div>
      </div>
      
      {/* System log messages */}
      <div className="absolute bottom-6 left-6 right-6 text-xs text-gray-600 font-mono terminal-text">
        <div className="flex items-center space-x-2 mb-1">
          <Shield className="h-3 w-3" />
          <span>[NCSC.SYS] Initializing security protocols... <span className="text-green-600">COMPLETE</span></span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <LockKeyhole className="h-3 w-3" />
          <span>[NCSC.SYS] Establishing encrypted communication... <span className="text-green-600">COMPLETE</span></span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <Database className="h-3 w-3" />
          <span>[NCSC.SYS] Loading classified database... <span className="text-green-600">COMPLETE</span></span>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-3 w-3" />
          <span>[NCSC.SYS] Authenticating user credentials... <span className="text-primary animate-pulse">IN PROGRESS</span></span>
        </div>
      </div>
      
      {/* Red dots to indicate secure system access */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
