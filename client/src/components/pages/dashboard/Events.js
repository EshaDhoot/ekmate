import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaBus, 
  FaInfoCircle 
} from 'react-icons/fa';
import './Events.css';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'College Annual Day',
      date: '2025-05-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      description: 'Join us for the annual day celebration featuring cultural performances, awards ceremony, and more.',
      type: 'cultural',
      transportation: true,
      image: 'https://via.placeholder.com/800x400'
    },
    {
      id: 2,
      title: 'Tech Symposium',
      date: '2025-05-20',
      time: '9:00 AM - 5:00 PM',
      location: 'Engineering Block',
      description: 'A technical symposium featuring workshops, paper presentations, and guest lectures from industry experts.',
      type: 'academic',
      transportation: true,
      image: 'https://via.placeholder.com/800x400'
    },
    {
      id: 3,
      title: 'Sports Day',
      date: '2025-06-05',
      time: '8:00 AM - 6:00 PM',
      location: 'College Grounds',
      description: 'Annual sports day featuring various athletic competitions and team events.',
      type: 'sports',
      transportation: true,
      image: 'https://via.placeholder.com/800x400'
    },
    {
      id: 4,
      title: 'Alumni Meet',
      date: '2025-06-15',
      time: '11:00 AM - 3:00 PM',
      location: 'Conference Hall',
      description: 'Connect with alumni and network with professionals from various industries.',
      type: 'networking',
      transportation: false,
      image: 'https://via.placeholder.com/800x400'
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would filter the events based on the search query
    console.log('Searching for:', searchQuery);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || event.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <Container fluid>
      <div className="page-header">
        <h1>Events</h1>
        <p className="text-muted">Discover upcoming events and transportation options</p>
      </div>
      
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="align-items-end">
              <Col md={6} lg={5}>
                <Form.Group className="mb-3 mb-md-0">
                  <Form.Label>Search</Form.Label>
                  <div className="search-input">
                    <FaSearch className="search-icon" />
                    <Form.Control 
                      type="text" 
                      placeholder="Search events" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>
              
              <Col md={4} lg={3}>
                <Form.Group className="mb-3 mb-md-0">
                  <Form.Label>Event Type</Form.Label>
                  <Form.Select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Events</option>
                    <option value="cultural">Cultural</option>
                    <option value="academic">Academic</option>
                    <option value="sports">Sports</option>
                    <option value="networking">Networking</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={4} lg={2}>
                <Button type="submit" variant="primary" className="w-100">
                  Search
                </Button>
              </Col>
              
              <Col md={4} lg={2}>
                <Button variant="outline-primary" className="w-100">
                  <FaCalendarAlt className="me-2" />
                  Calendar View
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      
      <Row>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <Col key={event.id} lg={6} className="mb-4">
              <Card className="event-card h-100">
                <div className="event-image-container">
                  <img src={event.image} alt={event.title} className="event-image" />
                  <Badge 
                    bg={
                      event.type === 'cultural' ? 'primary' : 
                      event.type === 'academic' ? 'info' : 
                      event.type === 'sports' ? 'success' : 
                      'secondary'
                    } 
                    className="event-badge"
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
                <Card.Body>
                  <Card.Title className="event-title">{event.title}</Card.Title>
                  
                  <div className="event-details">
                    <div className="event-detail">
                      <FaCalendarAlt className="event-icon" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div className="event-detail">
                      <FaClock className="event-icon" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="event-detail">
                      <FaMapMarkerAlt className="event-icon" />
                      <span>{event.location}</span>
                    </div>
                    
                    {event.transportation && (
                      <div className="event-detail">
                        <FaBus className="event-icon" />
                        <span>Transportation Available</span>
                      </div>
                    )}
                  </div>
                  
                  <Card.Text className="event-description">
                    {event.description}
                  </Card.Text>
                  
                  <div className="event-actions">
                    <Button variant="primary">
                      View Details
                    </Button>
                    {event.transportation && (
                      <Button variant="outline-primary">
                        View Bus Schedule
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Card className="text-center py-5">
              <Card.Body>
                <div className="no-results">
                  <FaCalendarAlt className="no-results-icon" />
                  <h5>No events found</h5>
                  <p>Try changing your search criteria</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      
      <div className="info-box">
        <div className="info-icon">
          <FaInfoCircle />
        </div>
        <div className="info-content">
          <h5>Transportation for Events</h5>
          <p>
            Special bus services are available for most college events. Check the event details for transportation options and schedules.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Events;
