import React, { useState } from 'react';

function TurfModal({ turf, onBook }) {
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

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
  const totalPrice = totalHours * turf.pricePerHour;

  const handleBooking = () => {
    if (!bookingDate || !startTime || !endTime) {
      alert('Please fill in all fields');
      return;
    }

    if (!isValidBookingTime()) {
      alert(`Booking time must be between ${turf.openingTime} and ${turf.closingTime}, and end time must be after start time.`);
      return;
    }

    const bookingData = {
      turfId: turf._id,
      date: bookingDate,
      startTime,
      endTime,
      totalHours,
      totalPrice,
    };

    onBook?.(bookingData);
    alert(`Booking confirmed for ${turf.name} on ${bookingDate} from ${startTime} to ${endTime}.\nTotal: ₹${totalPrice}`);
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
          <p><strong>Price:</strong> ₹{turf.pricePerHour}/hr</p>
          <p><strong>Rating:</strong> ⭐ {turf.rating}</p>
          <p><strong>Open:</strong> {turf.openingTime} — <strong>Close:</strong> {turf.closingTime}</p>

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
