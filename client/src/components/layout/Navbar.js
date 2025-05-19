import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaBus, FaUserCircle } from 'react-icons/fa';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { currentUser, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg={darkMode ? "dark" : "light"} expand="lg" className="navbar-custom" sticky="top" variant={darkMode ? "dark" : "light"}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaBus className="me-2" size={24} />
          <span className="brand-text">EKmate</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/dashboard" className="nav-link">Dashboard</Nav.Link>
            )}
          </Nav>
          <div className="d-flex align-items-center">
            <ThemeToggle />

            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-user" className="nav-link p-0 d-flex align-items-center">
                  <FaUserCircle size={24} className="me-2" />
                  <span>{currentUser?.name || 'User'}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/dashboard/profile">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/dashboard/preferences">Preferences</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  className="me-2 custom-outline-btn"
                  onClick={() => navigate('/signin')}
                  style={{ borderColor: '#9575cd', color: darkMode ? '#b39ddb' : '#9575cd' }}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate('/signup')}
                  className="me-2 custom-btn"
                  style={{ backgroundColor: '#9575cd', borderColor: '#9575cd' }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
