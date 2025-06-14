import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import dotenv from 'dotenv';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'; 




function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'  // default role
  });

  const {login}=useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, formData);
      if (res.status === 200) {
        const token = res.data.token;
        login(token);

        // Close the modal
        const modal = document.getElementById('my_modal_3');
        if (modal) modal.close();

        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {/* 🔴 Error Notification on Screen Top Center */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-red-500 text-black">
         <div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>{error}</span>
</div>
        </div>

        

      )}

      {/* 🔐 Login Modal */}
      <div className=" bg-black text-white">
        <dialog id="my_modal_3" className="modal ">
        <div className="modal-box bg-gray-800 text-white">
          <button
            className="btn btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById('my_modal_3').close()}
          >✕</button>

          <h1 className='text-2xl font-bold text-center mb-4 text-white'>
            Log in to Your Account
          </h1>

          <form onSubmit={handleSubmit}>
            <div className='text-white pt-5'>
              <label className="block mb-1">Enter Your Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Enter your email'
                className='input input-bordered w-full mb-4 border-1'
                required
              />
            </div>
            <div className='text-white'>
              <label className="block mb-1">Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Enter your password'
                className='input input-bordered w-full mb-4 border-1'
                required
              />
            </div>

            {/* Role Selection */}
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

            <div className="flex justify-between items-center">
              <button type="submit" className="btn btn-secondary bg-black">Login</button>
              <span className="text-white">
                Not registered? <Link to='/signup' className="underline text-blue-300">Signup</Link>
              </span>
            </div>
          </form>
        </div>
      </dialog>
      </div>
    </>
  );
}

export default Login;
