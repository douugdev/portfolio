import { FresnelParameters, Mesh, Nullable, Vector3 } from '@babylonjs/core';
import React, { useRef } from 'react';
import { useBeforeRender } from 'react-babylonjs';

interface Props {
  radius: number;
  velocity: number;
}

const Planet: React.FC<Props> = ({ radius, velocity }) => {
  let degrees: number = 0;

  const rpm = 20;

  const sphereRef = useRef<Nullable<Mesh>>(null);

  const getNextVector = (radius: number, angle: number) => {
    const radianAngle = angle * (Math.PI / 180);
    const x = radius * Math.cos(radianAngle);
    const z = radius * Math.sin(radianAngle);
    return new Vector3(x, 0, z);
  };

  useBeforeRender((scene) => {
    if (sphereRef.current !== null) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
      degrees += velocity;
      if (degrees >= 361) {
        degrees = 0;
      }
      const nextPos = getNextVector(radius, degrees);
      sphereRef.current.position = nextPos;
      sphereRef.current.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  });

  return (
    <sphere name="sphere2" diameter={2} segments={32} position={new Vector3(0, 0, radius)} ref={sphereRef}>
      <standardMaterial
        name="material2"
        specularPower={8}
        reflectionFresnelParameters={FresnelParameters.Parse({
          isEnabled: true,
          leftColor: [1, 1, 1],
          rightColor: [0, 0, 0],
          bias: 0.1,
          power: 5,
        })}
      >
        <texture url={'textures/planet.jpg'} />
      </standardMaterial>
    </sphere>
  );
};

export default Planet;
