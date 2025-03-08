import { motion } from "framer-motion";
import "./PopUp.css"; // Import custom styles

const Popup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >   
            <div className="popUpleft"></div>
            <div className="popUpright popup-container">
                <button className="popup-close" onClick={onClose}>CLOSE</button>
                <div className="popup-text">
                    <div className="description">
                        <p className="popup-title">PROJECT DESCRIPTION</p>
                        <p className="descrip-text">Ryn’s <em>`COGS AND GEARS`</em> explores the mechanical and emotional forces that drive human thought and devotion. Inspired by this, I translated the poem’s central metaphor into an interactive experience—where each verse represents a small, moving gear, gradually assembling into a complete heart. As the poem progresses, scattered fragments come together, mirroring how emotions, like machinery, build toward something whole. This project brings the poem to life, transforming words into motion, showing how love and thought are intricate mechanisms constantly turning, always in motion toward something greater.</p>
                    </div>
                    <div className="letter">
                        <p className="popup-title">TO YOU</p>
                        <p className="descrip-text">Let’s not fall into the habit of repeating the same motions every day like gears turning mechanically. Instead, let’s build each day with purpose  - just as our actions accumulate to create something greater.  This project is dedicated to the great heart you will build up. <br /> <br/> From Jay </p>
                        
                        <p className="descrip-text"></p>
                    </div>
                </div>
                <div className="credit">
                    <div className="credit-row">
                <div className="credit-item">
                    <p className="credit-title">DESIGN AND WIREFRAME</p>
                    <p className="credit-text"><a href="https://www.figma.com/design/DX7tURUsSKHPRJ6j6ipVw3/Digital-Narrative?node-id=0-1&t=k8E06qrFC5eaEgN6-1" target="_blank">BY FIGMA | LINK</a></p>
                </div>

                <div className="credit-item">
                    <p className="credit-title">3D MODELING</p>
                    <p className="credit-text">
                        <a href="https://drive.google.com/drive/folders/1oUtzexYzFCiAFqj3HyCkNEpKZ8BVxitQ?usp=sharing" target="_blank">BY BLENDER | Download</a>
                    </p>
                </div>
                <div className="credit-item">
                    <p className="credit-title">TYPOGRAPHY</p>
                    <p className="credit-text">ROCINANTE TITLING VARIABLE</p>
                </div>
                <div className="credit-item">
                    <p className="credit-title">COPYRIGHTING</p>
                    <p className="credit-text">BY JAE HONG LEE</p>
                </div>
                <div className="credit-item">
                    <p className="credit-title">POEM AUTHOR</p>
                    <p className="credit-text">BY RYN</p>
                </div>
                </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Popup;