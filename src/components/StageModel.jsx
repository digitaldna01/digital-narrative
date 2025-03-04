import React from 'react';
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function StageModel({ currentStage }) {
  const gltf = useGLTF("https://digitaldna01.github.io/digital-narrative/models/allStages.glb");
  const [stageObjects, setStageObjects] = useState([]);

  useEffect(() => {
    if (gltf.scene && gltf.scene.children.length > 0) {
      console.log("Scene Structure:", gltf.scene);
      console.log("Raw Scene Children:", gltf.scene.children.map(child => child.name));

      // Reorder Stage name
      const sortedStages = gltf.scene.children
        .filter(child => /^Stage\d+_Empty$/.test(child.name))
        .sort((a, b) => {
          const numA = parseInt(a.name.match(/\d+/)[0], 10);
          const numB = parseInt(b.name.match(/\d+/)[0], 10);
          return numA - numB;
        });

      setStageObjects(sortedStages);
    }
  }, [gltf.scene]); // ✅ Only render model once 

  console.log("Filtered & Sorted Stages:", stageObjects.map(child => child.name));


  return (
    <group >
      {stageObjects.map((stage, index) => (
        <primitive
            key={stage.name}
            object={stage}
            visible={index <= currentStage} // 단계별 활성화
          />
      ))}
    </group>
  );
}

// preload models
useGLTF.preload("/models/allStages.glb");