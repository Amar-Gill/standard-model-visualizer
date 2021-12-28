import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, Mesh, Shape, Vector3 } from 'three';

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

  const shapeLength = 0.4;
  const triangle = new Shape();
  triangle.moveTo(0, 0);
  triangle.lineTo(shapeLength, shapeLength);
  triangle.lineTo(shapeLength, -shapeLength);
  triangle.lineTo(0, 0);

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
          <cylinderGeometry args={[3, 3, 0.1, 64, 4, true]} />
          <meshStandardMaterial side={DoubleSide} color={'white'} />
        </mesh>
        <mesh position={[0, 0, 3]}>
          <shapeGeometry args={[triangle]} />
          <meshStandardMaterial side={DoubleSide} color={'white'} />
        </mesh>
        <mesh position={[0, 0, -3]} rotation={[0, 0, Math.PI]}>
          <shapeGeometry args={[triangle]} />
          <meshStandardMaterial side={DoubleSide} color={'white'} />
        </mesh>
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
