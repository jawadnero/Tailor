import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCustomer, getOrders } from '../Store.js'

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })

export default function CustomerProfile({ user }) {
  const { customerId } = useParams()
  const customer = getCustomer(customerId)
  if (!customer || customer.tailorId !== user.id) return <Navigate to="/customers" replace />
  const orders = getOrders(user.id).filter((order) => order.customerId === customer.id)
  const latestMeasurement = customer.measurements?.[0]

  return (
    <main className="page">
      <Link className="back-link inline-back" to="/customers">← Customer book</Link>
      <motion.section className="profile-header panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="profile-identity"><span className="avatar profile-avatar">{customer.name.charAt(0).toUpperCase()}</span><div><span className="eyebrow">CUSTOMER PROFILE</span><h1>{customer.name}</h1><p>☎ &nbsp;{customer.phone}</p>{customer.address && <p>⌖ &nbsp;{customer.address}</p>}</div></div>
        <div className="profile-actions"><Link className="btn btn-outline" to={`/customers/${customer.id}/measurements`}>⌁ &nbsp;Take measurements</Link><Link className="btn" to={`/orders/new?customer=${customer.id}`}>＋ Create new order</Link></div>
      </motion.section>
      <div className="profile-columns">
        <section className="panel">
          <div className="panel-heading"><div><h2>Measurements</h2><p>{latestMeasurement ? `Last saved ${formatDate(latestMeasurement.savedAt)}` : 'Your fitting notes, ready when you need them.'}</p></div><Link className="subtle-link" to={`/customers/${customer.id}/measurements`}>{latestMeasurement ? 'Update' : 'Add'} <span>→</span></Link></div>
          {latestMeasurement ? <div className="measurement-summary"><div className="measurement-unit">{latestMeasurement.unit === 'cm' ? 'Centimeters' : 'Inches'}</div>{Object.entries(latestMeasurement.values || {}).filter(([, value]) => value).map(([key, value]) => <div className="measure-row" key={key}><span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())}</span><strong>{value} {latestMeasurement.unit}</strong></div>)}</div> : <div className="empty-inline"><span>⌁</span><p>No measurements saved yet.</p><Link to={`/customers/${customer.id}/measurements`}>Take measurements →</Link></div>}
        </section>
        <section className="panel customer-notes"><div className="panel-heading"><div><h2>Notes</h2><p>Details to remember next time.</p></div></div><p>{customer.notes || 'No notes added.'}</p></section>
      </div>
      <section className="panel">
        <div className="panel-heading"><div><h2>Previous orders</h2><p>A record of work for {customer.name}.</p></div><Link className="subtle-link" to={`/orders/new?customer=${customer.id}`}>New order <span>→</span></Link></div>
        {orders.length ? <div className="recent-list">{orders.map((order) => <Link to="/orders" className="recent-order" key={order.id}><span className="order-symbol">✂</span><span className="recent-order-info"><strong>Order {order.orderNumber}</strong><small>{order.item} · Delivery {formatDate(order.deliveryDate)}</small></span><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></Link>)}</div> : <div className="empty-inline"><span>▤</span><p>No orders for this customer yet.</p></div>}
      </section>
    </main>
  )
}
