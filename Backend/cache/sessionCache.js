import NodeCache from "node-cache";

export const sessionCache = new NodeCache({
  stdTTL: 30 * 60,     // 30 minutes session expiry
  checkperiod: 5 * 60 // cleanup every 5 min
});
