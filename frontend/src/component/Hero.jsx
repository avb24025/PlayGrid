import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';
import { FaQuestionCircle } from 'react-icons/fa';
import {
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaUserShield,
  FaCreditCard,
  FaImages,
  FaBell
} from 'react-icons/fa';

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
      <h1 className='text-5xl md:text-6xl font-bold mb-8 text-black md:pt-23'>
        Seamless Turf Booking.
        <br/>
         <span className='text-green-600'>Anytime. Anywhere.</span>
      </h1>
      <h1 className='text-2xl font-bold mb-8 md:mb-8 text-black md:w-1/2 '>
        PlayGrid connects players with premium sports turfs across the city. Discover, book, and play — all in just a few clicks.
      </h1>
      {/* mb-40 md:mb-90 */}
      {
        user?(<h2 className="text-2xl font-semibold text-gray-800 mb-6">
  Welcome, <span className="text-green-600">{user.fullname}</span> 👋
</h2>):( <Link to='/'
        // className="btn btn-success mb-10 bg-black text-white hover:bg-green-900 transition duration-300 ease-in-out"
         className="btn btn-success mb-10 bg-black text-white hover:bg-green-900 transition duration-300 ease-in-out animate-float"
         onClick={()=>document.getElementById('my_modal_3').showModal()}
      >
        Get Started
      </Link>)
      }
      
      <Login/>
      <h1 className='text-xl  mb-10 md:mb-10 text-black md:w-1/2 md:pb-22'>
        PlayGrid connects players with premium sports turfs across the city. Discover, book, and play — all in just a few clicks.
      </h1>

      <div className="text-left hidden md:block">
  <h1 className="text-4xl font-bold mb-4">Available Sports</h1>
</div>
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
       <div className="py-20 px-6 ">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Why Choose <span className="text-green-600">PlayGrid</span>?
      </h2>

      <div className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature 1 */}
        <div className="bg-white hover:bg-green-50 border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
          <FaMapMarkerAlt className="text-3xl text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Location-Based Search</h3>
          <p className="text-gray-600">Find nearby turfs instantly with filters for sport, time, and location.</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white hover:bg-green-50 border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
          <FaCalendarCheck className="text-3xl text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Real-Time Booking</h3>
          <p className="text-gray-600">Book available time slots without phone calls or delays.</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white hover:bg-green-50 border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
          <FaUserShield className="text-3xl text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Role-Based Dashboard</h3>
          <p className="text-gray-600">Different dashboards for users, turf owners, and admins.</p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white hover:bg-green-50 border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
          <FaCreditCard className="text-3xl text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure Online Payments</h3>
          <p className="text-gray-600">Pay securely using Razorpay, Cashfree, and other gateways.</p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white hover:bg-green-50 border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
          <FaImages className="text-3xl text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Turf Gallery & Reviews</h3>
          <p className="text-gray-600">View photos, read ratings, and select the best turf.</p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white hover:bg-green-50 border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
          <FaBell className="text-3xl text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Notifications</h3>
          <p className="text-gray-600">Get reminders for bookings and exclusive offers.</p>
        </div>
      </div>
    </div>
      {/* <Features/> */}

      <div className="w-full py-20  flex justify-center">
      <div className="w-11/12 md:w-3/5 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          <FaQuestionCircle className="inline mr-2 text-green-600" />
          Frequently Asked Questions
        </h2>

        <div className="join join-vertical space-y-4">
          {/* FAQ 1 */}
          <div className="collapse collapse-arrow join-item border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300">
            <input type="radio" name="faq" defaultChecked />
            <div className="collapse-title font-medium text-lg text-gray-800">
              How do I create an account?
            </div>
            <div className="collapse-content text-sm text-gray-600">
              Click the "Sign Up" button in the top right corner and follow the registration process.
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="collapse collapse-arrow join-item border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300">
            <input type="radio" name="faq" />
            <div className="collapse-title font-medium text-lg text-gray-800">
              I forgot my password. What should I do?
            </div>
            <div className="collapse-content text-sm text-gray-600">
              Click on "Forgot Password" on the login page and follow the instructions sent to your email.
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="collapse collapse-arrow join-item border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300">
            <input type="radio" name="faq" />
            <div className="collapse-title font-medium text-lg text-gray-800">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-sm text-gray-600">
              Go to "My Account" settings and select "Edit Profile" to make changes.
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
    </>


    
  );
}

export default Hero;
