import { Canvas } from '@react-three/fiber';

import PageContent from '@/components/PageContent';
import QuantumParticle from '@/components/QuantumParticle';

export default function App() {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}>
        <Canvas orthographic>
          <color attach="background" args={['#0e1a2d']} />
          <ambientLight intensity={0.1} color="white" />
          <directionalLight color="white" position={[0, 5, 5]} />
          <QuantumParticle showRing showArrow />
          <gridHelper args={[20, 40]} />
        </Canvas>
      </div>
      <PageContent />
    </>
  );
}
