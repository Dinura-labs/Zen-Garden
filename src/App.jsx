import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MeditationBackground from './components/MeditationBackground';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Meditation from './pages/Meditation';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <MeditationBackground />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

