import React, { useState } from 'react';

const Listform = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    district: '',
    state: '',
    price: '',
    size: '',
    contact: '',
    image: null,
    description: '',
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
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch('/api/turfs', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        alert('Turf listed successfully!');
        setFormData({
          name: '',
          location: '',
          district: '',
          state: '',
          price: '',
          size: '',
          contact: '',
          image: null,
          description: '',
        });
      } else {
        alert('Failed to list turf');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
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
