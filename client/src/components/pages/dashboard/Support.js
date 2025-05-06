import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Accordion } from 'react-bootstrap';
import {
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaSearch,
  FaFileAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBus,
  FaCalendarAlt
} from 'react-icons/fa';
import './Support.css';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [supportForm, setSupportForm] = useState({
    subject: '',
    message: '',
    type: 'question'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqs = [
    {
      id: 1,
      question: 'How do I track my bus in real-time?',
      answer: 'You can track your bus in real-time by going to the Bus Schedules page, finding your bus, and clicking on the "Track" button. This will show you the current location of the bus on a map.'
    },
    {
      id: 2,
      question: 'How do I reserve a seat on a bus?',
      answer: 'To reserve a seat, navigate to the Bus Schedules page, find the bus you want to travel on, and click the "Reserve" button. Follow the prompts to select your seat and confirm your reservation.'
    },
    {
      id: 3,
      question: 'What if I miss my bus?',
      answer: 'If you miss your bus, you can check the schedule for the next available bus. If there are no more buses scheduled for the day, you may need to find alternative transportation.'
    },
    {
      id: 4,
      question: 'How do I cancel my seat reservation?',
      answer: 'You can cancel your seat reservation by going to your profile, selecting "My Reservations", and clicking the "Cancel" button next to the reservation you want to cancel.'
    },
    {
      id: 5,
      question: 'Are there special buses for college events?',
      answer: 'Yes, special buses are arranged for most college events. You can check the Events page for details about transportation options for specific events.'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would filter the FAQs based on the search query
    console.log('Searching for:', searchQuery);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSupportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit the form to your backend
    console.log('Support form submitted:', supportForm);
    setFormSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setSupportForm({
        subject: '',
        message: '',
        type: 'question'
      });
      setFormSubmitted(false);
    }, 5000);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid>
      <div className="page-header">
        <h1>Help & Support</h1>
        <p className="text-muted">Get help with EKmate bus management system</p>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaQuestionCircle className="me-2" />
                Frequently Asked Questions
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSearch} className="mb-4">
                <div className="search-input">
                  <FaSearch className="search-icon" />
                  <Form.Control
                    type="text"
                    placeholder="Search FAQs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </Form>

              {filteredFaqs.length > 0 ? (
                <Accordion defaultActiveKey="0">
                  {filteredFaqs.map((faq, index) => (
                    <Accordion.Item key={faq.id} eventKey={index.toString()}>
                      <Accordion.Header>
                        <span className="faq-question">{faq.question}</span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="faq-answer">{faq.answer}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              ) : (
                <div className="no-results">
                  <FaQuestionCircle className="no-results-icon" />
                  <h5>No FAQs found</h5>
                  <p>Try changing your search query</p>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FaFileAlt className="me-2" />
                User Guides
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <a href="#" className="guide-link">
                    <div className="guide-item">
                      <div className="guide-icon">
                        <FaBus />
                      </div>
                      <div className="guide-content">
                        <h6>Bus Tracking Guide</h6>
                        <p>Learn how to track buses in real-time</p>
                      </div>
                    </div>
                  </a>
                </Col>

                <Col md={6} className="mb-3">
                  <a href="#" className="guide-link">
                    <div className="guide-item">
                      <div className="guide-icon">
                        <FaCalendarAlt />
                      </div>
                      <div className="guide-content">
                        <h6>Schedule Management</h6>
                        <p>How to view and manage bus schedules</p>
                      </div>
                    </div>
                  </a>
                </Col>

                <Col md={6} className="mb-3">
                  <a href="#" className="guide-link">
                    <div className="guide-item">
                      <div className="guide-icon">
                        <FaCheckCircle />
                      </div>
                      <div className="guide-content">
                        <h6>Seat Reservation</h6>
                        <p>Step-by-step guide to reserving seats</p>
                      </div>
                    </div>
                  </a>
                </Col>

                <Col md={6} className="mb-3">
                  <a href="#" className="guide-link">
                    <div className="guide-item">
                      <div className="guide-icon">
                        <FaExclamationTriangle />
                      </div>
                      <div className="guide-content">
                        <h6>Troubleshooting</h6>
                        <p>Common issues and how to resolve them</p>
                      </div>
                    </div>
                  </a>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaEnvelope className="me-2" />
                Contact Support
              </h5>
            </Card.Header>
            <Card.Body>
              {formSubmitted ? (
                <div className="form-success">
                  <FaCheckCircle className="success-icon" />
                  <h5>Thank you for contacting us!</h5>
                  <p>We've received your message and will get back to you soon.</p>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Issue Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={supportForm.type}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="question">General Question</option>
                      <option value="technical">Technical Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={supportForm.subject}
                      onChange={handleFormChange}
                      placeholder="Enter subject"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={supportForm.message}
                      onChange={handleFormChange}
                      rows={5}
                      placeholder="Describe your issue or question"
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    Submit
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FaPhone className="me-2" />
                Contact Information
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-content">
                  <h6>Phone Support</h6>
                  <p>+91 1234567890</p>
                  <p className="text-muted">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-content">
                  <h6>Email Support</h6>
                  <p>support@ekmate.com</p>
                  <p className="text-muted">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaComments />
                </div>
                <div className="contact-content">
                  <h6>Live Chat</h6>
                  <p>Available on weekdays</p>
                  <p className="text-muted">9:00 AM - 3:00 PM</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;
