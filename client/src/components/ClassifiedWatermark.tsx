const ClassifiedWatermark = () => {
  return (
    <>
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] text-5xl opacity-10 z-10 pointer-events-none whitespace-nowrap text-[#b30000] font-bold"
      >
        ⚠️ RESTRICTED ACCESS ⚠️
      </div>
      <div className="fixed top-0 left-0 w-full h-full z-5 pointer-events-none">
        <div className="absolute top-2 left-2 text-xs text-primary opacity-50 font-mono">CLASSIFIED//USDCE</div>
        <div className="absolute top-2 right-2 text-xs text-primary opacity-50 font-mono">TOP SECRET</div>
        <div className="absolute bottom-2 left-2 text-xs text-primary opacity-50 font-mono">EYES ONLY</div>
        <div className="absolute bottom-2 right-2 text-xs text-primary opacity-50 font-mono">[REDACTED]</div>
        
        {/* Corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary opacity-30"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary opacity-30"></div>
      </div>
    </>
  );
};

export default ClassifiedWatermark;
