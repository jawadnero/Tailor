import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { addCustomer, deleteCustomer, getCustomers, updateCustomer } from '../Store.js'

const emptyForm = { name: '', phone: '', address: '', notes: '' }

export default function Customers({ user }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [notice, setNotice] = useState('')
  const [customers, setCustomers] = useState(() => getCustomers(user.id))
  const showForm = searchParams.get('add') === 'true' || editingId !== null

  const refresh = () => setCustomers(getCustomers(user.id))
  const closeForm = () => {
    setEditingId(null)
    setForm(emptyForm)
    if (searchParams.has('add')) setSearchParams({})
  }
  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setSearchParams({ add: 'true' })
  }
  const edit = (customer) => {
    setEditingId(customer.id)
    setForm({ name: customer.name, phone: customer.phone, address: customer.address || '', notes: customer.notes || '' })
  }
  const submit = (event) => {
    event.preventDefault()
    if (editingId) updateCustomer(editingId, form)
    else addCustomer(user.id, form)
    refresh()
    closeForm()
    setNotice(editingId ? 'Customer details updated.' : 'Customer added to your book.')
  }
  const remove = (customer) => {
    if (!window.confirm(`Delete ${customer.name} from your customer book?`)) return
    deleteCustomer(customer.id)
    refresh()
    setNotice('Customer deleted.')
  }
  const filtered = customers.filter((customer) =>
    `${customer.name} ${customer.phone} ${customer.address || ''}`.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <main className="page">
      <div className="page-heading"><div><span className="eyebrow">YOUR CUSTOMER BOOK</span><h1>Customers</h1><p>Keep customer details and fitting history close at hand.</p></div><button className="btn" onClick={openAdd}>＋ Add customer</button></div>
      {notice && <motion.div className="toast" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>✓ {notice}</motion.div>}
      <div className="list-toolbar"><label className="search-box"><span>⌕</span><input aria-label="Search customers" placeholder="Search by name, phone, or address..." value={search} onChange={(event) => setSearch(event.target.value)} /></label><span className="result-count">{filtered.length} {filtered.length === 1 ? 'customer' : 'customers'}</span></div>
      {!customers.length ? <div className="panel empty-state"><span className="empty-icon">♙</span><h2>Your customer book starts here</h2><p>Add your first customer to save their contact details, notes, and measurements.</p><button className="btn" onClick={openAdd}>＋ Add your first customer</button></div> : filtered.length ? (
        <div className="customer-grid"><AnimatePresence>{filtered.map((customer, index) => (
          <motion.article className="customer-card" key={customer.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ delay: index * 0.025 }}>
            <div className="customer-card-top"><span className="avatar large">{customer.name.charAt(0).toUpperCase()}</span><div><h2>{customer.name}</h2><p>{customer.phone}</p></div><div className="card-menu"><button aria-label={`Edit ${customer.name}`} onClick={() => edit(customer)}>Edit</button><button aria-label={`Delete ${customer.name}`} onClick={() => remove(customer)}>Delete</button></div></div>
            <p className="customer-address">{customer.address || 'No address added'}</p>
            <div className="customer-card-bottom"><span>{customer.measurements?.length || 0} saved measurement{customer.measurements?.length === 1 ? '' : 's'}</span><Link to={`/customers/${customer.id}`}>View profile <b>→</b></Link></div>
          </motion.article>
        ))}</AnimatePresence></div>
      ) : <div className="panel empty-state"><span className="empty-icon">⌕</span><h2>No matches found</h2><p>Try a different name or phone number.</p></div>}

      <AnimatePresence>
        {showForm && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) closeForm() }}>
          <motion.section className="modal-card" initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} role="dialog" aria-modal="true" aria-labelledby="customer-form-title">
            <button className="modal-close" onClick={closeForm} aria-label="Close">×</button><span className="eyebrow">{editingId ? 'CUSTOMER DETAILS' : 'NEW CUSTOMER'}</span><h2 id="customer-form-title">{editingId ? 'Edit customer' : 'Add a customer'}</h2><p className="form-intro">Save the details you’ll want to find again.</p>
            <form className="stack-form" onSubmit={submit}>
              <label>Customer name<input autoFocus placeholder="e.g. Ahmed Khan" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
              <label>Phone number<input type="tel" placeholder="e.g. 0300 1234567" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required /></label>
              <label>Address <span className="optional-label">Optional</span><input placeholder="Street, area, or city" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></label>
              <label>Notes <span className="optional-label">Optional</span><textarea rows="3" placeholder="Anything useful to remember about this customer" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label>
              <div className="modal-actions"><button type="button" className="btn btn-outline" onClick={closeForm}>Cancel</button><button className="btn">{editingId ? 'Save changes' : 'Add customer'}</button></div>
            </form>
          </motion.section>
        </motion.div>}
      </AnimatePresence>
    </main>
  )
}
