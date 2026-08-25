import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Link } from "react-scroll";
import "../../styles/landingheader.css";

const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="md"
      expanded={isMenuOpen}
      onToggle={setIsMenuOpen}
      className={`landing-navbar sticky-top ${isScrolled ? "is-scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Melwirt Logo"
            height="58" // ⬅️ Reduced height for compact look
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-4">
            <Link
              to="home"
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="active-link"
              className="nav-link"
            >
              Home
            </Link>
            <Link
              to="about"
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="active-link"
              className="nav-link"
            >
              About Us
            </Link>
            <Link
              to="courses"
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="active-link"
              className="nav-link"
            >
              Courses
            </Link>
            <Link
              to="why-us"
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="active-link"
              className="nav-link"
            >
              Why Choose Us
            </Link>

            {/* <Button className="demo-btn">Enroll Course</Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LandingHeader;
