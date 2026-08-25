import React, { useEffect } from "react";
import "../../styles/footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import appStoreImg from "../../assets/appStore.png";
import playStoreImg from "../../assets/playStore.png";
import footerLogo from "../../assets/footerlogo.png";

// 🆕 Icons for Office Info
import mapIcon from "../../assets/map.png";
import callIcon from "../../assets/call.png";
import phoneIcon from "../../assets/phone.png";
import mailIcon from "../../assets/mail.png";

const Footer = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".footer-animate");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-section footer-animate">
            <img src={footerLogo} alt="Melwirt Logo" className="footer-logo" />
            <p>
              "Unlocking the superpowers of young minds! MelWirt is an experiential learning platform where kids build real robots, code smart AI, and master public speaking—turning today’s learners into tomorrow’s visionaries."
            </p>
            <div className="social-icons" aria-label="Social media links">
              <span className="social-icon"><FaFacebookF /></span>
              <span className="social-icon"><FaInstagram /></span>
              <span className="social-icon"><FaLinkedinIn /></span>
              <span className="social-icon"><FaTwitter /></span>
            </div>
          </div>

          <div className="footer-links footer-animate">
            <h4>Quick Link</h4>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Courses</li>
              <li>Why Choose us</li>
            </ul>
          </div>

          <div className="footer-links footer-animate">
            <h4>Our Courses</h4>
            <ul>
              <li>Python</li>
              <li>Robotics and AI</li>
              <li>Public Speaking</li>
            </ul>
          </div>

          <div className="footer-contact footer-animate">
            <h4>Office Information</h4>
            <ul>
              <li>
                <img src={mapIcon} alt="Location" className="footer-icon" />
                <span>Delhi, Noida Sector 18, 201301</span>
              </li>
              <li>
                <img src={callIcon} alt="Call" className="footer-icon" />
                <div>
                  <span>Admission Queries</span>
                  <br />
                  <span className="footer-detail">+91 7521978866</span>
                </div>
              </li>
              <li>
                <img src={phoneIcon} alt="Phone" className="footer-icon" />
                <div>
                  <span>Operational Queries</span>
                  <br />
                  <span className="footer-detail">+91 8595578657</span>
                </div>
              </li>
              <li>
                <img src={mailIcon} alt="Mail" className="footer-icon" />
                <span>contactus@melwirt.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom footer-animate">
          <div className="store-buttons">
            <img src={appStoreImg} alt="App Store" />
            <img src={playStoreImg} alt="Google Play" />
          </div>
          <p>&copy; {new Date().getFullYear()} Melwirt. All Rights Reserved.</p>
        </div>
      </div>

      <div className="footer-bg-text">Melwirt</div>
    </footer>
  );
};

export default Footer;
