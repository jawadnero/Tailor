import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { login, signup } from '../store'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isSignup, setIsSignup] = useState(searchParams.get('register') === 'true')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', shop: '', phone: '', email: '', password: '', identifier: '' })
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })
  const passwordScore = useMemo(() => {
    const value = form.password
    return [value.length >= 6, /[A-Za-z]/.test(value), /\d/.test(value)].filter(Boolean).length
  }, [form.password])

  const submit = (event) => {
    event.preventDefault()
    setError('')
    try {
      if (isSignup) signup(form)
      else login(form.identifier.trim(), form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  const switchMode = () => {
    setError('')
    setIsSignup((value) => !value)
  }

  return (
    <main className="auth-layout">
      <aside className="auth-aside">
        <Link to="/" className="brand"><span className="brand-mark">✂</span><span>Thread &amp; Needle<small>YOUR DIGITAL TAILOR NOTEBOOK</small></span></Link>
        <motion.div className="auth-aside-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }}>
          <span className="eyebrow">MADE FOR THE WAY YOU WORK</span><h1>Your craft deserves a little more order.</h1><p>Customers, measurements and every order — together in one calm workspace.</p>
          <div className="auth-benefits"><span>✓ Fast customer lookup</span><span>✓ Measurements always ready</span><span>✓ Clear order progress</span></div>
        </motion.div>
        <div className="auth-aside-note">✦ &nbsp;Simple tools for the work you love.</div>
        <div className="auth-orbit auth-orbit-one" /><div className="auth-orbit auth-orbit-two" />
      </aside>
      <motion.section className="auth-panel" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .45 }}>
        <Link to="/" className="back-link">← Back to home</Link>
        <div className="auth-form-wrap">
          <div className="auth-mode-pill"><button type="button" className={!isSignup ? 'active' : ''} onClick={() => isSignup && switchMode()}>Log in</button><button type="button" className={isSignup ? 'active' : ''} onClick={() => !isSignup && switchMode()}>Register</button></div>
          <AnimatePresence mode="wait">
            <motion.div key={isSignup ? 'signup' : 'login'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
              <span className="eyebrow">{isSignup ? 'START YOUR NOTEBOOK' : 'WELCOME BACK'}</span>
              <h2>{isSignup ? 'Create your account' : 'Log in to your shop'}</h2>
              <p className="form-intro">{isSignup ? 'Just the essentials. You can update your shop details later.' : 'Enter your details and continue where you left off.'}</p>
              <form className="auth-form" onSubmit={submit}>
                {isSignup ? <>
                  <div className="auth-two-col"><label>Your name<input autoComplete="name" placeholder="e.g. Ali Khan" value={form.name} onChange={update('name')} required /></label><label>Shop name<input placeholder="e.g. Ali Tailors" value={form.shop} onChange={update('shop')} required /></label></div>
                  <label>Phone number<input autoComplete="tel" type="tel" placeholder="0300 1234567" value={form.phone} onChange={update('phone')} required /></label>
                  <label>Email address <span className="optional-label">Optional</span><input autoComplete="email" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} /></label>
                </> : <label>Email or phone number<input autoFocus autoComplete="username" placeholder="Enter your email or phone" value={form.identifier} onChange={update('identifier')} required /></label>}
                <label>Password<div className="password-field"><input autoComplete={isSignup ? 'new-password' : 'current-password'} type={showPassword ? 'text' : 'password'} placeholder={isSignup ? 'Create a password' : 'Enter your password'} value={form.password} onChange={update('password')} required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>
                {isSignup && form.password && <div className="password-strength"><div><i className={passwordScore >= 1 ? 'on' : ''}/><i className={passwordScore >= 2 ? 'on' : ''}/><i className={passwordScore >= 3 ? 'on' : ''}/></div><span>{passwordScore === 3 ? 'Good password' : 'Use 6+ characters with letters and numbers'}</span></div>}
                <AnimatePresence>{error && <motion.p className="form-error" role="alert" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{error}</motion.p>}</AnimatePresence>
                <button className="btn auth-submit">{isSignup ? 'Create my workspace' : 'Log in'} <span>→</span></button>
              </form>
              <p className="auth-toggle">{isSignup ? 'Already have an account?' : 'New to Thread & Needle?'} <button onClick={switchMode}>{isSignup ? 'Log in' : 'Create an account'}</button></p>
              {!isSignup && <button className="demo-hint demo-button" type="button" onClick={() => setForm({ ...form, identifier: 'ali@demo.com', password: '1234' })}>Try demo account <strong>ali@demo.com</strong> · <span>Fill details</span></button>}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>
    </main>
  )
}
