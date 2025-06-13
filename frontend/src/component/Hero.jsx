import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';

function Hero() {
  const {user}=useContext(AuthContext);
  return (
    <>

    <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>

    <div
  className=" bg-cover bg-center flex flex-col items-center pt-25 md:pt-30 text-center"
  style={{
    backgroundImage: "url('/grasspic.png')",
    backgroundAttachment: "fixed"
  }}
>
      <h1 className='text-5xl font-bold mb-8 text-black'>
        Seamless Turf Booking. Anytime. Anywhere.
      </h1>
      <h1 className='text-2xl font-bold mb-8 md:mb-8 text-black md:w-1/2'>
        PlayGrid connects players with premium sports turfs across the city. Discover, book, and play — all in just a few clicks.
      </h1>
      {/* mb-40 md:mb-90 */}
      {
        user?(<h2 className="text-2xl font-semibold text-gray-800 mb-6">
  Welcome, <span className="text-green-600">{user.fullname}</span> 👋
</h2>):( <Link to='/'
        className="btn btn-success mb-10 bg-black text-white hover:bg-green-900 transition duration-300 ease-in-out"
         onClick={()=>document.getElementById('my_modal_3').showModal()}
      >
        Get Started
      </Link>)
      }
      
      <Login/>
      <h1 className='text-xl  mb-10 md:mb-10 text-black md:w-1/2'>
        PlayGrid connects players with premium sports turfs across the city. Discover, book, and play — all in just a few clicks.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
  {/* Football */}
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out">
    <img
      src="https://media.istockphoto.com/id/1306763752/photo/athletic-mixed-race-boy-footballer-approaching-ball-for-kick.webp?b=1&s=612x612&w=0&k=20&c=oRBKduICdGcCVKEzwn-_q7lob6fXijCHOPrPE2R1sTw="
      alt="Football"
      className="rounded-t-xl w-full h-60 object-cover animate-float"
    />
    <div className="p-4 text-center">
      <h3 className="text-xl font-semibold text-gray-800">Football</h3>
    </div>
  </div>

  {/* Cricket */}
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out">
    <img
      src="https://cdn.pixabay.com/photo/2015/04/15/21/06/cricket-724618_1280.jpg"
      alt="Cricket"
      className="rounded-t-xl w-full h-60 object-cover animate-float"
    />
    <div className="p-4 text-center">
      <h3 className="text-xl font-semibold text-gray-800">Cricket</h3>
    </div>
  </div>

  {/* Badminton */}
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out">
    <img
      src="https://cdn.pixabay.com/photo/2016/05/31/23/21/badminton-1428046_1280.jpg"
      alt="Badminton"
      className="rounded-t-xl w-full h-60 object-cover animate-float"
    />
    <div className="p-4 text-center">
      <h3 className="text-xl font-semibold text-gray-800">Badminton</h3>
    </div>
  </div>
      </div>

     {/* feature component */}
       <div className=" py-12 px-6">
  <h2 className="text-3xl font-bold text-center mb-10">Why Choose PlayGrid?</h2>

  <div className="grid gap-6 pl-10 pr-10 md:grid-cols-2 lg:grid-cols-3">
    {/* Feature 1 */}
    <div className="bg-black text-white p-6  shadow hover:shadow-lg transition hidden md:block">
      <h3 className="text-xl font-semibold mb-2">📍 Location-Based Search</h3>
      <p className="text-white">Find nearby turfs instantly  filters by sport, time, and location.</p>
    </div>

    {/* Feature 2 */}
    <div className="bg-black text-white p-6  shadow hover:shadow-lg  transition hidden md:block">
      <h3 className="text-xl font-semibold mb-2">📅 Real-Time Booking</h3>
      <p className="text-white">Book available time slots in real-time without any phone calls or delays.</p>
    </div>

    {/* Feature 3 */}
    <div className="bg-black text-white p-6  shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">👥 Role-Based Dashboard</h3>
      <p className="text-white">Different dashboards for users, turf owners, and admins for better control.</p>
    </div>

    {/* Feature 4 */}
    <div className="bg-black text-white p-6  shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">💳 Secure Online Payments</h3>
      <p className="text-white">Pay using Razorpay, Cashfree, and more — fast, secure, and reliable.</p>
    </div>

    {/* Feature 5 */}
    <div className="bg-black text-white p-6  shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">📷 Turf Gallery & Reviews</h3>
      <p className="text-white">View photos, read ratings, and choose the perfect turf for your match.</p>
    </div>

    {/* Feature 6 */}
    <div className="bg-black text-white p-6  shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">🔔 Smart Notifications</h3>
      <p className="text-white">Get reminders and alerts for upcoming bookings and exclusive deals.</p>
    </div>
  </div>
</div>
      {/* <Features/> */}

   <div className='mt-20 flex direction-col w-full'>
    <div className='pl-10 w-1/2 bg-gray-100'>
    {/* <h1 className='text-2xl font-normal'>How To Add Turf</h1> */}
    

    </div>
    <div className='pr-10 w-1/2'>right</div>
   </div>
      
    </div>
    </>


    
  );
}

export default Hero;
