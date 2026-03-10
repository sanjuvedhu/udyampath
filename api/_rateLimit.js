const map = new Map();
export function rateLimit(ip, limit=30, ms=60000) {
  const now = Date.now();
  if (!map.has(ip)) { map.set(ip,{count:1,start:now}); return {allowed:true}; }
  const r = map.get(ip);
  if (now - r.start > ms) { map.set(ip,{count:1,start:now}); return {allowed:true}; }
  r.count++;
  return { allowed: r.count <= limit };
}
export function getIp(req) {
  return (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
}
