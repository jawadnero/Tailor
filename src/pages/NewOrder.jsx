import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { getCustomers, createOrder } from '../Store.js'

const dateValue = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function NewOrder({ user }) {
  const customers = getCustomers(user.id)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(() => {
    const today = new Date()
    const defaultDelivery = new Date(today)
    defaultDelivery.setDate(defaultDelivery.getDate() + 7)
    return {
      customerId: searchParams.get('customer') || '',
      item: 'Shalwar Kameez',
      orderDate: dateValue(today),
      deliveryDate: dateValue(defaultDelivery),
      price: '',
      advance: '',
      notes: '',
    }
  })
  const remaining = useMemo(() => Math.max(0, (Number(form.price) || 0) - (Number(form.advance) || 0)), [form.price, form.advance])
  const selectedCustomer = customers.find((customer) => customer.id === form.customerId)

  const submit = (event) => {
    event.preventDefault()
    if (!selectedCustomer) return
    const order = createOrder(user.id, {
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      phone: selectedCustomer.phone,
      item: form.item,
      orderDate: form.orderDate,
      deliveryDate: form.deliveryDate,
      price: Number(form.price) || 0,
      advance: Number(form.advance) || 0,
      remaining,
      notes: form.notes,
    })
    navigate('/orders', { state: { created: order.orderNumber } })
  }

  return (
    <main className="page">
      <Link className="back-link inline-back" to="/orders">← Orders</Link>
      <div className="page-heading"><div><span className="eyebrow">NEW WORK</span><h1>Create an order</h1><p>Add the essentials and keep the job moving.</p></div></div>
      {!customers.length ? <div className="panel empty-state"><span className="empty-icon">♙</span><h2>Add a customer first</h2><p>Each order belongs to a customer in your book.</p><Link to="/customers?add=true" className="btn">＋ Add a customer</Link></div> : (
        <form className="panel order-form" onSubmit={submit}>
          <div className="form-section-heading"><span className="form-step">01</span><div><h2>Order details</h2><p>Who is this order for, and what are you making?</p></div></div>
          <div className="form-grid">
            <label className="full-span">Customer<select value={form.customerId} onChange={(event) => setForm({ ...form, customerId: event.target.value })} required><option value="">Choose a customer</option>{customers.map((customer) => <option value={customer.id} key={customer.id}>{customer.name} · {customer.phone}</option>)}</select></label>
            <label>Clothing type<select value={form.item} onChange={(event) => setForm({ ...form, item: event.target.value })}><option>Shalwar Kameez</option><option>Shirt</option><option>Trousers</option><option>Pant Coat</option><option>Waistcoat</option><option>Sherwani</option><option>Ladies Suit</option><option>Other</option></select></label>
            <label>Order date<input type="date" value={form.orderDate} onChange={(event) => setForm({ ...form, orderDate: event.target.value })} required /></label>
            <label>Delivery date<input type="date" min={form.orderDate} value={form.deliveryDate} onChange={(event) => setForm({ ...form, deliveryDate: event.target.value })} required /></label>
          </div>
          <div className="form-section-heading separated"><span className="form-step">02</span><div><h2>Payment</h2><p>Track the agreed price and any advance payment.</p></div></div>
          <div className="form-grid payment-grid"><label>Total price<input type="number" min="0" step="1" placeholder="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label><label>Advance payment<input type="number" min="0" step="1" placeholder="0" value={form.advance} onChange={(event) => setForm({ ...form, advance: event.target.value })} /></label><div className="remaining-box"><span>Remaining payment</span><strong>Rs {remaining.toLocaleString()}</strong></div></div>
          <label className="notes-field">Notes <span className="optional-label">Optional</span><textarea rows="3" placeholder="Style, fabric, fitting preferences, or other details" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label>
          <div className="form-footer"><p>Order status will begin as <strong>New</strong>.</p><button className="btn">Create order <span>→</span></button></div>
        </form>
      )}
    </main>
  )
}
