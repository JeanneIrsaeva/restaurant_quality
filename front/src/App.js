import { AboutUs } from './components/AboutUs/AboutUs';
import { Contact } from './components/Contact/Contact';
import { FAQ } from './components/FAQ/FAQ';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Methodology } from './components/Methodology/Methodology';
import { PromoSection } from './components/PromoSection/PromoSection';

function App() {
  return (
    <div className="App">
      <Header />
      <PromoSection/>
      <Methodology/>
      <AboutUs/>
      <FAQ/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
