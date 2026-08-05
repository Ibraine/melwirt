// src/api/chatsAPI.js
import axiosInstance from "./axiosConfig";

const SESSIONS_URL = "/api/chat-sessions/"; // GET, POST
const MESSAGES_URL = "/api/messages/";      // GET (filter by ?session=), POST

export async function fetchChatSessions() {
  const res = await axiosInstance.get(SESSIONS_URL);
  // DRF usually returns list directly for viewset list
  return res.data;
}

export async function fetchMessagesForSession(sessionId) {
  const res = await axiosInstance.get(MESSAGES_URL, {
    params: { session: sessionId }
  });
  return res.data;
}

/**
 * payload: { session: <id>, text: <string>, sender_type?: 'system'|'teacher'|'student' }
 * Note: backend will override sender to request.user; you can send sender_type only for admin system messages.
 */
export async function sendMessage(payload) {
  if (!payload || !payload.session || !payload.text || !payload.text.trim()) {
    throw new Error("session and non-empty text required");
  }
  const body = {
    session: payload.session,
    text: payload.text,
  };
  // allow admin to pass sender_type if needed
  if (payload.sender_type) body.sender_type = payload.sender_type;
  const res = await axiosInstance.post(MESSAGES_URL, body);
  return res.data;
}

/**
 * Optional: mark messages read if you have such endpoint; else you can update via PATCH to /api/messages/<id>/
 * export async function markMessageRead(messageId) { ... }
 */

export async function fetchAvailableChatUsers() {
  const res = await axiosInstance.get("/api/chat-sessions/available_users/");
  return res.data;
}