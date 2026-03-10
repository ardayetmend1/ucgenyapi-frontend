import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteContentProvider } from './context/SiteContentContext';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ReferencesSection from './components/ReferencesSection/ReferencesSection';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ReferencesSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <SiteContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/iletisim" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </SiteContentProvider>
  );
}

export default App;
