import { AlertTriangle } from "lucide-react";

interface SecurityNoticeModalProps {
  onAgree: () => void;
}

const SecurityNoticeModal = ({ onAgree }: SecurityNoticeModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-primary max-w-md w-full rounded-lg overflow-hidden">
        <div className="bg-primary px-4 py-3 flex justify-between items-center">
          <h3 className="font-bold flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Security Notice: Information Blacklist
          </h3>
        </div>
        <div className="p-6">
          <p className="mb-4">Sharing application information with unauthorized individuals is strictly prohibited.</p>
          
          <div className="bg-primary bg-opacity-10 border border-primary rounded-lg p-4 mb-6">
            <h4 className="font-bold mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Strict Confidentiality Required
            </h4>
            <p className="text-sm mb-2">All NCSC application information, processes, and responses are classified. Sharing details about your application, interview questions, or selection process will result in immediate blacklisting from all NCSC positions.</p>
          </div>
          
          <p className="text-sm mb-4">By proceeding with the application process, you agree to maintain absolute confidentiality about:</p>
          
          <ul className="list-disc pl-5 mb-6 text-sm space-y-1">
            <li>Application questions and your responses</li>
            <li>Interview content and structure</li>
            <li>Selection criteria and evaluation methods</li>
            <li>Any communication with NCSC Command Staff</li>
          </ul>
          
          <button 
            onClick={onAgree}
            className="w-full py-2 bg-primary text-white font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 button-hover"
          >
            I Understand and Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityNoticeModal;
