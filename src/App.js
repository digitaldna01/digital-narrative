import React, { useState, useEffect } from 'react';
import './App.css';
import TextGear from "./textgear.jsx";

function App() {

  const [showLeft, setShowLeft] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const highlightWords = ["cogs", "gears", "spin", "clockwork,", "beats", "wheel,", "dials...", "work", "factory", "nucleus...", "gravity", "notions", "lights", "moment,", "infinite.", "motion.", "tight"];

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

  return (
    <div className="App">
      <div className={`left ${showLeft ? 'visible' : 'hidden'}`}>
        <div className='body' id='word'>
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
            >
              {line}
            </p>
          ))}
          </div>
        </div>
      <div className={`right ${showLeft ? 'half' : 'full'}`}>
        <TextGear text="COGS AND GEARS " fontSize="txt--2xl" color='primary' fontWeight='bold' setShowLeft={setShowLeft} />

      </div>
    </div>
  );
}

export default App;
