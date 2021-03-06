import React, { useRef } from 'react';

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
import { Nullable, ShadowGenerator } from '@babylonjs/core';

window.CANNON = CANNON;

const StellarSystem: React.FC = () => {
  const shadowRef = useRef<Nullable<ShadowGenerator>>(null);

  return (
    <div className={styles.app}>
      <UserInterface />
      <Engine
        canvasStyle={{ width: '100%', height: '100%' }}
        antialias={true}
        adaptToDeviceRatio={true}
        canvasId="sample-canvas"
      >
        <Scene enablePhysics={[new CannonJSPlugin()]}>
          <arcRotateCamera
            name="arc"
            fov={1}
            target={Vector3.Zero()}
            // target={new Vector3(10, 0, 0)}
            alpha={(3 * Math.PI) / 8}
            beta={(3 * Math.PI) / 8}
            minZ={0.001}
            lowerRadiusLimit={8}
            wheelPrecision={15}
            radius={250}
            // radius={8}
          />
          <glowLayer name="glow" options={{ mainTextureSamples: 2 }} isEnabled={true} intensity={2} />
          <Skybox name="sky-box" rootUrl={'textures/space'} size={1000} />
          <hemisphericLight
            name="global-light"
            intensity={0.2}
            direction={Vector3.Up()}
            diffuse={new Color3(0.3, 0.2, 0.5)}
            specular={new Color3(0.3, 0.2, 0.5)}
          />
          <pointLight
            name="sunlight"
            position={Vector3.Zero()}
            radius={10}
            falloffType={2}
            intensity={2}
            range={120}
            diffuse={new Color3(1, 0.6, 0)}
            specular={new Color3(1, 0.6, 0)}
          >
            <shadowGenerator
              ref={shadowRef}
              mapSize={1024}
              useBlurExponentialShadowMap={true}
              blurKernel={32}
              darkness={1.2}
              shadowCasters={['sphere2']}
              forceBackFacesOnly={true}
              depthScale={100}
            />
          </pointLight>
          <sphere name="sphere1" diameter={5} segments={32} position={Vector3.Zero()}>
            <standardMaterial name="material1" emissiveColor={new Color3(1, 0.6, 0)}>
              <texture url={'textures/sun.jpg'} />
            </standardMaterial>
          </sphere>
          {new Array(40)
            .fill(40)
            .map((v, index) => index)
            .filter((v) => v > 5)
            .map((value, index) => {
              return <Planet key={index} radius={value * 3} velocity={Math.abs(value - 50) / 30} />;
            })}
        </Scene>
      </Engine>
    </div>
  );
};
export default StellarSystem;
