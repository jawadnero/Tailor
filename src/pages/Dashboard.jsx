import { Link } from 'react-router-dom'
import { getCustomers, getOrders } from '../Store.js'
import { useLanguage } from '../i18n'

export default function Dashboard({user}) {
 const {lang}=useLanguage(); const ur=lang==='ur'; const t=(en,urdu)=>ur?urdu:en
 const customers=getCustomers(user.id), orders=getOrders(user.id)
 const pending=orders.filter(o=>o.status!=='Delivered').length
 return <main className="page easy-dashboard">
  <section className="easy-welcome"><span className="easy-kicker">✂ {t('MY TAILOR SHOP','میری درزی کی دکان')}</span><h1>{t('Welcome','خوش آمدید')}, {user.name}!</h1><p>{t('Choose what you want to do. Just tap a big button.','جو کام کرنا ہے نیچے بڑا بٹن دبائیں۔')}</p></section>
  <section className="easy-actions">
   <Link to="/customers?add=true" className="easy-tile"><span className="easy-emoji">👤</span><strong>{t('Add Customer','نیا گاہک')}</strong><small>{t('Save name and phone','نام اور فون لکھیں')}</small></Link>
   <Link to="/orders/new" className="easy-tile"><span className="easy-emoji">✂️</span><strong>{t('New Order','نیا آرڈر')}</strong><small>{t('Start a stitching job','سلائی کا کام شروع کریں')}</small></Link>
   <Link to="/customers" className="easy-tile"><span className="easy-emoji">📏</span><strong>{t('Take Measurements','ناپ لکھیں')}</strong><small>{t('Choose customer, then tap Measurements','گاہک چنیں اور ناپ دبائیں')}</small></Link>
   <Link to="/orders" className="easy-tile"><span className="easy-emoji">📦</span><strong>{t('Check Orders','آرڈر دیکھیں')}</strong><small>{t('Check work and delivery','کام اور ڈیلیوری دیکھیں')}</small></Link>
  </section>
  <section className="easy-counts"><Link to="/customers"><strong>{customers.length}</strong><span>{t('Customers','گاہک')}</span></Link><Link to="/orders?status=pending"><strong>{pending}</strong><span>{t('Work left','باقی کام')}</span></Link><Link to="/orders?status=completed"><strong>{orders.length-pending}</strong><span>{t('Delivered','دے دیے')}</span></Link></section>
  <section className="easy-help"><h2>{t('How to use','استعمال کا طریقہ')}</h2><p>{t('1. Add customer → 2. Save measurements → 3. Make order → 4. Mark delivered','۱۔ گاہک شامل کریں ← ۲۔ ناپ لکھیں ← ۳۔ آرڈر بنائیں ← ۴۔ ڈیلیوری مکمل کریں')}</p></section>
 </main>
}
