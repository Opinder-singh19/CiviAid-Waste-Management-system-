

import { Trash2 } from "lucide-react";
import "./WasteCard.css";
import black from '../../assets/Dustbins/black.png'
import blue from '../../assets/Dustbins/blue.png'
import green from '../../assets/Dustbins/green.png'

function WasteCard({ type }) {

  const wasteData = {
    green: {
      title: "Wet Waste",
      image:green,
      color: "#16a34a",
      background:'green',
      description:
        "Biodegradable organic waste from kitchen and garden. Includes food scraps, vegetable peels, fruit waste, tea bags and garden waste.",
      examples: [
        "Food scraps",
        "Vegetable peels",
        "Fruit waste",
        "Tea bags",
        "Garden waste"
      ],
      dos: [
        "Separate immediately",
        "Use compostable bags",
        "Dispose daily"
      ],
      donts: [
        "Mix with plastic",
        "Add oils/fats",
        "Include packaging"
      ]
    },

    blue: {
      title: "Dry Waste",
      color: "#2563eb",
      image:blue,
      background:'blue',
      description:
        "Non-biodegradable recyclable waste like paper, plastic, glass and metal.",
      examples: [
        "Paper & cardboard",
        "Plastic bottles",
        "Glass containers",
        "Metal cans"
      ],
      dos: [
        "Clean before disposal",
        "Flatten boxes",
        "Keep dry"
      ],
      donts: [
        "Include food waste",
        "Mix dirty items",
        "Add contaminated paper"
      ]
    },

    black: {
      title: "Mixed Waste",
      color: "black",
      image:black,
      background:'black',
      description:
        "Reject waste that cannot be recycled or composted.",
      examples: [
        "Sanitary waste",
        "Diapers",
        "Broken ceramics"
      ],
      dos: [
        "Wrap properly",
        "Dispose safely"
      ],
      donts: [
        "Mix with recyclables",
        "Burn openly"
      ]
    }
  };

  if (!type) {
    return (
      <div className="waste-placeholder">
        <div className="place-holdicon"><Trash2 size={50} color="#16a34a" /></div>
        <p>Select a waste type above to view detailed guidance</p>
      </div>
    );
  }

  const data = wasteData[type];

  return (
    <div className="waste-full-card"  >



      <div className="icon-section">
        <div className="dust-icon"><img 
         src={data.image} 
         alt={data.title}
        className="dustbin-image"
         /></div>
         <div className="Icon-T"></div>
         <div className="icon-title">  <h2>{data.title}</h2></div>
       
      </div>


      <div className="info-box" style={{ borderColor: data.color }}>
        <h3>What is it?</h3>
        <p>{data.description}</p>
      </div>

      
      <div className="examples">
        <h3>Examples</h3>
        <div className="example-tags">
          {data.examples.map((item, index) => (
            <span
              key={index}
              className="tag"
              style={{ borderColor: data.color }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

 
      <div className="do-dont">
        <div className="dos">
          <h3 style={{ color: data.color }}>✔ Do's</h3>
          {data.dos.map((item, index) => (
            <p key={index}>✔ {item}</p>
          ))}
        </div>

        <div className="donts">
          <h3 style={{ color: "red" }}>✘ Don'ts</h3>
          {data.donts.map((item, index) => (
            <p key={index}>✘ {item}</p>
          ))}
        </div>
      </div>

    </div>
  );
}

export default WasteCard;