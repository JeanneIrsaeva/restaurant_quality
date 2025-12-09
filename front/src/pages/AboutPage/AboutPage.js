import React from "react";
import AboutBlock from "./AboutBlock";
import PrinciplesBlock from "./PrinciplesBlock";
import AudienceBlock from "./AudienceBlock";
import { Contact } from "./../../components/Contact/Contact.js";
import ExpertiseSection from "./../../components/ExpertiseSection/ExpertiseSection";

import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <AboutBlock />
      <PrinciplesBlock />
      <AudienceBlock />
      <ExpertiseSection />
      <Contact />
    </div>
  );
};

export default AboutPage;
