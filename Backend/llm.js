import {ChatGoogleGenerativeAI } from "@langchain/google-genai"; 
import { SystemMessage } from "@langchain/core/messages";

const today = new Date();
const formattedDate = today.toISOString().split("T")[0];

export const llm=new ChatGoogleGenerativeAI({
    model:"gemini-2.5-flash-lite",
    temperature:0,
    apiKey:process.env.GOOGLE_API_KEY,
});

export const systemMessage = new SystemMessage(`
You are a helpful assistant.

Today's date is ${formattedDate}.

Rules:
- If the user says "today", use ${formattedDate}.
- If the user says "tomorrow", use the next calendar date.
- If the user says "yesterday", use the previous calendar date.
- Resolve all relative dates into absolute ISO format (YYYY-MM-DD).
`);