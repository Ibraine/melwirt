// src/components/WelcomeBox.jsx

import adminWelcome from "../assets/welcome.png";
import studentWelcome from "../assets/student welcome.png";
import tutorWelcome from "../assets/tutor welcome.png";

const WelcomeBox = ({ role }) => {
  let title = "Keep your data updated for accurate insights.👋";
  let message = "Reports & Analytics-View detailed performance and activity reports.";
  let image = adminWelcome;

  if (role === "student") {
    title = "Keep Going, Future Leader! 💡";
    message =
      "You’ve unlocked new skills and achievements. With Melwirt, learning is your superpower—keep shining bright!";
    image = studentWelcome;
  } else if (role === "tutor") {
    title = "Welcome Back, Mentor! 🎓";
    message =
      "You’ve been empowering young innovators with your guidance. Keep inspiring, teaching, and shaping the future—Melwirt is proud to have you on this journey!";
    image = tutorWelcome;
  }

  return (
    <div className="welcome-box d-flex justify-content-between align-items-center">
      <div>
        <h5>{title}</h5>
        <p>{message}</p>
      </div>
      <img src={image} alt="Welcome" className="welcome-img" />
    </div>
  );
};

export default WelcomeBox;
