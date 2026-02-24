// lib/onlineStore.ts
const onlineUsers = new Map<string, { lastSeen: number; page: string }>();
export const TTL = 45000; // 45 segundos

export function registerVisitor(visitorId: string, page: string) {
  onlineUsers.set(visitorId, {
    lastSeen: Date.now(),
    page: page || '/',
  });
  cleanupExpired();
}

export function getOnlineCount(page?: string): number {
  cleanupExpired();
  if (page) {
    return Array.from(onlineUsers.values()).filter(u => u.page === page).length;
  }
  return onlineUsers.size;
}

export function cleanupExpired() {
  const now = Date.now();
  for (const [id, data] of onlineUsers.entries()) {
    if (now - data.lastSeen > TTL) {
      onlineUsers.delete(id);
    }
  }
}

export function removeVisitor(visitorId: string) {
  onlineUsers.delete(visitorId);
}