import { Suspense, useRef } from "react";
import { Environment, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Furniture = () => {
  const group = useRef();

  const { nodes, materials } = useGLTF("/furniture_2.gltf");

  console.log(nodes);

  const name = (type: string) => `/wood2/Wood034_2K_${type}.jpg`;

  const [colorMap, displacementMap, normalMap, roughnessMap] = useTexture([
    name("Color"),
    name("Displacement"),
    name("NormalDX"),
    name("Roughness"),
  ]);

  /**
   * Materials
   */

  const woodMaterial = materials[""];

  woodMaterial.map = colorMap;
  // woodMaterial.displacementMap = displacementMap;
  woodMaterial.normalMap = normalMap;
  woodMaterial.roughnessMap = roughnessMap;
  woodMaterial.displacementScale = 0.005;
  woodMaterial.color = new THREE.Color("#F4F4F4");

  const metalMaterial = new THREE.MeshStandardMaterial();

  metalMaterial.metalness = 0.8;
  metalMaterial.roughness = 0.3;
  metalMaterial.color = new THREE.Color("#926F34");

  return (
    <Suspense fallback={null}>
      <group ref={group} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.wood.geometry}
          scale={4}
          material={woodMaterial}
        />

        <mesh
          castShadow
          receiveShadow
          scale={4}
          geometry={nodes.metal.geometry}
          material={metalMaterial}
        />
      </group>

      <Environment preset="lobby" background />
    </Suspense>
  );
};

export default Furniture;
