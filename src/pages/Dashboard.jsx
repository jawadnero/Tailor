import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCustomers, getOrders } from '../Store.js'

export default function Dashboard({ user }) {
  const customers = getCustomers(user.id)
  const orders = getOrders(user.id)
  const pending = orders.filter((order) => order.status !== 'Delivered')
  const completed = orders.filter((order) => order.status === 'Delivered')
  const latest = orders.slice(0, 4)
  const stats = [
    { label: 'Customers', count: customers.length, icon: '♙', to: '/customers', tone: 'lavender' },
    { label: 'All orders', count: orders.length, icon: '▤', to: '/orders', tone: 'peach' },
    { label: 'Pending orders', count: pending.length, icon: '◷', to: '/orders?status=pending', tone: 'yellow' },
    { label: 'Completed', count: completed.length, icon: '✓', to: '/orders?status=completed', tone: 'green' },
  ]

  return (
    <main className="page dashboard-page">
      <div className="page-heading dashboard-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h1>Welcome, {user.name}.</h1><p>Here’s what’s happening in your shop today.</p></div><Link to="/customers?add=true" className="btn"><span>＋</span> Add customer</Link></div>
      <section className="stat-grid">{stats.map((stat, index) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }} whileHover={{ y: -3 }}>
          <Link to={stat.to} className="stat-card"><span className={`stat-icon ${stat.tone}`}>{stat.icon}</span><span className="stat-label">{stat.label}</span><strong>{stat.count}</strong><span className="stat-more">View details <b>→</b></span></Link>
        </motion.div>
      ))}</section>

      <section className="dashboard-lower">
        <div className="panel recent-panel">
          <div className="panel-heading"><div><h2>Recent orders</h2><p>A quick look at work in progress.</p></div><Link to="/orders" className="subtle-link">All orders <span>→</span></Link></div>
          {latest.length ? <div className="recent-list">{latest.map((order) => (
            <Link to="/orders" className="recent-order" key={order.id}><span className="order-symbol">✂</span><span className="recent-order-info"><strong>{order.customerName}</strong><small>{order.orderNumber} · {order.item}</small></span><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></Link>
          ))}</div> : <div className="empty-state compact"><span className="empty-icon">▤</span><strong>Your order list is ready</strong><p>Create an order from a customer profile to see it here.</p><Link className="subtle-link" to="/customers">View customers →</Link></div>}
        </div>
        <div className="panel quick-panel"><span className="eyebrow">QUICK ACTIONS</span><h2>What would you like to do?</h2><Link to="/customers?add=true" className="quick-action"><span className="quick-icon">＋</span><span><strong>Add a customer</strong><small>Save their details and fitting notes</small></span><b>→</b></Link><Link to="/orders/new" className="quick-action"><span className="quick-icon soft">▤</span><span><strong>Create an order</strong><small>Start tracking your next job</small></span><b>→</b></Link></div>
      </section>
      <div className="dashboard-note"><span>✦</span><p><strong>A little tip</strong> Save a customer’s measurements once, and they’ll be ready for every future order.</p><Link to="/customers">Open customer book →</Link></div>
    </main>
  )
}
