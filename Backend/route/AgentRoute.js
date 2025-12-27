import { sessionCache } from "../cache.js";
import express from 'express';
import { initialState } from "../state.js";
import { playgridAgent } from "../agent.js";

const router=express.Router();

router.post("/chat", async (req, res) => {
  const {  message } = req.body;

//   if (!sessionId) {
//     return res.status(400).json({ error: "sessionId required" });
//   }

  // const prevState =
  //   sessionCache.get(sessionId) ?? structuredClone(initialState);
  const prevState = structuredClone(initialState);

  const inputState = {
    ...prevState,
    messages: [
      ...prevState.messages,
      { role: "user", content: message },
    ],
  };

  const result = await playgridAgent.invoke(inputState);
  console.log(result.messages.at(-1).content);

//   sessionCache.set(sessionId, result);
  res.json({
    reply: result.messages.at(-1).content,
  });
});

export default router;
