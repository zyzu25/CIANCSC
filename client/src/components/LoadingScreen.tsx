import { useState, useEffect } from "react";

const LoadingScreen = () => {
  // Facts to rotate through
  const facts = [
    "Founded 2023 under USDCE jurisdiction",
    "HUMINT operates under CIA Intelligence Directorate",
    "4 active units: Command Center, NCSCIA || Intelligence Agents, [REDACTED], [REDACTED]"
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Rotate through facts every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % facts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col items-center justify-center">
      {/* <!-- CLASSIFIED --> */}
      
      {/* NCSC Logo Placeholder (white outline) */}
      <div className="w-32 h-32 rounded-full border-2 border-white p-2 mb-8 flex items-center justify-center">
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#000" stroke="#b30000" strokeWidth="2"/>
          <text x="50" y="57" fontFamily="Courier New" fontSize="14" fill="#fff" textAnchor="middle">NCSC</text>
        </svg>
      </div>
      
      {/* Title */}
      <h1 className="text-2xl mb-6 text-center">NCSC Intelligence Hub</h1>
      
      {/* Rotating Facts */}
      <div className="text-sm mb-6 w-80 text-center h-12">
        {facts[currentFactIndex]}
      </div>
      
      {/* Loading Bar */}
      <div className="w-64 h-1 bg-gray-800 mb-6">
        <div className="loader-bar"></div>
      </div>
      
      <p className="text-sm text-gray-500 typing-text">
        VERIFYING CREDENTIALS - Authenticating secure access...
      </p>
    </div>
  );
};

export default LoadingScreen;
