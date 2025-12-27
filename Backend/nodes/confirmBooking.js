export async function confirmBooking(state){
    return {
    ...state,
    messages: [
      ...state.messages,
      {
        role: "assistant",
        content: `Confirm booking for ${state.selectedTurf} at ${state.selectedSlot}? (yes/no)`,
      },
    ],
  };
}