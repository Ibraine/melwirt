// src/pages/Chats/Chats.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  fetchChatSessions,
  fetchMessagesForSession,
  sendMessage,
} from "../../api/chatsAPI";
import "../../styles/chats.css";

const Chats = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);

  // ------------------------------------------
  // LOAD ALL SESSIONS (admin/tutor/student auto)
  // ------------------------------------------
  useEffect(() => {
    fetchChatSessions()
      .then((data) => setSessions(data))
      .catch((err) => console.error("Fetch sessions error:", err));
  }, []);

  // ------------------------------------------
  // LOAD MESSAGES OF ACTIVE SESSION
  // ------------------------------------------
  useEffect(() => {
    if (!activeSession) return;

    setLoadingMessages(true);

    fetchMessagesForSession(activeSession.id)
      .then((msgs) => setMessages(msgs))
      .catch((err) =>
        console.error("Fetch messages error:", err.response?.data || err.message)
      )
      .finally(() => setLoadingMessages(false));
  }, [activeSession]);

  // ------------------------------------------
  // SEND MESSAGE
  // ------------------------------------------
  const handleSend = async () => {
    if (!input.trim() || !activeSession) return;

    try {
      const newMsg = await sendMessage({
        session: activeSession.id,
        text: input,
      });

      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    } catch (err) {
      console.error("Send message error:", err.response?.data || err.message);
      alert("Message send failed");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />

        <div className="container mt-4">
          <h3 className="mb-3">Chats</h3>

          {/* Sessions Table */}
          <table className="table table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setActiveSession(s)}
                  className={activeSession?.id === s.id ? "table-active" : ""}
                  style={{ cursor: "pointer" }}
                >
                  <td>{s.id}</td>
                  <td>{s.student?.username || s.student?.email}</td>
                  <td>{s.teacher?.username || s.teacher?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Chat Window */}
          {activeSession && (
            <div className="chat-window mt-4">
              <h5 className="mb-2">Chat — Session #{activeSession.id}</h5>

              {loadingMessages ? (
                <p>Loading messages...</p>
              ) : (
                <div
                  className="chat-box"
                  style={{
                    height: 350,
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  {messages.length === 0 ? (
                    <p className="text-muted">No messages yet.</p>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className={`message ${
                          m.sender_type === "teacher"
                            ? "teacher"
                            : m.sender_type === "student"
                            ? "student"
                            : "system"
                        }`}
                        style={{ marginBottom: 10 }}
                      >
                        <strong>
                          {m.sender?.username ||
                            m.sender?.email ||
                            "Unknown"}
                          :
                        </strong>{" "}
                        {m.text}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Input */}
              <div className="d-flex mt-3">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="btn btn-primary" onClick={handleSend}>
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
