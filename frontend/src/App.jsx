 import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './component/Home';
import Signup from './component/Signup';
import PlayGridAssistant from './component/PlayGridAssistant';
import Turf from './component/Turf';
import Myturf from './component/Myturf';
import List from './component/List';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import Bookings from './component/Bookings';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/turf"
            element={
              <ProtectedRoute allowedRoles={['user', 'owner']}>
                <Turf />
              </ProtectedRoute>
            }
          />

          <Route
            path="/list"
            element={
              <ProtectedRoute allowedRoles={['user', 'owner']}>
                <List />
              </ProtectedRoute>
            }
          />
           <Route
            path="/booking"
            element={
              <ProtectedRoute allowedRoles={['user', 'owner']}>
                <Bookings/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/myturf"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <Myturf />
              </ProtectedRoute>
            }
          />
        </Routes>
      {location.pathname === "/turf" && <PlayGridAssistant />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 
