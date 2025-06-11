import React, { useState,useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Listform = () => {
   const { user } = useContext(AuthContext);
   const [error, setError] = useState('');
   const navigate=useNavigate();
 const [formData, setFormData] = useState({
  name: '',
  location: '',
  district: '',
  state: '',
  price: '',
  size: '',
  contact: '',
  image: null,
  ownerEmail: user ? user.email : '',
  openingTime: '',
  closingTime: '',
  sport: '',
});


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  // Append each form field to the FormData object
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/turf/add`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (res.status === 201) {
      console.log('Turf listed successfully');
      navigate('/turf'); // make sure navigate is from useNavigate
    }
  } catch (err) {
    console.error('Submission error:', err);
    setError(err.response?.data?.message || 'An error occurred while listing turf');
  }
};


  return (
    <>
    <h1 className='mt-18 text-4xl font-bold text-center mb-5'>"Register Your <span className='text-green-500'>Turf</span>"</h1>
    <h1 className='text-xl font-normal text-center'>Fill in the form below to showcase your turf to the world.</h1>
    <div className="max-w-md mx-auto p-4 shadow-lg bg-white mt-8 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Turf Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price per hour (₹)"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label className="block">Opening Time</label>
<input
  type="time"
  name="openingTime"
  value={formData.openingTime}
  onChange={handleChange}
  required
  className="w-full p-2 border rounded"
/>

<label className="block">Closing Time</label>
<input
  type="time"
  name="closingTime"
  value={formData.closingTime}
  onChange={handleChange}
  required
  className="w-full p-2 border rounded"
/>
<select
  name="sport"
  value={formData.sport}
  onChange={handleChange}
  required
  className="w-full p-2 border rounded"
>
  <option value="">Select Sport Type</option>
  <option value="football">Football</option>
  <option value="cricket">Cricket</option>
  <option value="badminton">Badminton</option>
  <option value="multisport">Multi-sport</option>
</select>


        <select
  name="size"
  value={formData.size}
  onChange={handleChange}
  required
  className="w-full p-2 border rounded"
>
  <option value="">Select Turf Size</option>
  <option value="5-a-side">5-a-side</option>
  <option value="6-a-side">6-a-side</option>
  <option value="7-a-side">7-a-side</option>
  <option value="8-a-side">8-a-side</option>
  <option value="full">Full</option>
</select>

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

       
        <h1>Add image of turf</h1>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Submit Turf
        </button>
      </form>
    </div>
    </>
  );
};

export default Listform;
