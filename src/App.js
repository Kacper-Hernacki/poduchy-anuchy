import React, { useRef, Suspense } from 'react';
import './App.scss';
//Components

import { Section } from './components/section';

// R3F
import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTFLoader } from 'drei';
import Header from './components/header';

function Model({ url }) {
  const gltf = useGLTFLoader('/pillow.gltf', true);
  return <primitive object={gltf.scene} dispose={null} />;
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

const HTMLContent = () => {
  const ref = useRef();
  useFrame(
    () => ((ref.current.rotation.y += 0.01), (ref.current.rotation.x += 0.01))
  );
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, 21, 0]}>
        <mesh ref={ref} position={[0, 0, 4]}>
          <Model />
        </mesh>
        <Html prepend fullscreen>
          <div className="container">
            <h1 className="title">Poduchy Anuchy</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function App() {
  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 10], fov: 70 }}>
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent />
        </Suspense>
      </Canvas>
    </>
  );
}
