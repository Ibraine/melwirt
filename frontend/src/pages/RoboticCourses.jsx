// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import courses from "../data/courseData";

// import Header from "../components/LandingPage/LandingHeader";
// import Footer from "../components/LandingPage/Footer";

// const RoboticsCourses = () => {

//   // ✅ FIX: exact same header as data.js
//   const roboticsMain = courses.find(
//     (course) => course.header === "Robotics Programming"
//   );

//   const roboticsCourses = roboticsMain?.subcources || [];

//   return (
//     <>
//       <Header />

//       <Container className="py-5">

//         <div className="text-center mb-5">
//           <h1 className="fw-bold">Robotics Courses</h1>
//           <p className="text-muted">
//             Choose the right Robotics program
//           </p>
//         </div>

//         <Row className="g-4 justify-content-center">

//           {roboticsCourses.map((course) => (

//             <Col md={6} lg={5} key={course.id}>

//               <Card className="h-100 shadow-sm">

//                 <Card.Body>

//                   <h4 className="fw-bold">
//                     {course.title}
//                   </h4>

//                   <p className="text-muted">
//                     {course.description}
//                   </p>

//                   <Link to={`/courses/robotics/${course.id}`}>

//                     <Button variant="primary">
//                       View Details
//                     </Button>

//                   </Link>

//                 </Card.Body>

//               </Card>

//             </Col>

//           ))}

//         </Row>

//       </Container>

//       <Footer />
//     </>
//   );
// };

// export default RoboticsCourses;


// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import courses from "../data/courseData";

// // import Header from "../components/LandingPage/LandingHeader";
// // import Footer from "../components/LandingPage/Footer";

// const RoboticsCourses = () => {

//   const roboticsMain = courses.find(
//     (course) => course.header === "Robotics Programming"
//   );

//   const roboticsCourses = roboticsMain?.subcources || [];

//   return (
//     <>
//       <Header />

//       <Container className="py-5">

//         <div className="text-center mb-5">
//           <h1 className="fw-bold">Robotics Courses</h1>
//           <p className="text-muted">Choose the right Robotics program</p>
//         </div>

//         <Row className="g-4 justify-content-center">

//           {roboticsCourses.map((course) => (
//             <Col md={6} lg={5} key={course.id}>
//               <Card className="course-card border-0 h-100 shadow-sm">

//                 {/* IMAGE */}
//                 <div className="course-img-wrapper">
//                   <Card.Img src={course.image} alt={course.title} />
//                 </div>

//                 {/* CONTENT */}
//                 <Card.Body>
//                   <h4 className="fw-bold">{course.title}</h4>
//                   <p className="text-muted">{course.description}</p>
//                   <Link to={`/courses/robotics/${course.id}`}>
//                     <Button className="course-btn">View Details →</Button>
//                   </Link>
//                 </Card.Body>

//               </Card>
//             </Col>
//           ))}

//         </Row>

//       </Container>

//       <Footer />
//     </>
//   );
// };

// export default RoboticsCourses;


// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import courses from "../data/courseData";

// const RoboticsCourses = () => {

//   const roboticsMain = courses.find(
//     (course) => course.header === "Robotics Programming"
//   );

//   const roboticsCourses = roboticsMain?.subcources || [];

//   return (
//     <Container className="pb-5">
//       <Row className="g-4 justify-content-center">

//         {roboticsCourses.map((course) => (
//           <Col md={6} lg={4} key={course.id}>

//             <Card className="course-card h-100">
//               <Card.Img
//                 variant="top"
//                 src={course.image}
//                 alt={course.title}
//               />

//               <Card.Body>

//                 <h5 className="fw-bold mb-3">
//                   {course.title}
//                 </h5>

//                 <p className="card-text">
//                   {course.description}
//                 </p>

//                 <Link to={`/courses/robotics/${course.id}`}>
//                   <span className="read-more"> Read More →</span>
//                 </Link>

//               </Card.Body>

//             </Card>

//           </Col>
//         ))}

//       </Row>
//     </Container>
//   );
// };

// export default RoboticsCourses;





// new one with swipper 
import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import courses from "../data/courseData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const RoboticsCourses = () => {

  const roboticsMain = courses.find(
    (course) => course.header === "Robotics Programming"
  );

  const roboticsCourses = roboticsMain?.subcources || [];

  return (
    <Container className="pb-5">

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay:2500,
          disableOnInteraction:false
        }}
        modules={[Autoplay]}
        breakpoints={{
          320:{slidesPerView:1},
          768:{slidesPerView:2},
          1024:{slidesPerView:3}
        }}
      >

        {roboticsCourses.map((course) => (

          <SwiperSlide key={course.id}>

            <Card className="course-card h-100">

              <Card.Img
                variant="top"
                src={course.image}
                alt={course.title}
              />

              <Card.Body>

                <h5 className="fw-bold mb-3">
                  {course.title}
                </h5>

                <p className="card-text">
                  {course.description}
                </p>

                <Link to={`/courses/robotics/${course.id}`} className="read-more">Read More →
                </Link>

              </Card.Body>

            </Card>

          </SwiperSlide>

        ))}

      </Swiper>

    </Container>
  );
};

export default RoboticsCourses;

