import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteContentProvider } from './context/SiteContentContext';
import { AuthProvider } from './context/AuthContext';
import SEO from './components/SEO/SEO';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ReferencesSection from './components/ReferencesSection/ReferencesSection';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';
import MimarlikHizmetlerimiz from './pages/MimarlikHizmetlerimiz/MimarlikHizmetlerimiz';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function HomePage() {
  return (
    <>
      <SEO path="/" />
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
            <Route path="/sifre-sifirla" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </SiteContentProvider>
    </AuthProvider>
  );
}

export default App;
