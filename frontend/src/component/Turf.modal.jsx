import React, { useState ,useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function TurfModal({ turf, onBook }) {
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const {user}= useContext(AuthContext);
  const userEmail = user?.email || '';

  
 
  if (!turf) return null;

  const toMinutes = (timeStr) => {
    const [hrs, mins] = timeStr.split(':').map(Number);
    return hrs * 60 + mins;
  };
  
  const handleClose = () => {
  setBookingDate('');
  setStartTime('');
  setEndTime('');
};
  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const start = toMinutes(startTime);
    const end = toMinutes(endTime);
    return Math.max(0, (end - start) / 60); // in hours
  };

  const isValidBookingTime = () => {
    const start = toMinutes(startTime);
    const end = toMinutes(endTime);
    const open = toMinutes(turf.openingTime);
    const close = toMinutes(turf.closingTime);
    return start >= open && end <= close && end > start;
  };



  const totalHours = calculateDuration();
  const totalPrice = totalHours * turf.price*0.2;

//   const handleBooking = () => {
//     if (!bookingDate || !startTime || !endTime) {
//       alert('Please fill in all fields');
//       return;
//     }


//     if (!isValidBookingTime()) {
//       alert(`Booking time must be between ${turf.openingTime} and ${turf.closingTime}, and end time must be after start time.`);
//       return;
//     }
    
//     const checkvalidslot=axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/turf/checkslot`,{bookingDate, startTime, endTime, turfId: turf._id})
//     checkvalidslot.then((response) => { 
//       if (response.status ===200) {
//         console.log('Slot is valid');
//       } else {
//         alert('This slot is already booked. Please choose a different time.');
//         return;
//       }
//     }).catch((error) => {
//       console.error('Error checking slot validity:', error);
//       alert('An error occurred while checking the slot. Please try again later.');
//       return;
//     }
//     );
//     if (totalHours <= 0) {
//       alert('Please select a valid time duration.');
//       return;
//     }

//     const bookingData = {
//       turfId: turf._id,
//       turfName: turf.name,
//       ownerEmail: turf.ownerEmail,
//       date: bookingDate,
//       startTime,
//       endTime,
//       totalHours,
//       totalPrice,
//     };

//   const handlePayment = async () => {
//   const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/booking/create-order`, { amount: totalPrice });

//   const options = {
//     key: 'YOUR_KEY_ID',
//     amount: res.data.amount,
//     currency: res.data.currency,
//     order_id: res.data.id,
//     handler: async (response) => {
//       // verify and create booking
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/booking/verify`, {
//         ...response,
//         bookingDetails: {
//           turfName,
//           ownerEmail,
//           userEmail,
//           bookedSlot: { date, startTime, endTime },
//         }
//       });
//     },
//     prefill: {
//       email: userEmail,
//     },
//     theme: { color: "#3399cc" },
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.open();
// };


//     onBook?.(bookingData);
//     alert(`Booking confirmed for ${turf.name} on ${bookingDate} from ${startTime} to ${endTime}.\nTotal: ₹${totalPrice}`);
//   };

  const handleBooking = async () => {
  if (!bookingDate || !startTime || !endTime) {
    alert('Please fill in all fields');
    return;
  }

  if (!isValidBookingTime()) {
    alert(`Booking time must be between ${turf.openingTime} and ${turf.closingTime}, and end time must be after start time.`);
    return;
  }

  if (totalHours <= 0) {
    alert('Please select a valid time duration.');
    return;
  }

  console.log("Sending to /checkslot:", {
  bookingDate,
  startTime,
  endTime,
  turfId: turf?._id,
});

  // ⏳ 1. Check if slot is available
  try {
  const slotCheckRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/turf/checkslot`, {
    bookingDate,
    startTime,
    endTime,
    turfId: turf._id
  });

  // Slot available
  console.log('Slot is available:', slotCheckRes.data.message);

} catch (error) {
  // ⛔ Slot is not available or request failed
  if (error.response && error.response.status === 400) {
    alert(error.response.data.message || 'Slot is already booked');
  } else {
    console.error('Slot check failed:', error);
    alert('Error checking slot availability. Try again later.');
  }
  return;
}


  // 💰 2. Create Razorpay Order
  let razorpayOrder;
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/booking/create-order`, { amount: totalPrice });
    razorpayOrder = res.data;
  } catch (err) {
    console.error('Order creation failed:', err);
    alert('Failed to initiate payment. Try again.');
    return;
  }

  // 🚀 3. Open Razorpay Payment UI
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with env variable
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    order_id: razorpayOrder.id,
    handler: async (response) => {
      // ✅ 4. On successful payment: verify + store booking
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/booking/verify`, {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          bookingDetails: {
            turfId: turf._id,
            turfName: turf.name,
            ownerEmail: turf.ownerEmail,
            userEmail: user.email,
            date: bookingDate,
            startTime,
            endTime,
            totalHours,
            totalPrice,
            contact: turf.contact
          }
        });

        alert(`Booking confirmed for ${turf.name} on ${bookingDate} from ${startTime} to ${endTime}. Total: ₹${totalPrice}`);
        onBook?.(); // optional callback
      } catch (error) {
        console.error('Payment verified but booking failed:', error);
        alert('Payment succeeded but booking failed. Please contact support.');
      }
    },
    prefill: { email: userEmail },
    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
 

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">{turf.name}</h3>
          <img
            src={turf.image}
            alt={turf.name}
            className="w-full h-40 object-cover my-2 rounded"
          />
          <p><strong>Size:</strong> {turf.size}</p>
          <p><strong>Price:</strong> ₹{turf.price}/hr</p>
          <p><strong>Open:</strong> {turf.openingTime} — <strong>Close:</strong> {turf.closingTime}</p>
          <p><strong>Contact No.:</strong>{turf.contact} </p>

          <div className="my-4">
            <label className="block mb-1 font-medium">Select Date</label>
            <input
              type="date"
              className="input input-bordered w-full mb-2"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />

            <label className="block mb-1 font-medium">Start Time</label>
            <input
              type="time"
              className="input input-bordered w-full mb-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />

            <label className="block mb-1 font-medium">End Time</label>
            <input
              type="time"
              className="input input-bordered w-full"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          {totalHours > 0 && isValidBookingTime() && (
            <div className="text-green-700 font-semibold mb-4">
              Booking for {totalHours} hour(s). Total: ₹{totalPrice}
            </div>
          )}

          <div className="modal-action flex justify-between">
            <form method="dialog">
              <button className="btn" onClick={handleClose}>Close</button>
            </form>
            <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default TurfModal;
