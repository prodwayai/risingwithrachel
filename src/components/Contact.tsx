import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import IntakeForm from './IntakeForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="display-5 fw-bold mb-3">Get In Touch</h2>
            <p className="lead">
              Ready to take your running to the next level? Fill out the form below to tell me about your goals,
              and I'll be in touch to discuss how we can work together.
            </p>
            <div className="border-bottom border-primary w-25 mx-auto mb-4" style={{borderWidth: '3px'}}></div>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col lg={8} md={10}>
            <Card className="shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h3 className="h4 fw-bold mb-4 text-center">Start Your Coaching Journey</h3>
                <IntakeForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h3 className="h4 fw-bold mb-4 text-center">Contact Information</h3>
                
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-envelope text-primary fs-4"></i>
                    </div>
                    <div>
                      <h4 className="h5 fw-bold mb-1">Email</h4>
                      <p className="mb-1 fs-5">rachellamm117@gmail.com</p>
                      <p className="text-muted">Email response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-geo-alt text-primary fs-4"></i>
                    </div>
                    <div>
                      <h4 className="h5 fw-bold mb-1">Location</h4>
                      <p className="mb-1 fs-5">Raleigh, North Carolina</p>
                      <p className="text-muted">Virtual coaching available nationwide</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-5 pt-3 border-top">
                  <div className="mb-3">
                    <h4 className="h4 fw-bold mb-2">Follow My Running Journey</h4>
                    <p className="text-muted">Stay updated with my latest races, training tips, and coaching insights</p>
                  </div>
                  
                  <Row className="justify-content-center">
                    <Col xs={12} md={6} className="mb-3">
                      <a 
                        href="https://www.instagram.com/rachelontherun_/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="d-flex align-items-center justify-content-center text-decoration-none"
                      >
                        <Button variant="outline-primary" size="lg" className="w-100 d-flex align-items-center justify-content-center">
                          <i className="bi bi-instagram fs-3 me-2"></i>
                          <span>@rachelontherun_</span>
                        </Button>
                      </a>
                    </Col>
                  </Row>
                  
                  <div className="d-flex justify-content-center gap-4 mt-3">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted">
                      <i className="bi bi-facebook fs-4"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted">
                      <i className="bi bi-twitter fs-4"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted">
                      <i className="bi bi-linkedin fs-4"></i>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact; 