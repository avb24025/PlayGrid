export async function selectTurf(state) {

  // If turf already selected earlier, do nothing
  if (state.selectedTurf) {
    return state;
  }

  // If no turf specified yet
  if (!state.filters.turfName) {
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: "Please specify which turf you want to select.",
        },
      ],
    };
  }

  // Select turf
  return {
    ...state,
    selectedTurf: state.filters.turfName,
    messages: [
      ...state.messages,
      {
        role: "assistant",
        content: `You have selected the turf "${state.filters.turfName}".`,
      },
    ],
  };
}
