import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Sparkles,
  Route,
  MessageCircleQuestion,
  Globe,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import "../../styles/whychooseus.css";

const features = [
  {
    title: "Fun & Engaging Learning",
    desc: "Interactive robotics activities that make learning exciting, practical and creativity-driven for students.",
    icon: Sparkles,
    tint: "blue",
  },
  {
    title: "Personalized Learning Path",
    desc: "Structured curriculum that adapts to each student’s skill level, ensuring step-by-step growth from basic to advanced.",
    icon: Route,
    tint: "orange",
  },
  {
    title: "Quick Doubt Support",
    desc: "Instant mentor guidance and doubt-clearing sessions to keep learning smooth and uninterrupted.",
    icon: MessageCircleQuestion,
    tint: "blue",
  },
  {
    title: "Global Skills for the Future",
    desc: "Build future-ready skills in robotics, AI, IoT and automation aligned with global technology standards.",
    icon: Globe,
    tint: "orange",
  },
  {
    title: "Affordable Learning Plans",
    desc: "High-quality education with flexible, cost-effective plans designed for every learner and family.",
    icon: Wallet,
    tint: "blue",
  },
  {
    title: "Safe & Supportive Environment",
    desc: "A secure, student-friendly space that encourages innovation, confidence and collaboration.",
    icon: ShieldCheck,
    tint: "orange",
  },
];

const WhyChooseUs = () => {
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
    <section ref={sectionRef} className={`why-choose-section py-5 ${isVisible ? "is-visible" : ""}`} id="why-us">
      <Container className="text-center">
        <p className="why-subtitle">Why Choose Melwirt</p>
        <h2 className="fw-bold mt-2 mb-4">
          Building Bright Futures <br />
          <span className="highlight-orange">with MelWirt</span>
        </h2>

        <Row className="g-4 justify-content-center why-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <Col key={idx} xs={12} sm={6} md={4}>
                <div className={`feature-card px-3 ${feature.tint}`}>
                  <div className="feature-icon-frame">
                    <Icon className="feature-icon" size={28} strokeWidth={2.1} />
                  </div>
                  <h5 className="fw-semibold">{feature.title}</h5>
                  <p>{feature.desc}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
