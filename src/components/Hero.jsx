import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative h-[80vh] overflow-hidden bg-gradient-to-b from-sky-50 via-white to-sky-50">
      <div className="absolute inset-0 opacity-70">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width:'100%', height:'100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-white/70 to-sky-50/90 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-4">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900">Medi Mitra
            <span className="block text-sky-700 text-2xl md:text-3xl mt-2 font-normal">Compassionate care, powered by technology</span>
          </h1>
          <p className="text-slate-600 max-w-2xl">Track your lifestyle, check symptoms with AI guidance, book lab tests, and schedule appointments — a calmer, safer way to manage your health.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/lifestyle" className="pointer-events-auto px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md">Diet & Workout</Link>
            <Link to="/symptom" className="pointer-events-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md">Symptom Checker (AI)</Link>
            <Link to="/labs" className="pointer-events-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md">Lab Tests</Link>
            <Link to="/doctors" className="pointer-events-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md">Doctor Appointments</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
