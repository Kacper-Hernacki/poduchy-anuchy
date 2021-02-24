import React, { useRef, Suspense, useState } from 'react';
import './App.scss';
//Components
import CookieConsent from 'react-cookie-consent';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Section } from './components/section';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';

// R3F
import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTFLoader } from 'drei';
import Header from './components/header';
import About from './components/About';
import Products from './components/Products';
import How from './components/How';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Modal from './components/Modal';

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
        <mesh ref={ref} position={[0, 0, 6]}>
          <Model />
        </mesh>
        <Html className="html__container" prepend fullscreen>
          <div className="container">
            <h1 className="title">Poduchy Anuchy</h1>

            <button href="#products">Zamów teraz</button>
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/o_mnie">
            <About />
          </Route>

          <Route path="/produkty">
            <Products />
          </Route>

          <Route path="/jak_zamowic">
            <How />
          </Route>

          <Route path="/kontakt">
            <Contact />
          </Route>

          <Route path="/galeria">
            <Gallery setSelectedImg={setSelectedImg} />
            {selectedImg && (
              <Modal
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            )}
          </Route>

          <Route path="/">
            <Canvas
              concurrent
              colorManagement
              camera={{ position: [0, 0, 10], fov: 70 }}>
              {/* Lights Component */}
              <Lights />
              <Suspense className="suspense" fallback={null}>
                <HTMLContent />
              </Suspense>
            </Canvas>
          </Route>
        </Switch>
        <CookieConsent
          expires={365}
          buttonText="Ok, rozumiem!"
          style={{
            background: 'rgba(0,0,0,0.5)',
            textAlign: 'left',
            position: 'absolute',
            zIndex: '166111591',
            bottom: '0',
            height: '200px',
          }}
          buttonStyle={{
            color: '#572e2e',
            background: 'white',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          location="bottom"
          debug={true}>
          This site uses cookies. See our <a href="/">privacy policy</a> for
          more
        </CookieConsent>
      </Router>
    </>
  );
}
