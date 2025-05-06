import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Nav, Badge } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaClock, FaBus, FaCalendarAlt } from 'react-icons/fa';
import './BusSchedules.css';

const BusSchedules = () => {
  const [scheduleType, setScheduleType] = useState('daily');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedDate, setSelectedDate] = useState('');
  
  const [dailySchedules, setDailySchedules] = useState({
    monday: [
      {
        id: 1,
        route: 'Campus to City Center',
        departureTime: '07:30 AM',
        arrivalTime: '08:15 AM',
        busNumber: 'B101',
        stops: ['Main Gate', 'Library', 'Hostel Block', 'City Center']
      },
      {
        id: 2,
        route: 'City Center to Campus',
        departureTime: '08:30 AM',
        arrivalTime: '09:15 AM',
        busNumber: 'B102',
        stops: ['City Center', 'Market Square', 'Hospital', 'Main Gate']
      },
      {
        id: 3,
        route: 'Campus to North Station',
        departureTime: '09:00 AM',
        arrivalTime: '09:45 AM',
        busNumber: 'B103',
        stops: ['Main Gate', 'Faculty Housing', 'North Station']
      }
    ],
    tuesday: [
      {
        id: 4,
        route: 'Campus to City Center',
        departureTime: '07:30 AM',
        arrivalTime: '08:15 AM',
        busNumber: 'B101',
        stops: ['Main Gate', 'Library', 'Hostel Block', 'City Center']
      },
      {
        id: 5,
        route: 'City Center to Campus',
        departureTime: '08:30 AM',
        arrivalTime: '09:15 AM',
        busNumber: 'B102',
        stops: ['City Center', 'Market Square', 'Hospital', 'Main Gate']
      }
    ],
    wednesday: [
      {
        id: 6,
        route: 'Campus to City Center',
        departureTime: '07:30 AM',
        arrivalTime: '08:15 AM',
        busNumber: 'B101',
        stops: ['Main Gate', 'Library', 'Hostel Block', 'City Center']
      }
    ],
    thursday: [
      {
        id: 7,
        route: 'Campus to City Center',
        departureTime: '07:30 AM',
        arrivalTime: '08:15 AM',
        busNumber: 'B101',
        stops: ['Main Gate', 'Library', 'Hostel Block', 'City Center']
      }
    ],
    friday: [
      {
        id: 8,
        route: 'Campus to City Center',
        departureTime: '07:30 AM',
        arrivalTime: '08:15 AM',
        busNumber: 'B101',
        stops: ['Main Gate', 'Library', 'Hostel Block', 'City Center']
      }
    ],
    saturday: [
      {
        id: 9,
        route: 'Campus to City Center',
        departureTime: '09:30 AM',
        arrivalTime: '10:15 AM',
        busNumber: 'B101',
        stops: ['Main Gate', 'Library', 'Hostel Block', 'City Center']
      }
    ],
    sunday: [
      {
        id: 10,
        route: 'Campus to City Center',
        departureTime: '10:30 AM',
        arrivalTime: '11:15 AM',
        busNumber: 'B101',
        stops: ['Main Gate', 'Library', 'Hostel Block', 'City Center']
      }
    ]
  });
  
  const [eventSchedules, setEventSchedules] = useState([
    {
      id: 1,
      eventName: 'College Annual Day',
      date: '2025-05-15',
      schedules: [
        {
          id: 101,
          route: 'City Center to Campus',
          departureTime: '08:00 AM',
          arrivalTime: '08:45 AM',
          busNumber: 'E101',
          stops: ['City Center', 'Market Square', 'Hospital', 'Main Gate']
        },
        {
          id: 102,
          route: 'North Station to Campus',
          departureTime: '08:30 AM',
          arrivalTime: '09:15 AM',
          busNumber: 'E102',
          stops: ['North Station', 'Faculty Housing', 'Main Gate']
        }
      ]
    },
    {
      id: 2,
      eventName: 'Tech Symposium',
      date: '2025-05-20',
      schedules: [
        {
          id: 103,
          route: 'City Center to Campus',
          departureTime: '07:30 AM',
          arrivalTime: '08:15 AM',
          busNumber: 'E201',
          stops: ['City Center', 'Market Square', 'Hospital', 'Main Gate']
        }
      ]
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would filter the schedules based on the search query
    console.log('Searching for:', searchQuery);
  };

  const filteredDailySchedules = dailySchedules[selectedDay].filter(schedule => 
    schedule.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEventSchedules = eventSchedules.filter(event => 
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (selectedDate && event.date === selectedDate)
  );

  return (
    <Container fluid>
      <div className="page-header">
        <h1>Bus Schedules</h1>
        <p className="text-muted">View and search for bus schedules</p>
      </div>
      
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="align-items-end">
              <Col md={6} lg={4}>
                <Form.Group className="mb-3 mb-md-0">
                  <Form.Label>Search</Form.Label>
                  <div className="search-input">
                    <FaSearch className="search-icon" />
                    <Form.Control 
                      type="text" 
                      placeholder="Search by route or bus number" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>
              
              <Col md={4} lg={3}>
                <Form.Group className="mb-3 mb-md-0">
                  <Form.Label>Schedule Type</Form.Label>
                  <Form.Select 
                    value={scheduleType}
                    onChange={(e) => setScheduleType(e.target.value)}
                  >
                    <option value="daily">Daily Schedule</option>
                    <option value="event">Event Schedule</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              {scheduleType === 'daily' ? (
                <Col md={4} lg={3}>
                  <Form.Group className="mb-3 mb-md-0">
                    <Form.Label>Day</Form.Label>
                    <Form.Select 
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                    >
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              ) : (
                <Col md={4} lg={3}>
                  <Form.Group className="mb-3 mb-md-0">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              )}
              
              <Col md={4} lg={2}>
                <Button type="submit" variant="primary" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      
      {scheduleType === 'daily' ? (
        <Card>
          <Card.Header>
            <h5 className="mb-0">
              <FaCalendarAlt className="me-2" /> 
              {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} Schedule
            </h5>
          </Card.Header>
          <Card.Body className="p-0">
            {filteredDailySchedules.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Bus Number</th>
                      <th>Route</th>
                      <th>Departure</th>
                      <th>Arrival</th>
                      <th>Stops</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDailySchedules.map(schedule => (
                      <tr key={schedule.id}>
                        <td>
                          <Badge bg="primary">{schedule.busNumber}</Badge>
                        </td>
                        <td>{schedule.route}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaClock className="me-2 text-primary" />
                            {schedule.departureTime}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaClock className="me-2 text-success" />
                            {schedule.arrivalTime}
                          </div>
                        </td>
                        <td>
                          <div className="stops-list">
                            {schedule.stops.map((stop, index) => (
                              <span key={index} className="stop-item">
                                <FaMapMarkerAlt className="stop-icon" />
                                {stop}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <Button variant="primary" size="sm">Track</Button>
                          <Button variant="outline-primary" size="sm" className="ms-2">Reserve</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-results">
                <FaBus className="no-results-icon" />
                <h5>No schedules found</h5>
                <p>Try changing your search criteria</p>
              </div>
            )}
          </Card.Body>
        </Card>
      ) : (
        <div>
          {filteredEventSchedules.length > 0 ? (
            filteredEventSchedules.map(event => (
              <Card key={event.id} className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaCalendarAlt className="me-2" /> 
                    {event.eventName} - {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>Bus Number</th>
                          <th>Route</th>
                          <th>Departure</th>
                          <th>Arrival</th>
                          <th>Stops</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {event.schedules.map(schedule => (
                          <tr key={schedule.id}>
                            <td>
                              <Badge bg="success">{schedule.busNumber}</Badge>
                            </td>
                            <td>{schedule.route}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <FaClock className="me-2 text-primary" />
                                {schedule.departureTime}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <FaClock className="me-2 text-success" />
                                {schedule.arrivalTime}
                              </div>
                            </td>
                            <td>
                              <div className="stops-list">
                                {schedule.stops.map((stop, index) => (
                                  <span key={index} className="stop-item">
                                    <FaMapMarkerAlt className="stop-icon" />
                                    {stop}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <Button variant="primary" size="sm">Track</Button>
                              <Button variant="outline-primary" size="sm" className="ms-2">Reserve</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card>
              <Card.Body className="text-center py-5">
                <div className="no-results">
                  <FaBus className="no-results-icon" />
                  <h5>No event schedules found</h5>
                  <p>Try changing your search criteria or date</p>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      )}
    </Container>
  );
};

export default BusSchedules;
