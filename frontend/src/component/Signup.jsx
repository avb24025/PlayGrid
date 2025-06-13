import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Navbar from './Navbar';

function Signup() {

  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
  if (location.state?.fromProtected) {
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Hide alert after 3 seconds

    return () => clearTimeout(timer);
  }
}, [location]);

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`, formData);

      if (res.status === 200) {
        login(res.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    
    <>
    <Navbar />
    
    <div className="min-h-screen flex items-center justify-center  ">
      {/* Error Notification */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div role="alert" className="alert alert-error justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="relative p-8 rounded-lg shadow-lg w-80 md:w-120 mt-20 bg-white dark:bg-gray-800">
        <Link to='/'>
          <button className="btn btn-circle btn-ghost absolute right-2 top-2 text-lg bg-white">✕</button>
        </Link>

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Create Your Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>

          <div className='text-white'>
                <label className="block mb-1">Select Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="select select-bordered w-full mb-6 border-1"
                  required
                >
                  <option value="user" className='text-black'>User</option>
                  <option value="owner" className='text-black'>Owner</option>
                </select>
              </div>

          <button type="submit" className="btn btn-primary w-full mt-4 bg-black text-white">
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Signup;
