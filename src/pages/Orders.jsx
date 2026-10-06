import { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getOrders, updateOrder } from '../store.js'

const STATUSES = ['New', 'Cutting', 'Stitching', 'Ready', 'Delivered']
const formatDate = (date) => date ? new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : 'Not set'

function Progress({ status }) {
  const current = Math.max(0, STATUSES.indexOf(status))
  const progress = status === 'Delivered' ? 100 : (current / (STATUSES.length - 1)) * 100
  return <div className="progress-wrap"><div className="progress-track"><motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.45 }} /></div><div className="progress-labels">{STATUSES.map((step, index) => <span key={step} className={index <= current ? 'reached' : ''}>{step}</span>)}</div></div>
}

export default function Orders({ user }) {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [orders, setOrders] = useState(() => getOrders(user.id))
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState(location.state?.created ? `Order ${location.state.created} created.` : '')
  const filter = searchParams.get('status') || 'all'
  const refresh = () => setOrders(getOrders(user.id))
  const changeStatus = (id, status) => {
    updateOrder(id, { status })
    refresh()
  }

  const filtered = orders.filter((order) => {
    const matchesSearch = `${order.customerName} ${order.phone} ${order.orderNumber} ${order.item}`.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || (filter === 'pending' ? order.status !== 'Delivered' : order.status === 'Delivered')
    return matchesSearch && matchesFilter
  })

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 3000)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <main className="page">
      <div className="page-heading"><div><span className="eyebrow">SHOP WORKFLOW</span><h1>Orders</h1><p>Track each piece from the first cut to delivery.</p></div><Link className="btn" to="/orders/new">＋ New order</Link></div>
      {notice && <motion.div className="toast" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>✓ {notice}</motion.div>}
      <div className="orders-toolbar"><div className="filter-tabs"><button className={filter === 'all' ? 'selected' : ''} onClick={() => setSearchParams({})}>All orders <span>{orders.length}</span></button><button className={filter === 'pending' ? 'selected' : ''} onClick={() => setSearchParams({ status: 'pending' })}>Pending <span>{orders.filter((order) => order.status !== 'Delivered').length}</span></button><button className={filter === 'completed' ? 'selected' : ''} onClick={() => setSearchParams({ status: 'completed' })}>Completed <span>{orders.filter((order) => order.status === 'Delivered').length}</span></button></div><label className="search-box order-search"><span>⌕</span><input aria-label="Search orders" placeholder="Search name, phone, or order number..." value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
      {!orders.length ? <div className="panel empty-state"><span className="empty-icon">▤</span><h2>Your order list is ready</h2><p>Create an order to start tracking delivery dates, payments, and progress.</p><Link className="btn" to="/orders/new">＋ Create your first order</Link></div> : filtered.length ? <div className="orders-list"><AnimatePresence>{filtered.map((order, index) => <motion.article className="panel order-card" key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: index * 0.025 }}>
        <div className="order-card-heading"><span className="order-symbol">✂</span><div className="order-title"><span className="eyebrow">ORDER {order.orderNumber}</span><h2>{order.customerName}</h2><p>{order.item} <span>·</span> {order.phone}</p></div><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></div>
        <Progress status={order.status} />
        <div className="order-card-footer"><div><span>Delivery</span><strong>{formatDate(order.deliveryDate || order.date)}</strong></div><div><span>Remaining</span><strong>Rs {Number(order.remaining ?? ((order.price || 0) - (order.advance || 0))).toLocaleString()}</strong></div><label className="status-control">Update status<select value={STATUSES.includes(order.status) ? order.status : 'New'} onChange={(event) => changeStatus(order.id, event.target.value)}>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label></div>
        {order.notes && <p className="order-notes"><span>Note:</span> {order.notes}</p>}
      </motion.article>)}</AnimatePresence></div> : <div className="panel empty-state"><span className="empty-icon">⌕</span><h2>No matching orders</h2><p>Try another search term or change the order filter.</p></div>}
    </main>
  )
}
