export async function checkAvailability(state){
    const res = await axios.get(
    `http://localhost:5000/api/turfs/${state.selectedTurf}/availability`,
    { params: state.filters }
  );

  return {
    ...state,
    messages: [
      ...state.messages,
      {
        role: "assistant",
        content: `Available slots:\n${res.data.join(
          "\n"
        )}\nPlease choose a slot.`,
      },
    ],
  };
}