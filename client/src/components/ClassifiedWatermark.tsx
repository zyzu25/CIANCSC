import { useTheme } from "../hooks/useTheme";

interface ClassifiedWatermarkProps {
  text?: string;
}

const ClassifiedWatermark = ({ text = "CLASSIFIED" }: ClassifiedWatermarkProps) => {
  const { isDark } = useTheme();
  
  return (
    <div className="watermark">
      {text}
    </div>
  );
};

export default ClassifiedWatermark;