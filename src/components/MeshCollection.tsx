import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

import QuantumParticle from '@/components/QuantumParticle';

export default function MeshCollection(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<Mesh>(null!);
  const scroll = useScroll();

  useFrame(() => (ref.current.position.z = scroll.offset * -10));

  return (
    <group ref={ref} {...props}>
      <QuantumParticle showRing showArrow position={[0, 0, -8]} />
      <QuantumParticle showRing showArrow position={[0, 0, 0]} />
      <QuantumParticle showRing showArrow position={[0, 0, 8]} />
      <QuantumParticle showRing showArrow position={[0, 0, 16]} />
      <QuantumParticle showRing showArrow position={[0, 0, 24]} />
      <QuantumParticle showRing showArrow position={[0, 0, 32]} />
    </group>
  );
}
