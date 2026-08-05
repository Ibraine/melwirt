// import React, { useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Accordion, Card } from "react-bootstrap";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// import courses from "../data/courseData";
// import Header from "../components/LandingPage/LandingHeader";
// import Footer from "../components/LandingPage/Footer";
// import "../styles/coursedetail.css";

// const CourseDetail = () => {
//   const { category, courseId } = useParams();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [courseId]);

//   let mainCourse = null;

//   if (category === "python")
//     mainCourse = courses.find((c) => c.header === "Python Programming");

//   if (category === "robotics")
//     mainCourse = courses.find((c) => c.header === "Robotics Programming");

//   if (category === "speaking")
//     mainCourse = courses.find((c) => c.header === "Speaking");

//   const subCourse = mainCourse?.subcources?.find(
//     (c) => c.id === Number(courseId)
//   );

//   if (!subCourse) return null;

//   return (
//     <>
//       <Header />

//       {/* HERO */}
//       <div className="premium-hero">
//         <Container>
//           <Row className="align-items-start">
//             <Col lg={8}>
//               <h1>{subCourse.title}</h1>
//               <p className="hero-sub">{subCourse.description}</p>
//             </Col>

//             {/* Empty column for right alignment */}
//             <Col lg={4}></Col>
//           </Row>
//         </Container>
//       </div>

//       {/* CONTENT */}
//       <div className="course-detail">
//         <Container className="py-5">
//           <Row>

//             {/* LEFT CONTENT */}
//             <Col lg={8}>
//               {subCourse.about && (
//                 <Card className="premium-card mb-4">
//                   <Card.Body>
//                     <h4>About Course</h4>
//                     <p>{subCourse.about}</p>
//                   </Card.Body>
//                 </Card>
//               )}

//               {subCourse.milestone && (
//                 <Card className="premium-card mb-4">
//                   <Card.Body>
//                     <h4>Milestone Achieved</h4>
//                     <p>{subCourse.milestone}</p>
//                   </Card.Body>
//                 </Card>
//               )}

//               <h4 className="mb-4">Course Curriculum</h4>

//               <Accordion>
//                 {subCourse.modules?.map((module, index) => (
//                   <Accordion.Item
//                     eventKey={index.toString()}
//                     key={index}
//                     className="mb-3 premium-accordion"
//                   >
//                     <Accordion.Header>
//                       {module.module_name} ({module.duration} hrs)
//                     </Accordion.Header>

//                     <Accordion.Body>
//                       {module.sessions?.map((session, i) => (
//                         <div key={i} className="session-block">
//                           <strong>{session.title}</strong>
//                           <ul>
//                             {session.topics?.map((topic, j) => (
//                               <li key={j}>{topic}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 ))}
//               </Accordion>
//             </Col>

//             {/* RIGHT SIDEBAR */}
//             <Col lg={4}>
//               <div className="sticky-sidebar">
//                 <Card className="course-info-card">
//                   <img src={subCourse.image} alt="" />
//                   <Card.Body>
//                     <h5>{subCourse.title}</h5>
//                     <p><b>Duration:</b> {subCourse.duration}</p>
//                     <p><b>Mode:</b> Live Classes</p>
//                     <p><b>Level:</b> Beginner</p>
//                     {/* <button className="book-btn">Book Free Demo</button> */}
//                   </Card.Body>
//                 </Card>
//               </div>
//             </Col>

//           </Row>
//         </Container>
//       </div>

//       {/* EXPLORE SECTION */}
//       <div className="explore-section">
//         <Container>
//           <h2 className="text-center mb-5">
//             Explore Related Courses
//           </h2>

//           <Swiper
//             modules={[Autoplay, Pagination]}
//             spaceBetween={30}
//             slidesPerView={4}
//             loop={mainCourse.subcources.length > 3}
//             speed={800}
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             pagination={{ clickable: true }}
//             breakpoints={{
//               0: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               992: { slidesPerView: 3 },
//               1400: { slidesPerView: 4 },
//             }}
//           >
//             {mainCourse.subcources.map((course) => (
//               <SwiperSlide key={course.id}>
//                 <Link
//                   to={`/courses/${category}/${course.id}`}
//                   className="explore-card"
//                 >
//                   <div className="explore-image-wrapper">
//                     <img src={course.image} alt="" />
//                   </div>

