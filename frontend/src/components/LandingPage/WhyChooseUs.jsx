import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/whychooseus.css";

// ✅ Import local images
import funLearning from "../../assets/fun learning.png";
import globalFuture from "../../assets/global future.png";
import personalizedLearning from "../../assets/personalized learning.png";
import quickSupport from "../../assets/quick support.png";
import affordablePlans from "../../assets/affordable plans.png";
import softSupport from "../../assets/soft support.png";

// ✅ Updated features array
const features = [
  {
    title: "Fun & Engaging Learning",
    desc: "Interactive robotics activites  that make learnig exciting practical, creativity-driven for students.",
    icon: funLearning,
  },
  {
    title: "Personalized Learning Path",
    desc: "Structured curriculum that adapts to students skilss levels, ensuring step-by-step growth from basic to advanced.",
    icon: personalizedLearning,
  },
  {
    title: "Quick Doubt Support",
    desc: "Instant mentor guidance and doubt clearing-sessions to keep learning smooth and uninterrupted.",
    icon: quickSupport,
  },
  {
    title: "Global Skills for the Future",
    desc: "Build future-ready skills in robotics,AI,IoT,automation aligned with global technology standards.",
    icon: globalFuture,
  },
  {
    title: "Affordable Learning Plans",
    desc: "High-quality robotics education with flexible and cost-effective plans for every learner.",
    icon: affordablePlans,
  },
  {
    title: "Safe & Supportive Environment",
    desc: "A secure student friendly learning space that encourage innovation, confidence, collaboration.",
    icon: softSupport,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-section py-5" id="why-us">
      <Container className="text-center">
       <p className="why-subtitle ">Why Choose Melwirt</p>
        <h2 className="fw-bold mt-2 mb-4">
          Building Bright Futures <br />
          <span className="highlight-orange">with MelWirt</span>
        </h2>

        <Row className="g-4 justify-content-center">
          {features.map((feature, idx) => (
            <Col key={idx} xs={12} sm={6} md={4}>
              <div className="feature-card px-3">
                <img src={feature.icon} alt={feature.title} className="feature-icon mb-3" />
                <h5 className="fw-semibold">{feature.title}</h5>
                <p className="text-muted small">{feature.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
