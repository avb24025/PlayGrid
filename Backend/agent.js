// agent.js
import { StateGraph ,START } from "@langchain/langgraph";
import { initialState } from "./state.js";
import { detectIntent } from "./nodes/detectIntent.js";
import { searchTurfs } from "./nodes/searchTurfs.js";
import { selectTurf } from "./nodes/selectTurf.js";
import { checkAvailability } from "./nodes/checkAvailability.js";
import { selectSlot } from "./nodes/selectSlot.js";
import { confirmBooking } from "./nodes/confirmBooking.js";
import { createBooking } from "./nodes/createBooking.js";
import { initiatePayment } from "./nodes/initiatePayment.js";
import { routeByIntent } from "./routeByIntent.js";
import { generalAnswer } from "./nodes/generalAnswer.js";

const graph = new StateGraph({ channels: initialState });

graph.addNode("detectIntent", detectIntent);
graph.addNode("searchTurfs", searchTurfs);
graph.addNode("generalAnswer", generalAnswer);
graph.addNode("selectTurf", selectTurf);
// graph.addNode("checkAvailability", checkAvailability);
graph.addNode("selectSlot", selectSlot);
// graph.addNode("confirmBooking", confirmBooking);
// graph.addNode("createBooking", createBooking);
// graph.addNode("initiatePayment", initiatePayment);

graph.addEdge(START, "detectIntent");
graph.addConditionalEdges("detectIntent", routeByIntent);
graph.addEdge("selectTurf", "selectSlot");

export const playgridAgent = graph.compile();
