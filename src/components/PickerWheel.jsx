import React, { useState, useEffect, useRef } from "react";
import "./PickerWheel.css";

// Import sounds
import sound1 from "../assets/sounds/transition1.mp3";
import sound2 from "../assets/sounds/transition2.mp3";
import sound3 from "../assets/sounds/transition3.mp3";
import sound4 from "../assets/sounds/transition4.mp3";
import sound5 from "../assets/sounds/transition5.mp3";
import sound6 from "../assets/sounds/transition6.mp3";

const PickerWheel = ({ poemLines, currentStage, setCurrentStage }) => {

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
    const highlightWords = ["cogs", "gears", "spin", "clockwork,", "beats", "wheel,", "dials...", "work", "factory", "nucleus...", "gravity", "notions", "lights", "moment,", "infinite.", "motion.", "tight"];

    const highlightText = (text) => {
        if (!text) return null; 
        
        const words = text.split(" ").map((word, index) => {
            const isHighlighted = highlightWords.includes(word.toLowerCase());
            return (
                <span key={index} className={isHighlighted ? "highlight-word" : ""}>
                    {word}{" "}
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
