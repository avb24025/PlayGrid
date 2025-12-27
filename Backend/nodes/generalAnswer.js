import { llm } from "../llm.js";

export async function generalAnswer(state) {
  const userMessage = state.messages.at(-1).content;

  const prompt = `
You are a helpful assistant for a sports turf booking platform.

Answer the user's question clearly and briefly.
Do NOT talk about booking unless asked.
Do NOT invent data.

User question:
"${userMessage}"
`;

  const response = await llm.invoke(prompt);

  return {
    ...state,
    messages: [
      ...state.messages,
      {
        role: "assistant",
        content: response.content,
      },
    ],
  };
}
 