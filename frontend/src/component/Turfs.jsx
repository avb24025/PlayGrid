import react from  'react';
import Card from './Card';
import { useState ,useEffect} from 'react';
import TurfModal from './Turf.modal';
import { use } from 'react';


function Trufs(){
  const [loading, setLoading] = useState(true);
  const [turfs, setTurfs] = useState([]);
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/turf/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch turfs');
        }
        const data = await response.json();
        setTurfs(data);
      } catch (error) {
        console.error('Error fetching turfs:', error);
        setTurfs([]); // Set to empty array on error
      }
      finally{
       setLoading(false);
      }
    };
    fetchTurfs();
    
  }, []);




const [selectedTurf, setSelectedTurf] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [selectedSport, setSelectedSport] = useState('');
const [selectedCity, setSelectedCity] = useState('');
const [selectedSizes, setSelectedSizes] = useState([]);

   

    const openModal = (turf) => {
    setSelectedTurf(turf);
    document.getElementById('my_modal_2').showModal();
  };

  const filteredTurfs = turfs.filter(turf => {
  // Search filter (name, city, sport)
  const matchesSearch =
    (turf.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (turf.city?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (turf.sport?.toLowerCase() || '').includes(searchQuery.toLowerCase());

  // City dropdown filter
  const matchesCity =
    selectedCity === '' || turf.city?.toLowerCase() === selectedCity.toLowerCase();

  // Sport dropdown filter
  const matchesSport =
    selectedSport === '' || turf.sport?.toLowerCase() === selectedSport.toLowerCase();

  // Size checkbox filter
  const matchesSize =
    selectedSizes.length === 0 || selectedSizes.includes(turf.size);

  // Combine all
  return matchesSearch && matchesCity && matchesSport && matchesSize;
});

  
    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl text-green-600"></span>
      </div>
    );
  }

    return(
        <>
        <h1>hii
        </h1>

        <div className="flex h-screen overflow-hidden ">
  {/* Filter Sidebar */}
  <div className="w-1/5 p-4 bg-gray-800 sticky top-30 left-3 mr-3  h-120 overflow-y-auto shadow-md  text-white hidden md:block">
   <div className='mb-3'>
    <label className="input border-1 rounded-full mt-3 mb-1">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" required placeholder="Search Turfs" onChange={(e) => setSearchQuery(e.target.value)} />
</label>
  </div>
    <h2 className="text-xl font-bold mb-4 ml-1">Filters</h2>
      <div className="mb-6">
    <label className="block mb-2 text-sm font-semibold">Sport</label>
    <select className="w-full p-2 bg-gray-700 text-white rounded"  onChange={(e) => setSelectedSport(e.target.value)}>
      <option value="">All Sports</option>
      <option value="Football">Football</option>
      <option value="Cricket">Cricket</option>
      <option value="Badminton">Badminton</option>
      <option value="Multi-sport">Multi-sport</option>
    </select>
  </div>

  {/* Filter by Size */}
  <div className="mb-6">
    <label className="block mb-2 text-sm font-semibold">Size</label>
    <div className="space-y-1">
      {["5-a-side", "6-a-side", "7-a-side", "Full"].map((size) => (
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

  {/* Filter by City */}
  <div className="mb-6">
    <label className="block mb-2 text-sm font-semibold">City</label>
    <select className="w-full p-2 bg-gray-700 text-white rounded"  onChange={(e) => setSelectedCity(e.target.value)}>
      <option value="">All Cities</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Pune">Pune</option>
      <option value="Delhi">Delhi</option>
      <option value="Bangalore">Bangalore</option>
    </select>
  </div>
    {/* Add your filter UI here */}
  </div>

  {/* Turf Cards Section */}
  <div className="w-full md:w-4/5 p-4 overflow-y-scroll h-screen space-y-4 pt-15">
  <h1 className='text-3xl font-bold '>Explore Nearby <span className='text-green-500'>Turfs</span>
  <div className='md:hidden'>
    <label className="input border-1 rounded-full mt-3 mb-1">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" required placeholder="Search"  />
</label>
  </div>
  <h1 className='text-xl font-normal hidden md:block text-black md:w-full'> Find and book the best football, cricket, and multi-sport turfs in your area. Use filters to narrow down your search based on location, price, and amenities.</h1>
  </h1>
    {/* Turf Card Example */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 align-items-center justify-items-center">
        {
            filteredTurfs.map((turf)=>{
                return(<Card turf={turf} key={turf.name}  onClick={openModal}/>)
            })
        }
    
    </div>
   <TurfModal turf={selectedTurf} />
    {/* Add more cards dynamically */}
  </div>
</div>

        </>
    )
}
export default Trufs;