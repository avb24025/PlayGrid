// cache.js
import NodeCache from "node-cache";

export const sessionCache = new NodeCache({
  stdTTL: 30 * 60,   // 30 minutes
  checkperiod: 5 * 60,
});
 