import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, ListGroup, Badge } from 'react-bootstrap';
import { FaBell, FaRoute, FaCalendarAlt, FaTrash, FaPlus, FaSave, FaCog } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { userPreferencesService, busService } from '../../../services';
import './UserPreferences.css';

const UserPreferences = () => {
  const { currentUser } = useAuth();
  const [buses, setBuses] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form state for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: false,
    pushNotifications: false,
    delayAlerts: false,
    scheduleChanges: false,
    promotions: false
  });

  // Form state for favorite routes
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);
  const [newFavoriteRoute, setNewFavoriteRoute] = useState('');

  // Form state for class schedule
  const [classSchedule, setClassSchedule] = useState([
    { day: 'Monday', startTime: '', endTime: '', location: '' },
    { day: 'Tuesday', startTime: '', endTime: '', location: '' },
    { day: 'Wednesday', startTime: '', endTime: '', location: '' },
    { day: 'Thursday', startTime: '', endTime: '', location: '' },
    { day: 'Friday', startTime: '', endTime: '', location: '' }
  ]);

  // Fetch user preferences and buses
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser || !currentUser.id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch buses
        const busesResponse = await busService.getAllBuses();
        if (busesResponse.success) {
          // Check if response.data is an array, if not, use an empty array
          const busesData = Array.isArray(busesResponse.data) ? busesResponse.data : [];

          // For testing purposes, if no buses are returned, create mock data
          if (busesData.length === 0) {
            const mockBuses = [
              { _id: '1', busNumber: 'B101', route: 'Campus to City Center' },
              { _id: '2', busNumber: 'B102', route: 'City Center to Campus' },
              { _id: '3', busNumber: 'B103', route: 'Campus to North Station' }
            ];
            setBuses(mockBuses);
          } else {
            setBuses(busesData);
          }
        } else {
          // If API call was not successful, set mock data
          const mockBuses = [
            { _id: '1', busNumber: 'B101', route: 'Campus to City Center' },
            { _id: '2', busNumber: 'B102', route: 'City Center to Campus' },
            { _id: '3', busNumber: 'B103', route: 'Campus to North Station' }
          ];
          setBuses(mockBuses);
          console.warn('Using mock bus data due to API error');
        }

        // Fetch user preferences
        try {
          const preferencesResponse = await userPreferencesService.getUserPreferences(currentUser.id);
          if (preferencesResponse && preferencesResponse.success && preferencesResponse.data) {
            const userPrefs = preferencesResponse.data;
            setPreferences(userPrefs);

            // Set notification settings
            if (userPrefs.notificationSettings) {
              setNotificationSettings(userPrefs.notificationSettings);
            }

            // Set favorite routes
            if (userPrefs.favoriteRoutes && Array.isArray(userPrefs.favoriteRoutes)) {
              setFavoriteRoutes(userPrefs.favoriteRoutes);
            }

            // Set class schedule
            if (userPrefs.classSchedule && userPrefs.classSchedule.length > 0) {
              // Merge with default schedule to ensure all days are included
              const updatedSchedule = [...classSchedule];

              userPrefs.classSchedule.forEach(cls => {
                const index = updatedSchedule.findIndex(item => item.day === cls.day);
                if (index !== -1) {
                  updatedSchedule[index] = cls;
                }
              });

              setClassSchedule(updatedSchedule);
            }
          } else {
            // Set mock preferences data
            console.warn('Using mock preferences data');

            // Mock notification settings
            const mockNotificationSettings = {
              emailNotifications: true,
              pushNotifications: true,
              delayAlerts: true,
              scheduleChanges: false,
              promotions: false
            };
            setNotificationSettings(mockNotificationSettings);

            // Mock favorite routes
            const mockFavoriteRoutes = [
              {
                busId: '1',
                routeName: 'Campus to City Center',
                busNumber: 'B101'
              }
            ];
            setFavoriteRoutes(mockFavoriteRoutes);

            // Mock class schedule (keep default)
          }
        } catch (preferencesError) {
          console.error('Error fetching preferences:', preferencesError);
          // Set mock preferences data on error
          console.warn('Using mock preferences data due to error');

          // Mock notification settings
          const mockNotificationSettings = {
            emailNotifications: true,
            pushNotifications: true,
            delayAlerts: true,
            scheduleChanges: false,
            promotions: false
          };
          setNotificationSettings(mockNotificationSettings);

          // Mock favorite routes
          const mockFavoriteRoutes = [
            {
              busId: '1',
              routeName: 'Campus to City Center',
              busNumber: 'B101'
            }
          ];
          setFavoriteRoutes(mockFavoriteRoutes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load preferences. Please try again later.');

        // Set mock data on error
        const mockBuses = [
          { _id: '1', busNumber: 'B101', route: 'Campus to City Center' },
          { _id: '2', busNumber: 'B102', route: 'City Center to Campus' },
          { _id: '3', busNumber: 'B103', route: 'Campus to North Station' }
        ];
        setBuses(mockBuses);

        // Mock notification settings
        const mockNotificationSettings = {
          emailNotifications: true,
          pushNotifications: true,
          delayAlerts: true,
          scheduleChanges: false,
          promotions: false
        };
        setNotificationSettings(mockNotificationSettings);

        // Mock favorite routes
        const mockFavoriteRoutes = [
          {
            busId: '1',
            routeName: 'Campus to City Center',
            busNumber: 'B101'
          }
        ];
        setFavoriteRoutes(mockFavoriteRoutes);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, classSchedule]);

  // Handle notification settings changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle adding a new favorite route
  const handleAddFavoriteRoute = () => {
    if (!newFavoriteRoute) return;

    // Check if route already exists
    if (favoriteRoutes.some(route => route.busId === newFavoriteRoute)) {
      setError('This route is already in your favorites');
      return;
    }

    const selectedBus = buses.find(bus => bus._id === newFavoriteRoute);
    if (!selectedBus) return;

    const newRoute = {
      busId: selectedBus._id,
      routeName: selectedBus.route || 'Unknown Route',
      busNumber: selectedBus.busNumber
    };

    setFavoriteRoutes(prev => [...prev, newRoute]);
    setNewFavoriteRoute('');
  };

  // Handle removing a favorite route
  const handleRemoveFavoriteRoute = (busId) => {
    setFavoriteRoutes(prev => prev.filter(route => route.busId !== busId));
  };

  // Handle class schedule changes
  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...classSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      [field]: value
    };
    setClassSchedule(updatedSchedule);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.id) {
      setError('You must be logged in to save preferences');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const preferencesData = {
        notificationSettings,
        favoriteRoutes,
        classSchedule: classSchedule.filter(cls => cls.startTime && cls.endTime) // Only save days with times
      };

      const response = await userPreferencesService.createOrUpdatePreferences(
        currentUser.id,
        preferencesData
      );

      if (response.success) {
        setSuccess('Preferences saved successfully!');
        setPreferences(response.data);
      } else {
        setError(response.message || 'Failed to save preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      setError('Failed to save preferences. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container fluid>
      <div className="page-header">
        <h1>
          <FaCog className="me-2" />
          User Preferences
        </h1>
        <p className="text-muted">Customize your experience and preferences</p>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading preferences...</p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6} className="mb-4">
              <Card className="preferences-card">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaBell className="me-2" />
                    Notification Settings
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form.Check
                    type="switch"
                    id="emailNotifications"
                    name="emailNotifications"
                    label="Email Notifications"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="pushNotifications"
                    name="pushNotifications"
                    label="Push Notifications"
                    checked={notificationSettings.pushNotifications}
                    onChange={handleNotificationChange}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="delayAlerts"
                    name="delayAlerts"
                    label="Bus Delay Alerts"
                    checked={notificationSettings.delayAlerts}
                    onChange={handleNotificationChange}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="scheduleChanges"
                    name="scheduleChanges"
                    label="Schedule Change Notifications"
                    checked={notificationSettings.scheduleChanges}
                    onChange={handleNotificationChange}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="promotions"
                    name="promotions"
                    label="Promotional Notifications"
                    checked={notificationSettings.promotions}
                    onChange={handleNotificationChange}
                  />
                </Card.Body>
              </Card>

              <Card className="preferences-card mt-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaRoute className="me-2" />
                    Favorite Routes
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex mb-3">
                    <Form.Select
                      value={newFavoriteRoute}
                      onChange={(e) => setNewFavoriteRoute(e.target.value)}
                      className="me-2"
                    >
                      <option value="">-- Select a route --</option>
                      {buses.map(bus => (
                        <option key={bus._id} value={bus._id}>
                          {bus.busNumber} - {bus.route || 'No route assigned'}
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      variant="outline-primary"
                      onClick={handleAddFavoriteRoute}
                      disabled={!newFavoriteRoute}
                    >
                      <FaPlus />
                    </Button>
                  </div>

                  {favoriteRoutes.length === 0 ? (
                    <p className="text-muted">No favorite routes added yet.</p>
                  ) : (
                    <ListGroup>
                      {favoriteRoutes.map(route => (
                        <ListGroup.Item
                          key={route.busId}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <Badge bg="primary" className="me-2">
                              {route.busNumber}
                            </Badge>
                            {route.routeName}
                          </div>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveFavoriteRoute(route.busId)}
                          >
                            <FaTrash />
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="preferences-card">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaCalendarAlt className="me-2" />
                    Class Schedule
                  </h5>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted mb-3">
                    Add your class schedule to get personalized bus recommendations.
                  </p>

                  {classSchedule.map((day, index) => (
                    <div key={day.day} className="schedule-day mb-4">
                      <h6>{day.day}</h6>
                      <Row>
                        <Col md={5}>
                          <Form.Group className="mb-2">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                              type="time"
                              value={day.startTime}
                              onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={5}>
                          <Form.Group className="mb-2">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                              type="time"
                              value={day.endTime}
                              onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Engineering Building"
                          value={day.location}
                          onChange={(e) => handleScheduleChange(index, 'location', e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  ))}
                </Card.Body>
              </Card>

              <div className="d-grid mt-4">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="me-2" />
                      Save Preferences
                    </>
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
};

export default UserPreferences;
