import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/successpage.css";
import LandingHeader from "../components/LandingPage/LandingHeader";

import tickIcon from "../assets/tick.png";
import phoneMockup from "../assets/success.png";
import logo from "../assets/logo.png";
import appStore from "../assets/appStore.png";
import playStore from "../assets/playStore.png";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};
  const apiData = state.apiData || {};
  const formData = state.formData || {};

  const studentTimeStr = apiData.student_time || formData.student_time || apiData.time || formData.time || null;
  const studentTZ = apiData.student_timezone || formData.student_timezone || (formData.timezone || "UTC");
  const dateStr = apiData.date || formData.date || null;

  const handleBackHome = () => navigate("/");

  return (
    <>
      <LandingHeader />
      <div className="success-wrapper">
        <div className="success-card">
          <div className="success-left">
            <img src={phoneMockup} alt="Success Phone" className="phone-img" />
          </div>

          <div className="success-right text-center">
            <img src={logo} alt="Melwirt Logo" className="success-logo" />
            <img src={tickIcon} alt="Success Tick" className="tick-icon" />

            <h2 className="success-heading">Demo Class Booked Successfully</h2>

            {studentTimeStr ? (
              <>
                <p className="success-time"><strong>Date:</strong> {dateStr}</p>
                <p className="success-time"><strong>Time:</strong> {studentTimeStr} ({studentTZ})</p>
              </>
            ) : (
              <p className="success-time">Booking time will be updated soon</p>
            )}

            {apiData.meet_link ? (
              <div className="meet-box">
                <p className="meet-text">Your Google Meet Link</p>
                <a href={apiData.meet_link} target="_blank" rel="noopener noreferrer" className="meet-link">Join Demo Class</a>
              </div>
            ) : (
              <p className="meet-text">Google Meet link will be sent shortly</p>
            )}

            <p className="download-text">For Further Process You Can Download The App</p>

            <div className="app-buttons">
              <a href="#"><img src={appStore} alt="App Store" className="store-btn" /></a>
              <a href="#"><img src={playStore} alt="Play Store" className="store-btn" /></a>
            </div>

            <button onClick={handleBackHome} className="back-home-btn">Back to Home</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;

