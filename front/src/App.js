import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import VenuePage from './pages/VenuePage/VenuePage';
import { AboutUs } from './components/AboutUs/AboutUs';
import { Contact } from './components/Contact/Contact';
import { FAQ } from './components/FAQ/FAQ';
import { Methodology } from './components/Methodology/Methodology';
import { PromoSection } from './components/PromoSection/PromoSection';
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <PromoSection />
                <Methodology />
                <AboutUs />
                <FAQ />
                <Contact />
              </>
            } />
            <Route path="/venue" element={<VenuePage />} />

            <Route path="/catalog" element={<CatalogPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;