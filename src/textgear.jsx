import React, { useEffect, useRef, useState } from "react";
import "./TextGear.css";
import "./App.css";

const TextGear = ({ text, fontSize , color, fontWeight, setShowLeft}) => {
    const [clickCount, setClickCount] = useState(0); // circular state
    const [activeGroup, setActiveGroup] = useState(0); // Current Animation Group

    const CHARS = text.split("");
    const INNER_ANGLE = 360 / CHARS.length;
    const radius = (1 / Math.sin(INNER_ANGLE * (Math.PI / 180))) * -1 + "ch";

    const textRingRef = useRef(null);

    // Get CSS variable
    const getCSSVariable = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    const computedFontSize = getCSSVariable(`--font--${fontSize}`);
    const computedColor = getCSSVariable(`--color--${color}`);
    const computedFontWeight = getCSSVariable(`--font-weight-${fontWeight}`);

    useEffect(() => {
        if (textRingRef.current) {
            textRingRef.current.style.setProperty("--total", CHARS.length);
            textRingRef.current.style.setProperty("--radius", radius);
        }}, [CHARS.length, radius]);

    useEffect(() => {
        if (clickCount < 1) return; // Start when it is circular
    
        const interval = setInterval(() => {
            setActiveGroup((prevGroup) => (prevGroup + 1) % 3); // Repeat 3 groups
        }, 500);
    
         return () => clearInterval(interval);
    }, [clickCount]);

    // After became circular, 
    useEffect(() => {
        if (clickCount === 1) {
            const timer = setTimeout(() => {
                setShowLeft(true);
            }, 3000); // 4 seconds await

            return () => clearTimeout(timer); 
        }
    }, [clickCount, setShowLeft]);

    
        // **Animation applying groups**
    const getActiveChars = (index) => {
        const groupOrder = [
            [0, 3, 6, 9, 12], // 1st group
            [1, 4, 7, 10], // 2st group
            [2, 5, 8, 11] // 3st group
        ];
        return groupOrder[activeGroup].includes(index);
    };

    const handleClick = () => {
        if (clickCount < 1) {
            setClickCount(1);
        } 
    };

    return (
        <div className="text-container" onClick={handleClick}>
            <span className={`text-gear ${clickCount >= 1 ? "circular" : "linear"}`} ref={textRingRef}>
                {CHARS.map((char, index) => (
                    <span 
                        key={index} 
                        className={getActiveChars(index) ? "active" : ""}
                        style={{ 
                            "--index": index, 
                            fontSize: getActiveChars(index) ? "var(--font--txt--xl)" : computedFontSize, 
                            color: computedColor, 
                            fontWeight: computedFontWeight }}>
                        {char}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default TextGear;