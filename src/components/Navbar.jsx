import { Link, NavLink } from 'react-router-dom'
import { Cross, HeartPulse } from 'lucide-react'

export default function Navbar(){
  return (
    <header className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-sky-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sky-700 font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-sky-600 text-white">
            <Cross size={18} />
          </span>
          <span className="text-lg">Medi Mitra</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <NavLink to="/" className={({isActive})=>`text-slate-600 hover:text-sky-700 ${isActive? 'text-sky-700 font-medium': ''}`}>Home</NavLink>
          <NavLink to="/lifestyle" className={({isActive})=>`text-slate-600 hover:text-sky-700 ${isActive? 'text-sky-700 font-medium': ''}`}>Lifestyle</NavLink>
          <NavLink to="/symptom" className={({isActive})=>`text-slate-600 hover:text-sky-700 ${isActive? 'text-sky-700 font-medium': ''}`}>Symptom Checker</NavLink>
          <NavLink to="/labs" className={({isActive})=>`text-slate-600 hover:text-sky-700 ${isActive? 'text-sky-700 font-medium': ''}`}>Lab Tests</NavLink>
          <NavLink to="/doctors" className={({isActive})=>`text-slate-600 hover:text-sky-700 ${isActive? 'text-sky-700 font-medium': ''}`}>Doctors</NavLink>
        </nav>
      </div>
    </header>
  )
}
