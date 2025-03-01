import React, { useState, useEffect, useRef } from "react";
import "./PickerWheel.css";

// Import sounds
import sound1 from "../assets/sounds/transition1.mp3";
import sound2 from "../assets/sounds/transition2.mp3";
import sound3 from "../assets/sounds/transition3.mp3";
import sound4 from "../assets/sounds/transition4.mp3";
import sound5 from "../assets/sounds/transition5.mp3";
import sound6 from "../assets/sounds/transition6.mp3";

// Import Gif
import gearGif from "../assets/gif/gear.webp";

const PickerWheel = ({ poemLines, currentStage, setCurrentStage }) => {
    // []
    const [scrollTimeout, setScrollTimeout] = useState(null);
    
    // [ Sounds Interaction ]
    const transitionSounds = useRef([
        new Audio(sound1),
        new Audio(sound2),
        new Audio(sound3),
        new Audio(sound4),
        new Audio(sound5),
        new Audio(sound6),
    ]);

    transitionSounds.current.forEach(sound => sound.volume = 0.5);

    useEffect(() => {
        const handleWheel = (event) => {
            if (scrollTimeout) return; // ✅ 연속 휠 스크롤 방지 (딜레이 추가)

            if (event.deltaY > 0) {
                handleNext();  // ⬇️ 아래로 스크롤 → 다음 문장
            } else {
                handlePrev();  // ⬆️ 위로 스크롤 → 이전 문장
            }

            // 300ms 동안 추가 입력 방지 (너무 빠르게 스크롤되지 않도록)
            const timeout = setTimeout(() => setScrollTimeout(null), 300);
            setScrollTimeout(timeout);
        };

        window.addEventListener("wheel", handleWheel);
        return () => {
            window.removeEventListener("wheel", handleWheel);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [currentStage, scrollTimeout]);

    const playRandomSound = () => {
        const randomIndex = Math.floor(Math.random() * transitionSounds.current.length);
        transitionSounds.current[randomIndex].play();
    };
    //[ Sounds interaction End ]

    // Move to Next Line
    const handleNext = () => {
        if (currentStage < poemLines.length - 1) {
            playRandomSound()
            setCurrentStage(currentStage + 1);  // ✅ Next models
        }
    };

    // Move to Prev  Line
    const handlePrev = () => {
        if (currentStage > 0) {
            playRandomSound()
            setCurrentStage(currentStage - 1);  // ✅ change models to prev Stage
        }
    };

    // Text Decoration
    const highlightWords1 = ["cogs", "gears", "spin", "clockwork,", "beats", "wheel,", "dials...", "work", "factory", "nucleus...", "gravity", "notions", "lights", "moment,", "infinite.", "motion.", "tight", "hard", "work,", "arms"];
    const highlightWords2 = ["heart", "cheek", "you"];

    const highlightText = (text) => {
        if (!text) return null; 

        const words = text.split(" ").map((word, index, array) => {
            const lowerWord = word.toLowerCase();
            const isHighlighted1 = highlightWords1.includes(lowerWord);
            const isHighlighted2 = highlightWords2.includes(lowerWord)

            return (
                <span 
                    key={index} 
                    className={isHighlighted1 ? "highlight-word1" : isHighlighted2 ? "highlight-word2" : ""}
                >
                    {word}{index !== array.length - 1 ? "\u00A0" : ""}
                    {/* {word}{" "} */}
                </span>
            );
        });

        return <>{words}</>;
    };

    return (
            <div className="picker-wrapper">
                {/* Place holder to maintain the height */}
                {currentStage < 3 && <div className="picker-placeholder"></div>}

                {/* Prev Line */}
                {currentStage > 2 && <p className="picker-line top" onClick={handlePrev}>{poemLines[currentStage - 3]}</p>}
                {currentStage > 1 && <p className="picker-line top-2" onClick={handlePrev}>{poemLines[currentStage - 2]}</p>}
                {currentStage > 0 && <p className="picker-line top-3" onClick={handlePrev}> {poemLines[currentStage - 1]} </p>}

                {/* Curr Line */}
                <div className="picker-container" onClick={handleNext}>
                    <img src={gearGif} alt="Rotating Gear" className="gear-gif left1" /> 
                    <img src={gearGif} alt="Rotating Gear" className="gear-gif right" /> 
                    <p className="picker-line active">{highlightText(poemLines[currentStage])}</p>
                    
                </div>

                {/* Next Line */}
                {currentStage < poemLines.length - 1 && <p className="picker-line bottom-3" onClick={handleNext}> {poemLines[currentStage + 1]} </p>}
                {currentStage < poemLines.length - 2 && <p className="picker-line bottom-2" onClick={handleNext}>{poemLines[currentStage + 2]}</p>}
                {currentStage < poemLines.length - 3 && <p className="picker-line bottom" onClick={handleNext}>{poemLines[currentStage + 3]}</p>}
                
            </div>
    );
};

export default PickerWheel;
