// import React, { useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import "../../styles/chats.css";

// const Chats = ({ role = "student" }) => {
//   // Role-based data
//   const chatsData = role === "tutor"
//     ? [
//         { id: 1, session: "Session 1", name: "Ashutosh Karhale", date: "14 Aug, 2:30 PM" },
//         { id: 2, session: "Session 2", name: "Ashutosh Karhale", date: "14 Aug, 1:15 PM" },
//       ]
//     : [
//         { id: 1, session: "Session 1", name: "Ashutosh Karhale", date: "14 Aug, 2:30 PM" },
//         { id: 2, session: "Session 2", name: "Ashutosh Karhale", date: "14 Aug, 1:15 PM" },
//       ];

//   // Dummy messages (can be session-specific later)
//   const defaultMessages = [
//     {
//       from: role === "tutor" ? "Tutor" : "Teacher",
//       text: "Hello",
//       img: "https://randomuser.me/api/portraits/men/75.jpg",
//     },
//     {
//       from: "Student",
//       text: "Hello",
//       img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
//     },
//   ];

//   const [messages, setMessages] = useState(defaultMessages);
//   const [input, setInput] = useState("");
//   const [selectedSession, setSelectedSession] = useState(null);

//   const sendMessage = () => {
//     if (input.trim() === "") return;
//     setMessages([...messages, { from: role === "tutor" ? "Tutor" : "Student", text: input, img: null }]);
//     setInput("");
//   };

//   return (
//     <div className="d-flex">
//       <Sidebar role={role} />
//       <div className="flex-grow-1">
//         <Header />
//         <div className="container mt-4">
//           <h2 className="mb-4">{role === "tutor" ? "Tutor Chats" : "Student Chats"}</h2>

//           {/* Table */}
//           <table className="table table-bordered text-center align-middle mt-3">
//             <thead className="table-dark">
//               <tr>
//                 <th>Session ID</th>
//                 <th>{role === "tutor" ? "Student Name" : "Teacher Name"}</th>
//                 <th>Chat Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {chatsData.map((chat) => (
//                 <tr
//                   key={chat.id}
//                   onClick={() => setSelectedSession(chat.session)}
//                   className={selectedSession === chat.session ? "table-active" : ""}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <td>{chat.session}</td>
//                   <td>{chat.name}</td>
//                   <td>{chat.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Chat Box */}
//           {selectedSession && (
//             <div className="chat-window mt-4">
//               <h6 className="mb-3">{selectedSession} Chat</h6>
//               <div className="chat-box">
//                 {messages.map((msg, i) => (
//                   <div
//                     key={i}
//                     className={`message ${
//                       msg.from === "Teacher" || msg.from === "Tutor" ? "teacher" : "student"
//                     }`}
//                   >
//                     <strong>{msg.from}:</strong> {msg.text}
//                     {msg.img && (
//                       <img
//                         src={msg.img}
//                         alt={`${msg.from} Avatar`}
//                         className="avatar-img ms-2"
//                         style={{ width: "30px", height: "30px", borderRadius: "50%" }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <div className="d-flex mt-3">
//                 <input
//                   type="text"
//                   className="form-control me-2"
//                   placeholder="Type here..."
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                 />
//                 <button onClick={sendMessage} className="btn btn-primary">
//                   Send
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chats;


// src/pages/Student/Chats.jsx
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  fetchChatSessions,
  fetchMessagesForSession,
  sendMessage,
} from "../../api/chatsAPI";
import "../../styles/chats.css";

const POLL_INTERVAL = 2000; // 2 seconds polling

