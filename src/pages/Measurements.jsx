import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getCustomer, saveMeasurements } from '../Store.js'

const groups = [
  { title: 'Shirt measurements', fields: [['shirtLength', 'Length'], ['shoulder', 'Shoulder'], ['chest', 'Chest'], ['shirtWaist', 'Waist'], ['sleeve', 'Sleeve'], ['neck', 'Neck']] },
  { title: 'Trouser measurements', fields: [['trouserWaist', 'Waist'], ['trouserLength', 'Length'], ['thigh', 'Thigh'], ['bottom', 'Bottom']] },
]

export default function Measurements({ user }) {
  const { customerId } = useParams()
  const customer = getCustomer(customerId)
  const navigate = useNavigate()
  const latest = customer?.measurements?.[0]
  const [unit, setUnit] = useState(latest?.unit || 'in')
  const [values, setValues] = useState(latest?.values || {})
  const [saved, setSaved] = useState(false)

  if (!customer || customer.tailorId !== user.id) return <Navigate to="/customers" replace />

  const submit = (event) => {
    event.preventDefault()
    saveMeasurements(customer.id, { unit, values })
    setSaved(true)
    window.setTimeout(() => navigate(`/customers/${customer.id}`), 900)
  }

  return (
    <main className="page">
      <Link className="back-link inline-back" to={`/customers/${customer.id}`}>← {customer.name}’s profile</Link>
      <div className="page-heading"><div><span className="eyebrow">FITTING RECORD</span><h1>Take measurements</h1><p>Measurements for <strong>{customer.name}</strong>. You can update these any time.</p></div></div>
      <form className="measurement-form" onSubmit={submit}>
        <div className="unit-picker"><div><strong>Measurement unit</strong><small>Choose the unit you use in your shop.</small></div><div className="segmented"><button type="button" className={unit === 'in' ? 'selected' : ''} onClick={() => setUnit('in')}>Inches</button><button type="button" className={unit === 'cm' ? 'selected' : ''} onClick={() => setUnit('cm')}>Centimeters</button></div></div>
        {groups.map((group) => <section className="panel measurements-panel" key={group.title}><div className="panel-heading"><div><h2>{group.title}</h2><p>Enter measurements in {unit === 'in' ? 'inches' : 'centimeters'}.</p></div><span className="measure-ruler">⌁</span></div><div className="measurement-fields">{group.fields.map(([key, label]) => <label key={key}>{label}<div className="input-suffix"><input type="number" min="0" step={unit === 'in' ? '0.5' : '0.1'} placeholder="0" value={values[key] || ''} onChange={(event) => setValues({ ...values, [key]: event.target.value })} /><span>{unit}</span></div></label>)}</div></section>)}
        <div className="form-footer"><p>Measurements are saved to {customer.name}’s profile.</p><button className="btn" disabled={saved}>{saved ? '✓ Measurements saved' : 'Save measurements'}</button></div>
        <AnimatePresence>{saved && <motion.div className="save-success" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>✓ <span>Measurements saved</span></motion.div>}</AnimatePresence>
      </form>
    </main>
  )
}
