import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
import AboutPage from "./components/AboutPage";
import RecruitmentPage from "./components/RecruitmentPage";
import SecurityNoticeModal from "./components/SecurityNoticeModal";
import ClassifiedWatermark from "./components/ClassifiedWatermark";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<"about" | "recruitment">("about");
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  // Navigation handlers
  const navigateToAbout = () => {
    setCurrentPage("about");
  };

  const navigateToRecruitment = () => {
    setShowSecurityModal(true);
  };

  const handleSecurityAgreement = () => {
    setShowSecurityModal(false);
    setCurrentPage("recruitment");
  };

  // Simulate loading screen for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <!-- CLASSIFIED --> */}
      <ClassifiedWatermark />
      
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Layout 
            navigateToAbout={navigateToAbout} 
            navigateToRecruitment={navigateToRecruitment}
          >
            {currentPage === "about" ? <AboutPage /> : <RecruitmentPage />}
          </Layout>
          
          {showSecurityModal && (
            <SecurityNoticeModal onAgree={handleSecurityAgreement} />
          )}
        </>
      )}
      
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
