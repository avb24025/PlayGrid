 import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Signup from './component/Signup';
import Turf from './component/Turf';
import List from './component/List';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import Bookings from './component/Bookings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
