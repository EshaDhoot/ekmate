import React from 'react';
import { Container, Row, Col, Button, Card, Carousel, Accordion } from 'react-bootstrap';
import { FaBus, FaCalendarAlt, FaBell, FaChair, FaUserCog, FaMapMarkedAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <h1 className="hero-title">Effortless College Commutes: Your Bus Schedules at Your Fingertips!</h1>
              <p className="hero-subtitle">Track your bus, plan your commute, and never miss a ride with our real-time bus management system.</p>
              <Button
                variant="primary"
                size="lg"
                className="hero-button custom-btn"
                style={{ backgroundColor: '#9575cd', borderColor: '#9575cd' }}
              >
                Download App
              </Button>
            </Col>
            <Col lg={6} className="hero-image">
              <img src="https://via.placeholder.com/600x400" alt="Bus tracking app" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Key Features Section */}
      <section className="section features-section">
        <Container>
          <h2 className="section-title">Key Features</h2>
          <p className="section-subtitle">Discover what makes our bus management system special</p>

          <Row>
            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <FaBus />
                  </div>
                  <Card.Title className="feature-title">Real-time Bus Tracking</Card.Title>
                  <Card.Text>
                    See where your bus is in real-time and get accurate arrival times.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <FaCalendarAlt />
                  </div>
                  <Card.Title className="feature-title">Daily and Event-based Schedules</Card.Title>
                  <Card.Text>
                    Access daily schedules or find buses for special college events.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <FaBell />
                  </div>
                  <Card.Title className="feature-title">Push Notifications</Card.Title>
                  <Card.Text>
                    Receive alerts for bus delays, route changes, or cancellations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <FaChair />
                  </div>
                  <Card.Title className="feature-title">Seat Reservation</Card.Title>
                  <Card.Text>
                    Reserve your seat in advance for a smooth ride.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <FaUserCog />
                  </div>
                  <Card.Title className="feature-title">Admin Panel</Card.Title>
                  <Card.Text>
                    Admins can effortlessly update schedules, ensuring everyone is up to date.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works-section">
        <Container>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started with EKmate in just a few simple steps</p>

          <Row className="justify-content-center">
            <Col md={10}>
              <div className="steps-container">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Sign Up</h4>
                    <p>Create an account with your college credentials.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>View Schedules</h4>
                    <p>Easily browse through daily or event-specific bus schedules.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Track Buses</h4>
                    <p>Monitor your bus's location in real-time for accurate arrival times.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Get Notified</h4>
                    <p>Receive instant alerts about bus changes or delays.</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* College Marketing Section */}
      <section className="section college-section">
        <Container>
          <h2 className="section-title">College Life</h2>

          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="college-content">
                <h3>Why Choose [College Name]?</h3>
                <p>At [College Name], we pride ourselves on offering a vibrant academic and social environment. Whether it's cutting-edge facilities or a dynamic student life, there's something for everyone.</p>
                <Button
                  variant="outline-primary"
                  className="custom-outline-btn"
                  style={{
                    borderColor: '#9575cd',
                    color: '#9575cd',
                    '--hover-bg': '#9575cd',
                    '--hover-border': '#9575cd',
                    '--hover-color': 'white'
                  }}
                >
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img src="https://via.placeholder.com/600x400" alt="College campus" className="img-fluid rounded" />
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={6} className="order-lg-2 mb-4 mb-lg-0">
              <div className="college-content">
                <h3>Explore Our Campus</h3>
                <p>Our campus offers modern amenities, research labs, sports facilities, and much more. Our bus system ensures that students can easily navigate the entire campus and make the most of these resources.</p>
                <Button
                  variant="outline-primary"
                  className="custom-outline-btn"
                  style={{ borderColor: '#9575cd', color: '#9575cd' }}
                >
                  Campus Tour
                </Button>
              </div>
            </Col>
            <Col lg={6} className="order-lg-1">
              <img src="https://via.placeholder.com/600x400" alt="Campus facilities" className="img-fluid rounded" />
            </Col>
          </Row>

          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="college-content">
                <h3>Excellence in Education</h3>
                <p>Our academic programs are designed to challenge and inspire students. With state-of-the-art labs, renowned faculty, and a diverse range of programs, [College Name] helps you shape your future.</p>
                <Button
                  variant="outline-primary"
                  className="custom-outline-btn"
                  style={{ borderColor: '#9575cd', color: '#9575cd' }}
                >
                  Explore Programs
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img src="https://via.placeholder.com/600x400" alt="Academic excellence" className="img-fluid rounded" />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col className="text-center">
              <h3>Join Us at Our Next Event!</h3>
              <p>Be part of our annual [Event Name], and use our bus system to attend hassle-free! Learn more about the event and our transportation services.</p>
              <Button
                variant="primary"
                className="custom-btn"
                style={{ backgroundColor: '#9575cd', borderColor: '#9575cd' }}
              >
                Learn More About Events
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Screenshots/Demo Section */}
      {/* <section className="section screenshots-section">
        <Container>
          <h2 className="section-title">App Screenshots</h2>
          <p className="section-subtitle">See our app in action</p>

          <Carousel className="screenshots-carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x500"
                alt="Real-time bus tracking"
              />
              <Carousel.Caption>
                <h3>Real-time Bus Tracking</h3>
                <p>Track your bus location in real-time</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x500"
                alt="Daily schedules"
              />
              <Carousel.Caption>
                <h3>Daily Schedules</h3>
                <p>View all bus schedules in one place</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x500"
                alt="Seat reservation"
              />
              <Carousel.Caption>
                <h3>Seat Reservation</h3>
                <p>Reserve your seat in advance</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section> */}

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <Container>
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">Hear from students and administrators who use EKmate</p>

          <Row>
            <Col md={6} className="mb-4">
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="testimonial-quote">"I never miss my bus anymore! The real-time tracking is so useful."</div>
                  <div className="testimonial-author">— Student User</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="testimonial-quote">"Updating schedules for events has become so easy thanks to this platform."</div>
                  <div className="testimonial-author">— Admin User</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <Container>
          <h2 className="section-title">Benefits</h2>
          <p className="section-subtitle">Why choose our bus management system</p>

          <Row>
            <Col md={4} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaMapMarkedAlt />
                </div>
                <h4>Convenience</h4>
                <p>Access bus schedules from anywhere.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaClock />
                </div>
                <h4>Reliability</h4>
                <p>Receive accurate real-time updates on bus arrivals.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaCheckCircle />
                </div>
                <h4>Efficiency</h4>
                <p>Plan your day better by tracking buses in real time.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <Container>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions</p>

          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Who can use the bus management system?</Accordion.Header>
                  <Accordion.Body>
                    The bus management system is designed for all members of the [College Name] community, including students, faculty, and staff. Anyone with a valid college email address can create an account and access bus schedules, real-time tracking, and other features to enhance their commuting experience.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How do I sign up?</Accordion.Header>
                  <Accordion.Body>
                    To sign up for the bus management system, follow these simple steps:
                    <ol>
                      <li>Visit the EKmate website and click on the "Sign Up" button.</li>
                      <li>Fill in the required information, including your name, email address, and password.</li>
                      <li>Verify your college email address by clicking the confirmation link sent to your inbox.</li>
                      <li>Once verified, log in using your email and password to access the system.</li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Is the app available for both Android and iOS?</Accordion.Header>
                  <Accordion.Body>
                    Yes, our app is available for both Android and iOS devices. You can download it from the Google Play Store or the Apple App Store.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>How accurate is the real-time tracking?</Accordion.Header>
                  <Accordion.Body>
                    Our real-time tracking system updates every 30 seconds, providing highly accurate location data. The estimated arrival times are calculated based on current traffic conditions and historical data.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <Container className="text-center">
          <h2 className="cta-title">Ready to Join Us?</h2>
          <p className="cta-text">Discover all that [College Name] has to offer and start your journey today.</p>
          <Button
            variant="primary"
            size="lg"
            className="cta-button"
            style={{ backgroundColor: 'white', color: '#9575cd' }}
          >
            Apply Now
          </Button>
        </Container>
      </section>
    </main>
  );
};

export default Home;
