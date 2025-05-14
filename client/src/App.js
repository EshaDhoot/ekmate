import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './context/AuthContext';
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

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
              <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
              <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
              <Route path="/signup" element={<><Navbar /><SignUp /><Footer /></>} />
              <Route path="/simple-signup" element={<><Navbar /><SimpleSignUp /><Footer /></>} />
              <Route path="/signin" element={<><Navbar /><SignIn /><Footer /></>} />

              {/* Protected Dashboard Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="schedules" element={<BusSchedules />} />
                  <Route path="events" element={<Events />} />
                  <Route path="support" element={<Support />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
