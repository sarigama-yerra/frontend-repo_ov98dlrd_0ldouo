import Hero from '../components/Hero'
import { Link } from 'react-router-dom'

const features = [
  { title: 'Diet & Workout', desc: 'Track food, calories, and follow plans for muscle, fat loss, or yoga.', to: '/lifestyle', color:'bg-blue-600'},
  { title: 'Symptom Checker (AI)', desc: 'Describe symptoms and get guidance, labs or doctors if needed.', to: '/symptom', color:'bg-emerald-600'},
  { title: 'Lab Tests', desc: 'Browse tests, add to cart, and schedule a home sample pickup.', to: '/labs', color:'bg-indigo-600'},
  { title: 'Doctor Appointments', desc: 'Find specialists and book appointments instantly.', to: '/doctors', color:'bg-purple-600'},
]

export default function Home(){
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(f=> (
          <div key={f.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-slate-300 mb-4">{f.desc}</p>
            <Link className={`inline-block px-4 py-2 rounded-md ${f.color} hover:opacity-95`} to={f.to}>Go to {f.title}</Link>
          </div>
        ))}
      </section>
    </main>
  )
}
