import React, { useState } from "react";
import { forgotPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setMsg("OTP sent to your email");
    setTimeout(() => {
      navigate("/verify-otp", { state: { email } });
    }, 800);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

        {msg && <p className="text-green-600 text-center">{msg}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
