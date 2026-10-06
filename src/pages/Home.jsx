import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const features = [
  ['♙', 'Customer book', 'Keep names, contact details, notes, and fitting history together.'],
  ['⌁', 'Saved measurements', 'Record shirt and trouser measurements in inches or centimeters.'],
  ['▤', 'Order tracking', 'See what is new, in progress, ready, and delivered at a glance.'],
]

export default function Home() {
  return (
    <div className="landing">
      <motion.header className="landing-nav" initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Link to="/" className="brand"><span className="brand-mark">✂</span><span>Thread &amp; Needle<small>YOUR DIGITAL TAILOR NOTEBOOK</small></span></Link>
        <nav><a href="#features">Features</a><a href="#how-it-works">How it works</a><Link className="btn btn-light" to="/login">Log in</Link></nav>
      </motion.header>

      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>A BETTER WAY TO RUN YOUR TAILOR SHOP</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>Every customer.<br /><em>Every fitting.</em><br />All in one place.</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>A simple digital notebook for your customers, measurements, and orders. Spend less time searching and more time making.</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <Link to="/login?register=true" className="btn">Get started <span>→</span></Link>
              <a className="text-link" href="#how-it-works">See how it works</a>
            </motion.div>
            <div className="hero-trust"><span>✓</span> Simple to use <span>·</span> Works on your phone <span>·</span> Your data stays on this device</div>
          </div>
          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.94, rotate: 1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
            <div className="art-sun" />
            <div className="tape tape-one">· · · · · · · · · · · · · · · · · ·</div>
            <div className="sewing-card">
              <div className="sewing-head"><span>✳</span><div><strong>Today’s work</strong><small>YOUR SHOP AT A GLANCE</small></div><b className="live-dot" /></div>
              <div className="mini-order"><span className="mini-icon">♙</span><div><strong>Customer fitting</strong><small>Shirt · 6 measurements saved</small></div><span className="mini-status">IN PROGRESS</span></div>
              <div className="mini-order"><span className="mini-icon pale">▤</span><div><strong>New order</strong><small>Shalwar Kameez · Due Friday</small></div><span className="mini-status new">NEW</span></div>
              <div className="stitch-line" />
              <div className="measure-card"><span>✂</span><div><strong>Made to fit.</strong><small>Measurements ready whenever you are.</small></div></div>
            </div>
            <div className="floating-tag tag-top">✦ <span>Made for your craft</span></div>
            <div className="floating-tag tag-bottom"><span className="tag-check">✓</span><span>One tidy place for it all</span></div>
          </motion.div>
        </section>

        <section className="feature-section" id="features">
          <div className="section-intro"><span className="eyebrow">LESS PAPERWORK, MORE CRAFT</span><h2>The essentials, made easy.</h2><p>No complicated business software. Just the tools you need, laid out simply.</p></div>
          <div className="feature-grid">{features.map(([icon, title, copy], index) => (
            <motion.article className="feature-card" key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <span className="feature-icon">{icon}</span><h3>{title}</h3><p>{copy}</p>
            </motion.article>
          ))}</div>
        </section>

        <section className="how-section" id="how-it-works">
          <div><span className="eyebrow">YOUR WORKFLOW, SIMPLIFIED</span><h2>From first visit to perfect fit.</h2><p>Everything follows the way you already work. Start with a customer, save their measurements, then keep their order moving.</p></div>
          <div className="steps">
            {['Add a customer', 'Save their measurements', 'Create and track an order'].map((step, index) => <motion.div key={step} className="step" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><b>→</b></motion.div>)}
          </div>
        </section>
        <section className="landing-cta"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Keep your shop in good order.</h2></div><Link className="btn btn-white" to="/login?register=true">Create your account <span>→</span></Link></section>
      </main>
      <footer className="landing-footer"><Link to="/" className="brand"><span className="brand-mark">✂</span><span>Thread &amp; Needle</span></Link><span>A simple digital notebook for your tailor shop.</span><span>Thread &amp; Needle</span></footer>
    </div>
  )
}
