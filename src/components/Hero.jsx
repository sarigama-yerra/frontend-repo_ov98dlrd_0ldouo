import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative h-[85vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width:'100%', height:'100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-4">
        <div className="text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Medi Mitra
            <span className="block text-blue-300 text-2xl md:text-3xl mt-2 font-normal">Healthcare made convenient</span>
          </h1>
          <p className="text-slate-200 max-w-2xl">Track calories, get AI-powered symptom guidance, book lab tests, and schedule doctor appointments — all in one place.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/lifestyle" className="pointer-events-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md">Diet & Workout</Link>
            <Link to="/symptom" className="pointer-events-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md">Symptom Checker (AI)</Link>
            <Link to="/labs" className="pointer-events-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md">Lab Tests</Link>
            <Link to="/doctors" className="pointer-events-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md">Doctor Appointments</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
