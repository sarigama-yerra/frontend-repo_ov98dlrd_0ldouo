import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { apiGet, apiPost, getOrCreateDemoUserId } from '../api/http'

export default function Doctors(){
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('')

  useEffect(()=>{
    apiGet(`/api/doctors?search=${encodeURIComponent(search)}&specialty=${encodeURIComponent(specialty)}`).then(r=> setList(r.items)).catch(console.error)
  }, [search, specialty])

  const book = async (doctorId, time)=>{
    const date = new Date().toISOString().slice(0,10)
    const userId = getOrCreateDemoUserId()
    const res = await apiPost('/api/doctors/appointments', { userId, doctorId, date, time, reason: 'Consultation' })
    alert(`Appointment scheduled on ${res.date} at ${res.time}`)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Doctors</h1>
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name/specialty" className="bg-slate-900 p-2 rounded" />
          <input value={specialty} onChange={e=>setSpecialty(e.target.value)} placeholder="Filter by specialty" className="bg-slate-900 p-2 rounded" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {list.map(d=> (
            <div key={d.id} className="bg-slate-900 rounded p-4 border border-slate-800">
              <div className="font-semibold">{d.name}</div>
              <div className="text-slate-400 text-sm">{d.specialty} • {d.yearsExperience} yrs • ⭐ {d.rating}</div>
              <div className="text-slate-500 text-sm">{d.location}</div>
              <div className="mt-2 text-sm">
                {d.availability?.[0]?.times?.map(t=> (
                  <button key={t} onClick={()=>book(d.id,t)} className="px-2 py-1 bg-purple-600 rounded mr-2 mb-2">{t}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
