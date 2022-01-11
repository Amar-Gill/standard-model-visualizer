import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import PageContent from '@/components/PageContent';
import QuantumParticle from '@/components/QuantumParticle';

export default function App() {
  const [cameraZPos, setCameraZPos] = useState(20);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
      }}>
      <Canvas
        orthographic
        camera={{
          far: 100,
          near: 0,
          zoom: 30,
          position: [1, 8, cameraZPos],
          rotation: [-0.4, 0.55, 0.2],
          bottom: -100,
          top: 100,
        }}>
        <color attach="background" args={['#0e1a2d']} />
        <ambientLight intensity={0.1} color="white" />
        <directionalLight color="white" position={[0, 5, 5]} />
        <ScrollControls pages={2}>
          <QuantumParticle showRing showArrow position={[0, 0, -8]} />
          <QuantumParticle showRing showArrow position={[0, 0, 0]} />
          <QuantumParticle showRing showArrow position={[0, 0, 8]} />
          <QuantumParticle showRing showArrow position={[0, 0, 16]} />
          <QuantumParticle showRing showArrow position={[0, 0, 24]} />
          <QuantumParticle showRing showArrow position={[0, 0, 32]} />
          <gridHelper args={[20, 40]} />
          <Scroll html>
            <PageContent />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
