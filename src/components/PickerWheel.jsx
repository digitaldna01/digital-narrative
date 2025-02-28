import React, { useState, useEffect } from "react";
import "./PickerWheel.css";

const PickerWheel = ({ poemLines, currentStage, setCurrentStage }) => {


    // Move to Next Line
    const handleNext = () => {
        if (currentStage < poemLines.length - 1) {
            setCurrentStage(currentStage + 1);  // ✅ Next models
        }
    };

    // Move to Prev  Line
    const handlePrev = () => {
        if (currentStage > 0) {
            setCurrentStage(currentStage - 1);  // ✅ change models to prev Stage
        }
    };

    return (

            <div className="picker-wrapper">
                {/* Place holder to maintain the height */}
                {currentStage < 3 && <div className="picker-placeholder"></div>}

                {/* Prev Line */}
                {currentStage > 2 && <p className="picker-line top">{poemLines[currentStage - 3]}</p>}
                {currentStage > 1 && <p className="picker-line top-2">{poemLines[currentStage - 2]}</p>}
                {currentStage > 0 && <p className="picker-line top-3" onClick={handlePrev}> {poemLines[currentStage - 1]} </p>}

                {/* Curr Line */}
                <div className="picker-container" onClick={handleNext}>
                    <p className="picker-line active">{poemLines[currentStage]}</p>
                </div>

                {/* Next Line */}
                {currentStage < poemLines.length - 1 && <p className="picker-line bottom-3" onClick={handleNext}> {poemLines[currentStage + 1]} </p>}
                {currentStage < poemLines.length - 2 && <p className="picker-line bottom-2">{poemLines[currentStage + 2]}</p>}
                {currentStage < poemLines.length - 3 && <p className="picker-line bottom">{poemLines[currentStage + 3]}</p>}

            </div>
    );
};

export default PickerWheel;
