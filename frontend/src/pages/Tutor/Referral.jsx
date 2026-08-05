import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { fetchTutorReferrals as fetchReferrals } from "../../api/referralsAPI";
import "../../styles/referral.css";
import popupImage from "../../assets/Popup Design.png";

const TutorReferral = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [referralData, setReferralData] = useState([]);
  const [loading, setLoading] = useState(false);

  const referralLink = "www.exampleapp.com/invite/SHAREME";

  // Copy referral link
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  // Load tutor referrals from backend
  const loadReferrals = async () => {
    setLoading(true);
    try {
      const data = await fetchReferrals();
      setReferralData(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Referral fetch error:", err);
      setReferralData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReferrals();
  }, []);

  return (
    <div className="d-flex tutor-page">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />

        {/* Referral popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-container">
              <img src={popupImage} alt="Referral Popup" className="popup-image" />
              <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
              <button className="copy-btn" onClick={handleCopy}>Copy Link</button>
            </div>
          </div>
        )}

        <div className="container mt-4">
          <h4>Your Referrals</h4>

          {loading ? (
            <h5 className="text-center p-4">Loading...</h5>
          ) : referralData.length > 0 ? (
            <table className="table table-striped table-bordered text-center align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Referral ID</th>
                  <th>Friend Name</th>
                  <th>Friend Email</th>
                  <th>Reward Earned</th>
                  <th>Reward Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {referralData.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.refer_to_name}</td>
                    <td>{r.refer_to_email || "-"}</td>
                    <td>{r.reward_earned || "-"}</td>
                    <td className={r.reward_given ? "tutor-reward-credited" : "tutor-reward-pending"}>
                      {r.reward_given ? "Credited" : "Pending"}
                    </td>
                    <td>{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className="text-center p-4">No referrals found</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorReferral;
