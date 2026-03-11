import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteContentProvider } from './context/SiteContentContext';
import { AuthProvider } from './context/AuthContext';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ReferencesSection from './components/ReferencesSection/ReferencesSection';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';
import MimarlikHizmetlerimiz from './pages/MimarlikHizmetlerimiz/MimarlikHizmetlerimiz';
import AdminPanel from './pages/AdminPanel/AdminPanel';

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
    <AuthProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/mimarlik-hizmetlerimiz" element={<MimarlikHizmetlerimiz />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </BrowserRouter>
      </SiteContentProvider>
    </AuthProvider>
  );
}

export default App;
