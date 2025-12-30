export function routeByIntent(state){
     switch (state.intent) {
    case "search":
      return "searchTurfs";
    case "select_turf":
      return "selectTurf";
    case "Book":
      return "Book";
    case "select_slot":
      return "selectSlot";
    case "confirm_booking":
      return "confirmBooking";
    case "Check_availability":
      return "Check";
    case "payment":
      return "initiatePayment";
    case "general_question":
      return "generalAnswer";
    default:
      return "detectIntent";
  }
}