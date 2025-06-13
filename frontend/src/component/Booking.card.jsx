import react from 'react';
import { useState, useEffect, useContext } from 'react';

function BookingCard({booking}) {
    return(
        <>
       <div className="flex justify-center  w-full mb-5"> 
  <div className="card w-2/3 md:w-1/2  md:h-40 max-w-4xl lg:card-side bg-base-100 shadow-md">
    
    <div className="card-body w-full lg:w-1/2">
      <h2 className="card-title text-xl font-bold">{booking.turfName}</h2>
      <div>Date:{new Date(booking.bookedSlot.date).toLocaleDateString()}</div>
      <div>Booking Time:{booking.bookedSlot.startTime}-{booking.bookedSlot.endTime}</div>
      <div>Contact:{booking.contact}</div>
      {/* <div className="card-actions justify-end">
        <button className="btn btn-primary bg-red-500 hover:bg-red-600">Cancel</button>
      </div> */}
    </div>
  </div>
</div>

        </>
    )
}

export default BookingCard;

