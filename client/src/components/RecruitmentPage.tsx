import { useState } from "react";
import { Play, Shield, Info, FileText, AlertTriangle, ChevronRight, Star, User, Lock } from "lucide-react";

const RecruitmentPage = () => {
  const [activeTab, setActiveTab] = useState("faq");

  const handleStartApplication = () => {
    window.open("https://forms.google.com/", "_blank");
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* <!-- CLASSIFIED --> */}
      <div className="mb-10 border-b border-gray-800 pb-6 relative">
        {/* Title section with decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary opacity-30"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary opacity-30"></div>
        
        <h1 className="text-3xl font-bold mb-3 tracking-tight">NCSC Recruitment Division</h1>
        <div className="max-w-2xl">
          <p className="text-gray-300 mb-3">Join the elite intelligence organization protecting the community from threats to its integrity. The National Counterintelligence & Security Center only recruits the most dedicated individuals.</p>
          <div className="flex items-center py-1 px-3 bg-gray-900 rounded-md inline-block text-xs font-mono text-primary">
            <Lock className="h-3 w-3 mr-1" />
            <span>SECURITY CLEARANCE REQUIRED FOR ADVANCED POSITIONS</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-gray-950 rounded-lg overflow-hidden border border-gray-800 shadow-lg relative">
            {/* Corner elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary opacity-30"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary opacity-30"></div>
            
            {/* Tabs navigation */}
            <div className="flex space-x-1 border-b border-gray-800 px-2 overflow-x-auto bg-gray-900">
              <button 
                className={`px-5 py-3 font-medium text-gray-400 hover:text-white relative transition-colors duration-200 ${activeTab === 'process' ? 'text-white' : ''} focus:outline-none whitespace-nowrap`}
                onClick={() => setActiveTab('process')}
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Recruitment Process</span>
                </div>
                {activeTab === 'process' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
              
              <button 
                className={`px-5 py-3 font-medium text-gray-400 hover:text-white relative transition-colors duration-200 ${activeTab === 'requirements' ? 'text-white' : ''} focus:outline-none whitespace-nowrap`}
                onClick={() => setActiveTab('requirements')}
              >
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  <span>Requirements</span>
                </div>
                {activeTab === 'requirements' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
              
              <button 
                className={`px-5 py-3 font-medium text-gray-400 hover:text-white relative transition-colors duration-200 ${activeTab === 'positions' ? 'text-white' : ''} focus:outline-none whitespace-nowrap`}
                onClick={() => setActiveTab('positions')}
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Available Positions</span>
                </div>
                {activeTab === 'positions' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
              
              <button 
                className={`px-5 py-3 font-medium text-gray-400 hover:text-white relative transition-colors duration-200 ${activeTab === 'faq' ? 'text-white' : ''} focus:outline-none whitespace-nowrap`}
                onClick={() => setActiveTab('faq')}
              >
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  <span>FAQ</span>
                </div>
                {activeTab === 'faq' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
            </div>

            <div className="p-6 min-h-[400px]">
              {activeTab === 'faq' && (
                <>
                  <div className="flex items-center mb-6">
                    <Info className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                      <p className="text-sm text-gray-400">Common questions about joining the NCSC.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">How long does the application process take?</h3>
                      <p className="text-gray-300 text-sm">The full recruitment process typically takes 1-2 weeks, depending on the volume of applications and your availability for interviews. Background verification usually takes 1-3 days.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">What happens if my application is rejected?</h3>
                      <p className="text-gray-300 text-sm">If your application is rejected, you will not be contacted. Any attempts to reach out to NCSC Command or personnel will result in an instant denial with a possible blacklist period of 1-3 months.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">What training will I receive as a new agent?</h3>
                      <p className="text-gray-300 text-sm">New agents go through a comprehensive training program covering intelligence collection methods, operational security, reporting protocols, and branch-specific skills. Training duration varies by role but typically lasts 1-2 weeks.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">Can I apply for multiple positions?</h3>
                      <p className="text-gray-300 text-sm">No. You may only select one application at a time. Command staff will review your skills and assign you to the position that best fits your abilities and the organization's needs.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">What is the time commitment for NCSC agents?</h3>
                      <p className="text-gray-300 text-sm">NCSC agents are expected to be reasonably active and participate in operations as assigned. The exact time commitment varies by role, but generally requires at least 5-10 hours per week.</p>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'process' && (
                <div className="text-gray-300">
                  <div className="flex items-center mb-6">
                    <FileText className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold">Recruitment Process</h2>
                      <p className="text-sm text-gray-400">The NCSC recruitment process is rigorous and selective.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative pl-8 pb-8 border-l border-gray-800">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <h3 className="text-lg font-medium mb-2">Application Submission</h3>
                      <p className="text-sm text-gray-400">Complete the secure application form with your qualifications and experience. All information provided is subject to verification.</p>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l border-gray-800">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-700"></div>
                      <h3 className="text-lg font-medium mb-2">Initial Screening</h3>
                      <p className="text-sm text-gray-400">Applications are reviewed by NCSC Command. Only candidates meeting our strict criteria will proceed to the next phase.</p>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l border-gray-800">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-700"></div>
                      <h3 className="text-lg font-medium mb-2">Background Assessment</h3>
                      <p className="text-sm text-gray-400">Comprehensive evaluation of candidate history, reliability, and potential security concerns.</p>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-700"></div>
                      <h3 className="text-lg font-medium mb-2">Final Selection</h3>
                      <p className="text-sm text-gray-400">Successful candidates are notified and begin the onboarding process. All others receive no communication.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'requirements' && (
                <div className="text-gray-300">
                  <div className="flex items-center mb-6">
                    <Star className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold">Requirements</h2>
                      <p className="text-sm text-gray-400">We seek candidates with exceptional skills and dedication.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center mr-3 text-white">1</div>
                        Reliability
                      </h3>
                      <p className="text-sm text-gray-400">Candidates must demonstrate consistent availability and commitment to assigned operations and tasks.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center mr-3 text-white">2</div>
                        Discretion
                      </h3>
                      <p className="text-sm text-gray-400">Ability to maintain confidentiality and handle sensitive information appropriately is essential.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center mr-3 text-white">3</div>
                        Analytical Skills
                      </h3>
                      <p className="text-sm text-gray-400">Candidates should possess strong critical thinking and problem-solving abilities.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center mr-3 text-white">4</div>
                        Communication
                      </h3>
                      <p className="text-sm text-gray-400">Clear and effective communication skills are required for operational success.</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 border border-gray-800 rounded-lg bg-gray-900/50">
                    <p className="text-sm text-gray-400">Additional specialized requirements may apply depending on the specific role and division.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'positions' && (
                <div className="text-gray-300">
                  <div className="flex items-center mb-6">
                    <User className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold">Available Positions</h2>
                      <p className="text-sm text-gray-400">NCSC regularly recruits for various intelligence and security roles.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">Intelligence Analysts</h3>
                        <span className="px-2 py-0.5 rounded bg-green-900 text-white text-xs">Active Recruiting</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Process and analyze intelligence data to identify threats and patterns that support NCSC operations.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">Field Operatives</h3>
                        <span className="px-2 py-0.5 rounded bg-yellow-900 text-white text-xs">Limited Positions</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Conduct direct intelligence gathering and operations in sensitive environments.</p>
                    </div>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">Security Specialists</h3>
                        <span className="px-2 py-0.5 rounded bg-green-900 text-white text-xs">Active Recruiting</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Monitor and enforce security protocols and investigate potential security breaches.</p>
                    </div>
                    
                    <div className="border border-dashed border-gray-700 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="text-lg font-medium text-gray-500">[Additional positions classified]</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 italic">Information on specialized roles is available only to candidates with appropriate clearance levels.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-950 rounded-lg overflow-hidden border border-gray-800 shadow-lg relative sticky top-6">
            {/* Corner elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary opacity-30"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary opacity-30"></div>
            
            <div className="bg-primary px-4 py-3 flex items-center justify-between">
              <h2 className="font-medium flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>JOIN OUR RANKS</span>
              </h2>
              <AlertTriangle className="h-4 w-4" />
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-primary p-2 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-center">Ready to Serve?</h3>
              <p className="mb-6 text-gray-300 text-center">Become part of an elite team protecting digital communities. We're looking for dedicated individuals to join our mission.</p>
              
              <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-800">
                <h4 className="text-sm font-semibold mb-3 flex items-center text-gray-300">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  Application Notice
                </h4>
                <p className="text-xs text-gray-400">By proceeding, you acknowledge all information is classified. Unauthorized sharing is prohibited and may result in immediate disqualification.</p>
              </div>
              
              <button 
                onClick={handleStartApplication}
                className="w-full py-3 bg-gradient-to-r from-red-900 to-red-800 text-white font-medium rounded-md hover:from-red-800 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>START YOUR APPLICATION</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              
              <div className="mt-4 text-xs text-center text-gray-500">
                Application process takes approximately 10-15 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentPage;
