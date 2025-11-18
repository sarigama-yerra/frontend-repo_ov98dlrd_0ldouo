import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { apiGet, apiPost, getOrCreateDemoUserId } from '../api/http'

export default function Lifestyle(){
  const [tab, setTab] = useState('food')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Lifestyle</h1>
        <div className="flex gap-2 mb-6">
          <button className={`px-3 py-2 rounded-md ${tab==='food'?'bg-blue-600':'bg-slate-800'}`} onClick={()=>setTab('food')}>Track Food</button>
          <button className={`px-3 py-2 rounded-md ${tab==='workout'?'bg-blue-600':'bg-slate-800'}`} onClick={()=>setTab('workout')}>Workouts & Yoga</button>
          <button className={`px-3 py-2 rounded-md ${tab==='activity'?'bg-blue-600':'bg-slate-800'}`} onClick={()=>setTab('activity')}>Activity</button>
        </div>
        {tab==='food' && <FoodTracker />}
        {tab==='workout' && <WorkoutPlans />}
        {tab==='activity' && <ActivityLog />}
      </div>
    </div>
  )
}

function FoodTracker(){
  const [search, setSearch] = useState('')
  const [foods, setFoods] = useState([])
  const [date, setDate] = useState(()=> new Date().toISOString().slice(0,10))
  const [selected, setSelected] = useState([])

  useEffect(()=>{
    apiGet(`/api/lifestyle/foods?search=${encodeURIComponent(search)}`).then(r=> setFoods(r.items)).catch(console.error)
  }, [search])

  const total = useMemo(()=> selected.reduce((sum, it)=> sum + (it.calories||0)*(it.quantity||1), 0), [selected])

  const addItem = (f)=> setSelected(s=> [...s, {name:f.name, calories:f.calories, quantity:1, foodItemId:f.id}])
  const updateQty = (idx, q)=> setSelected(s=> s.map((it,i)=> i===idx? {...it, quantity: Math.max(0, Number(q)||0)}: it))
  const remove = (idx)=> setSelected(s=> s.filter((_,i)=> i!==idx))

  const save = async ()=>{
    const userId = getOrCreateDemoUserId()
    const res = await apiPost('/api/lifestyle/meals', { userId, date, items: selected })
    alert(`Saved meal log. Total: ${res.totalCalories} kcal`)
    setSelected([])
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search foods" className="bg-slate-800 px-3 py-2 rounded-md w-full" />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="bg-slate-800 px-3 py-2 rounded-md" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="border border-slate-800 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Foods</h3>
          <ul className="space-y-2">
            {foods.map(f=> (
              <li key={f.id} className="flex items-center justify-between text-sm bg-slate-900 rounded-md p-2">
                <div>
                  <div className="font-medium">{f.name}</div>
                  <div className="text-slate-400">{f.calories} kcal • {f.servingSize}</div>
                </div>
                <button className="px-2 py-1 bg-blue-600 rounded" onClick={()=>addItem(f)}>Add</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-slate-800 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Selected for {date}</h3>
          <ul className="space-y-2">
            {selected.map((it, idx)=> (
              <li key={idx} className="flex items-center justify-between text-sm bg-slate-900 rounded-md p-2">
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-slate-400">{it.calories} kcal x </div>
                </div>
                <input type="number" value={it.quantity} onChange={e=>updateQty(idx, e.target.value)} className="w-20 bg-slate-800 px-2 py-1 rounded mr-2" />
                <button onClick={()=>remove(idx)} className="px-2 py-1 bg-slate-700 rounded mr-2">Remove</button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-slate-300">Total: <span className="font-semibold">{Math.round(total)} kcal</span></div>
            <button disabled={!selected.length} onClick={save} className="px-3 py-2 rounded bg-emerald-600 disabled:opacity-50">Save Log</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkoutPlans(){
  const plans = [
    {name:'Build Muscle - Beginner', goal:'build_muscle', sessions:['Push Day','Pull Day','Legs & Core']},
    {name:'Fat Loss - Cardio + Strength', goal:'fat_loss', sessions:['HIIT 20m','Upper Body Circuit','Yoga Flow']},
    {name:'Yoga Focus - Balance & Breath', goal:'yoga_focus', sessions:['Vinyasa','Hatha','Restorative']},
  ]
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {plans.map(p=> (
        <div key={p.name} className="border border-slate-800 bg-slate-900 rounded-lg p-4">
          <h3 className="font-semibold mb-1">{p.name}</h3>
          <div className="text-slate-400 mb-2">Goal: {p.goal.replace('_',' ')}</div>
          <ul className="list-disc pl-5 text-sm text-slate-300">
            {p.sessions.map(s=> <li key={s}>{s}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ActivityLog(){
  const [date, setDate] = useState(()=> new Date().toISOString().slice(0,10))
  const [activities, setActivities] = useState([{name:'Jogging', durationMin:30}])

  const save = async ()=>{
    const userId = getOrCreateDemoUserId()
    const res = await apiPost('/api/lifestyle/activities', { userId, date, activities })
    alert(`Saved activity log. Total burned: ${res.totalBurned} kcal`)
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="bg-slate-800 px-3 py-2 rounded-md" />
      </div>
      <div className="space-y-2 mb-4">
        {activities.map((a,idx)=> (
          <div key={idx} className="flex items-center gap-2 bg-slate-900 p-2 rounded">
            <input value={a.name} onChange={e=> setActivities(list=> list.map((x,i)=> i===idx? {...x,name:e.target.value}: x))} className="bg-slate-800 px-2 py-1 rounded flex-1" />
            <input type="number" value={a.durationMin} onChange={e=> setActivities(list=> list.map((x,i)=> i===idx? {...x,durationMin:Number(e.target.value)||0}: x))} className="bg-slate-800 px-2 py-1 rounded w-28" />
          </div>
        ))}
      </div>
      <button onClick={()=> setActivities(list=> [...list, {name:'', durationMin:0}])} className="px-3 py-2 bg-slate-700 rounded mr-2">Add Activity</button>
      <button onClick={save} className="px-3 py-2 bg-emerald-600 rounded">Save Activities</button>
    </div>
  )
}
