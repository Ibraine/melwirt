import React from "react";
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
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-section">
            <img src={footerLogo}  alt="Melwirt Logo"  className="footer-logo"/>
            <p>
              "Unlocking the superpowers of young minds! MelWirt is an experiential learning platform where kids build real robots, code smart AI, and master public speaking—turning today’s learners into tomorrow’s visionaries."
            </p>
            <div className="social-icons">
              <FaFacebookF />
              <FaInstagram />
              <FaLinkedinIn />
              <FaTwitter />
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Link</h4>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Courses</li>
              <li>Why Choose us</li>
              {/* <li>Book A Demo</li> */}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Our Courses</h4>
            <ul>
              <li>Python</li>
              <li>Robotics and AI</li>
              <li>Public Speaking</li>
              {/* <li>Design and Innovation Lab for Curious</li> */}
            </ul>
          </div>

          {/* ✅ Office Info with icons */}
          <div className="footer-contact">
            <h4>Office Information</h4>
            <ul>
              <li>
                <img src={mapIcon} alt="Location" className="footer-icon" />
                Delhi, Noida Sector 18, 201301
              </li>
              {/* <li>
                <img src={callIcon} alt="Call" className="footer-icon" />
                Admission Queries: +91 7521978866
              </li>
              <li>
                <img src={phoneIcon} alt="Phone" className="footer-icon" />
                Operational Queries: +91 8595578657
              </li> */}
              <li>
  <img src={callIcon} alt="Call" className="footer-icon" />
  <div>
    Admission Queries <br />
    <span>+91 7521978866</span>
  </div>
</li>

<li>
  <img src={phoneIcon} alt="Phone" className="footer-icon" />
  <div>
    Operational Queries <br />
    <span>+91 8595578657</span>
  </div>
</li>
              <li>
                <img src={mailIcon} alt="Mail" className="footer-icon" />
                contactus@melwirt.com
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="store-buttons">
            <img src={appStoreImg} alt="App Store" />
            <img src={playStoreImg} alt="Google Play" />
          </div>
          <p>&copy; {new Date().getFullYear()} Melwirt. All Rights Reserved.</p>
        </div>
      </div>

      {/* Big background text */}
      <div className="footer-bg-text">Melwirt</div>
    </footer>
  );
};

export default Footer;
