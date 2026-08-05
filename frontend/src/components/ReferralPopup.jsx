// components/ReferralPopup.jsx
import React from "react";
import "./referral.css";

const ReferralPopup = ({ link, onClose }) => {
  return (
    <div className="referral-popup-overlay" onClick={onClose}>
      <div className="referral-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>×</button>
        <h2>Refer & Earn Rewards</h2>
        <p>Invite friends and earn instant rewards on every referral.</p>
        <div className="refer-link-box">
          <input type="text" value={link} readOnly />
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              alert("Referral link copied!");
            }}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralPopup;
