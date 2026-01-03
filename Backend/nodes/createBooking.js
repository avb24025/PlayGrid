import Booking from "../model/Booking.model.js";
import Turf from "../model/Turf.model.js";

export async function createBooking(state) {
  console.log("createBooking running...");
  const {
    selectedTurf,
    selectedSlot,
    email,
    conflict
  } = state;
  const {date}=state.filters

  
    if(selectedTurf && conflict){
      const turf = await Turf.findOne({ name: selectedTurf });
      if (!turf) throw new Error("Turf not found");

      console.log(selectedSlot)
      const bookedSlots = turf.bookedSlots;
       return {
      ...state,
      conflict:true,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content:
            "❌ The selected slot is already booked.\n\nBooked slots:\n" +
            bookedSlots
              .filter((s) => s.date === date)
              .map(
                (s) =>
                  `• ${s.date} from ${s.startTime} to ${s.endTime}`
              )
              .join("\n") +
            `\n\nPlease try another slot.`,
        },
      ],
    };
    }
  if (!selectedTurf) {
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
      turfName: turf.name,
      ownerEmail: turf.ownerEmail,
      contact:turf.contact,
      userEmail: email,
      bookedSlot: {
        date: new Date(selectedSlot.date),   // ensure Date type
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      },
      paymentId: "temp_id"
    });

    // await booking.save()

    if (turf) {
      turf.bookedSlots.push({
        date: (selectedSlot.date),
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      });
      await turf.save();
    }
    return {
      ...state,
      bookingConfirmed: true,
      bookingId: booking._id,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: `✅ Booking confirmed for ${turf.name}!\nBooking ID: ${booking._id} \nDate: ${selectedSlot.date}\nTime: ${selectedSlot.startTime}:00 to ${selectedSlot.endTime}:00\nTotal Price:${totalPrice}`
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
