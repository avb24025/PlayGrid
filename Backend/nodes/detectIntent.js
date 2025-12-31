import { llm } from "../llm.js";

export async function detectIntent(state) {
  const userMessage = state.messages.at(-1).content;

  const today = getTodayISO();

  const prompt = `
You are an intent and entity extractor for a sports turf booking assistant.

IMPORTANT TIME CONTEXT:
- Today's date is ${today}.
- Timezone: Asia/Kolkata (IST).

DATE RULES:
- "today" → ${today}
- "tomorrow" → the next calendar date after ${today}
- "day after tomorrow" → ${today} + 2 days
- If the user gives a weekday ("Friday"), resolve it to the NEXT occurrence.
- Always convert dates to ISO format (YYYY-MM-DD).
- If date is not mentioned, leave it empty.

Your task:
1. Identify the MOST ADVANCED intent the user is expressing.
2. Consider conversation context carefully.
3. Extract structured filters strictly based on the Turf schema.

Allowed intents (choose exactly one):

- search
  → User wants to find or explore available turfs based on filters (location, sport, price, etc.).

- select_turf
  → User is choosing or confirming a specific turf from a previously shown list.

- Book
  → User clearly wants to book a turf by specifying date, time, or confirming the booking action.

- payment
  → User wants to pay or proceed with payment for a confirmed booking.

- general_question
  → User is asking for information, help, or explanations unrelated to booking flow.

-Check_availability
  → User wants to check if a specific turf is available for booking on a certain date and time.


Intent priority:
payment > select_turf > search > general_question

Extract filters ONLY if present in the message or clearly implied by context. 
Location filters: 
- location (area/locality like Wakad, Baner) 
- district (city like Pune, Mumbai)
- state (state like Maharashtra)
 Turf filters:
  - turfName 
  - sport 
  - size
  - maxPrice Time filters:
  - date (YYYY-MM-DD)
  - startTime (HH:mm)
  - endTime (HH:mm)

How to use context:
- Referential messages ("first one", "yes", "book it") depend on previous context.
- If turfs were listed → "first" means select_turf.

Extract filters ONLY if present or clearly implied.

Rules:
- Do NOT invent values
- Leave missing filters as empty strings
- Return JSON ONLY

Previous messages:
${JSON.stringify(state.messages, null, 2)}

Current message:
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

  const content = response.content
    .replace(/```json\n?|\n?```/g, "")
    .trim();

  const parsed = JSON.parse(content);
  console.log("Detected intent and filters:", parsed);

  return {
    ...state,
    intent: parsed.intent,
    filters: {
      ...state.filters,
      ...parsed.filters,
    },
  };
}

// helper
function getTodayISO() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return now.toISOString().split("T")[0];
}
