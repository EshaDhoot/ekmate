import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBusAlt, FaUsers, FaHandshake, FaLeaf } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <main>
      {/* About Hero Section */}
      <section className="about-hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="about-title">About EKmate</h1>
              <p className="about-subtitle">
                EKmate is designed to simplify and enhance the commuting experience for students and faculty at [College Name]. Our platform provides real-time bus tracking, easy access to schedules, and a seamless journey around campus.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Mission Section */}
      <section className="section mission-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="section-title text-start">Our Mission</h2>
              <p className="mission-text">
                Our mission is to ensure that every student and faculty member can navigate our campus with ease and reliability, fostering a community where transportation is one less worry in their academic journey.
              </p>
              <p className="mission-text">
                We strive to provide the most accurate, reliable, and user-friendly bus tracking system that enhances the overall campus experience for everyone.
              </p>
            </Col>
            <Col lg={6}>
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Our mission" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Vision Section */}
      <section className="section vision-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="order-lg-2 mb-4 mb-lg-0">
              <h2 className="section-title text-start">Our Vision</h2>
              <p className="vision-text">
                We envision a future where transportation is fully integrated into the college experience, promoting sustainability, efficiency, and accessibility for all.
              </p>
              <p className="vision-text">
                By leveraging technology, we aim to create a seamless transportation ecosystem that connects all parts of campus life and enhances the overall student experience.
              </p>
            </Col>
            <Col lg={6} className="order-lg-1">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Our vision" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Values Section */}
      <section className="section values-section">
        <Container>
          <h2 className="section-title text-center">Our Values</h2>
          <p className="section-subtitle text-center">The core principles that guide our work</p>
          
          <Row className="mt-5">
            <Col md={6} lg={3} className="mb-4">
              <Card className="value-card">
                <Card.Body className="text-center">
                  <div className="value-icon">
                    <FaBusAlt />
                  </div>
                  <Card.Title className="value-title">Innovation</Card.Title>
                  <Card.Text>
                    We strive to continually improve our services through innovative technology solutions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <Card className="value-card">
                <Card.Body className="text-center">
                  <div className="value-icon">
                    <FaUsers />
                  </div>
                  <Card.Title className="value-title">Community</Card.Title>
                  <Card.Text>
                    We believe in building a supportive and connected campus community.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <Card className="value-card">
                <Card.Body className="text-center">
                  <div className="value-icon">
                    <FaHandshake />
                  </div>
                  <Card.Title className="value-title">Reliability</Card.Title>
                  <Card.Text>
                    We are committed to providing eco-friendly transportation options.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <Card className="value-card">
                <Card.Body className="text-center">
                  <div className="value-icon">
                    <FaLeaf />
                  </div>
                  <Card.Title className="value-title">Sustainability</Card.Title>
                  <Card.Text>
                    We are dedicated to promoting eco-friendly transportation options.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Meet The Team Section */}
      <section className="section team-section">
        <Container>
          <h2 className="section-title text-center">Meet The Team</h2>
          <p className="section-subtitle text-center">The people behind EKmate</p>
          
          <Row className="mt-5">
            <Col md={6} lg={3} className="mb-4">
              <Card className="team-card">
                <Card.Img variant="top" src="https://via.placeholder.com/300x300" />
                <Card.Body className="text-center">
                  <Card.Title className="team-name">[Your Name]</Card.Title>
                  <Card.Subtitle className="team-role">Project Lead and Developer</Card.Subtitle>
                  <Card.Text className="team-bio">
                    Passionate about leveraging technology to improve campus life.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <Card className="team-card">
                <Card.Img variant="top" src="https://via.placeholder.com/300x300" />
                <Card.Body className="text-center">
                  <Card.Title className="team-name">[Team Member]</Card.Title>
                  <Card.Subtitle className="team-role">UI/UX Designer</Card.Subtitle>
                  <Card.Text className="team-bio">
                    Dedicated to creating user-friendly interfaces that enhance the user experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <Card className="team-card">
                <Card.Img variant="top" src="https://via.placeholder.com/300x300" />
                <Card.Body className="text-center">
                  <Card.Title className="team-name">[Team Member]</Card.Title>
                  <Card.Subtitle className="team-role">Backend Developer</Card.Subtitle>
                  <Card.Text className="team-bio">
                    Expert in creating robust and scalable backend systems.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <Card className="team-card">
                <Card.Img variant="top" src="https://via.placeholder.com/300x300" />
                <Card.Body className="text-center">
                  <Card.Title className="team-name">[Team Member]</Card.Title>
                  <Card.Subtitle className="team-role">Marketing Specialist</Card.Subtitle>
                  <Card.Text className="team-bio">
                    Skilled in promoting our services to the campus community.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Get Involved Section */}
      <section className="section get-involved-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h2 className="section-title">Get Involved</h2>
              <p className="get-involved-text">
                We welcome input from our users! If you have any suggestions or would like to collaborate, please reach out to us through our contact form.
              </p>
              <p className="get-involved-text">
                Your feedback helps us improve and provide better transportation options for everyone on campus.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default About;
