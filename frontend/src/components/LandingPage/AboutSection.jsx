import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../../styles/aboutsection.css";

import aboutImage from "../../assets/about us.png";
import backgroundImage from "../../assets/background2.png";

const AboutSection = () => {
  const sectionRef = useRef(null);
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
      { threshold: 0.18 }
    );

    observer.observe(currentSection);

    return () => {
      observer.unobserve(currentSection);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-section ${isVisible ? "is-visible" : ""}`}
      id="about"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Row className="about-row align-items-center">
          <Col md={6} className="about-image-col text-center mb-4 mb-md-0">
            <div className="about-image-wrapper">
              <span className="about-accent about-accent-one"></span>
              <span className="about-accent about-accent-two"></span>
              <Image
                src={aboutImage}
                alt="Child with robot"
                className="img-fluid about-image"
              />
            </div>
          </Col>

          <Col md={6} className="about-content-col">
            <p className="about-subtitle">About Melwirt</p>
            <h2 className="about-title">
              Shaping Young Minds for a <br />
              <span className="highlight-orange">Brighter Future</span>
            </h2>
            <p className="about-text about-text-1">
              At Melwirt, we believe true learning goes beyond classrooms. It should
              <span className="text-accent"> spark curiosity</span>, encourage creativity,
              and inspire young minds to think differently. Our mission is to create
              engaging experiences that help kids <span className="text-accent">discover, question</span>,
              and grow with confidence.
            </p>
            <p className="about-text about-text-2">
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
