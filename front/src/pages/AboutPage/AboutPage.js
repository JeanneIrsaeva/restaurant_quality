import React from "react";
import AboutBlock from "./AboutBlock";
import PrinciplesBlock from "./PrinciplesBlock";
import AudienceBlock from "./AudienceBlock";
import QuestionsBlock from "./QuestionsBlock";
import ExpertiseSection from "./../../components/ExpertiseSection/ExpertiseSection";

import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <AboutBlock />
      <PrinciplesBlock />
      <AudienceBlock />
      <ExpertiseSection />
      <QuestionsBlock />
    </div>
  );
};

export default AboutPage;
