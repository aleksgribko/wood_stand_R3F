import { Suspense, useRef } from "react";
import { Environment, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Furniture = () => {
  const group = useRef();

  const { nodes, materials } = useGLTF("/furniture_2.gltf");

  /**
   * Imports
   */

  const nameWood = (type: string) => `/wood2/Wood034_2K_${type}.jpg`;

  const [woodColorMap, woodNormalMap, woodRoughnessMap] = useTexture([
    nameWood("Color"),
    nameWood("NormalDX"),
    nameWood("Roughness"),
  ]);

  const nameMetal = (type: string) =>
    `/metal/MetalSpottyDiscoloration001_${type}_2K_METALNESS.jpg`;

  const [metalNormalMap, metalRoughnessMap] = useTexture([
    nameMetal("NRM"),
    nameMetal("ROUGHNESS"),
  ]);

  /**
   * Materials
   */

  const woodMaterial = materials[""];

  woodMaterial.map = woodColorMap;
  // woodMaterial.displacementMap = displacementMap;
  woodMaterial.normalMap = woodNormalMap;
  woodMaterial.roughnessMap = woodRoughnessMap;
  woodMaterial.displacementScale = 0.005;
  woodMaterial.color = new THREE.Color("#e3cfb1");

  const metalMaterial = new THREE.MeshStandardMaterial();

  metalMaterial.metalness = 0.7;
  metalMaterial.roughness = 0.6;
  metalMaterial.roughnessMap = metalRoughnessMap;
  metalMaterial.normalMap = metalNormalMap;
  metalMaterial.color = new THREE.Color("#705e3f");

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
