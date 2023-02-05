import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Furniture from "./Furniture";

import "./App.css";

/**
 * Create the main root
 */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Canvas camera={{ position: [0, 2, 4] }}>
      <ambientLight intensity={0.1} color={"#634217"} />
      <directionalLight />
      <Furniture />
      <OrbitControls autoRotate={true} />
    </Canvas>
  </StrictMode>
);
