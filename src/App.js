import React, { useRef, Suspense, useState, useEffect } from 'react';
import './App.scss';
//Components
import CookieConsent from 'react-cookie-consent';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Section } from './components/section';

import 'bootstrap/dist/css/bootstrap.min.css';

import { LinkContainer } from 'react-router-bootstrap';
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
import Payment from './components/Payment';
import Checkout from './components/Checkout';
import PaymentForm from './components/PaymentForm';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Order from './components/Order';
import Cookies from './components/Cookies';
import Regulamin from './components/Regulamin';
import Categories from './components/Categories';

import PillowCases from './productsPages/PillowCases';
import Decoupage from './productsPages/Decoupage';
import Pillows from './productsPages/Pillows';
import Others from './productsPages/Others';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { useStateValue } from './StateProvider';
import { auth, db, firebase } from './firebase';
import ErrorPage from './ErrorPage';
import PaymentAtReceive from './components/PaymentAtReceive';

const promise = loadStripe(
  'pk_test_51IQb0cLJT82lIrq7JolLUbJl7TcOBFtBiwrVexF6ToaHcSjeCrnn4zpkF3OjSjWSMQUxISBx4uGCXIeyu1ycAvRK00ze0Ot7Ng'
);

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
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function App() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // add isAnonymous function !!!
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Router>
        {' '}
        {(() => {
          switch (window.location.pathname) {
            case '/admin':
              return null;
            case '/adminDashboard':
              return null;

            default:
              return <Header />;
          }
        })()}
        <Switch>
          <Route path="/o_mnie">
            <About />
          </Route>

          <Route path="/produkty">
            <Products />
          </Route>

          <Route path="/categories">
            <Categories />
          </Route>

          <Route path="/jak_zamowic">
            <How />
          </Route>

          <Route path="/kontakt">
            <Contact />
          </Route>

          <Route path="/platnosc">
            <Payment />
          </Route>

          <Route path="/kosz">
            <Checkout />
          </Route>

          <Route path="/order">
            <Order />
          </Route>

          <Route path="/cookies">
            <Cookies />
          </Route>

          <Route path="/regulamin">
            <Regulamin />
          </Route>

          <Route path="/products/pillowcases">
            <PillowCases />
          </Route>

          <Route path="/products/decoupage">
            <Decoupage />
          </Route>

          <Route path="/products/others">
            <Others />
          </Route>

          <Route path="/products/pillows">
            <Pillows />
          </Route>

          <Route path="/paymentAtReceive">
            <PaymentAtReceive />
          </Route>

          <Route path="/admin">
            <Login />
          </Route>

          <ProtectedRoute exact path="/adminDashboard" component={Dashboard} />

          <Route path="/payment">
            <Elements stripe={promise}>
              {' '}
              <PaymentForm />
            </Elements>
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
          {/* <Route path="*" component={ErrorPage} /> */}
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
            <Link to="/categories">
              <button className="button__products" href="/produkty">
                Zamów teraz
              </button>
            </Link>
          </Route>
        </Switch>
        <CookieConsent
          expires={365}
          buttonText="Ok, rozumiem!"
          style={{
            background: 'rgba(0,0,0,0.5)',
            textAlign: 'left',
            position: 'absolute',
            zIndex: '166111591100000',
            bottom: '0',
            height: '200px',
            fontFamily: 'Courgette',
            fontSize: '20px',
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
          Ta strona używa plików cookies. Zobacz naszą{' '}
          <LinkContainer to="/cookies">
            <a href="/cookies">politykę prywatności</a>
          </LinkContainer>{' '}
          , żeby dowiedzieć się więcej.
        </CookieConsent>
      </Router>
      <Router></Router>
    </>
  );
}
