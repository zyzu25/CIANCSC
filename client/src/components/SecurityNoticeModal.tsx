import { useState, useEffect } from 'react';
import { AlertTriangle, Lock, Shield, Eye } from 'lucide-react';

interface SecurityNoticeModalProps {
  onAgree: () => void;
}

const SecurityNoticeModal = ({ onAgree }: SecurityNoticeModalProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [timer, setTimer] = useState(5);
  const [showModal, setShowModal] = useState(true);
  
  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  
  const handleProceed = () => {
    // Visual effect before closing
    setShowModal(false);
    setTimeout(() => {
      onAgree();
    }, 500);
  };
  
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 transition-opacity duration-500 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-[200%] h-[200%] border-2 border-red-800 rounded-full opacity-10 animate-pulse"></div>
      </div>
      
      <div className="bg-black border-2 border-primary max-w-2xl w-full p-0 rounded-md shadow-lg relative overflow-hidden">
        {/* Top header bar */}
        <div className="bg-primary text-white py-2 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-bold">SECURITY WARNING</h2>
          </div>
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-1" />
            <span className="text-xs">ENCRYPTED CONNECTION</span>
          </div>
        </div>
        
        {/* Border elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary opacity-30"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary opacity-30"></div>
        
        <div className="p-6">
          <div className="flex items-start mb-6">
            <Shield className="h-16 w-16 text-primary mr-4 flex-shrink-0" />
            <div className="font-mono text-sm">
              <p className="text-primary font-bold mb-2 text-lg">RESTRICTED SYSTEM ACCESS</p>
              <p className="mb-4 text-white">
                You are accessing a National Counterintelligence & Security Center (NCSC) secure system. All activities are monitored and recorded.
              </p>
              <div className="bg-gray-900 border border-gray-800 p-3 mb-4 rounded">
                <p className="mb-2 text-white">
                  <span className="text-yellow-500">⚠️ WARNING:</span> Sharing application information with unauthorized individuals is strictly prohibited.
                </p>
                <p className="text-gray-400">
                  If application is rejected, you will not be contacted. Any attempts to reach out to NCSC Command or personnel will result in an instant denial with a possible blacklist period of 1-3 months.
                </p>
              </div>
              <p className="text-gray-400 mb-4">
                By proceeding with the application process, you agree to maintain absolute confidentiality about:
              </p>
              <ul className="list-disc pl-5 text-gray-300 space-y-1 mb-4">
                <li>Application questions and your responses</li>
                <li>Interview content and structure</li>
                <li>Selection criteria and evaluation methods</li>
                <li>Any communication with NCSC Command Staff</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-4 flex items-start bg-gray-900 p-3 rounded border border-gray-800">
            <input 
              type="checkbox" 
              id="agree-checkbox" 
              className="mt-1 mr-2"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="agree-checkbox" className="text-sm text-gray-300">
              I understand the confidentiality requirements and agree to these terms. I understand that violating these terms will result in immediate blacklisting from all NCSC positions.
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-500 text-xs">
              <Eye className="h-3 w-3 mr-1" />
              <span>USDCE EYES ONLY</span>
            </div>
            
            <button
              onClick={handleProceed}
              disabled={!isChecked || timer > 0}
              className={`px-6 py-2 rounded font-bold transition-all duration-200 flex items-center ${
                isChecked && timer === 0
                  ? 'bg-primary text-white hover:bg-red-700 shadow-lg hover:shadow-red-900/50' 
                  : 'bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {timer > 0 ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  <span>WAITING {timer}s</span>
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  <span>PROCEED TO RECRUITMENT PORTAL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityNoticeModal;
