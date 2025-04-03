import { Shield, Info, Lock, FileText } from "lucide-react";
import MissionArea from "./MissionArea";
import LeadershipSection from "./LeadershipSection";

const AboutPage = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      {/* <!-- CLASSIFIED --> */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">NCSC Intel Hub</h1>
        <h2 className="text-xl text-gray-400">National Cyber Security Command</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="mb-10">
            <h2 className="text-xl mb-4">About NCSC</h2>
            <p className="mb-4">Founded in 2023, the National Counterintelligence & Security Center (NCSC) was established to protect critical digital infrastructure and communities from emerging threats. Our mission is to ensure the safety and security of online environments through advanced intelligence gathering, analysis, and response capabilities.</p>
            <p>NCSC operates exclusively within the USDCE, providing comprehensive monitoring, investigation, and neutralization of security threats.</p>
          </div>

          <div>
            <h2 className="text-xl mb-6">Our Mission Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MissionArea 
                title="Threat Monitoring" 
                description="Continuous surveillance of digital environments to identify potential security risks and anomalous activities." 
                icon={<Shield className="h-6 w-6" />} 
              />
              
              <MissionArea 
                title="Intelligence Gathering" 
                description="Collection and analysis of information to understand threats, vulnerabilities, and malicious activities." 
                icon={<Info className="h-6 w-6" />} 
              />
              
              <MissionArea 
                title="Secure Communications" 
                description="End-to-end encrypted channels for sharing sensitive information and coordination within the security community." 
                icon={<Lock className="h-6 w-6" />} 
              />
              
              <MissionArea 
                title="Threat Analysis" 
                description="Advanced analytics and AI-powered systems to identify patterns and predict potential security incidents." 
                icon={<FileText className="h-6 w-6" />} 
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl mb-6">Our Team</h2>
          <p className="text-sm mb-4 text-gray-400">The NCSC consists of highly-trained specialists in information security, intelligence analysis, and digital communications.</p>
          
          {/* Intelligence Directorate */}
          <LeadershipSection
            title="Intelligence Directorate"
            description="The Intelligence Directorate oversees all intelligence operations and provides strategic direction for NCSC operations."
            titleBgColor="bg-gray-800"
            badgeColor="bg-blue-900"
            leaders={[
              {
                role: "Director of Intelligence",
                name: "afouttggjr",
                discord: "afouttttt",
                roblox: "afouttttt",
                initials: "ID",
                discordLabel: "Discoct:",
                robloxLabel: "Robooc:"
              },
              {
                role: "Deputy Director of Intelligence",
                name: "wassup_werq",
                discord: "wassup_werq",
                roblox: "iifirebunn41265",
                initials: "DD",
                discordLabel: "Discoct:",
                robloxLabel: "Robooc:"
              }
            ]}
          />
          
          {/* NCSC Leadership */}
          <LeadershipSection
            title="NCSC Leadership"
            description="The NCSC leadership team manages day-to-day operations and implements intelligence directives."
            titleBgColor="bg-gray-800"
            badgeColor="bg-purple-900"
            leaders={[
              {
                role: "NCSC Director",
                name: "Sodalmpratus5",
                discord: "Sodalmpratus5",
                roblox: "cd_xdawn",
                isRedacted: false,
                initials: "ND",
                discordLabel: "Discoct:",
                robloxLabel: "Robooc:"
              },
              {
                role: "NCSC Deputy Director",
                name: "Classified_891",
                discord: "Classified_891",
                roblox: "classified_891",
                isRedacted: false,
                initials: "DD",
                discordLabel: "Discoct:",
                robloxLabel: "Robooc:"
              }
            ]}
          />
          
          {/* HUMINT Division */}
          <LeadershipSection
            title="HUMINT Division"
            description="The Human Intelligence (HUMINT) Division specializes in gathering intel through direct human sources."
            titleBgColor="bg-gray-800"
            badgeColor="bg-green-900"
            leaders={[
              {
                role: "HUMINT Director",
                name: "Classified_891",
                discord: "Classified_891",
                roblox: "classified_891",
                isRedacted: false,
                initials: "HD",
                discordLabel: "Discoct:",
                robloxLabel: "Robooc:"
              },
              {
                role: "HUMINT Deputy Director",
                discord: "",
                roblox: "",
                name: "",
                vacant: true,
                initials: "DD",
                discordLabel: "Discoct:",
                robloxLabel: "Robooc:"
              }
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
