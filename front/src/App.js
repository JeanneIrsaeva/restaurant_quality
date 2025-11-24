import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { Contact } from "./components/Contact/Contact";
import { FAQ } from "./components/FAQ/FAQ";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Methodology } from "./components/Methodology/Methodology";
import { PromoSection } from "./components/PromoSection/PromoSection";
import CatalogPage from "./pages/CatalogPage/CatalogPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PromoSection />
              <Methodology />
              <AboutUs />
              <FAQ />
              <Contact />
            </>
          }
        />
        <Route path="/catalog" element={<CatalogPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
