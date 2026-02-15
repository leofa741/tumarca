export function trackClick(
  eventName: string,
  metadata: { section?: string; button?: string } = {}
) {
  if (typeof window === "undefined") return;

  fetch("/api/track-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      ...metadata,
      timestamp: new Date().toISOString(),
    }),
  }).catch(console.error);
}
