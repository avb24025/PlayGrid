// agent.js
import { StateGraph ,START } from "@langchain/langgraph";
import { initialState } from "./state.js";
import { detectIntent } from "./nodes/detectIntent.js";
import { searchTurfs } from "./nodes/searchTurfs.js";
import { selectTurf } from "./nodes/selectTurf.js";
import { checkAvailability } from "./nodes/checkAvailability.js";
import { selectSlot } from "./nodes/selectSlot.js";
import { createBooking } from "./nodes/createBooking.js";
import { routeByIntent } from "./routeByIntent.js";
import { generalAnswer } from "./nodes/generalAnswer.js";

const graph = new StateGraph({ channels: initialState });

graph.addNode("detectIntent", detectIntent);
graph.addNode("searchTurfs", searchTurfs);
graph.addNode("generalAnswer", generalAnswer);
graph.addNode("selectTurf", selectTurf);
graph.addNode("BookTurf",selectTurf);
graph.addNode("CheckSlot",selectTurf);
graph.addNode("checkAvailability", checkAvailability);
graph.addNode("selectSlot", selectSlot);
graph.addNode("createBooking", createBooking);

graph.addEdge(START, "detectIntent");
graph.addConditionalEdges("detectIntent", routeByIntent);
graph.addEdge("CheckSlot","checkAvailability");
graph.addEdge("BookTurf","selectSlot");
graph.addEdge("selectSlot", "createBooking");

export const playgridAgent = graph.compile();
