import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Gift } from "lucide-react";
import "../styles/step1phone.css";
import BookDemoImg from "../assets/bookdemo.png";

const Step1Phone = ({ nextStep, handleChange }) => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("IN"); // ✅ default

  const handleNext = () => {
    if (!phone || phone.length < 6) {
      alert("Please enter a valid phone number");
      return;
    }
    handleChange("phone", "+" + phone);   // ✅ always save with +
    handleChange("country", country);     // ✅ Save uppercase country
    nextStep();
  };

  return (
    <div className="container-fluid d-flex justify-content-center step1phone-page">
        <div className="demo-card animated-card">
          <div className="headline">
            <span className="headline-icon"><Gift size={18} strokeWidth={2.2} /></span>
            Enter Your Mobile Number & Get Your Free Trial Link
          </div>
          <div className="row g-0 demo-row">
            <div className="col-md-6 left-img-wrap">
              <div className="left-img">
                <img src={BookDemoImg} alt="Book Demo" />
              </div>
            </div>
            <div className="col-md-6 form-side d-flex flex-column justify-content-center p-4">
              <div className="form-copy">
                <h5 className="fw-bold">Enter Your Phone Number</h5>
                <p>We'll send the free trial link to your number.</p>
              </div>

              <PhoneInput
                country={country.toLowerCase()}
                value={phone}
                onChange={(value, data) => {
                  setPhone(value);
                  setCountry(data.countryCode.toUpperCase()); // ✅ Guarantee uppercase
                }}
                enableSearch={true}
                inputProps={{ name: "phone", required: true }}
                inputClass="form-control"
                containerClass="phone-input-container"
              />

              <button onClick={handleNext} className="btn btn-primary w-100 trial-btn">
                Get Trial Link
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Step1Phone;
