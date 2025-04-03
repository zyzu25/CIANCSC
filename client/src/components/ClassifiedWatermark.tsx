import { useTheme } from "../hooks/useTheme";

const ClassifiedWatermark = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="watermark">
      CLASSIFIED
    </div>
  );
};

export default ClassifiedWatermark;