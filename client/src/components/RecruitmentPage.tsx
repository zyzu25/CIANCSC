import { useState } from "react";
import { Play } from "lucide-react";

const RecruitmentPage = () => {
  const [activeTab, setActiveTab] = useState("faq");

  const handleStartApplication = () => {
    window.open("https://forms.google.com/", "_blank");
  };

  return (
    <section className="container mx-auto px-4 py-10">
      {/* <!-- CLASSIFIED --> */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">NCSC Recruitment Division</h1>
        <p className="text-gray-400">Join the elite intelligence organization protecting the community from threats to its integrity.</p>
        <p className="text-gray-400">The National Counterintelligence & Security Center only recruits the most dedicated individuals.</p>
      </div>

      <div className="mb-10">
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="flex space-x-4 border-b border-gray-700 px-2 overflow-x-auto">
            <button 
              className={`px-4 py-2 font-medium text-gray-300 hover:text-white border-b-2 ${activeTab === 'process' ? 'border-primary' : 'border-transparent'} focus:outline-none whitespace-nowrap`}
              onClick={() => setActiveTab('process')}
            >
              Recruitment Process
            </button>
            <button 
              className={`px-4 py-2 font-medium text-gray-300 hover:text-white border-b-2 ${activeTab === 'requirements' ? 'border-primary' : 'border-transparent'} focus:outline-none whitespace-nowrap`}
              onClick={() => setActiveTab('requirements')}
            >
              Requirements
            </button>
            <button 
              className={`px-4 py-2 font-medium text-gray-300 hover:text-white border-b-2 ${activeTab === 'positions' ? 'border-primary' : 'border-transparent'} focus:outline-none whitespace-nowrap`}
              onClick={() => setActiveTab('positions')}
            >
              Available Positions
            </button>
            <button 
              className={`px-4 py-2 font-medium text-gray-300 hover:text-white border-b-2 ${activeTab === 'faq' ? 'border-primary' : 'border-transparent'} focus:outline-none whitespace-nowrap`}
              onClick={() => setActiveTab('faq')}
            >
              FAQ
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'faq' && (
              <>
                <h2 className="text-xl mb-4">Frequently Asked Questions</h2>
                <p className="text-sm text-gray-400 mb-6">Common questions about joining the NCSC.</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How long does the application process take?</h3>
                    <p className="text-gray-400 text-sm">The full recruitment process typically takes 1-2 weeks, depending on the volume of applications and your availability for interviews. Background verification usually takes 1-3 days.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">What happens if my application is rejected?</h3>
                    <p className="text-gray-400 text-sm">No notifications sent. Contact attempts result in 1-3 month blacklist.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">What training will I receive as a new agent?</h3>
                    <p className="text-gray-400 text-sm">New agents go through a comprehensive training program covering intelligence collection methods, operational security, reporting protocols, and branch-specific skills. Training duration varies by role but typically lasts 1-2 weeks.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Can I apply for multiple positions?</h3>
                    <p className="text-gray-400 text-sm">No. You may only select one application at a time. Command staff will review your skills and assign you to the position that best fits your abilities and the organization's needs.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">What is the time commitment for NCSC agents?</h3>
                    <p className="text-gray-400 text-sm">NCSC agents are expected to be reasonably active and participate in operations as assigned. The exact time commitment varies by role, but generally requires at least 5-10 hours per week.</p>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'process' && (
              <div className="text-gray-400 text-sm">
                <h2 className="text-xl text-white mb-4">Recruitment Process</h2>
                <p className="mb-4">The NCSC recruitment process is rigorous and selective.</p>
                <p>More details will be provided during your application.</p>
              </div>
            )}
            
            {activeTab === 'requirements' && (
              <div className="text-gray-400 text-sm">
                <h2 className="text-xl text-white mb-4">Requirements</h2>
                <p className="mb-4">We seek candidates with exceptional skills and dedication.</p>
                <p>Specific requirements will be assessed during the application process.</p>
              </div>
            )}
            
            {activeTab === 'positions' && (
              <div className="text-gray-400 text-sm">
                <h2 className="text-xl text-white mb-4">Available Positions</h2>
                <p className="mb-4">NCSC regularly recruits for various intelligence and security roles.</p>
                <p>Available positions are classified and will be discussed with qualified candidates.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-600 bg-opacity-20 rounded-lg overflow-hidden">
        <div className="bg-primary px-4 py-2">
          <h2 className="font-medium">SECURITY NOTICE</h2>
        </div>
        <div className="p-6">
          <h3 className="text-xl mb-3">Ready to Join Our Mission?</h3>
          <p className="mb-6">Become part of an elite team protecting digital communities. Apply today and help us ensure the safety and security of online environments.</p>
          <button 
            onClick={handleStartApplication}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 button-hover"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Your Application
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentPage;
