import DustbinMap from "./DustbinMap";

export default function DustbinMapPicker({ onSelectLocation }) {
  return (
    <DustbinMap
      onSelectLocation={onSelectLocation} 
      isRouting={false}                  
    />
  );
}