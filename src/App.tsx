import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Particle from './components/Particle';

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%' }} id="#canvas-container">
      <Canvas orthographic>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <ambientLight intensity={0.1} />
        <directionalLight color="green" position={[0, 5, 5]} />
        <mesh position={[-10, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
        <Particle showRing showArrow />
        <gridHelper args={[20, 40]} />
      </Canvas>
    </div>
  );
}
