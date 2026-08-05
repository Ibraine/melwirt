// src/pages/Chats/Chats.jsx
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  fetchChatSessions,
  fetchMessagesForSession,
  sendMessage,
} from "../../api/chatsAPI";
import "../../styles/chats.css";

/**
 * Props:
 *  - role: "admin" | "tutor" | "student"
 *  - userId: current user id (number)
 *
 * Usage:
 * <Chats role="tutor" userId={currentUserId} />
 */
const POLL_INTERVAL = 2000; // 2s

const Chats = ({ role = "tutor", userId = null }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null); // full session obj
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const pollRef = useRef(null);
  const messagesEndRef = useRef(null);

  // load sessions once
  useEffect(() => {
    let mounted = true;
    setLoadingSessions(true);
    fetchChatSessions()
      .then((data) => {
        if (!mounted) return;
        // data is list of sessions; filter locally for safety if backend returns all
        let filtered = data;
        if (role === "student") filtered = data.filter((s) => s.student?.id === userId);
        if (role === "tutor") filtered = data.filter((s) => s.teacher?.id === userId);
        setSessions(filtered);
        // auto-select first session if any
        if (filtered.length > 0) setSelectedSession(filtered[0]);
      })
      .catch((err) => {
        console.error("Failed to load sessions:", err);
        // if 401, axios interceptor should handle redirect; else show basic alert
        if (!err.response) alert("Network error while fetching chat sessions");
      })
      .finally(() => mounted && setLoadingSessions(false));
    return () => (mounted = false);
  }, [role, userId]);

  // load messages for selected session, and start polling
  useEffect(() => {
    stopPolling();
    if (!selectedSession) {
      setMessages([]);
      return;
    }

    let mounted = true;
    const loadMessages = async () => {
      setLoadingMessages(true);
      try {
        const data = await fetchMessagesForSession(selectedSession.id);
        if (!mounted) return;
        setMessages(data);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        if (mounted) setLoadingMessages(false);
      }
    };

    loadMessages();

    // start poll
    pollRef.current = setInterval(() => {
      fetchMessagesForSession(selectedSession.id)
        .then((data) => {
          setMessages((prev) => {
            // quick diff: if length changed or last id differs, update
            if (!Array.isArray(prev) || prev.length !== data.length) return data;
            const prevLast = prev[prev.length - 1];
            const newLast = data[data.length - 1];
            if (!prevLast || !newLast) return data;
            if (prevLast.id !== newLast.id) return data;
            return prev;
          });
        })
        .catch((e) => console.error("Polling messages error:", e));
    }, POLL_INTERVAL);

    return () => {
      mounted = false;
      stopPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSession]);

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  // scroll helper
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  };

  // when messages change scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // send message
  const handleSend = async () => {
    const text = input.trim();
    if (!text || !selectedSession) return;
    const optimistic = {
      id: `temp-${Date.now()}`, // temporary id
      session: selectedSession.id,
      sender: { id: userId, username: role === "tutor" ? "tutor" : "student" },
      sender_type: role === "tutor" ? "teacher" : "student",
      text,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages((m) => [...m, optimistic]);
    setInput("");
    scrollToBottom();

    try {
      setSending(true);
      const res = await sendMessage({ session: selectedSession.id, text });
      // replace optimistic with real response (match by text+timestamp fallback)
      setMessages((prev) => {
        // remove temp items with same text & temp id, then append returned message
        const withoutTemp = prev.filter((it) => !(String(it.id).startsWith("temp-") && it.text === optimistic.text));
        return [...withoutTemp, res];
      });
    } catch (err) {
      console.error("Send message failed:", err);
      alert("Message send failed");
      // remove optimistic message if you prefer
      setMessages((prev) => prev.filter((it) => !String(it.id).startsWith("temp-")));
    } finally {
      setSending(false);
    }
  };

  // helper to render session row
  const renderSessionRow = (s) => (
    <tr
      key={s.id}
      onClick={() => setSelectedSession(s)}
      className={selectedSession && selectedSession.id === s.id ? "table-active" : ""}
      style={{ cursor: "pointer" }}
    >
      <td>{s.id}</td>
      <td>{role === "tutor" ? s.student?.username || s.student?.email : s.teacher?.username || s.teacher?.email}</td>
      <td>{new Date(s.created_at).toLocaleString()}</td>
    </tr>
  );

  return (
    <div className="d-flex">
      <Sidebar role={role} />
      <div className="flex-grow-1">
        <Header />
        <div className="container mt-4">
          <h2 className="mb-4">{role === "tutor" ? "Tutor Chats" : role === "admin" ? "Admin Chats" : "Student Chats"}</h2>

          <div className="row">
            <div className="col-md-4">
              <div className="card p-3">
                <h6>Sessions</h6>
                {loadingSessions ? (
                  <p>Loading sessions...</p>
                ) : sessions.length === 0 ? (
                  <p>No sessions found.</p>
                ) : (
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{role === "tutor" ? "Student" : "Teacher"}</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>{sessions.map(renderSessionRow)}</tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="col-md-8">
              <div className="card p-3">
                {!selectedSession ? (
                  <p>Select a session to view messages</p>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <strong>{selectedSession.title || `Session ${selectedSession.id}`}</strong>
                        <div className="text-muted small">
                          {selectedSession.student?.username || selectedSession.student?.email} → {selectedSession.teacher?.username || selectedSession.teacher?.email}
                        </div>
                      </div>
                      <div className="text-muted small">Session ID: {selectedSession.id}</div>
                    </div>

                    <div className="chat-box" style={{ minHeight: 300, maxHeight: 500, overflowY: "auto", padding: "12px", border: "1px solid #eee", borderRadius: 6 }}>
                      {loadingMessages ? (
                        <p>Loading messages...</p>
                      ) : messages.length === 0 ? (
                        <p className="text-muted">No messages yet. Say hi 👋</p>
                      ) : (
                        messages.map((msg) => {
                          const mine = msg.sender?.id === userId;
                          return (
                            <div key={msg.id} className={`message ${mine ? "me" : "them"}`} style={{ marginBottom: 10 }}>
                              <div style={{ fontSize: 12, color: "#666" }}>
                                <strong>{mine ? "You" : msg.sender?.first_name || msg.sender?.username || msg.sender?.email}</strong>
                                {" • "}
                                <span style={{ fontSize: 11 }}>{new Date(msg.timestamp).toLocaleString()}</span>
                              </div>
                              <div style={{ padding: "8px 10px", background: mine ? "#eaf3ff" : "#f1f1f1", borderRadius: 8, display: "inline-block", marginTop: 4 }}>
                                {msg.text}
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="d-flex mt-3">
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder={sending ? "Sending..." : "Type a message..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSend(); } }}
                        disabled={sending}
                      />
                      <button className="btn btn-primary" onClick={handleSend} disabled={sending || !input.trim()}>
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