//                   <div className="explore-content">
//                     <h5>{course.title}</h5>
//                     <p>{course.description}</p>
//                     <span className="read-more">
//                       Read More →
//                     </span>
//                   </div>
//                 </Link>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Container>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CourseDetail;


import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import courses from "../data/courseData";
import Header from "../components/LandingPage/LandingHeader";
import Footer from "../components/LandingPage/Footer";
import "../styles/coursedetail.css";

const CourseDetail = () => {
  const { category, courseId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  let mainCourse = null;

  if (category === "python")
    mainCourse = courses.find((c) => c.header === "Python Programming");

  if (category === "robotics")
    mainCourse = courses.find((c) => c.header === "Robotics Programming");

  if (category === "speaking")
    mainCourse = courses.find((c) => c.header === "Speaking");

  const subCourse = mainCourse?.subcources?.find(
    (c) => c.id === Number(courseId)
  );

  // 🔹 FIX: Filter out the CURRENT course so it doesn't duplicate in "Explore Related Courses"
  const relatedCourses =
    mainCourse?.subcources?.filter((c) => c.id !== Number(courseId)) || [];

  if (!subCourse) return null;

  return (
    <>
      <Header />

      {/* HERO */}
      <div className="premium-hero">
        <Container>
          <Row className="align-items-start">
            <Col lg={8}>
              <h1>{subCourse.title}</h1>
              <p className="hero-sub">{subCourse.description}</p>
            </Col>

            {/* Empty column for right alignment */}
            <Col lg={4}></Col>
          </Row>
        </Container>
      </div>

      {/* CONTENT */}
      <div className="course-detail">
        <Container className="py-5">
          <Row>

            {/* LEFT CONTENT */}
            <Col lg={8}>
              {subCourse.about && (
                <Card className="premium-card mb-4">
                  <Card.Body>
                    <h4>About Course</h4>
                    <p>{subCourse.about}</p>
                  </Card.Body>
                </Card>
              )}

              {subCourse.milestone && (
                <Card className="premium-card mb-4">
                  <Card.Body>
                    <h4>Milestone Achieved</h4>
                    <p>{subCourse.milestone}</p>
                  </Card.Body>
                </Card>
              )}

              <h4 className="mb-4">Course Curriculum</h4>

              <Accordion>
                {subCourse.modules?.map((module, index) => (
                  <Accordion.Item
                    eventKey={index.toString()}
                    key={index}
                    className="mb-3 premium-accordion"
                  >
                    <Accordion.Header>
                      {module.module_name} ({module.duration} hrs)
                    </Accordion.Header>

                    <Accordion.Body>
                      {module.sessions?.map((session, i) => (
                        <div key={i} className="session-block">
                          <strong>{session.title}</strong>
                          <ul>
                            {session.topics?.map((topic, j) => (
                              <li key={j}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>

            {/* RIGHT SIDEBAR */}
            <Col lg={4}>
              <div className="sticky-sidebar">
                <Card className="course-info-card">
                  <img src={subCourse.image} alt={subCourse.title} />
                  <Card.Body>
                    <h5>{subCourse.title}</h5>
                    <p><b>Duration:</b> {subCourse.duration}</p>
                    <p><b>Mode:</b> Live Classes</p>
                    <p><b>Level:</b> Beginner</p>
                  </Card.Body>
                </Card>
              </div>
            </Col>

          </Row>
        </Container>
      </div>

      {/* EXPLORE RELATED COURSES SECTION */}
      {relatedCourses.length > 0 && (
        <div className="explore-section">
          <Container>
            <h2 className="text-center mb-5">
              Explore Related Courses
            </h2>

            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={4}
              loop={relatedCourses.length > 3}
              speed={800}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1400: { slidesPerView: 4 },
              }}
            >
              {relatedCourses.map((course) => (
                <SwiperSlide key={course.id}>
                  <Link
                    to={`/courses/${category}/${course.id}`}
                    className="explore-card"
                  >
                    <div className="explore-image-wrapper">
                      <img src={course.image} alt={course.title} />
                    </div>

                    <div className="explore-content">
                      <h5>{course.title}</h5>
                      <p>{course.description}</p>
                      <span className="read-more">
                        Read More →
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CourseDetail;