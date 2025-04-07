import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const groupRef = useRef(null);
  const sphereRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(time * 0.5) * 2; // Infinity loop horizontal
      groupRef.current.position.y = Math.sin(time * 0.5) * Math.cos(time * 0.5) * 2; // Infinity loop vertical
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#2A3FFB"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>
    </group>
  );
}