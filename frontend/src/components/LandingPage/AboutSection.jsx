import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../../styles/aboutsection.css";

// ✅ Import images
import aboutImage from "../../assets/about us.png";
import backgroundImage from "../../assets/background2.png";

const AboutSection = () => {
  return (
    <section
      className="about-section py-5"
      id="about"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* ✅ Left Image */}
          <Col md={6} className="text-center mb-4 mb-md-0">
            <div className="about-image-wrapper">
              <Image
                src={aboutImage}
                alt="Child with robot"
                className="img-fluid about-image"
              />
            </div>
          </Col>

          {/* ✅ Right Text */}
          <Col md={6}>
            <p className="about-subtitle">About Melwirt</p>
            <h2 className="fw-bold mt-2" style={{ color: "#0d57a1" }}>
              Shaping Young Minds for a <br />
              <span className="highlight-orange">Brighter Future</span>
            </h2>
            <p style={{ color: "#333", lineHeight: "1.6", marginTop: "1rem" }}>
  At Melwirt, we believe true learning goes beyond classrooms. It should spark curiosity,
  encourage creativity, and inspire young minds to think differently. Our mission is to
  create engaging experiences that help kids discover, question, and grow with confidence.
</p>
<p style={{ color: "#333", lineHeight: "1.6" }}>
  We provide innovative resources, interactive projects, and modern learning tools designed
  to develop essential skills. By blending knowledge with creativity, Melwirt empowers
  children to explore new ideas, adapt to change, and prepare for a future full of opportunities.
</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
