import React, { useEffect, useRef, useState } from "react";
import "./TextGear.css";
import "./App.css";

import mechClick from "./assets/sounds/mech_click.mp3";
import gearSpin from "./assets/sounds/gear_spin.mp3";

const TextGear = ({ text, fontSize , color, fontWeight, setShowLeft}) => {
    const [clickCount, setClickCount] = useState(0); // circular state
    const [activeGroup, setActiveGroup] = useState(0); // Current Animation Group
    const [volume, setVolume] = useState(0.2); // 🔊 initial Volumn Set(0.5 = 50%)

    const CHARS = text.split("");
    const INNER_ANGLE = 360 / CHARS.length;
    const radius = (1 / Math.sin(INNER_ANGLE * (Math.PI / 180))) * -1 + "ch";

    // Audio Reference variable
    const clickAudioRef = useRef(new Audio(mechClick));
    const spinAudioRef = useRef(new Audio(gearSpin));

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

    // After became Circular,
    useEffect(() => {
        if (clickCount === 1) {
            setTimeout(() => {
                setShowLeft(true);
            }, 3000); // 3초 후 Stage1 자동 표시
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
            clickAudioRef.current.play();

            setTimeout(() => {
                spinAudioRef.current.play(); // 🔄 12초짜리 기어 회전 사운드 재생 (루프)
                
                setTimeout(() => {
                    spinAudioRef.current.pause();
                    spinAudioRef.current.currentTime = 0; // Reset to the beginning
                }, 6000);
            }, 400); // 0.5초 후 실행
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