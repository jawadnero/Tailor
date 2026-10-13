import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTailors, addOrder } from '../Store.js'

const FIELDS = [['chest', 'Chest'], ['waist', 'Waist'], ['shoulder', 'Shoulder'], ['sleeve', 'Sleeve'], ['length', 'Length']]

export default function Shop() {
  const { id } = useParams()
  const tailor = getTailors().find(t => t.id === id)
  const [done, setDone] = useState(false)
  const [f, setF] = useState({ customerName: '', phone: '', item: 'Shalwar Kameez', note: '', m: {} })

  if (!tailor) return <p className="center">Shop not found</p>

  const submit = (e) => {
    e.preventDefault()
    addOrder({ shopId: id, customerName: f.customerName, phone: f.phone, item: f.item, note: f.note, measurements: f.m })
    setDone(true)
  }

  return (
    <main className="page">
      <motion.div className="card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <h2>{tailor.shop}</h2>
        <p className="muted">📍 {tailor.city} • Rs {tailor.price} se</p>
        <p>{tailor.about}</p>
      </motion.div>

      {done ? (
        <motion.div className="card center" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <h2>🎉 Order submitted successfully!</h2>
          <p>{tailor.name} will contact you soon.</p>
        </motion.div>
      ) : (
        <form className="card form" onSubmit={submit}>
          <h3>Place order</h3>
          <input placeholder="Your name" required value={f.customerName} onChange={e => setF({ ...f, customerName: e.target.value })} />
          <input placeholder="Phone" required value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} />
          <select value={f.item} onChange={e => setF({ ...f, item: e.target.value })}>
            <option>Shalwar Kameez</option><option>Pant Coat</option><option>Waistcoat</option><option>Sherwani</option><option>Ladies Suit</option>
          </select>
          <h4>Measurements (inches)</h4>
          <div className="mgrid">
            {FIELDS.map(([k, label]) => (
              <input key={k} type="number" step="0.5" placeholder={label} value={f.m[k] || ''} onChange={e => setF({ ...f, m: { ...f.m, [k]: e.target.value } })} />
            ))}
          </div>
          <textarea placeholder="Any special instructions (design, collar, etc.)" value={f.note} onChange={e => setF({ ...f, note: e.target.value })} />
          <button className="btn">Submit order</button>
        </form>
      )}
    </main>
  )
}