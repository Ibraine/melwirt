// import React from "react";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import "../../styles/CoursesSection.css";

// // 🖼 Importing local images
// import creativeCoding from "../../assets/creative coding.png";
// import roboticsSteam from "../../assets/robotics steam.png";
// import designInnovation from "../../assets/design innovation.png";
// import background3 from "../../assets/background3.png"; // 👈 Background image import

// const CoursesSection = () => {
//   const courses = [
//     {
//       title: "Creative Coding Adventures Designed",
//       desc: "Explore the fun of programming through interactive and exciting coding projects.",
//       image: creativeCoding,
//     },
//     {
//       title: "Robotics and STEM Projects",
//       desc: "Build real robots and learn STEM concepts hands-on with modern tools.",
//       image: roboticsSteam,
//     },
//     {
//       title: "Design and Innovation Lab for Curious Minds",
//       desc: "Ignite creativity through design thinking, problem-solving, and digital tools.",
//       image: designInnovation,
//     },
//   ];

//   return (
//     <section
//       className="courses-section py-5"
//       id="courses"
//       style={{
//         backgroundImage: `url(${background3})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         position: "relative",
//       }}
//     >
//       {/* 🔹 Blue overlay like Figma */}
//       <div className="overlay"></div>

//       <Container>
//         <div className="text-center mb-5">
//           <small className="text-white-50 text-uppercase">Our Courses</small>
//           <h2 className="fw-bold text-white mt-2">
//             Shaping Young Minds for <br />
//             <span className="highlight-orange">a Brighter Future</span>
//           </h2>
//         </div>

//         <Row className="g-4 justify-content-center">
//           {courses.map((course, idx) => (
//             <Col key={idx} xs={12} md={6} lg={4}>
//               <Card className="course-card h-100 text-white">
//                 <Card.Img variant="top" src={course.image} alt={course.title} />
//                 <Card.Body>
//                   <Card.Title className="fw-bold">{course.title}</Card.Title>
//                   <Card.Text>{course.desc}</Card.Text>
//                   <a href="#" className="read-more">
//                     Read More
//                   </a>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default CoursesSection;


// import React from "react";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import "../../styles/CoursesSection.css";

// // 🖼 Importing local images
// import python from "../../assets/python.png";
// import robotics from "../../assets/robotics.png";
// import publicspeaking1 from "../../assets/publicspeaking1.png";
// import background3 from "../../assets/background3.png";

// const CoursesSection = ({ premiumUX = false }) => {
//   const navigate = useNavigate(); // For premium clickable card
//   const courses = [
//     {
//       title: "Python Programming & AI Mastery Curriculum",
//       desc: "Python Basics AI & Machine Learning.",
//       image: python,
//       link: "/courses/python",
//     },
//     {
//       title: "Complete Robotics,Iot & AI Vision Learning Program",
//       desc: "Robotics.AI.Automation.",
//       image: robotics,
//       link: "/courses/robotics",
//     },
//     {
//       title: " The Art of Public Speaking",
//       desc: "Confidence.Communication.Leadership.",
//       image: publicspeaking1,
//       link: "/courses/public-speaking",
//     },
//   ];

//   return (
//     <section
//       className="courses-section py-5"
//       id="courses"
//       style={{
//         backgroundImage: `url(${background3})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         position: "relative",
//       }}
//     >
//       <div className="overlay"></div>

//       <Container>
//         <div className="text-center mb-5">
//           <small className="text-white-50 text-uppercase">Our Courses</small>
//           <h2 className="fw-bold text-white mt-2">
//             Shaping Young Minds for <br />
//             <span className="highlight-orange">a Brighter Future</span>
//           </h2>
//         </div>

//         <Row className="g-4 justify-content-center">
//           {courses.map((course, idx) => (
//             <Col key={idx} xs={12} md={6} lg={4}>
//               <Card
//                 className="course-card h-100 text-white"
//                 style={{ cursor: premiumUX ? "pointer" : "default" }}
//                 onClick={
//                   premiumUX
//                     ? () => navigate(course.link)
//                     : undefined
//                 }
//               >
//                 <Card.Img variant="top" src={course.image} alt={course.title} />
//                 <Card.Body>
//                   <Card.Title className="fw-bold">{course.title}</Card.Title>
//                   <Card.Text>{course.desc}</Card.Text>

//                   {/* Read More link */}
//                   <Link
//                     to={course.link}
//                     className="read-more"
//                     onClick={(e) => premiumUX && e.stopPropagation()}
//                   >
//                     Read More
//                   </Link>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default CoursesSection;



// import React, { useState } from "react";
// import PythonCourses from "../pages/PythonCourses";
// import RoboticCourses from "../pages/RoboticCourses";
// import PublicSpeakingCourses from "../pages/PublicSpeakingCourses";

// const CoursesSection = () => {

//   const [activeTab, setActiveTab] = useState("python");

//   return (
//     <section className="courses-section py-5">

//       {/* TOP BUTTONS */}
//       <div className="text-center mb-5">
//         <button onClick={() => setActiveTab("python")} className="tab-btn">
//           Python
//         </button>

