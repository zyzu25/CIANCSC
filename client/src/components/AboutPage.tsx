import { Shield, Info, Lock, FileText, Search, User, Briefcase, Crosshair } from "lucide-react";
import MissionArea from "./MissionArea";
import LeadershipSection from "./LeadershipSection";
import { useTheme } from "../hooks/useTheme";
import ClassifiedWatermark from "./ClassifiedWatermark";

const AboutPage = () => {
  const { isDark } = useTheme();
  
  return (
    <section className="container mx-auto px-4 py-12">
      <ClassifiedWatermark />
      
      {/* Title section */}
      <div className="mb-8 border-b border-border/50 pb-6 relative corner-box">
        <h1 className="text-3xl font-bold mb-3 tracking-tight">NCSC Intelligence Hub</h1>
        <h2 className="text-xl text-muted-foreground font-light">National Counterintelligence & Security Center</h2>
        
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>

      {/* About section */}
      <div className="mb-12 bg-card rounded-lg p-6 border border-border shadow-lg classified-document">
        <div className="flex items-start">
          <div className="hidden md:block mr-6 flex-shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-primary p-2 flex items-center justify-center rotation-reverse">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary md:hidden" />
              About NCSC
            </h2>
            <p className="mb-4 leading-relaxed">
              The National Counterintelligence and Security Center (NCSC) operates as the leading authority within the USDCE, specializing in high-profile investigations that impact the integrity of the community, including key leadership and command structures.
            </p>
            <p className="leading-relaxed">
              Our Mission: Finding corrupt HICOM and [REDACTED]. NCSC provides comprehensive monitoring, investigation, and response capabilities to protect digital environments and their users.
            </p>
            
            <div className="mt-4 bg-background/50 border border-border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2 text-primary">Organizational Structure</h3>
              <p className="text-sm text-muted-foreground">
                NCSC operates with 4 primary units: Command Center, NCSCIA, Intelligence Agents, and [REDACTED] divisions. The HUMINT division operates separately under the Intelligence Directorate within CIA and provides operational support to NCSC missions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Areas */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center section-title">
          <Briefcase className="h-5 w-5 mr-2 text-primary" />
          Our Mission Areas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MissionArea 
            title="Threat Monitoring" 
            description="Continuous surveillance to identify potential security risks and anomalous activities that could compromise community integrity." 
            icon={<Shield className="h-6 w-6" />} 
          />
          
          <MissionArea 
            title="Intelligence Gathering" 
            description="Collection and analysis of information to understand threats, vulnerabilities, and investigate possible corruption." 
            icon={<Info className="h-6 w-6" />} 
          />
          
          <MissionArea 
            title="Secure Communications" 
            description="End-to-end encrypted channels for sharing sensitive intelligence and operational coordination." 
            icon={<Lock className="h-6 w-6" />} 
          />
          
          <MissionArea 
            title="Counterintelligence" 
            description="Specialized operations to counter threats, protect integrity, and maintain security protocols throughout USDCE." 
            icon={<Crosshair className="h-6 w-6" />} 
          />
        </div>
      </div>

      {/* Leadership Sections */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-8 flex items-center section-title">
          <User className="h-5 w-5 mr-2 text-primary" />
          Leadership Structure
        </h2>
        
        {/* Intelligence Directorate */}
        <LeadershipSection
          title="Intelligence Directorate"
          description="The Intelligence Directorate oversees all intelligence operations and provides strategic direction for NCSC operations. This division is responsible for coordinating intelligence efforts across multiple agencies within USDCE."
          titleBgColor="bg-gradient-to-r from-blue-900 to-blue-950"
          badgeColor="bg-blue-900"
          leaders={[
            {
              role: "Director of Intelligence",
              name: "afouttggjr",
              discord: "afouttttt",
              initials: "AI",
              discordLabel: "Discord:"
            },
            {
              role: "Deputy Director of Intelligence",
              name: "wassup_werq",
              discord: "wassup_werq",
              initials: "WW",
              discordLabel: "Discord:"
            }
          ]}
        />
        
        {/* NCSC Leadership */}
        <LeadershipSection
          title="NCSC Command"
          description="The NCSC Command team manages day-to-day operations and implements intelligence directives from the Intelligence Directorate. They oversee all NCSC units and coordinate high-profile operations."
          titleBgColor="bg-gradient-to-r from-purple-900 to-purple-950"
          badgeColor="bg-purple-900"
          leaders={[
            {
              role: "NCSC Director",
              name: "Sodalmpratus5",
              discord: "Sodalmpratus5",
              isRedacted: false,
              initials: "SP",
              discordLabel: "Discord:"
            },
            {
              role: "NCSC Deputy Director",
              name: "Classified_891",
              discord: "Classified_891",
              isRedacted: false,
              initials: "C8",
              discordLabel: "Discord:"
            }
          ]}
        />
        
        {/* HUMINT Division */}
        <LeadershipSection
          title="HUMINT Division"
          description="The Human Intelligence (HUMINT) Division is not within NCSC but operates under the Intelligence Directorate within CIA. This division specializes in gathering intelligence through direct human sources and supports NCSC operations."
          titleBgColor="bg-gradient-to-r from-green-900 to-green-950"
          badgeColor="bg-green-900"
          leaders={[
            {
              role: "HUMINT Director",
              name: "Classified_891",
              discord: "Classified_891",
              isRedacted: false,
              initials: "C8",
              discordLabel: "Discord:"
            },
            {
              role: "HUMINT Deputy Director",
              discord: "",
              name: "",
              vacant: true,
              initials: "HD",
              discordLabel: "Discord:"
            }
          ]}
        />
        
        {/* Classified Division */}
        <LeadershipSection
          title="Intelligence Operations"
          description="[CONTENT REDACTED BY SECURITY DIRECTIVE 7734-C]"
          titleBgColor="bg-gradient-to-r from-red-900 to-red-950"
          badgeColor="bg-red-900"
          leaders={[
            {
              role: "Operations Director",
              name: "[REDACTED]",
              discord: "[REDACTED]",
              isRedacted: true,
              initials: "OD",
              discordLabel: "Discord:"
            },
            {
              role: "Special Operations Lead",
              name: "[REDACTED]",
              discord: "[REDACTED]",
              isRedacted: true,
              initials: "SL",
              discordLabel: "Discord:"
            }
          ]}
        />
      </div>
      
      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground font-mono mt-16 border-t border-border/50 pt-6">
        <p>NATIONAL COUNTERINTELLIGENCE & SECURITY CENTER</p>
        <p className="mt-1">USDCE RESTRICTED ACCESS · CONTROLLED INFORMATION</p>
      </div>
    </section>
  );
};

export default AboutPage;
