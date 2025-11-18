import { useState } from 'react'
import Navbar from '../components/Navbar'
import { apiPost, getOrCreateDemoUserId } from '../api/http'

export default function SymptomChecker(){
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async ()=>{
    setLoading(true)
    try{
      const userId = getOrCreateDemoUserId()
      const res = await apiPost('/api/symptom/check', { text, userId })
      setResult(res)
    }catch(e){
      alert('Failed to check symptoms')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Symptom Checker (AI)</h1>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Describe your symptoms..." className="w-full h-40 bg-slate-900 p-3 rounded mb-3" />
        <button disabled={!text || loading} onClick={submit} className="px-4 py-2 bg-emerald-600 rounded disabled:opacity-50">{loading? 'Analyzing...': 'Analyze'}</button>

        {result && (
          <div className="mt-6 border border-slate-800 rounded-lg p-4 bg-slate-900">
            <div className="mb-2 text-sm text-slate-300">Severity: <span className="font-semibold">{result.result.aiFindings.severity}</span></div>
            {!!result.result.aiFindings.probableConditions?.length && (
              <div className="mb-3">
                <div className="font-semibold mb-1">Probable conditions</div>
                <ul className="list-disc pl-5 text-slate-300">
                  {result.result.aiFindings.probableConditions.map((c,i)=> (
                    <li key={i}>{c.name} <span className="text-slate-400">({Math.round(c.confidence*100)}%)</span></li>
                  ))}
                </ul>
              </div>
            )}
            {!!result.result.aiFindings.advice?.length && (
              <div className="mb-3">
                <div className="font-semibold mb-1">Advice</div>
                <ul className="list-disc pl-5 text-slate-300">
                  {result.result.aiFindings.advice.map((a,i)=> <li key={i}>{a}</li>)}
                </ul>
              </div>
            )}
            {!!result.mappedLabs?.length && (
              <div className="mb-3">
                <div className="font-semibold mb-1">Suggested Lab Tests</div>
                <ul className="list-disc pl-5 text-slate-300">
                  {result.mappedLabs.map(l=> <li key={l.id}>{l.name} <span className="text-slate-400">({l.code})</span></li>)}
                </ul>
              </div>
            )}
            {!!result.result.suggestedSpecialties?.length && (
              <div className="mb-1">
                <div className="font-semibold mb-1">Suggested Specialties</div>
                <div className="flex gap-2 flex-wrap">
                  {result.result.suggestedSpecialties.map((s,i)=> <span key={i} className="px-2 py-1 bg-slate-800 rounded text-sm">{s}</span>)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
