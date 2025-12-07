import React from "react";
import { Header } from "../Header/Header";
import { HeroSection } from "../HeroSection/HeroSection";
import { Methodology } from "../Methodology/Methodology";
import { FAQ } from "../FAQ/FAQ";
import { Contact } from "../Contact/Contact";
import { Footer } from "../Footer/Footer";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home-page">
      <Header />

      <main className="home-container">
        <HeroSection />

        <div className="home-section section-padding">
          <Methodology />
        </div>

        <div className="home-section section-padding">
          <FAQ />
        </div>

        <div className="home-section section-padding">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
};