import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/myclasses.css";

import {
  fetchRescheduleSlots,
  rescheduleClass,
} from "../../api/scheduleAPI";

const RescheduleClass = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // FETCH AVAILABLE SLOTS
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const data = await fetchRescheduleSlots(scheduleId);
      setSlots(data || []);
    } catch (err) {
      console.error("Slots error:", err);
    } finally {
      setLoading(false);
    }
  };

  // CONFIRM RESCHEDULE
  const handleConfirm = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot first.");
      return;
    }

    try {
      setSubmitting(true);
      await rescheduleClass(scheduleId, selectedSlot);
      alert("✅ Class Rescheduled Successfully!");
      navigate("/student/my-classes");
    } catch (err) {
      console.error(err);
      alert("Reschedule failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />

      <div className="main-content">
        <Header role="student" />

        <div className="my-classes-container py-4" style={{ maxWidth: "800px" }}>
          
          {/* Back Link & Header */}
          <button
            type="button"
            className="btn-back-link mb-3"
            onClick={() => navigate("/student/my-classes")}
          >
            ← Back to My Classes
          </button>

          <div className="mb-4">
            <h3 className="fw-bold m-0 page-title">Select New Slot</h3>
            <p className="page-sub">Choose an available time slot to reschedule your class session</p>
          </div>

          {/* Slots List */}
          {loading ? (
            <div className="loading-state-card">
              <p>Loading available slots...</p>
            </div>
          ) : slots.length === 0 ? (
            <div className="empty-state-card">
              <p>No available slots found for rescheduling.</p>
            </div>
          ) : (
            <div className="slots-grid-list">
              {slots.map((slot) => {
                const isSelected = selectedSlot === slot.id;

                return (
                  <div
                    key={slot.id}
                    className={`slot-selection-card ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedSlot(slot.id)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      {/* Custom Radio Dot */}
                      <div className={`radio-circle ${isSelected ? "active" : ""}`}>
                        {isSelected && <span className="inner-dot" />}
                      </div>

                      <div className="slot-details">
                        <span className="slot-date-pill">
                          📅 Date: <strong>{slot.date}</strong>
                        </span>
                        <span className="slot-time-pill">
                          🕒 Time: <strong>{slot.start_time} {slot.end_time ? `– ${slot.end_time}` : ""}</strong>
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="selected-badge">Selected</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Confirm Button */}
          {slots.length > 0 && (
            <div className="d-flex justify-content-end mt-4 pt-3 border-top">
              <button
                type="button"
                className="btn-confirm-reschedule"
                disabled={!selectedSlot || submitting}
                onClick={handleConfirm}
              >
                {submitting ? "Rescheduling..." : "Confirm Reschedule →"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RescheduleClass;