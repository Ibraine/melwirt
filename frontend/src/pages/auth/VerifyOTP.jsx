import React, { useState } from "react";
import { verifyOTP } from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await verifyOTP(state.email, otp);
    navigate("/reset-password", {
      state: { reset_token: res.reset_token },
    });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>

        <input
          placeholder="Enter OTP"
          className="w-full border p-2 rounded mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button className="w-full bg-purple-600 text-white p-2 rounded">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
