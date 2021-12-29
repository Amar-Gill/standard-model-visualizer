import { Line } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, Mesh, Vector3 } from 'three';

import { ParticleColors } from '@/components/@types';

type ParticleProps = {
  showArrow?: boolean;
  showRing?: boolean;
  flipped?: boolean;
  particleColor?: ParticleColors;
} & JSX.IntrinsicElements['group'];

export default function Particle({
  particleColor = ParticleColors.UpQuark,
  showArrow = false,
  showRing = false,
  flipped = false,
  ...props
}: ParticleProps) {
  const arrowDir = new Vector3(0, 1, 0);
  arrowDir.normalize();
  const arrowOrigin = new Vector3(0, 0, 0);
  const arrowLength = 3;

  const ring = useRef<Mesh>(null!);

  useFrame(() => {
    ring.current.rotation.y += flipped ? 0.01 : -0.01;
  });

  return (
    <group {...props}>
      <arrowHelper
        visible={showArrow}
        args={[arrowDir, arrowOrigin, arrowLength, 'white']}
      />
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color={particleColor} />
      </mesh>
      <group ref={ring} visible={showRing} rotation={[0, 0, flipped ? Math.PI : 0]}>
        <mesh>
          <cylinderGeometry args={[3, 3, 0.06, 64, 4, true]} />
          <meshStandardMaterial side={DoubleSide} color={'white'} />
        </mesh>
        <Line
          points={[
            [0, 0, 1.5],
            [0.4, 0.4, 1.5],
            [0, 0, 1.5],
            [0.4, -0.4, 1.5],
          ]}
          lineWidth={2}
          position={[0, 0, 1.5]}
          color={'white'}
        />
        <Line
          points={[
            [0, 0, -1.5],
            [-0.4, 0.4, -1.5],
            [0, 0, -1.5],
            [-0.4, -0.4, -1.5],
          ]}
          lineWidth={2}
          position={[0, 0, -1.5]}
          color={'white'}
        />
      </group>
    </group>
  );
}

extend({ Particle });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Particle: ParticleProps;
    }
  }
}
