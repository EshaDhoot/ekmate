import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaClock, FaBus } from 'react-icons/fa';
import { busService } from '../../../services';
import './BusSchedules.css';

const BusSchedules = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schedules, setSchedules] = useState([]);

  // Fetch bus data from API
  useEffect(() => {
    const fetchBusData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Prepare search parameters
        const searchParams = {};
        if (searchQuery) {
          // We'll search in both route and bus number
          // The backend will handle this with the $or operator in MongoDB
          searchParams.route = searchQuery;
          searchParams.busNumber = searchQuery;
        }

        // Fetch buses from API with search parameters
        const response = await busService.getAllBuses(searchParams);

        // Log the response to see what we're getting
        // console.log('Bus API Response:', response);

        // Check if response has data.buses array
        if (response && response.success && response.data && response.data.buses && Array.isArray(response.data.buses)) {
          // Transform bus data into schedule format
          const busSchedules = response.data.buses.map((bus, index) => {
            // Extract route information from the first route if available
            const route = bus.routes && bus.routes.length > 0
              ? bus.routes[0]
              : { pickupPoint: 'Unknown', time: '08:00 AM' };

            return {
              id: bus._id || index + 1,
              route: bus.title || 'Unknown Route',
              departureTime: route.time || '08:00 AM',
              arrivalTime: '08:45 AM', // Estimated arrival time
              busNumber: bus.busNumber || `B${index + 101}`,
              stops: bus.routes
                ? bus.routes.map(r => r.pickupPoint || 'Unknown Stop')
                : ['Main Gate', 'Campus']
            };
          });

          setSchedules(busSchedules);
        } else {
          console.error('Failed to fetch buses:', response?.message);
          setError('Failed to fetch bus schedules. Please try again later.');
          setSchedules([]);
        }
      } catch (error) {
        console.error('Error fetching bus data:', error);
        setError('An error occurred while fetching bus schedules. Please try again later.');
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, [searchQuery]); // Re-fetch when search query changes

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is handled by the useEffect hook when searchQuery changes
    console.log('Searching for:', searchQuery);
  };

  return (
    <Container fluid>
      <div className="page-header">
        <h1>Bus Schedules</h1>
        <p className="text-muted">View and search for bus schedules</p>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="align-items-end">
              <Col md={8} lg={10}>
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

              <Col md={4} lg={2}>
                <Button type="submit" variant="primary" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading schedules...</p>
        </div>
      ) : (
        <Card>
          <Card.Header>
            <h5 className="mb-0">
              <FaBus className="me-2" />
              Bus Schedules
            </h5>
          </Card.Header>
          <Card.Body className="p-0">
            {schedules.length > 0 ? (
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
                    {schedules.map(schedule => (
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
      )}
    </Container>
  );
};

export default BusSchedules;
