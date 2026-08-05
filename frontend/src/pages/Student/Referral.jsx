// import React, { useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import "../../styles/referral.css";
// import popupImage from "../../assets/Popup Design.png"; // check path correctly

// const Referral = () => {
//   const [showPopup, setShowPopup] = useState(true);

//   const referralLink = "www.exampleapp.com/invite/SHAREME";

//   const handleCopy = () => {
//     navigator.clipboard.writeText(referralLink);
//     alert("Referral link copied!");
//   };

//   const [referralData] = useState([
//     {
//       id: 'REF-101',
//       friendName: 'Rahul Sharma',
//       referralDate: '14-Aug-2025',
//       status: 'Joined',
//       rewardEarned: '🎁 500 Coins',
//       rewardStatus: 'Credited',
//     },
//     {
//       id: 'REF-102',
//       friendName: 'Neha Gupta',
//       referralDate: '14-Aug-2025',
//       status: 'Pending',
//       rewardEarned: '-',
//       rewardStatus: 'Pending',
//     },
//   ]);

//   return (
//     <div className="d-flex student-page">
//       <Sidebar />
//       <div className="flex-grow-1">
//         <Header />

//         {showPopup && (
//           <div className="popup-overlay">
//             <div className="popup-container">
//               <img src={popupImage} alt="Referral Popup" className="popup-image" />
//               <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
//               <button className="copy-btn" onClick={handleCopy}>Copy Link</button>
//             </div>
//           </div>
//         )}

//         <div className="container mt-4">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h4>Referral Data</h4>
//             <button className="btn btn-warning">Send Referral</button>
//           </div>

//           <table className="table table-striped table-bordered text-center align-middle">
//             <thead className="table-primary">
//               <tr>
//                 <th>Referral ID</th>
//                 <th>Friend's Name</th>
//                 <th>Referral Date</th>
//                 <th>Status</th>
//                 <th>Reward Earned</th>
//                 <th>Reward Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {referralData.map((ref) => (
//                 <tr key={ref.id}>
//                   <td>{ref.id}</td>
//                   <td>{ref.friendName}</td>
//                   <td>{ref.referralDate}</td>
//                   <td className={ref.status === 'Joined' ? 'status-joined' : 'status-pending'}>
//                     {ref.status}
//                   </td>
//                   <td>{ref.rewardEarned}</td>
//                   <td className={ref.rewardStatus === 'Credited' ? 'reward-credited' : 'reward-pending'}>
//                     {ref.rewardStatus}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Referral;



import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { fetchTutorReferrals as fetchReferrals } from "../../api/referralsAPI"; // Uses existing API function
import "../../styles/referral.css";
import popupImage from "../../assets/Popup Design.png";

const Referral = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [referralData, setReferralData] = useState([]);
  const [loading, setLoading] = useState(true);

  const referralLink = "www.exampleapp.com/invite/SHAREME";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  // 🔹 Fetch referrals from backend API
  useEffect(() => {
    const loadReferrals = async () => {
      setLoading(true);
      try {
        const data = await fetchReferrals();
        const list = Array.isArray(data) ? data : data.results || [];
        setReferralData(list);
      } catch (err) {
        console.error("Error loading referrals:", err);
        setReferralData([]);
      } finally {
        setLoading(false);
      }
    };

    loadReferrals();
  }, []);

  return (
    <div className="d-flex student-page">
      <Sidebar role="student" />

      <div className="flex-grow-1">
        <Header role="student" />

        {/* Popup Overlay */}
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Referral Data</h4>
            <button className="btn btn-warning" onClick={() => setShowPopup(true)}>
              Send Referral
            </button>
          </div>

          {loading ? (
            <p className="text-center py-4">Loading referrals...</p>
          ) : referralData.length === 0 ? (
            <p className="text-center text-muted py-4">No referrals found.</p>
          ) : (
            <table className="table table-striped table-bordered text-center align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Referral ID</th>
                  <th>Friend's Name</th>
                  <th>Referral Date</th>
                  <th>Status</th>
                  <th>Reward Earned</th>
                  <th>Reward Status</th>
                </tr>
              </thead>

              <tbody>
                {referralData.map((ref) => {
                  const isCredited = ref.reward_given || ref.rewardStatus === "Credited";
                  const isJoined = ref.reward_given || ref.status === "Joined";

                  return (
                    <tr key={ref.id}>
                      <td>#{ref.id}</td>
                      <td>{ref.refer_to_name || ref.friendName || ref.refer_to_email || "Friend"}</td>
                      <td>
                        {ref.created_at
                          ? new Date(ref.created_at).toLocaleDateString()
                          : ref.referralDate || "-"}
                      </td>
                      <td className={isJoined ? "status-joined" : "status-pending"}>
                        {isJoined ? "Joined" : "Pending"}
                      </td>
                      <td>
                        {ref.reward_earned || ref.rewardEarned || (isCredited ? "🎁 500 Coins" : "-")}
                      </td>
                      <td className={isCredited ? "reward-credited" : "reward-pending"}>
                        {isCredited ? "Credited" : "Pending"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
};

export default Referral;