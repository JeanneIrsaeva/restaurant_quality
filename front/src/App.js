import { AboutUs } from './components/AboutUs/AboutUs';
import { FAQ } from './components/FAQ/FAQ';
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
    </div>
  );
}

export default App;
