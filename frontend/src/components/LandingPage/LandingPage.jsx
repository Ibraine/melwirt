import React from "react";
import LandingHeader from "./LandingHeader"; //  Navbar
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import CoursesSection from "./CoursesSection";
import WhyChooseUs from "./WhyChooseUs";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <LandingHeader />
      <HeroSection />
      <AboutSection />    {/* 🔗 id="about" */}
      <CoursesSection />  {/* 🔗 id="courses" */}
      <WhyChooseUs />     {/* 🔗 id="why-us" */}
      <Footer />
    </div>
  );
};

export default LandingPage;
