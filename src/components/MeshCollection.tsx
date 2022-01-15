import QuantumParticle from '@/components/QuantumParticle';

export default function MeshCollection(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      <QuantumParticle showRing showArrow position={[0, 0, -8]} />
      <QuantumParticle showRing showArrow position={[0, 0, 0]} />
      <QuantumParticle showRing showArrow position={[0, 0, 8]} />
      <QuantumParticle showRing showArrow position={[0, 0, 16]} />
      <QuantumParticle showRing showArrow position={[0, 0, 24]} />
      <QuantumParticle showRing showArrow position={[0, 0, 32]} />
    </group>
  );
}
