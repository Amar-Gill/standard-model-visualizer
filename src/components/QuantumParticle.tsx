import { Line } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, Mesh, Vector3 } from 'three';

import { QuantumParticleColors } from '@/components/@types';

type QuantumParticleProps = {
  showArrow?: boolean;
  showRing?: boolean;
  flipped?: boolean;
  particleColor?: QuantumParticleColors;
  radius?: number;
} & JSX.IntrinsicElements['group'];

export default function QuantumParticle({
  particleColor = QuantumParticleColors.UpQuark,
  showArrow = false,
  showRing = false,
  flipped = false,
  radius = 2,
  ...props
}: QuantumParticleProps) {
  const ringRadius = radius * 1.5;
  const lineLength = radius * 0.2;
  const cylinderHeight = radius * 0.03;
  const ringRotationRad = flipped ? 0.01 : -0.01;

  const arrowDir = new Vector3(0, 1, 0);
  arrowDir.normalize();
  const arrowOrigin = new Vector3(0, 0, 0);

  const ring = useRef<Mesh>(null!);

  useFrame(() => {
    ring.current.rotation.y += ringRotationRad;
  });

  return (
    <group {...props}>
      <arrowHelper
        visible={showArrow}
        args={[arrowDir, arrowOrigin, ringRadius, 'white']}
      />
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={particleColor} />
      </mesh>
      <group ref={ring} visible={showRing} rotation={[0, 0, flipped ? Math.PI : 0]}>
        <mesh>
          <cylinderGeometry
            args={[ringRadius, ringRadius, cylinderHeight, 64, 4, true]}
          />
          <meshStandardMaterial side={DoubleSide} color={'white'} />
        </mesh>
        <Line
          points={[
            [0, 0, ringRadius],
            [lineLength, lineLength, ringRadius],
            [0, 0, ringRadius],
            [lineLength, -lineLength, ringRadius],
          ]}
          lineWidth={radius}
          color={'white'}
        />
        <Line
          points={[
            [0, 0, -ringRadius],
            [-lineLength, lineLength, -ringRadius],
            [0, 0, -ringRadius],
            [-lineLength, -lineLength, -ringRadius],
          ]}
          lineWidth={radius}
          color={'white'}
        />
      </group>
    </group>
  );
}

extend({ QuantumParticle });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      QuantumParticle: QuantumParticleProps;
    }
  }
}
