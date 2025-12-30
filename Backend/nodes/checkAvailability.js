import Turf from "../model/Turf.model.js";

export async function checkAvailability(state){
  if(!state.selctrdTurf){
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: "No turf selected. Please select a turf first.",
        },
      ],
    };
  }

  const turf=await Turf.findOne({name:state.selectedTurf});

  if(!turf){
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: "Selected turf not found. Please try again.",
        },
      ],
    };
  }

  const {date,startTime,endTime}=state.filters;
  if(!date || !startTime || !endTime){
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: "Please provide date, start time and end time to check availability.",
        },
      ],
    };
  } 
  // Check availability
   const bookedSlots = turf.bookedSlots || [];
   const hasConflict = bookedSlots.some((slot) => {
    if (slot.date !== date) return false;

    return (
      startTime < slot.endTime &&
      endTime > slot.startTime
    );
  });

  // 4️⃣ Conflict found → show booked slots
  if (hasConflict) {
    return {
      ...state,
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

  // 5️⃣ Slot available → confirm selection
  return {
    ...state,
    selectedSlot: { date, startTime, endTime },
    messages: [
      ...state.messages,
      {
        role: "assistant",
        content: `✅ Slot available!\n\n${date} from ${startTime} to ${endTime}\n\nDo you want to confirm the booking?`,
      },
    ],
  };

}

  