import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Stars, Detailed, Float } from '@react-three/drei';

// --- 1. Sistema de Partículas ---
function ParticleVortex() {
  const count = 5000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorArray = ['#6d28d9', '#a855f7', '#d8b4fe', '#06b6d4']; 

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 * 3;
    const radius = Math.random() * 2 + 1;
    const x = Math.cos(angle) * radius * (Math.random() + 0.5);
    const y = Math.sin(angle) * radius * (Math.random() + 0.5);
    const z = (Math.random() - 0.5) * 2;
    positions.set([x, y, z], i * 3);

    const c = new THREE.Color(colorArray[Math.floor(Math.random() * colorArray.length)]);
    colors.set([c.r, c.g, c.b], i * 3);
  }

  const geometryRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(geometryRef.current) geometryRef.current.rotation.z = t * 0.1;
  });

  return (
    <points ref={geometryRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial attach="material" vertexColors size={0.03} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// --- 2. Prismas Flutuantes ---
function FloatingPrism({ position, rotation, color, scale }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(mesh.current) {
        mesh.current.rotation.x = t * rotation[0];
        mesh.current.rotation.y = t * rotation[1];
        mesh.current.rotation.z = t * rotation[2];
        mesh.current.position.y += Math.sin(t * 1 + position[0]) * 0.01;
    }
  });
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshPhysicalMaterial color={color} transmission={0.8} ior={1.5} specularColor={'#ffffff'} specularIntensity={1} clearcoat={1} clearcoatRoughness={0.1} roughness={0.1} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

// --- 3. Exportação do Cenário Principal ---
export default function SurrealScene() {
  const prisms = [
    { position: [-6, 3, 2], rotation: [0.1, 0.2, 0.3], color: '#6d28d9', scale: [0.7, 0.7, 0.7] },
    { position: [7, 4, 3], rotation: [0.3, 0.1, 0.2], color: '#a855f7', scale: [0.8, 0.8, 0.8] },
    { position: [-8, -4, 1], rotation: [0.2, 0.3, 0.1], color: '#06b6d4', scale: [0.6, 0.6, 0.6] },
    { position: [6, -3, 2], rotation: [0.1, 0.1, 0.1], color: '#fff', scale: [0.5, 0.5, 0.5] },
  ];

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <color attach="background" args={['#030305']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Detailed distances={[0, 5, 10]}>
          <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}><ParticleVortex /></Float>
        </Detailed>
        {prisms.map((prism, index) => <FloatingPrism key={index} {...prism} />)}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={1.5} color={'#fff'} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color={'#6d28d9'} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color={'#06b6d4'} />
      </Canvas>
    </div>
  );
}