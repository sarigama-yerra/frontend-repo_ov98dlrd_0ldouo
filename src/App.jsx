import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Lifestyle from './pages/Lifestyle'
import SymptomChecker from './pages/SymptomChecker'
import Labs from './pages/Labs'
import Doctors from './pages/Doctors'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/symptom" element={<SymptomChecker />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </div>
  )
}

export default App
