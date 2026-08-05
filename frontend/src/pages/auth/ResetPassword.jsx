import React, { useState } from "react";
import { resetPassword } from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await resetPassword(state.reset_token, password);
    alert("Password reset successful");
    navigate("/login");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
