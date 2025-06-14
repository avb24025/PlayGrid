import React, { useState, useEffect } from 'react';
import Card from './Card';
import TurfModal from './Turf.modal';

function Trufs() {
  const [loading, setLoading] = useState(true);
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/turf/list`);
        if (!response.ok) throw new Error('Failed to fetch turfs');
        const data = await response.json();
        setTurfs(data);
      } catch (error) {
        console.error('Error fetching turfs:', error);
        setTurfs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfs();
  }, []);

  const openModal = (turf) => {
    setSelectedTurf(turf);
    document.getElementById('my_modal_2').showModal();
  };

  const filteredTurfs = turfs.filter((turf) => {
    // Convert search query to lowercase for case-insensitive comparison
    const query = searchQuery.toLowerCase().trim();
    
    // Search through multiple fields
    const matchesSearch = 
      turf.name?.toLowerCase().includes(query) ||
      turf.location?.toLowerCase().includes(query) ||
      turf.district?.toLowerCase().includes(query) ||
      turf.sport?.toLowerCase().includes(query);

    // Check if sport matches (if a sport is selected)
    const matchesSport = !selectedSport || 
      turf.sport?.toLowerCase() === selectedSport.toLowerCase();

    // Check if city matches (if a city is selected)
    const matchesCity = !selectedCity || 
      turf.district?.toLowerCase() === selectedCity.toLowerCase();

    // Check if size matches (if any sizes are selected)
    const matchesSize = selectedSizes.length === 0 || 
      (turf.size && selectedSizes.includes(turf.size));

    return matchesSearch && matchesSport && matchesCity && matchesSize;
  });

  // Update the city select options to use district from your data
  const uniqueCities = [...new Set(turfs.map(turf => turf.district))].filter(Boolean);
  const uniqueSports = [...new Set(turfs.map(turf => turf.sport))].filter(Boolean);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl text-green-600"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Filters */}
        <div className="w-1/5 p-4 bg-gray-800 sticky top-30 left-3 mr-3 h-120 overflow-y-auto shadow-md text-white hidden md:block">
          <div className="mb-3">
            <label className="input border-1 rounded-full mt-3 mb-1">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                required
                placeholder="Search Turfs"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>

          <h2 className="text-xl font-bold mb-4 ml-1">Filters</h2>

          {/* City Filter */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">City</label>
            <select
              className="w-full p-2 bg-gray-700 text-white rounded"
              onChange={(e) => setSelectedCity(e.target.value)}
              value={selectedCity}
            >
              <option value="">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Sport Filter */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">Sport</label>
            <select
              className="w-full p-2 bg-gray-700 text-white rounded"
              onChange={(e) => setSelectedSport(e.target.value)}
              value={selectedSport}
            >
              <option value="">All Sports</option>
              {uniqueSports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">Size</label>
            <div className="space-y-1">
              {['5-a-side', '6-a-side', '7-a-side', 'Full'].map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    id={size}
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSizes([...selectedSizes, size]);
                      } else {
                        setSelectedSizes(selectedSizes.filter((s) => s !== size));
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={size} className="text-sm">{size}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-4/5 p-4 overflow-y-scroll h-screen space-y-4 pt-18">
          <div className="text-3xl font-bold">
            Explore Nearby <span className="text-green-500">Turfs</span>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden item-center justify-center">
            <label className="input border-1 rounded-full mt-3 mb-1">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                required
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>

          <p className="text-xl font-normal hidden md:block text-black md:w-full">
            Find and book the best football, cricket, and multi-sport turfs in your area. Use filters to narrow down your search based on location, price, and amenities.
          </p>

          {/* Turf Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 align-items-center justify-items-center">
            {filteredTurfs.map((turf) => (
              <Card turf={turf} key={turf.name} onClick={openModal} />
            ))}
          </div>

          <TurfModal turf={selectedTurf} />
        </div>
      </div>
    </>
  );
}

export default Trufs;
