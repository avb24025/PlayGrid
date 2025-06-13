import React from "react";
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaRegEdit, FaMapMarkedAlt, FaRegCalendarCheck } from 'react-icons/fa';

function Userlist() {
    const navigate = useNavigate();
    return (
         <div className="p-8 max-w-4xl mx-auto font-sans bg-white shadow-lg rounded-2xl mt-10">
            <h1 className="text-4xl font-extrabold text-balck mb-6 text-center">
                List Your Turf on <span className="text-green-600">PlayGrid</span>
            </h1>
            <p className="text-gray-600 text-lg text-center mb-10">
                Ready to grow your turf business? Just follow these 4 simple steps.
            </p>

            <div className="space-y-8">
                <div className="flex items-start space-x-4">
                    <FaUserPlus className="text-2xl text-blue-500 mt-1" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Step 1: Register as an Owner</h2>
                        <p className="text-gray-600">
                            Sign up and choose the <span className="font-medium text-blue-600">Owner</span> role to unlock access to the Turf Dashboard.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <FaRegEdit className="text-2xl text-yellow-500 mt-1" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Step 2: Complete Your Profile</h2>
                        <p className="text-gray-600">
                            Add your contact info and business details to verify your turf listing.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <FaMapMarkedAlt className="text-2xl text-green-500 mt-1" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Step 3: List Your Turf</h2>
                        <ul className="list-disc list-inside text-gray-600 pl-2 mt-1">
                            <li>Go to your dashboard.</li>
                            <li>Click <span className="font-medium text-green-600">List Turf</span>.</li>
                            <li>Fill in location, images, pricing, and availability.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <FaRegCalendarCheck className="text-2xl text-purple-500 mt-1" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Step 4: Manage Bookings</h2>
                        <p className="text-gray-600">
                            Stay organized with live updates and booking management in your dashboard.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                    Reach local players — List your turf today!
                </h3>
                <button
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg font-medium transition duration-300"
                    onClick={() => navigate('/signup')}
                >
                    Register as Owner
                </button>
            </div>
        </div>
    );
}

export default Userlist;
