import Turf from "../model/Turf.model.js";

export async function selectSlot(state) {
  const { date, startTime, endTime } = state.filters;
  const turfName = state.selectedTurf;
  if(!turfName){
    return {
        ...state,
    messages: [
        ...state.messages,
        {
            role: "assistant",
            content: "Please specify a turf name to select a slot.",
        },
    ],
    };
  }

  // 1️⃣ Fetch selected turf
  const turf = await Turf.findOne({ name: turfName });

  if (!turf) {
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

  const bookedSlots = turf.bookedSlots || [];

  // 2️⃣ If date/time NOT provided → just list booked slots
  if (!date || !startTime || !endTime) {
    if (bookedSlots.length === 0) {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            role: "assistant",
            content: "There are no booked slots yet. All slots are available.",
          },
        ],
      };
    }

    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content:
            "Here are the already booked slots:\n" +
            bookedSlots
              .map(
                (s) =>
                  `• ${s.date} from ${s.startTime} to ${s.endTime}`
              )
              .join("\n") +
            `\n\nPlease choose a different slot.`,
        },
      ],
    };
  }

  // 3️⃣ Check for slot conflict
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
