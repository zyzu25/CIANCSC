import { useState } from "react";
import { 
  Play, Shield, Info, FileText, AlertTriangle, ChevronRight, 
  Star, User, Lock, ExternalLink 
} from "lucide-react";
import { SiDiscord, SiRoblox } from "react-icons/si";

interface RecruitmentPageProps {
  applicationUrl?: string;
}

const RecruitmentPage = ({ applicationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdVED14zX66oVHsRudvO4iwvxdmKIEvj45ym3PTjVj2ROkZyA/viewform?usp=sharing" }: RecruitmentPageProps) => {
  const [activeTab, setActiveTab] = useState("faq");

  const handleStartApplication = () => {
    window.open(applicationUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* <!-- CLASSIFIED --> */}
      <div className="mb-10 border-b border-border/30 pb-6 relative">
        {/* Title section with decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary opacity-30"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary opacity-30"></div>
        
        <h1 className="text-3xl font-bold mb-3 tracking-tight">NCSC Recruitment Division</h1>
        <div className="max-w-2xl">
          <p className="text-muted-foreground mb-3">Join the elite organization protecting the community. The National Counterintelligence & Security Center only recruits the most dedicated individuals for [REDACTED].</p>
          <div className="flex items-center py-1 px-3 bg-secondary/50 rounded-md inline-block text-xs font-mono text-primary mt-2">
            <Lock className="h-3 w-3 mr-1" />
            <span>SECURITY CLEARANCE REQUIRED FOR ADVANCED POSITIONS</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg overflow-hidden border border-border shadow-md relative modern-card">
            {/* Corner elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary opacity-30"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary opacity-30"></div>
            
            {/* Tabs navigation */}
            <div className="flex space-x-1 border-b border-border/50 px-2 overflow-x-auto bg-secondary/30">
              <button 
                className={`px-5 py-3 font-medium text-foreground/70 hover:text-foreground relative transition-colors duration-200 ${activeTab === 'process' ? 'text-foreground' : ''} focus:outline-none whitespace-nowrap`}
                onClick={() => setActiveTab('process')}
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Recruitment Process</span>
                </div>
                {activeTab === 'process' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
              
              <button 
                className={`px-5 py-3 font-medium text-foreground/70 hover:text-foreground relative transition-colors duration-200 ${activeTab === 'requirements' ? 'text-foreground' : ''} focus:outline-none whitespace-nowrap`}
                onClick={() => setActiveTab('requirements')}
              >
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  <span>Requirements</span>
                </div>
                {activeTab === 'requirements' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
              
              <button 
                className={`px-5 py-3 font-medium text-foreground/70 hover:text-foreground relative transition-colors duration-200 ${activeTab === 'positions' ? 'text-foreground' : ''} focus:outline-none whitespace-nowrap`}
                onClick={() => setActiveTab('positions')}
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Available Positions</span>
                </div>
                {activeTab === 'positions' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
              
              <button 
                className={`px-5 py-3 font-medium text-foreground/70 hover:text-foreground relative transition-colors duration-200 ${activeTab === 'faq' ? 'text-foreground' : ''} focus:outline-none whitespace-nowrap`}
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
                      <p className="text-sm text-muted-foreground">Common questions about joining the NCSC.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60 hover:border-border transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">How long does the application process take?</h3>
                      <p className="text-muted-foreground text-sm">The full recruitment process typically takes 1-2 weeks, depending on the volume of applications and your availability for interviews. Background verification usually takes 1-3 days.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60 hover:border-border transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">What happens if my application is rejected?</h3>
                      <p className="text-muted-foreground text-sm">If your application is rejected, you will not be contacted. Any attempts to reach out to NCSC Command or personnel will result in an instant denial with a possible blacklist period of 1-3 months.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60 hover:border-border transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">What training will I receive as a new agent?</h3>
                      <p className="text-muted-foreground text-sm">New agents go through a comprehensive training program covering [REDACTED], [REDACTED], reporting protocols, and branch-specific skills. Training duration varies by role but typically lasts 1-2 weeks.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60 hover:border-border transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">Can I apply for multiple positions?</h3>
                      <p className="text-muted-foreground text-sm">No. You may only select one application at a time. Command staff will review your skills and assign you to the position that best fits your abilities and the organization's needs.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60 hover:border-border transition-colors duration-200">
                      <h3 className="text-lg font-medium mb-2 text-primary">What is the time commitment for NCSC agents?</h3>
                      <p className="text-muted-foreground text-sm">NCSC agents are expected to be reasonably active and participate in [REDACTED] as assigned. The exact time commitment varies by role, but generally requires at least 5-10 hours per week.</p>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'process' && (
                <div>
                  <div className="flex items-center mb-6">
                    <FileText className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold">Recruitment Process</h2>
                      <p className="text-sm text-muted-foreground">The NCSC recruitment process is rigorous and selective.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative pl-8 pb-8 border-l border-border/50">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <h3 className="text-lg font-medium mb-2">Application Submission</h3>
                      <p className="text-sm text-muted-foreground">Complete the secure application form with your qualifications and experience. All information provided is subject to verification.</p>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l border-border/50">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-muted"></div>
                      <h3 className="text-lg font-medium mb-2">Initial Screening</h3>
                      <p className="text-sm text-muted-foreground">Applications are reviewed by NCSC Command. Only candidates meeting our strict criteria will proceed to the next phase.</p>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l border-border/50">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-muted"></div>
                      <h3 className="text-lg font-medium mb-2">Background Assessment</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive evaluation of candidate history, reliability, and potential security concerns.</p>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-muted"></div>
                      <h3 className="text-lg font-medium mb-2">Final Selection</h3>
                      <p className="text-sm text-muted-foreground">Successful candidates are notified and begin the onboarding process. All others receive no communication.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'requirements' && (
                <div>
                  <div className="flex items-center mb-6">
                    <Star className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold">Requirements</h2>
                      <p className="text-sm text-muted-foreground">We seek candidates with exceptional skills and dedication.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center mr-3 text-foreground">1</div>
                        Reliability
                      </h3>
                      <p className="text-sm text-muted-foreground">Candidates must demonstrate consistent availability and commitment to assigned [REDACTED] and tasks.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center mr-3 text-foreground">2</div>
                        Discretion
                      </h3>
                      <p className="text-sm text-muted-foreground">Ability to maintain confidentiality and handle sensitive information appropriately is essential.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center mr-3 text-foreground">3</div>
                        Analytical Skills
                      </h3>
                      <p className="text-sm text-muted-foreground">Candidates should possess strong critical thinking and problem-solving abilities.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center mr-3 text-foreground">4</div>
                        Communication
                      </h3>
                      <p className="text-sm text-muted-foreground">Clear and effective communication skills are required for operational success.</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 border border-border/60 rounded-lg bg-secondary/10">
                    <p className="text-sm text-muted-foreground">Additional specialized requirements may apply depending on the specific role and division.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'positions' && (
                <div>
                  <div className="flex items-center mb-6">
                    <User className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold">Available Positions</h2>
                      <p className="text-sm text-muted-foreground">NCSC regularly recruits for various positions.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="text-lg font-medium">Intelligence Analysts</h3>
                        <span className="badge badge-active">Active Recruiting</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Process and analyze [REDACTED] to identify threats and patterns that support NCSC operations.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="text-lg font-medium">Field Operatives</h3>
                        <span className="badge badge-limited">Limited Positions</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Conduct direct [REDACTED] in sensitive environments.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="text-lg font-medium">Security Specialists</h3>
                        <span className="badge badge-active">Active Recruiting</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Monitor and enforce security protocols and investigate potential security breaches.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/60">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="text-lg font-medium">[REDACTED] Positions</h3>
                        <span className="badge badge-classified">Classified</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Information on specialized roles is <span className="redacted px-2">available only to candidates with appropriate clearance levels</span>.</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 border border-border/60 rounded-lg bg-secondary/10 flex items-center">
                    <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                    <p className="text-sm text-muted-foreground">All positions require security clearance and successful completion of NCSC training protocols.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Application Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg overflow-hidden border border-border shadow-md modern-card">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Join the NCSC</h2>
              <p className="text-muted-foreground text-sm mb-6">The NCSC is currently accepting applications for qualified individuals. Start your application process today.</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary">1</div>
                  <div className="ml-3">
                    <h3 className="font-medium text-sm">Complete Application</h3>
                    <p className="text-xs text-muted-foreground">Fill out the secure online form</p>
                  </div>
                </div>
                
                <div className="border-l-2 border-dashed border-border/40 h-6 ml-4"></div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary">2</div>
                  <div className="ml-3">
                    <h3 className="font-medium text-sm">Assessment Period</h3>
                    <p className="text-xs text-muted-foreground">NCSC reviews your application</p>
                  </div>
                </div>
                
                <div className="border-l-2 border-dashed border-border/40 h-6 ml-4"></div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary">3</div>
                  <div className="ml-3">
                    <h3 className="font-medium text-sm">Notification</h3>
                    <p className="text-xs text-muted-foreground">Successful candidates contacted</p>
                  </div>
                </div>
              </div>
              
              <button
                className="w-full py-3 button-hover rounded-md font-medium flex items-center justify-center space-x-2"
                onClick={handleStartApplication}
              >
                <span>Start Application</span>
                <ExternalLink className="h-4 w-4" />
              </button>
              
              <div className="mt-4 text-xs text-center text-muted-foreground">
                <p>Application window may close without notice based on recruitment needs</p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="p-4 bg-secondary/20 border-t border-border/40">
              <h3 className="font-medium text-sm mb-2">Contact Information:</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <SiDiscord className="h-4 w-4 mr-2 discord-icon" />
                  <span className="text-xs">Discord: <span className="font-medium">@ncsc_official</span></span>
                </div>
                <div className="flex items-center">
                  <SiRoblox className="h-4 w-4 mr-2 roblox-icon" />
                  <span className="text-xs">Roblox: <span className="font-medium">@NCSC_Intel</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentPage;