// src/lib/trackClick.ts
export async function trackClick(eventName: string, section: string, button: string) {
  try {
    await fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, section, button }),
    });
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}