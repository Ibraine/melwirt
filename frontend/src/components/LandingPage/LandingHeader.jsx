import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Link } from "react-scroll";
import "../../styles/landingheader.css";

const LandingHeader = () => {
  return (
    <Navbar expand="lg" className="landing-navbar shadow-sm sticky-top">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Melwirt Logo"
            height="58" // ⬅️ Reduced height for compact look
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
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
