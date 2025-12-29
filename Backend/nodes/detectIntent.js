 import { llm } from "../llm.js";

export async function detectIntent(state) {
  const userMessage = state.messages.at(-1).content;

 const prompt = `
You are an intent and entity extractor for a sports turf booking assistant.

Your task:
1. Identify the MOST ADVANCED intent the user is expressing.
2. You MUST consider the conversation context, especially the previous user and assistantmessage.
3. Extract structured filters strictly based on the Turf schema.

Allowed intents (choose exactly one):
- search             → user wants to find turfs
- select_turf        → user is choosing a specific turf
- payment            → user wants to pay
- general_question   → user is asking a general or informational question

Intent priority:
payment > confirm_booking > select_slot > select_turf > search > general_question

How to use context:
- If the current message is short or referential ("first one", "yes", "book it"),
  use the PREVIOUS USER MESSAGE to infer intent.
- If previous context involved listing turfs, then "first", "second", "that one"
  implies intent = select_turf.
- If previous context involved slot discussion, then time-related messages
  imply intent = select_slot.

Extract filters ONLY if present in the message or clearly implied by context.

Location filters:
- location   (area/locality like Wakad, Baner)
- district   (city like Pune, Mumbai)
- state      (state like Maharashtra)

Turf filters:
- turfName
- sport
- size
- maxPrice

Time filters:
- date       (YYYY-MM-DD)
- startTime  (HH:mm)
- endTime    (HH:mm)

Rules:
- If the user asks "what", "how", "why", "help", "explain" → general_question
- If user says "select", "book", "choose", "first", "second" → select_turf
- Do NOT invent values
- Leave missing filters as empty strings
- Return JSON only


Previous  message:
"${state.messages.length >= 2 ? state.messages : ""}"

current message:
"${userMessage}"

Return JSON in this exact format:
{
  "intent": "",
  "filters": {
    "location": "",
    "district": "",
    "state": "",
    "sport": "",
    "turfName": "",
    "size": "",
    "maxPrice": "",
    "startTime": "",
    "endTime": "",
    "date": ""
  }
}
`;




  const response = await llm.invoke(prompt);
  const content = response.content.replace(/```json\n?|\n?```/g, "").trim();
  const parsed = JSON.parse(content);
  console.log("Detected Intent:", parsed);

  return {
    ...state,
    intent: parsed.intent,
    filters: {
      ...state.filters,
      ...parsed.filters,
    },
  };
}
