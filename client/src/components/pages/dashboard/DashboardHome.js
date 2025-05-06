import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import './DashboardHome.css';

const DashboardHome = () => {
  const { currentUser } = useAuth();
  const [upcomingBuses, setUpcomingBuses] = useState([
    {
      id: 1,
      route: 'Campus to City Center',
      departureTime: '08:30 AM',
      status: 'On Time',
      availableSeats: 15
    },
    {
      id: 2,
      route: 'City Center to Campus',
      departureTime: '09:15 AM',
      status: 'Delayed (10 min)',
      availableSeats: 8
    },
    {
      id: 3,
      route: 'Campus to North Station',
      departureTime: '10:00 AM',
      status: 'On Time',
      availableSeats: 20
    }
  ]);
  
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'College Annual Day',
      date: 'May 15, 2025',
      location: 'Main Auditorium',
      time: '10:00 AM - 4:00 PM'
    },
    {
      id: 2,
      title: 'Tech Symposium',
      date: 'May 20, 2025',
      location: 'Engineering Block',
      time: '9:00 AM - 5:00 PM'
    }
  ]);
  
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      action: 'Reserved a seat',
      details: 'Bus #102 - Campus to City Center',
      time: '2 hours ago'
    },
    {
      id: 2,
      action: 'Viewed schedule',
      details: 'Weekly Bus Schedule',
      time: '1 day ago'
    }
  ]);

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch data from your API here
    // For example:
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get('/api/dashboard/data');
    //     setUpcomingBuses(response.data.upcomingBuses);
    //     setUpcomingEvents(response.data.upcomingEvents);
    //     setRecentActivity(response.data.recentActivity);
    //   } catch (error) {
    //     console.error('Error fetching dashboard data:', error);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <Container fluid>
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.name || 'User'}!</h1>
        <p className="text-muted">Here's what's happening today</p>
      </div>
      
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="dashboard-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaBus className="me-2" /> Upcoming Buses
              </h5>
              <Button variant="outline-primary" size="sm" href="/dashboard/schedules">
                View All
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Route</th>
                      <th>Departure</th>
                      <th>Status</th>
                      <th>Available Seats</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingBuses.map(bus => (
                      <tr key={bus.id}>
                        <td>{bus.route}</td>
                        <td>{bus.departureTime}</td>
                        <td>
                          <span className={`status-badge ${bus.status.includes('Delayed') ? 'delayed' : 'on-time'}`}>
                            {bus.status}
                          </span>
                        </td>
                        <td>{bus.availableSeats}</td>
                        <td>
                          <Button variant="primary" size="sm">Reserve</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="dashboard-card h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaCalendarAlt className="me-2" /> Upcoming Events
              </h5>
              <Button variant="outline-primary" size="sm" href="/dashboard/events">
                View All
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              {upcomingEvents.map(event => (
                <div key={event.id} className="event-item">
                  <h6>{event.title}</h6>
                  <div className="event-details">
                    <div className="event-detail">
                      <FaCalendarAlt className="event-icon" />
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail">
                      <FaClock className="event-icon" />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-detail">
                      <FaMapMarkerAlt className="event-icon" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="dashboard-card h-100">
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="quick-actions">
                <Button variant="outline-primary" className="quick-action-btn">
                  <FaBus className="quick-action-icon" />
                  <span>Reserve Seat</span>
                </Button>
                <Button variant="outline-primary" className="quick-action-btn">
                  <FaCalendarAlt className="quick-action-icon" />
                  <span>View Schedule</span>
                </Button>
                <Button variant="outline-primary" className="quick-action-btn">
                  <FaMapMarkerAlt className="quick-action-icon" />
                  <span>Track Bus</span>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-content">
                      <h6>{activity.action}</h6>
                      <p>{activity.details}</p>
                    </div>
                    <div className="activity-time">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardHome;
