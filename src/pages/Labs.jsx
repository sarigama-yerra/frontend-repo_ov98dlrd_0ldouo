import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { apiGet, apiPost, getOrCreateDemoUserId } from '../api/http'

export default function Labs(){
  const [tests, setTests] = useState([])
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])

  useEffect(()=>{
    apiGet(`/api/labs/tests?search=${encodeURIComponent(search)}`).then(r=> setTests(r.items)).catch(console.error)
  }, [search])

  const add = (t)=> setCart(c=> c.find(x=>x.id===t.id)? c: [...c, t])
  const remove = (id)=> setCart(c=> c.filter(x=> x.id!==id))
  const total = cart.reduce((sum,i)=> sum + (i.price||0), 0)

  const order = async ()=>{
    const userId = getOrCreateDemoUserId()
    const payload = { userId, items: cart.map(i=> ({ labTestId: i.id, name: i.name, price: i.price })), preferredDate: new Date().toISOString().slice(0,10) }
    const res = await apiPost('/api/labs/orders', payload)
    alert(`Order placed. Total ₹${res.total}`)
    setCart([])
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Lab Tests</h1>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tests" className="bg-slate-900 p-2 rounded mb-4 w-full" />
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Available Tests</h3>
            <ul className="space-y-2">
              {tests.map(t=> (
                <li key={t.id} className="bg-slate-900 p-3 rounded flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{t.name} <span className="text-slate-400">({t.code})</span></div>
                    <div className="text-slate-400">₹{t.price} • {t.category}</div>
                  </div>
                  <button onClick={()=>add(t)} className="px-2 py-1 bg-indigo-600 rounded">Add</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Cart</h3>
            <ul className="space-y-2">
              {cart.map(t=> (
                <li key={t.id} className="bg-slate-900 p-3 rounded flex items-center justify-between text-sm">
                  <div className="font-medium">{t.name}</div>
                  <button onClick={()=>remove(t.id)} className="px-2 py-1 bg-slate-700 rounded">Remove</button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between">
              <div>Total: ₹{total}</div>
              <button disabled={!cart.length} onClick={order} className="px-3 py-2 bg-emerald-600 rounded disabled:opacity-50">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
