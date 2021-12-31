import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import QuantumParticle from '@/components/QuantumParticle';

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%' }} id="#canvas-container">
      <Canvas orthographic>
        <color attach="background" args={['#0e1a2d']} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <ambientLight intensity={0.1} color={'white'} />
        <directionalLight color="white" position={[0, 5, 5]} />
        <QuantumParticle showRing showArrow />
        <gridHelper args={[20, 40]} />
      </Canvas>
    </div>
  );
}
