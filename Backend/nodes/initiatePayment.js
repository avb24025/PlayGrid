export async function initiatePayment(state){
    const res = await axios.post("http://localhost:5000/api/payments", {
    bookingId: state.bookingId,
  });

  return {
    ...state,
    messages: [
      ...state.messages,
      {
        role: "assistant",
        content: `Payment link: ${res.data.paymentUrl}`,
      },
    ],
  };
}