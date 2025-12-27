import {ChatGoogleGenerativeAI } from "@langchain/google-genai"; 

export const llm=new ChatGoogleGenerativeAI({
    model:"gemini-2.5-flash-lite",
    temperature:0,
    apiKey:process.env.GOOGLE_API_KEY,
});