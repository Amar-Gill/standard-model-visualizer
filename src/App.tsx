import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import MeshCollection from '@/components/MeshCollection';
import PageContent from '@/components/PageContent';

export default function App() {
  return (
    <Canvas
      orthographic
      camera={{
        far: 100,
        near: 0,
        zoom: 30,
        position: [1, 8, 20],
        rotation: [-0.4, 0.55, 0.2],
        bottom: -100,
        top: 100,
      }}>
      <color attach="background" args={['#0e1a2d']} />
      <ambientLight intensity={0.1} color="white" />
      <directionalLight color="white" position={[0, 5, 5]} />
      <ScrollControls pages={2}>
        <MeshCollection />
        <gridHelper args={[20, 40]} />
        <Scroll html>
          <PageContent />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
