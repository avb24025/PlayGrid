import Booking from "../model/Booking.model.js";
import Turf from "../model/Turf.model.js";

export async function createBooking(state) {
  console.log("createBooking running...");
  const {
    selectedTurf,
    selectedSlot,
    email
  } = state;

  if (!turf) {
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: "Please  enter valid turf."
        }
      ]
    };
  }
  if(!selectedSlot){
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: "Please select a valid slot."
        }
      ]
    };
  }
  try {
    const turf = await Turf.findOne({ name: selectedTurf });
    if (!turf) throw new Error("Turf not found");

    const totalHours = selectedSlot.endTime - selectedSlot.startTime;
    const totalPrice = totalHours * 200;

    const booking = await Booking.create({
      turfId: turf._id,
      turfName: turf.name,
      ownerEmail: turf.ownerEmail,
      userEmail: email,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      totalHours,
      totalPrice,
      paymentId: temp_id
    });

    return {
      ...state,
      bookingConfirmed: true,
      bookingId: booking._id,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: `✅ Booking confirmed for ${turf.name}!\nBooking ID: ${booking._id}`
        }
      ]
    };

  } catch (err) {
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: `❌ Booking failed: ${err.message}`
        }
      ]
    };
  }
}
