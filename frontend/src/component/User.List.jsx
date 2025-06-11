import React from "react";

function Userlist() {
    return (
        <div className="p-6 max-w-3xl mx-auto font-sans">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
                🏟️ Want to List Your Turf on PlayGrid?
            </h1>
            <p className="mb-6 text-gray-700">
                Listing your turf is easy! Just follow these quick steps:
            </p>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">✅ Step 1: Register as an Owner</h2>
                    <p className="text-gray-600">
                        Create an account and choose the <span className="font-medium">Owner</span> role. This gives you access to your dashboard to list and manage turfs.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-800">📝 Step 2: Complete Your Profile</h2>
                    <p className="text-gray-600">
                        Enter your contact details and business info to help us verify your turf listing.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-800">📍 Step 3: List Your Turf</h2>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                        <li>Navigate to the dashboard.</li>
                        <li>Click on <span className="font-medium">Add Turf</span>.</li>
                        <li>Fill in turf name, location, images, pricing, and availability.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-800">🔄 Step 4: Manage Bookings</h2>
                    <p className="text-gray-600">
                        View and manage all your bookings and updates in real-time through the dashboard.
                    </p>
                </div>
            </div>

            <hr className="my-6 border-gray-300" />

            <h3 className="text-lg font-semibold text-green-600 mb-4">
                📣 Start reaching local players — List your turf today!
            </h3>

            <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base transition duration-200"
                onClick={() => alert("Redirect to owner registration")}
            >
                Register as Owner
            </button>
        </div>
    );
}

export default Userlist;
