import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles/step1phone.css";
import LandingHeader from "../components/LandingPage/LandingHeader";
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
    <>
      <LandingHeader />
      <div className="container-fluid d-flex justify-content-center">
        <div className="demo-card shadow animated-card">
          <div className="headline">
            🎁 Enter Your Mobile Number & Get Your Free Trial Link 🎁
          </div>
          <div className="row g-0">
            <div className="col-md-6 left-img">
              <img src={BookDemoImg} alt="Book Demo" />
            </div>
            <div className="col-md-6 form-side d-flex flex-column justify-content-center p-4">
              <div className="text-center mb-4">
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
                containerClass="phone-input-container mb-3"
              />

              <button onClick={handleNext} className="btn btn-primary w-100 mt-2">
                Get Trial Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1Phone;