//         <button onClick={() => setActiveTab("robotics")} className="tab-btn">
//           Robotics
//         </button>

//         <button onClick={() => setActiveTab("speaking")} className="tab-btn">
//           Public Speaking
//         </button>
//       </div>

//       {/* CONDITIONAL RENDERING */}
//       {activeTab === "python" && <PythonCourses />}
//       {activeTab === "robotics" && <RoboticCourses />}
//       {activeTab === "speaking" && <PublicSpeakingCourses />}

//     </section>
//   );
// };

// export default CoursesSection;


// import React, { useState } from "react";
// import PythonCourses from "../../pages/PythonCourses";
// import RoboticCourses from "../../pages/RoboticCourses";
// import PublicSpeakingCourses from "../../pages/PublicSpeakingCourses";

// const CoursesSection = () => {

//   const [activeTab, setActiveTab] = useState("python");

//   return (
//     <section className="courses-section py-5">

//       <div className="text-center mb-5">

//         <button
//           onClick={() => setActiveTab("python")}
//           className={`tab-btn ${activeTab === "python" ? "active" : ""}`}
//         >
//           Python
//         </button>

//         <button
//           onClick={() => setActiveTab("robotics")}
//           className={`tab-btn ${activeTab === "robotics" ? "active" : ""}`}
//         >
//           Robotics
//         </button>

//         <button
//           onClick={() => setActiveTab("speaking")}
//           className={`tab-btn ${activeTab === "speaking" ? "active" : ""}`}
//         >
//           Public Speaking
//         </button>

//       </div>

//       {activeTab === "python" && <PythonCourses />}
//       {activeTab === "robotics" && <RoboticCourses />}
//       {activeTab === "speaking" && <PublicSpeakingCourses />}

//     </section>
//   );
// };

// export default CoursesSection;



// import React, { useState } from "react";
// import PythonCourses from "../../pages/PythonCourses";
// import RoboticCourses from "../../pages/RoboticCourses";
// import PublicSpeakingCourses from "../../pages/PublicSpeakingCourses";
// import background3 from "../../assets/background3.png";

// const CoursesSection = () => {

//   const [activeTab, setActiveTab] = useState("python");

//   return (
//     <section
//       className="courses-section py-5"
//       style={{
//         backgroundImage: `url(${background3})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >

//       <div className="text-center mb-5">

//         <small className="text-white-50 text-uppercase">Our Courses</small>

//         <h2 className="fw-bold text-white mt-2">
//           Shaping Young Minds for <br />
//           <span className="highlight-orange">a Brighter Future</span>
//         </h2>

//         <div className="tabs-container mt-4">

//           <button
//             onClick={() => setActiveTab("python")}
//             className={`tab-btn ${activeTab === "python" ? "active" : ""}`}
//           >
//             Python
//           </button>

//           <button
//             onClick={() => setActiveTab("robotics")}
//             className={`tab-btn ${activeTab === "robotics" ? "active" : ""}`}
//           >
//             Robotics
//           </button>

//           <button
//             onClick={() => setActiveTab("speaking")}
//             className={`tab-btn ${activeTab === "speaking" ? "active" : ""}`}
//           >
//             Public Speaking
//           </button>

//         </div>

//       </div>

//       {activeTab === "python" && <PythonCourses />}
//       {activeTab === "robotics" && <RoboticCourses />}
//       {activeTab === "speaking" && <PublicSpeakingCourses />}

//     </section>
//   );
// };

// export default CoursesSection;




import React, { useEffect, useRef, useState } from "react";
import PythonCourses from "../../pages/PythonCourses";
import RoboticCourses from "../../pages/RoboticCourses";
import PublicSpeakingCourses from "../../pages/PublicSpeakingCourses";
import "../../styles/coursessection.css";

const CoursesSection = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("robotics");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentSection);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentSection);

    return () => observer.unobserve(currentSection);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="courses"
      className={`courses-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="courses-header">
        <p className="courses-subtitle">Our Courses</p>
        <h2>
          Shaping Young Minds for <br />
          <span className="highlight-orange">a Brighter Future</span>
        </h2>

        <div className="tabs-container">
          <button
            onClick={() => setActiveTab("robotics")}
            className={`tab-btn ${activeTab === "robotics" ? "active" : ""}`}
            aria-pressed={activeTab === "robotics"}
            type="button"
          >
            Robotics
          </button>

          <button
            onClick={() => setActiveTab("python")}
            className={`tab-btn ${activeTab === "python" ? "active" : ""}`}
            aria-pressed={activeTab === "python"}
            type="button"
          >
            Python
          </button>

          <button
            onClick={() => setActiveTab("speaking")}
            className={`tab-btn ${activeTab === "speaking" ? "active" : ""}`}
            aria-pressed={activeTab === "speaking"}
            type="button"
          >
            Public Speaking
          </button>
        </div>
      </div>

      <div className="courses-content" key={activeTab}>
        {activeTab === "python" && <PythonCourses />}
        {activeTab === "robotics" && <RoboticCourses />}
        {activeTab === "speaking" && <PublicSpeakingCourses />}
      </div>
    </section>
  );
};

export default CoursesSection;