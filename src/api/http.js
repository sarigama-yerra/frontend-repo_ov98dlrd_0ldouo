const BASE_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, { headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

export function getOrCreateDemoUserId() {
  let id = localStorage.getItem('medi_mitra_user');
  if (!id) {
    id = `demo_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem('medi_mitra_user', id);
  }
  return id;
}
