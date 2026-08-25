import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/herosection.css";
import heroBg from "../../assets/hero design.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="hero-section"
      id="home"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="overlay"></div>
      <div className="content text-left">
        <h1 className="hero-title mb-4">
          <span className="hero-line hero-line-1">Empowering Young Minds with</span>
          <span className="hero-line hero-line-2">
            <span className="highlight-orange">Creative Learning</span>
          </span>
        </h1>
        <p className="hero-subtitle mb-4">
          Personalized learning journey for every student. Book your free demo today!
        </p>
        <div className="button-group justify-start">
          <Button
            className="btn-demo"
            size="lg"
            onClick={() => navigate("/demo")}
            aria-label="Book a Demo"
          >
            Book a Demo
          </Button>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-label="Scroll down">
        <span className="mouse">
          <span className="wheel"></span>
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