const Chats = ({ role = "student", userId: propUserId = null }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const pollRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Get current user ID from prop or localStorage
  const [currentUserId, setCurrentUserId] = useState(propUserId);

  useEffect(() => {
    if (!currentUserId) {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (savedUser?.id) setCurrentUserId(savedUser.id);
      } catch (e) {
        console.error(e);
      }
    }
  }, [propUserId]);

  // Load chat sessions from backend
  useEffect(() => {
    let mounted = true;
    setLoadingSessions(true);

    fetchChatSessions()
      .then((data) => {
        if (!mounted) return;
        const allSessions = data || [];

        let filtered = allSessions;
        if (currentUserId) {
          filtered = allSessions.filter(
            (s) => s.student?.id === currentUserId || s.student === currentUserId
          );
        }

        if (filtered.length === 0 && allSessions.length > 0) {
          filtered = allSessions;
        }

        setSessions(filtered);
        if (filtered.length > 0) setSelectedSession(filtered[0]);
      })
      .catch((err) => {
        console.error("Failed to load student chat sessions:", err);
      })
      .finally(() => mounted && setLoadingSessions(false));

    return () => {
      mounted = false;
    };
  }, [role, currentUserId]);

  // Load messages for selected session & live 2s polling
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
        setMessages(data || []);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        if (mounted) setLoadingMessages(false);
      }
    };

    loadMessages();

    // Live Polling
    pollRef.current = setInterval(() => {
      fetchMessagesForSession(selectedSession.id)
        .then((data) => {
          if (!data) return;
          setMessages((prev) => {
            if (!Array.isArray(prev) || prev.length !== data.length) return data;
            const prevLast = prev[prev.length - 1];
            const newLast = data[data.length - 1];
            if (!prevLast || !newLast || prevLast.id !== newLast.id) return data;
            return prev;
          });
        })
        .catch((e) => console.error("Polling messages error:", e));
    }, POLL_INTERVAL);

    return () => {
      mounted = false;
      stopPolling();
    };
  }, [selectedSession]);

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to backend
  const handleSend = async () => {
    const text = input.trim();
    if (!text || !selectedSession) return;

    const optimistic = {
      id: `temp-${Date.now()}`,
      session: selectedSession.id,
      sender: { username: "You" },
      sender_type: "student",
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((m) => [...m, optimistic]);
    setInput("");
    scrollToBottom();

    try {
      setSending(true);
      const res = await sendMessage({ session: selectedSession.id, text });
      setMessages((prev) => {
        const withoutTemp = prev.filter(
          (it) => !(String(it.id).startsWith("temp-") && it.text === optimistic.text)
        );
        return [...withoutTemp, res];
      });
    } catch (err) {
      console.error("Send message failed:", err);
      alert("Message send failed");
      setMessages((prev) => prev.filter((it) => !String(it.id).startsWith("temp-")));
    } finally {
      setSending(false);
    }
  };

  const renderSessionRow = (s) => {
    const isSelected = selectedSession && selectedSession.id === s.id;
    const teacherName =
      s.teacher?.first_name
        ? `${s.teacher.first_name} ${s.teacher.last_name || ""}`.trim()
        : s.teacher?.username || s.teacher?.email || "Teacher";

    return (
      <tr
        key={s.id}
        onClick={() => setSelectedSession(s)}
        className={isSelected ? "table-active" : ""}
        style={{ cursor: "pointer" }}
      >
        <td>#{s.id}</td>
        <td>{teacherName}</td>
        <td>
          {s.created_at
            ? new Date(s.created_at).toLocaleDateString()
            : "Recent"}
        </td>
      </tr>
    );
  };

  return (
    <div className="d-flex">
      <Sidebar role={role} />
      <div className="flex-grow-1">
        <Header />
        <div className="container mt-4">
          <h2 className="mb-4">Student Chats</h2>

          <div className="row">
            {/* Left Column: Sessions Table */}
            <div className="col-md-4">
              <div className="card p-3">
                <h6>Chat Sessions</h6>
                {loadingSessions ? (
                  <p>Loading sessions...</p>
                ) : sessions.length === 0 ? (
                  <p>No active sessions found.</p>
                ) : (
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Teacher Name</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>{sessions.map(renderSessionRow)}</tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Right Column: Chat Box */}
            <div className="col-md-8">
              <div className="card p-3">
                {!selectedSession ? (
                  <p>Select a session from the left panel to view messages.</p>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <strong>{selectedSession.title || `Session #${selectedSession.id}`}</strong>
                        <div className="text-muted small">
                          Teacher: {selectedSession.teacher?.first_name || selectedSession.teacher?.username || selectedSession.teacher?.email || "Teacher"}
                        </div>
                      </div>
                      <div className="text-muted small">Session ID: {selectedSession.id}</div>
                    </div>

                    <div
                      className="chat-box"
                      style={{
                        minHeight: 300,
                        maxHeight: 500,
                        overflowY: "auto",
                        padding: "12px",
                        border: "1px solid #eee",
                        borderRadius: 6,
                      }}
                    >
                      {loadingMessages ? (
                        <p>Loading messages...</p>
                      ) : messages.length === 0 ? (
                        <p className="text-muted">No messages yet. Say hi 👋</p>
                      ) : (
                        messages.map((msg) => {
                          const mine =
                            msg.sender_type === "student" ||
                            msg.sender?.id === currentUserId ||
                            msg.sender?.username === "You";

                          return (
                            <div
                              key={msg.id}
                              className={`message ${mine ? "student" : "teacher"}`}
                              style={{ marginBottom: 10 }}
                            >
                              <div style={{ fontSize: 12, color: "#666" }}>
                                <strong>
                                  {mine
                                    ? "You"
                                    : msg.sender?.first_name ||
                                      msg.sender?.username ||
                                      "Teacher"}
                                </strong>
                                {" • "}
                                <span style={{ fontSize: 11 }}>
                                  {msg.timestamp
                                    ? new Date(msg.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })
                                    : ""}
                                </span>
                              </div>
                              <div
                                style={{
                                  padding: "8px 10px",
                                  background: mine ? "#ffe5d1" : "#d1e7ff",
                                  borderRadius: 8,
                                  display: "inline-block",
                                  marginTop: 4,
                                }}
                              >
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        disabled={sending}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handleSend}
                        disabled={sending || !input.trim()}
                      >
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