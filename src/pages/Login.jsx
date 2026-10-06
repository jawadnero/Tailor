import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { login, signup } from '../store'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isSignup, setIsSignup] = useState(searchParams.get('register') === 'true')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', shop: '', phone: '', email: '', password: '' })
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })

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

  return (
    <main className="auth-layout">
      <aside className="auth-aside">
        <Link to="/" className="brand"><span className="brand-mark">✂</span><span>Thread &amp; Needle<small>YOUR DIGITAL TAILOR NOTEBOOK</small></span></Link>
        <div className="auth-aside-copy"><span className="eyebrow">MADE FOR THE WAY YOU WORK</span><h1>Your craft deserves a little more order.</h1><p>Keep your customer book, measurements, and orders close at hand.</p></div>
        <div className="auth-aside-note">✦ &nbsp;Simple tools for the work you love.</div>
      </aside>
      <motion.section className="auth-panel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/" className="back-link">← Back to home</Link>
        <div className="auth-form-wrap">
          <span className="eyebrow">{isSignup ? 'START YOUR NOTEBOOK' : 'WELCOME BACK'}</span>
          <h2>{isSignup ? 'Create your account' : 'Log in to your shop'}</h2>
          <p className="form-intro">{isSignup ? 'A few details and your workspace is ready.' : 'Pick up right where your work left off.'}</p>
          <form className="auth-form" onSubmit={submit}>
            {isSignup ? (
              <>
                <label>Tailor name<input autoComplete="name" placeholder="Your name" value={form.name} onChange={update('name')} required /></label>
                <label>Shop name<input placeholder="Your shop name" value={form.shop} onChange={update('shop')} required /></label>
                <label>Phone number<input autoComplete="tel" type="tel" placeholder="e.g. 0300 1234567" value={form.phone} onChange={update('phone')} required /></label>
                <label>Email address <span className="optional-label">Optional</span><input autoComplete="email" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} /></label>
              </>
            ) : (
              <label>Email or phone number<input autoComplete="username" placeholder="Enter your email or phone" value={form.identifier || ''} onChange={update('identifier')} required /></label>
            )}
            <label>Password<input autoComplete={isSignup ? 'new-password' : 'current-password'} type="password" placeholder="Enter your password" value={form.password} onChange={update('password')} required /></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="btn auth-submit">{isSignup ? 'Create account' : 'Log in'} <span>→</span></button>
          </form>
          <p className="auth-toggle">{isSignup ? 'Already have an account?' : 'New to Thread & Needle?'} <button onClick={() => { setError(''); setIsSignup(!isSignup) }}>{isSignup ? 'Log in' : 'Create an account'}</button></p>
          {!isSignup && <div className="demo-hint">Demo login <strong>ali@demo.com</strong> · password <strong>1234</strong></div>}
        </div>
      </motion.section>
    </main>
  )
}
