import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { currentUser, logout } from './store.js'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import CustomerProfile from './pages/CustomerProfile'
import Measurements from './pages/Measurements'
import Orders from './pages/Orders'
import NewOrder from './pages/NewOrder'
import Settings from './pages/Settings'

const menu = [
  { to: '/dashboard', label: 'Dashboard', icon: '⌂' },
  { to: '/customers', label: 'Customers', icon: '♙' },
  { to: '/orders', label: 'Orders', icon: '▤' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
]

function Workspace({ user }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)

  const signOut = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <motion.aside className="sidebar" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Link to="/dashboard" className="brand"><span className="brand-mark">✂</span><span>Thread &amp; Needle<small>TAILOR WORKSPACE</small></span></Link>
        <div className="sidebar-label">MENU</div>
        <nav className="side-links">
          {menu.map((item) => (
            <Link key={item.to} to={item.to} className={location.pathname.startsWith(item.to) ? 'active' : ''}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="user-mini"><span className="avatar">{user.name.charAt(0).toUpperCase()}</span><span>{user.name}<small>{user.shop || 'Your shop'}</small></span></div>
          <button className="logout-link" onClick={signOut}>↪ <span>Log out</span></button>
        </div>
      </motion.aside>

      <div className="workspace-main">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark">✂</span> Thread &amp; Needle</div>
          <div className="topbar-greeting">A simpler way to keep your work in order.</div>
          <Link to="/settings" className="topbar-user"><span className="avatar">{user.name.charAt(0).toUpperCase()}</span><span>{user.name}</span></Link>
        </header>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} className="route-content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/customers" element={<Customers user={user} />} />
              <Route path="/customers/:customerId" element={<CustomerProfile user={user} />} />
              <Route path="/customers/:customerId/measurements" element={<Measurements user={user} />} />
              <Route path="/orders" element={<Orders user={user} />} />
              <Route path="/orders/new" element={<NewOrder user={user} />} />
              <Route path="/settings" element={<Settings user={user} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link className={location.pathname.startsWith('/dashboard') ? 'active' : ''} to="/dashboard"><span>⌂</span>Home</Link>
          <Link className={location.pathname.startsWith('/customers') ? 'active' : ''} to="/customers"><span>♙</span>Customers</Link>
          <Link className={location.pathname.startsWith('/orders') ? 'active' : ''} to="/orders"><span>▤</span>Orders</Link>
          <button onClick={() => setMoreOpen(!moreOpen)}><span>•••</span>More</button>
          {moreOpen && <div className="mobile-more"><Link to="/settings" onClick={() => setMoreOpen(false)}>Settings</Link><button onClick={signOut}>Log out</button></div>}
        </nav>
      </div>
    </div>
  )
}

export default function App() {
  useLocation()
  const user = currentUser()
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/*" element={user ? <Workspace user={user} /> : <Navigate to="/login" replace />} />
    </Routes>
  )
}
