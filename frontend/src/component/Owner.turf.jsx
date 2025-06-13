import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Owner() {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || '';
  const [turfs, setTurfs] = useState([]);
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/turf/get-turfs`,
          {
            params: { email: userEmail } // Add this if you're using cookies
          }
        );
        if (response.status === 200) {
          const { turfs, message } = response.data;
          setTurfs(turfs || []);
           console.log('Turfs fetched successfully:', turfs, message);
        }
      } catch (error) {
        console.error(
          'Error fetching turfs:',
          error.response?.data || error.message
        );
        setError(error.response?.data?.message || 'Failed to fetch turfs');
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* <h1 className="text-4xl font-bold mb-4">Owner Dashboard</h1> */}
      {/* <p className="text-lg text-gray-700 mb-8">
        Manage your turfs and bookings here.
      </p> */}

      {turfs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-xl text-gray-500 mb-4">
          No turfs found. Add your first turf!
        </p>
        <button className="btn btn-success bg-green-600 text-white" onClick={()=>Navigate('/list')} >List Turf</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {turfs.map((turf) => (
            <div key={turf._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-2">{turf.name}</h2>
              {turf.image && (
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-gray-600 mb-2">Location: {turf.location}</p>
              <p className="text-gray-600 mb-2">Sport: {turf.sport}</p>
              <p className="text-gray-600 mb-2">Price: ₹{turf.price}/hour</p>
              <p className="text-gray-600 mb-2">Size: {turf.size}</p>
              <p className="text-gray-600">Contact: {turf.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Owner;
