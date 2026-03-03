import  './WasteDrop.css'
import { Trash2Icon } from "lucide-react";
function WasteDrop({ selected, setSelected }){
  return(
      
        <div className="select-type">
        <div className="introtype">
          <div className="icontype">
            <Trash2Icon size={20}/>

          </div>
          <div className="waste-type-intro">
            <p>Select Waste Type to Learn More</p>

          </div>
        </div>

          <div className="drop-down">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Choose waste type</option>
        <option value="green">🟢 Wet Waste (Green Bin)</option>
        <option value="blue">🔵 Dry Waste (Blue Bin)</option>
        <option value="black">⚫ Mixed Waste (Black Bin)</option>
      </select>
    </div>
       </div>

    
  )
}
export default WasteDrop;