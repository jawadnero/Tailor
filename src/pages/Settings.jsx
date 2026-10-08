import { useState } from 'react'
import { motion } from 'framer-motion'
import { updateTailor } from '../Store.js'

export default function Settings({ user }) {
  const [form, setForm] = useState({ name: user.name || '', shop: user.shop || '', phone: user.phone || '', email: user.email || '' })
  const [saved, setSaved] = useState(false)
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })
  const submit = (event) => {
    event.preventDefault()
    updateTailor(user.id, form)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <main className="page">
      <div className="page-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h1>Settings</h1><p>Manage the details for you and your shop.</p></div></div>
      <motion.form className="panel settings-form" onSubmit={submit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="panel-heading"><div><h2>Shop profile</h2><p>This information is saved in your browser.</p></div></div>
        <div className="form-grid"><label>Tailor name<input value={form.name} onChange={update('name')} required /></label><label>Shop name<input value={form.shop} onChange={update('shop')} required /></label><label>Phone number<input type="tel" value={form.phone} onChange={update('phone')} /></label><label>Email address<input type="email" value={form.email} onChange={update('email')} /></label></div>
        <div className="form-footer"><p>{saved ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-text">✓ Changes saved</motion.span> : 'Keep your shop details up to date.'}</p><button className="btn">Save changes</button></div>
      </motion.form>
      <div className="settings-tip"><span>ⓘ</span><p><strong>Local storage</strong>Your notebook data is currently saved in this browser on this device. It is not synced to an online account.</p></div>
    </main>
  )
}
