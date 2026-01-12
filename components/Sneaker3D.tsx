"use client";

import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment,
  useGLTF,
  Center,
  ContactShadows
} from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/animations";

interface Sneaker3DProps {
  accentColor: string;
}

function SneakerModel({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const shouldAnimate = !prefersReducedMotion();
  const { scene } = useGLTF("/base_basic_pbr.glb");
  const clonedScene = scene.clone();

  useEffect(() => {
    const accentColorObj = new THREE.Color(accentColor);
    
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = (mesh.material as THREE.MeshStandardMaterial).clone();
          material.emissive = accentColorObj;
          material.emissiveIntensity = 0.1;
          
          if (material.color) {
            material.color = new THREE.Color().lerpColors(
              material.color,
              accentColorObj,
              0.2
            );
          }
          
          mesh.material = material;
        }
      }
    });
  }, [accentColor, clonedScene]);

  useFrame((state) => {
    if (groupRef.current && shouldAnimate) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={3.5} />
    </group>
  );
}

function LoadingSneaker() {
  return (
    <mesh>
      <boxGeometry args={[2, 1, 0.8]} />
      <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
    </mesh>
  );
}
export function Sneaker3D({ accentColor }: Sneaker3DProps) {
  return (
    <div className="w-full h-full min-h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900/50 via-neutral-950/50 to-black/50 backdrop-blur-sm">
      <Canvas shadows camera={{ position: [3, 1, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[8, 8, 5]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight position={[-5, 3, 3]} angle={0.5} penumbra={1} intensity={1} />
        <spotLight position={[0, 5, -8]} angle={0.4} penumbra={1} intensity={1.2} />
        <pointLight position={[3, 2, 4]} intensity={0.8} color={accentColor} distance={12} />
        <Environment preset="studio" />

        <Suspense fallback={<LoadingSneaker />}>
          <Center position={[0, -0.5, 0]}>
            <SneakerModel accentColor={accentColor} />
          </Center>
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          autoRotate={true}
          autoRotateSpeed={1.2}
          enableDamping={true}
          dampingFactor={0.05}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/base_basic_pbr.glb");
