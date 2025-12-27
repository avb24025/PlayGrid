 import { llm } from "../llm.js";

export async function detectIntent(state) {
  const userMessage = state.messages.at(-1).content;

  const prompt = `
You are an intent and entity extractor for a sports turf booking assistant.

Your task:
1. Identify the MOST ADVANCED intent the user is expressing.
2. Extract structured filters strictly based on the Turf schema.

Allowed intents (choose exactly one):
- search             → user wants to find turfs
- select_turf        → user is choosing a specific turf
- select_slot        → user is choosing date/time
- confirm_booking    → user clearly wants to book
- payment            → user wants to pay
- general_question   → user is asking a general or informational question

Intent priority:
payment > confirm_booking > select_slot > select_turf > search > general_question

Extract filters ONLY if present in the message:

Location filters:
- location   (area/locality like Wakad, Baner)
- district   (city like Pune, Mumbai)
- state      (state like Maharashtra)

Turf filters:
- turfName   (specific turf name)
- sport      (cricket, football)
- size       (e.g. "5-a-side", "7-a-side", "8-a-side")
- maxPrice   (number)

Time filters:
- startTime  (HH:mm)
- endTime    (HH:mm)



Rules:
- If the user asks "what", "how", "why", "help", "explain" → general_question
- Do NOT invent values
- Leave missing filters as empty strings
- Return JSON only

User message:
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
    "endTime": ""
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
