export function routeByIntent(state){
     switch (state.intent) {
    case "search":
      return "searchTurfs";
    case "select_turf":
      return "selectTurf";
    case "Book":
      return "BookTurf";
    case "select_slot":
      return "selectSlot";
    case "confirm_booking":
      return "confirmBooking";
    case "Check_availability":
      return "CheckSlot";
    case "payment":
      return "initiatePayment";
    case "general_question":
      return "generalAnswer";
    default:
      return "__end__"; 
  }
}