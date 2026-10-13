import Icon from './Icon'
import { useEffect, useState } from 'react'
import { LanguageProvider } from './i18n'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { currentUser, logout, getOrders } from './Store.js'
const getOrdersForBadge = (id) => getOrders(id).filter(o => o.status !== 'Delivered').length
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import CustomerProfile from './pages/CustomerProfile'
import Measurements from './pages/Measurements'
import Orders from './pages/Orders'
import NewOrder from './pages/NewOrder'
import Settings from './pages/Settings'
import Products from './pages/Products'
import Payments from './pages/Payments'
import Reports from './pages/Reports'
import MeasurementsIndex from './pages/MeasurementsIndex'

const menu = [
  {to:'/dashboard',label:'Dashboard',icon:'home'},
  {to:'/customers',label:'Customers',icon:'users'},
  {to:'/orders',label:'Orders',icon:'clipboard'},
  {to:'/measurements',label:'Measurements',icon:'ruler'},
  {to:'/products',label:'Products / Services',icon:'box'},
  {to:'/payments',label:'Payments',icon:'card'},
  {to:'/reports',label:'Reports',icon:'chart'},
  {to:'/settings',label:'Settings',icon:'settings'},
]

function Workspace({ user }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <motion.aside className="sidebar" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Link to="/dashboard" className="brand"><span className="brand-mark"><Icon name="scissors" size={49}/></span><span>Darzi <em>Market</em><small>TAILOR SHOP MANAGEMENT</small></span></Link>
        
        <div className="sidebar-brand-divider" aria-hidden="true" />
        <nav className="side-links">
          {menu.map((item) => (
            <Link key={item.label} to={item.to} className={location.pathname.startsWith(item.to) ? 'active' : ''}>
              <span className={`nav-icon nav-icon-${item.icon}`}><Icon name={item.icon} size={24}/></span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="user-mini"><span className="avatar">{user.name.charAt(0).toUpperCase()}</span><span>{user.name}<small>{'Owner'}</small></span></div>
          <button className="logout-link" onClick={signOut}><Icon name="logout" size={22}/> <span>Log out</span></button>
        </div>
      </motion.aside>

      <div className="workspace-main">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark"><Icon name="scissors" size={49}/></span> Darzi <em>Market</em></div>
          <label className="global-search"><span><Icon name="search" size={21}/></span><input placeholder="Search customers, orders, measurements..." onKeyDown={(e)=>{if(e.key==='Enter') navigate('/customers?search='+encodeURIComponent(e.currentTarget.value))}} /></label>
          <span className="notification-bell" aria-label="Notifications"><Icon name="bell" size={23}/><b>{Math.min(9,  getOrdersForBadge(user.id))}</b></span>
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
              <Route path="/measurements" element={<MeasurementsIndex user={user} />} />
              <Route path="/products" element={<Products user={user} />} />
              <Route path="/payments" element={<Payments user={user} />} />
              <Route path="/reports" element={<Reports user={user} />} />
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
  const [user, setUser] = useState(() => currentUser())
  useEffect(() => {
    const syncUser = () => setUser(currentUser())
    window.addEventListener('darzi:auth-changed', syncUser)
    window.addEventListener('storage', syncUser)
    return () => {
      window.removeEventListener('darzi:auth-changed', syncUser)
      window.removeEventListener('storage', syncUser)
    }
  }, [])
  return (
    <LanguageProvider><Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/*" element={user ? <Workspace user={user} /> : <Navigate to="/login" replace />} />
    </Routes></LanguageProvider>
  )
}
