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
      <div className="content text-left"> {/* CHANGED: text-left instead of text-center */}
        <h1 className="hero-title mb-4">
          Empowering Young  Minds with <br />
          <span className="highlight-orange">Creative Learning</span>
        </h1>
        <p className="hero-subtitle mb-4">
          Personalized learning journey for every student. Book your free demo today!
        </p>
        <div className="button-group justify-start"> {/* CHANGED: align left */}
          <Button className="btn-demo" size="lg" onClick={() => navigate("/demo")}>
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
