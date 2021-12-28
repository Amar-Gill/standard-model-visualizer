import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, Shape, Vector3 } from 'three';

export default function Particle(props) {
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

  const ring = useRef(null);

  useFrame(() => {
    ring.current.rotation.y += props.flipped ? 0.01 : -0.01;
  });

  return (
    <group {...props}>
      <arrowHelper
        visible={!!props.showArrow}
        args={[arrowDir, arrowOrigin, arrowLength, 'black']}
      />
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial />
      </mesh>
      <group
        ref={ring}
        visible={!!props.showRing}
        rotation={[0, 0, props.flipped ? Math.PI : 0]}>
        <mesh>
          <cylinderGeometry args={[3, 3, 0.1, 64, 4, true]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 3]}>
          <shapeGeometry args={[triangle]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -3]} rotation={[0, 0, Math.PI]}>
          <shapeGeometry args={[triangle]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
