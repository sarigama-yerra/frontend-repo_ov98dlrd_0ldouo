import { Link, NavLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="w-full sticky top-0 z-20 bg-slate-900/70 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-white">Medi Mitra</Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive})=>`text-slate-300 hover:text-white ${isActive? 'text-white': ''}`}>Home</NavLink>
          <NavLink to="/lifestyle" className={({isActive})=>`text-slate-300 hover:text-white ${isActive? 'text-white': ''}`}>Lifestyle</NavLink>
          <NavLink to="/symptom" className={({isActive})=>`text-slate-300 hover:text-white ${isActive? 'text-white': ''}`}>Symptom Checker</NavLink>
          <NavLink to="/labs" className={({isActive})=>`text-slate-300 hover:text-white ${isActive? 'text-white': ''}`}>Lab Tests</NavLink>
          <NavLink to="/doctors" className={({isActive})=>`text-slate-300 hover:text-white ${isActive? 'text-white': ''}`}>Doctors</NavLink>
        </nav>
      </div>
    </header>
  )
}
