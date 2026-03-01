import { ArrowLeft ,RecycleIcon,Leaf,Trash2Icon} from "lucide-react";
import { Link } from "react-router-dom";
import './WasteG.css'
import WasteDrop from "../../Components/Waste/WasteDrop";
import WasteC from "../../Components/Waste/WasteCard";
import { useState } from "react";


function WasteG(){
  const [selected, setSelected] = useState("");
  return(
    <div className="w-container">
      <Link to="/userdashboard" >
      <div className="back-Dash">
        <div className="Arrow-icon">
          <ArrowLeft size={20}/>

        </div>
        <div className="back">
          <p>Back to Dashboard</p>
        </div>
      </div>
      </Link >
      
      <div className="heading">
        <div className="Heading-logo">
          <RecycleIcon size={60}/>
        </div>
        <div className="w-heading">
           <p>Waste Segregation Guidance</p>
        </div>
      </div>
      <div className="sub-heading">
        <div className="Leaf-icon">
          <Leaf size={20}/>
        </div>
        <div className="sub-line">
        <p>Learn to segregate waste correctly for a sustainable future</p>
      </div>
      </div>

      <div className="different-dustbin">
        <div className="diff-head">Color-Coded Waste Segregation System </div>
        <div className="w-differnt">

          <div className="Green-bin">
           <div className="green-box"></div>
          
            <div className="about-green">
            <span className="wordG1">Green Bin</span>
             <span className="wordG2"> Wet/Organic Waste</span>
           </div>
         
           
         </div>
         
         <div className="blue-bin">
           <div className="blue-box"></div>
            <div className="about-blue">
              <span className="wordG1">Blue Bin</span>
              <span className="wordG2"> Dry/Recyclable Waste</span>
            </div>
         </div>


         <div className="black-bin">
           <div className="black-box"></div>
            <div className="about-black">
             <span className="wordG1">Black Bin</span>
              <span className="wordG2" >Mixed/Reject Waste</span>
            </div>
          </div>
         
        </div>
        
      </div>

      
  

  
    <div className="w-container">
    

      <WasteDrop 
        selected={selected}
        setSelected={setSelected}
      />

      <WasteC type={selected} />
    </div>
 


    </div>
  )
}
export  default WasteG