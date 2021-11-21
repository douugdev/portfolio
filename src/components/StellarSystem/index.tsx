import React from 'react';

import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function
import '@babylonjs/inspector';

import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { FresnelParameters } from '@babylonjs/core/Materials/fresnelParameters';
import { Scene, Engine, Skybox } from 'react-babylonjs';
import * as CANNON from 'cannon';

import Planet from '../Planet';
import styles from './styles.module.scss';
import UserInterface from '../UserInterface';

window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

const StellarSystem: React.FC = () => {
  return (
    <div className={styles.app}>
      <UserInterface />
      <Engine
        canvasStyle={{ width: '100%', height: '100%' }}
        antialias={true}
        adaptToDeviceRatio={true}
        canvasId="sample-canvas"
      >
        <Scene enablePhysics={[gravityVector, new CannonJSPlugin()]}>
          <arcRotateCamera
            name="arc"
            fov={1}
            target={Vector3.Zero()}
            alpha={(3 * Math.PI) / 8}
            beta={(3 * Math.PI) / 8}
            minZ={0.001}
            lowerRadiusLimit={8}
            wheelPrecision={15}
            radius={250}
          />

          <Skybox name="sky-box" rootUrl={'textures/space'} size={1000} />
          <hemisphericLight
            name="global-light"
            intensity={0.2}
            direction={Vector3.Up()}
            diffuse={new Color3(0.3, 0.2, 0.5)}
            specular={new Color3(0.3, 0.2, 0.5)}
          />
          <pointLight
            name="shadow-light"
            position={Vector3.Zero()}
            radius={50}
            intensity={1.2}
            range={2000}
            diffuse={new Color3(1, 0.5, 0)}
            specular={new Color3(1, 0.5, 0)}
          >
            <shadowGenerator
              mapSize={1024}
              useBlurExponentialShadowMap={true}
              blurKernel={32}
              darkness={1.2}
              shadowCasters={['sphere1', 'dialog']}
              forceBackFacesOnly={true}
              depthScale={100}
            />
          </pointLight>
          <sphere name="sphere1" diameter={5} segments={32} position={Vector3.Zero()}>
            <standardMaterial
              name="material1"
              specularPower={8}
              emissiveColor={new Color3(1, 1, 0)}
              reflectionFresnelParameters={FresnelParameters.Parse({
                isEnabled: true,
                leftColor: [1, 1, 1],
                rightColor: [0, 0, 0],
                bias: 0.1,
                power: 5,
              })}
            >
              <texture url={'textures/sun.jpg'} />
            </standardMaterial>
          </sphere>
          {new Array(50)
            .fill(50)
            .map((v, index) => index)
            .filter((v) => v > 5)
            .map((value, index) => (
              <Planet key={index} radius={value * 2} velocity={Math.abs(value - 50) / 30} />
            ))}
        </Scene>
      </Engine>
    </div>
  );
};
export default StellarSystem;
