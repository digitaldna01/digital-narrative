import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import TextGear from "./textgear.jsx";
import PickerWheel from "./components/PickerWheel";
import StageModel from "./components/StageModel.jsx";
import { ambientLight, pointLight } from "three";

function App() {

  // Whether to show the poem or not
  const [showLeft, setShowLeft] = useState(false);

  // Current Stage for the models
  const [currentStage, setCurrentStage] = useState(-1);
  console.log("Initial Stage:", currentStage);
  const [clickable, setClickable] = useState(true);

  // Current Stage Number (if == 0, hidden)
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const highlightWords = ["cogs", "gears", "spin", "clockwork,", "beats", "wheel,", "dials...", "work", "factory", "nucleus...", "gravity", "notions", "lights", "moment,", "infinite.", "motion.", "tight"];

  // Cogs effect of the poem's line
  useEffect(() => {
    if (showLeft) {
      const wordContainer = document.getElementById("word");
      if (wordContainer) {
        const paragraphs = wordContainer.querySelectorAll("p");
        
        paragraphs.forEach((p, pIndex) => {
          const words = p.innerText.split(" ");
          
          // const chars = p.innerText.split("");
          p.innerHTML = "";
          
          words.forEach((word, wIndex) => {
            const wordSpan = document.createElement("span");

            const isHighlighted = highlightWords.includes(word.toLowerCase());
            if (isHighlighted) {
              wordSpan.classList.add("highlight");
            }
            
            
            word.split("").forEach((char, cIndex) => {
              const charSpan = document.createElement("span");
              charSpan.innerText = char;
              charSpan.classList.add("char-span");
              
              if (pIndex === hoveredIndex) {
                charSpan.style.animation = `charFade 1.5s ${cIndex * 0.5}s infinite alternate ease-in-out`;
              }
              wordSpan.appendChild(charSpan);
            });

            p.appendChild(wordSpan);

            if (wIndex < words.length - 1) {
              p.appendChild(document.createTextNode(" "));
            }
          });

          p.addEventListener("mouseenter", () => setHoveredIndex(pIndex));
          p.addEventListener("mouseleave", () => setHoveredIndex(null));

        });
      }
    }
  }, [showLeft, hoveredIndex]);
  
  // From `TextGear.js` when `setShowLeft(true)` starts, show stage 1
  useEffect(() => {
    if (showLeft) {
      setTimeout(() => {
        setCurrentStage(0); // After 3 sec Show Stage 1
      }, 500);
    }
  }, [showLeft]);

  // when click each line os the poem move to the next `StageX` 
  const handleTextClick = (event) => {
    event.stopPropagation();
    if (!clickable) return;
    setClickable(false);
    setTimeout(() => setClickable(true), 300);

    setCurrentStage((prevStage) => {
      const newStage = prevStage < 25 ? prevStage + 1 : prevStage;
      console.log("Stage changed to:", newStage);
      return newStage; // 최대값 유지
    });
  };

  const CameraController = ({ currentStage }) => {
    const { camera } = useThree();
  
    useEffect(() => {
      camera.position.set(0, 0, currentStage <= 9 ? 15 : 30);
      camera.updateProjectionMatrix();
    }, [currentStage, camera]);
  
    return null;
  };
  

  return (
    <div className="App">
      <div className={`left ${showLeft ? 'visible' : 'hidden'}`}>
        <div class="title" >
          <p>
            Cogs and Gears
          </p>
        </div>
        <PickerWheel 
        poemLines={[
          "Know that my heart beats for you...",
          "Every crank of the wheel, turn of dials...",
          "Leading to my every breath and every sigh",
          "Wishing every moment would stay a while...",
          "Unaware of themselves hard at work,",
          "The cogs in my mind are constantly spinning...",
          "The gears in my head are lodged in place...",
          "Cogs and gears like clockwork, carelessly turning...",
          "Like a factory of sorts,",
          "They keep churning out ideas.",
          "Conceived notions that only had been",
          "Spawned by my mind's nucleus...",
          "Blinked lights signaling ways,",
          "And means to sweep you into the air,",
          "Then leave you lofted for second....",
          "Without a trace of fear or care.",
          "At that moment, what I'd give to just admire...",
          "You floating against a backdrop of stars.",
          "An image frozen in infinite.",
          "An image free from blemishes or scars.",
          "Then when gravity claims you back,",
          "You'd fall the most graceful of falls...",
          "A fall in the slowest of motion.",
          "A fall led by my loving calls.",
          "Fear not darling for my arms would be there...",
          "To catch you and hold you close in a tight embrace.",
          "Cheek to cheek, chest to chest... You'd then know that,",
          "Cogs and gears spin only for you in this very same place...",
        ]}
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}/>
        <div class="credit">
          <p>
            By RYN
          </p>
        </div>
        </div>
      <div className={`right ${showLeft ? 'half' : 'full'}`}>
        {/* First show `TextGear`, when it clicks show stage models*/}
        {currentStage === -1 ?  (
          <TextGear 
            text="COGS AND GEARS " 
            fontSize="txt--2xl" 
            color='primary' 
            fontWeight='bold' 
            setShowLeft={setShowLeft} 
          />
        ) : (
          <Canvas camera={{ fov: 50 }}>
            {/* Camera Position */}
            <CameraController currentStage={currentStage} />
            {/* Overall Light */}
            <ambientLight intensity={1.8} />

            <directionalLight position={[5, 5, 5]} intensity={2} />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} />
            <pointLight position={[0, 10, 10]} intensity={3} />
            
            <StageModel currentStage={currentStage}/>
            <OrbitControls enableZoom={true}/>
          </Canvas>
        )}
      </div>
    </div>
  );
}

export default App;


{/* <div className='body' id='word'>
        {[
            "Know that my heart beats for you...",
            "Every crank of the wheel, turn of dials...",
            "Leading to my every breath and every sigh",
            "Wishing every moment would stay a while...",
            "Unaware of themselves hard at work,",
            "The cogs in my mind are constantly spinning...",
            "The gears in my head are lodged in place...",
            "Cogs and gears like clockwork, carelessly turning...",
            "Like a factory of sorts,",
            "They keep churning out ideas.",
            "Conceived notions that only had been",
            "Spawned by my mind's nucleus...",
            "Blinked lights signaling ways,",
            "And means to sweep you into the air,",
            "Then leave you lofted for second....",
            "Without a trace of fear or care.",
            "At that moment, what I'd give to just admire...",
            "You floating against a backdrop of stars.",
            "An image frozen in infinite.",
            "An image free from blemishes or scars.",
            "Then when gravity claims you back,",
            "You'd fall the most graceful of falls...",
            "A fall in the slowest of motion.",
            "A fall led by my loving calls.",
            "Fear not darling for my arms would be there...",
            "To catch you and hold you close in a tight embrace.",
            "Cheek to cheek, chest to chest... You'd then know that,",
            "Cogs and gears spin only for you in this very same place...",
          ].map((line, index) => (
            <p
              key={index}
              className={hoveredIndex === index ? "hovered" : ""}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={handleTextClick} // when click the each line => move the stage model to the next step
            >
              {line}
            </p>
          ))}
          </div> */}