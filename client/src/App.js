import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Page Components
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import SimpleSignUp from './components/pages/SimpleSignUp';

// Dashboard Pages
import DashboardHome from './components/pages/dashboard/DashboardHome';
import BusSchedules from './components/pages/dashboard/BusSchedules';
import Events from './components/pages/dashboard/Events';
import Support from './components/pages/dashboard/Support';
import BusTracking from './components/pages/dashboard/BusTracking';
import Feedback from './components/pages/dashboard/Feedback';
import UserPreferences from './components/pages/dashboard/UserPreferences';

// Root component to handle authentication redirects
const AppRoutes = () => {
  const { loading, isAuthenticated } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          isAuthenticated() ?
          <Navigate to="/dashboard" replace /> :
          <><Navbar /><Home /><Footer /></>
        } />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/signup" element={
          isAuthenticated() ?
          <Navigate to="/dashboard" replace /> :
          <><Navbar /><SignUp /><Footer /></>
        } />
        <Route path="/simple-signup" element={
          isAuthenticated() ?
          <Navigate to="/dashboard" replace /> :
          <><Navbar /><SimpleSignUp /><Footer /></>
        } />
        <Route path="/signin" element={
          isAuthenticated() ?
          <Navigate to="/dashboard" replace /> :
          <><Navbar /><SignIn /><Footer /></>
        } />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="schedules" element={<BusSchedules />} />
            <Route path="events" element={<Events />} />
            <Route path="support" element={<Support />} />
            <Route path="track" element={<BusTracking />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="preferences" element={<UserPreferences />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
