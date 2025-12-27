export async function createBooking(state){
    const res = await axios.post("http://localhost:5000/api/bookings", {
    turf: state.selectedTurf,
    slot: state.selectedSlot,
  });

  return {
    ...state,
    bookingId: res.data.id,
  };
}