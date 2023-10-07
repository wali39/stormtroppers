
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';


import { Row, Col, Container } from 'react-bootstrap';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import TeamCarousel from './components/TeamCarousel';
import ThreeDSphere from './components/ThreeDSphere';
import VisualTimeSeries from './components/VisualTimeSeries';
import RegisterForm from './components/RegisterForm';
import MultipleLineCharts from './components/MultipleLineCharts';

function App() {

  return (


    <Router>

      <NavigationBar />
      <section className="hero " id="home">
        <Container><Row className='text-white justify-content-center '>
          <Col xs={10} md={6} className='align-self-center ' >
            <h1 >Welcome to Storm Troopers</h1>
            <p style={{ textAlign: "justify" }}>We are Team Storm Troopers delving into the vastness of interstellar adventure. We are five undergraduate students from Khulna University with a dream to use our technical knowledge for the good of humanity. Throughout our hackathon journey, we have tried to use our diverse skills to develop solutions that can help mankind in the coming years.</p>
          </Col>
          <Col className='align-self-center  rounded border border-warning ' xs={10} md={6} >
          <iframe width="100%" height="300" src="https://www.youtube.com/embed/EiwmdrGZlg4?si=eFYzZCAyxblT1B-S" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </Col>
        </Row>
        </Container>
      </section>

      <Container className='mt-5'>
        <section className='justify-content-center text-center mt-5 mb-5' id="threed">
          <Row className='justify-content-center'>

            <ThreeDSphere />

          </Row></section>
        <section className='justify-content-center' id="geomag">
          <h2 className='mb-5 text-center ' >Geomagnetic Field parameters</h2>
          <Row className="justify-content-center">
            <Col lg="8" className='align-itself-center'>
              <VisualTimeSeries />
            </Col>
          </Row>
        </section>
        <section className='mt-5'>
          <h2 className='mb-5 text-center ' >All Geomagnetic Field parameters</h2>
          <Row className='justify-content-center'>
            <Col lg="8" className='align-itself-center'>
              <MultipleLineCharts /></Col>
          </Row>
        </section>

        <section >
          <Row className='justify-content-center mt-5 mx-2'>
            <Col lg="6" className='align-itself-center text-white shadow-lg mx-aut ' style={{ background: "rgba(0, 0, 0, 0.5)", borderRadius: "5px", padding: "20px" }} >
              <h3 className='mb-1 text-center ' >Sign Up </h3>
              <p className='text-center '> To get Alert of Geomagnetic Storm</p>
              <RegisterForm />
            </Col>
          </Row>
        </section>

        <section className='mt-5' id='team'>
          <h2 className='mb-5 text-center' >Our Team</h2>
          <Row className="justify-content-center">
            <TeamCarousel />
          </Row>
        </section>


      </Container>
      <Footer />
    </Router>
  );
}

export default App;
