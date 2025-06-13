import react from 'react';
import { useState, useEffect, useContext } from 'react';
import Bookingcard from './Booking.card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';




function MyBookings() {
    const {user}=useContext(AuthContext);
    const userEmail = user?.email || '';
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings= async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/booking/get-bookings`, 
                    { params: { email: userEmail } }
                );
                if (response.status === 200) {
                    setBookings(response.data);
                    console.log('Bookings fetched successfully:', response.data);
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
             finally {
            setLoading(false); // ensures loading is always turned off
        }
        }
        fetchBookings();
    }
    , [userEmail]);

    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl text-green-600"></span>
      </div>
    );
  }
  
    if (bookings.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-3xl font-bold text-black mb-5'>No Bookings Found</h1>
                <p className='text-xl text-green-600 mb-4'>You have not booked any slots yet.</p>
                <button className='bg-green-600 btn btn-success text-white' onClick={()=>{navigate('/turf')}}>Start Booking</button>
            </div>
        );
    }
    return(
        <>
        <h1>My bookings</h1>
        <h1 className='text-3xl font-bold text-black text-center mt-13 mb-5'>Your Booked Slots</h1>
        <h1 className='text-xl font-normal text-green-800 text-center md:pr-20 md:pl-20 mb-5' >These are the slots you’ve successfully booked. Make sure to arrive 10–15 minutes before your slot time. If you face any issues, contact the turf owner using the provided email,Phone No.</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 ">
    {bookings.map((booking) => (
      <Bookingcard key={booking._id} booking={booking} />
    ))}
  </div>
        </>
    )
}

export default MyBookings;