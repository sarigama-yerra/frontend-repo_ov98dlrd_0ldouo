import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Lifestyle from './pages/Lifestyle'
import SymptomChecker from './pages/SymptomChecker'
import Labs from './pages/Labs'
import Doctors from './pages/Doctors'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/symptom" element={<SymptomChecker />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <footer className="border-t border-sky-100 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Medi Mitra • Your partner in better health
        </div>
      </footer>
    </div>
  )
}

export default App
