// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import courses from "../data/courseData";

// // Header & Footer
// import Header from "../components/LandingPage/LandingHeader";
// import Footer from "../components/LandingPage/Footer";

// const PythonCourses = () => {

//   // find python main course
//   const pythonMain = courses.find(
//     (course) => course.header === "Python Programming"
//   );

//   // get subcourses
//   const pythonCourses = pythonMain?.subcources || [];

//   return (
//     <>
//       <Header />

//       <Container className="py-5">

//         <div className="text-center mb-5">
//           <h1 className="fw-bold">Python Courses</h1>
//           <p className="text-muted">
//             Choose the right Python program
//           </p>
//         </div>

//         <Row className="g-4 justify-content-center">

//           {pythonCourses.map((course, index) => (

//             <Col md={6} lg={5} key={course.id}>

//               <Card className="h-100 shadow-sm">

//                 <Card.Body>

//                   <h4 className="fw-bold">
//                     {course.title}
//                   </h4>

//                   <p className="text-muted">
//                     {course.description}
//                   </p>

//                   <Link to={`/courses/python/${course.id}`}>

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

// export default PythonCourses;


// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import courses from "../data/courseData";

// // import Header from "../components/LandingPage/LandingHeader";
// // import Footer from "../components/LandingPage/Footer";
// // import "../styles/pythoncourses.css";

// const PythonCourses = () => {

//   const pythonMain = courses.find(
//     (course) => course.header === "Python Programming"
//   );

//   const pythonCourses = pythonMain?.subcources || [];

//   return (
//     <>
//       <Header />

//       <Container className="py-5">

//         {/* PAGE TITLE */}
//         <div className="text-center mb-5">
//           <h1 className="fw-bold display-5">
//             Python Courses
//           </h1>
//           <p className="text-muted">
//             Choose the right Python learning path
//           </p>
//         </div>

//         <Row className="g-4 justify-content-center">

//           {pythonCourses.map((course) => (

//             <Col md={6} lg={5} key={course.id}>

//               <Card className="course-card border-0">

//                 {/* IMAGE */}
//                 <div className="course-img-wrapper">
//                   <Card.Img
//                     src={course.image}
//                     alt={course.title}
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <Card.Body>

//                   <h4 className="fw-bold mb-3">
//                     {course.title}
//                   </h4>

//                   <p className="text-muted">
//                     {course.description}
//                   </p>

//                   <Link to={`/courses/python/${course.id}`}>
//                     <Button className="course-btn">
//                       View Details →
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

// export default PythonCourses;




import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import courses from "../data/courseData";
import "../styles/coursessection.css";



const PythonCourses = () => {

  const pythonMain = courses.find(
    (course) => course.header === "Python Programming"
  );

  const pythonCourses = pythonMain?.subcources || [];

  return (
    <Container className="pb-5">
      <Row className="g-4 justify-content-center">

        {pythonCourses.map((course) => (
          <Col md={6} lg={4} key={course.id}>

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

                <Link to={`/courses/python/${course.id}`} className="read-more">Read More →
           </Link>

              </Card.Body>

            </Card>

          </Col>
        ))}

      </Row>
    </Container>
  );
};

export default PythonCourses;