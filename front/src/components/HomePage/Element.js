import React from "react";
import { Header } from "../Header/Header";
import { HeroSection } from "../HeroSection/HeroSection";
import { Methodology } from "../Methodology/Methodology";
import { FAQ } from "../FAQ/FAQ";
import { Contact } from "../Contact/Contact";
import { Footer } from "../Footer/Footer";
import "./HomePage.css";

export const Element = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroSection />
      <Methodology />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};