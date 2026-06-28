import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-4 pt-md-5 bg-primary text-white">
      <Container fluid="md" className="px-4 py-4 py-md-5">
        <Row className="align-items-center gy-4">
          <Col xs={12} md={6} className="order-2 order-md-1">
            <h1 className="display-5 fw-bold mb-3">Rise to Your Running Potential</h1>
            <p className="fs-5 mb-4">Personalized coaching from a Boston Marathon qualifier with 10+ marathons of experience</p>
            <div className="d-grid gap-2 d-sm-flex">
              <Button href="#contact" variant="light" className="text-primary fw-bold px-4 py-2 me-sm-3">
                Start Your Journey
              </Button>
              <Button href="#services" variant="outline-light" className="fw-bold px-4 py-2">
                View Services
              </Button>
            </div>
          </Col>
          <Col xs={12} md={6} className="order-1 order-md-2">
            <div className="bg-white p-2 rounded shadow-lg text-center">
              <img 
                src="/images/boston.jpeg" 
                alt="Rachel at Boston Marathon" 
                className="img-fluid rounded"
                style={{ 
                  maxHeight: '350px', 
                  objectFit: 'cover',
                  width: '100%'
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="d-none d-md-block">
        <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,117.3C672,128,768,192,864,202.7C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <div className="bg-white d-block d-md-none" style={{height: '20px'}}></div>
    </section>
  );
};

export default Hero; 