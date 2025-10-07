import Head from 'next/head'
import { useEffect, useState } from 'react'
import menuData from '../data/menu.json'

export default function Home(){
  const [cart, setCart] = useState([])
  const phone = menuData.contact.whatsapp

  useEffect(()=>{
    const t = setTimeout(()=>{
      const el = document.getElementById('menu')
      if(el) el.scrollIntoView({behavior:'smooth'})
    }, 1200)
    return ()=>clearTimeout(t)
  }, [])

  const add = (name)=>{
    setCart(prev=>{
      const e = prev.find(i=>i.name===name)
      if(e){ return prev.map(i=>i.name===name? {...i, qty: Math.min(i.qty+1,3)}:i) }
      return [...prev, {name, qty:1}]
    })
  }
  const dec = (name)=> setCart(prev=>prev.map(i=>i.name===name? {...i, qty:i.qty-1}:i).filter(i=>i.qty>0))
  const rm  = (name)=> setCart(prev=>prev.filter(i=>i.name!==name))

  const wa = ()=>{
    if(cart.length===0) return `https://wa.me/${phone.replace(/\D/g,'')}`
    const text = 'Здравствуйте! Хочу заказать:\n' + cart.map(i=>`${i.name} — ${i.qty} шт.`).join('\n') + '\nИз Tatty Sand ☕️'
    return `https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent(text)}`
  }

  const bannerClass = menuData.ui.bannerVariant === 'black' ? 'hero black' : 'hero'

  return (
    <>
      <Head>
        <title>Tatty Sand — COFFEE & EATERY</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <main className="page">
        <section className={bannerClass}>
          <div className="hero-inner">
            <h1 className="logo">Tatty Sand</h1>
            <div className="subtitle">COFFEE & EATERY</div>
            <div className="neon">Wake Up Taraz</div>
            <p className="welcome">Добро пожаловать в <strong>Tatty Sand</strong> — место, где начинается твоё пробуждение.<br/><em>Welcome to Tatty Sand — where your wake-up begins</em></p>
          </div>
        </section>

        <section className="menu" id="menu">
          {menuData.sections.map((sec, si)=>(
            <div key={si}>
              <h2>{sec.titleRu} <span className="muted">({sec.titleEn})</span></h2>
              <ul className="grid">
                {sec.items.map((it, ii)=>(
                  <li key={ii} className="card">
                    {menuData.ui.showThumbnails && <img src={it.img} alt={it.name} className="thumb"/>}
                    <div className="info">
                      <div className="name">{it.name}</div>
                      <button className="btn" onClick={()=>add(it.name)}>Добавить (Add)</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <aside className="cart">
          <h3>Корзина</h3>
          <div className="cart-list">
            {cart.length===0? <div>Корзина пуста</div> : cart.map((it,idx)=>(
              <div key={idx} className="row">
                <div className="nm">{it.name}</div>
                <div className="qty">
                  <button onClick={()=>dec(it.name)}>-</button>
                  <span>{it.qty} шт.</span>
                  <button onClick={()=>rm(it.name)} className="rm">Удалить</button>
                </div>
              </div>
            ))}
          </div>
          <a className="wa" href={wa()}>Заказать в WhatsApp (Order in WhatsApp)</a>
          <div className="foot">TS — Taste the Wake Up (Почувствуй пробуждение)</div>
        </aside>
      </main>

      <style jsx>{`
        .page{min-height:100vh;background:linear-gradient(#f4efe8,#efecec);font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial}
        .hero{padding:48px 20px;background-image:url('/wood-texture.jpg');background-size:cover;background-position:center;color:#fff;text-align:center;position:relative}
        .hero.black{background:none;background-color:#000}
        .hero-inner{background:rgba(0,0,0,0.25);backdrop-filter:blur(2px);padding:24px;border-radius:14px;display:inline-block}
        .logo{font-size:46px;margin:0}
        .subtitle{opacity:0.95;margin-top:6px;letter-spacing:1px}
        .neon{color:#caa3ff;font-weight:700;text-shadow:0 0 10px rgba(170,90,255,0.7);margin-top:8px}
        .welcome{margin-top:10px;font-size:14px;opacity:0.95}
        .menu{max-width:1000px;margin:22px auto;padding:0 16px}
        h2{color:#4b0366;margin:16px 0 10px}
        .muted{color:#6b6b6b;font-weight:400}
        .grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        @media(max-width:820px){ .grid{grid-template-columns:1fr} }
        .card{display:flex;gap:12px;background:#fff;border-radius:14px;padding:10px;box-shadow:0 10px 22px rgba(0,0,0,0.08)}
        .thumb{width:78px;height:78px;object-fit:cover;border-radius:10px;background:#eee}
        .info{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%}
        .name{font-weight:500}
        .btn{background:#6b21a8;color:#fff;border:none;padding:8px 12px;border-radius:10px;cursor:pointer}
        .cart{position:fixed;right:20px;top:120px;width:320px;background:rgba(255,255,255,0.96);padding:16px;border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,0.15)}
        .cart .row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #eee}
        .cart .qty{display:flex;gap:6px;align-items:center}
        .cart .qty button{background:#eee;border:none;border-radius:6px;padding:4px 8px}
        .cart .qty .rm{background:#ff6b6b;color:#fff}
        .wa{display:inline-block;background:#25D366;color:#fff;padding:10px 14px;border-radius:10px;text-decoration:none;margin-top:10px}
        .foot{font-size:12px;opacity:0.8;margin-top:8px}
      `}</style>
    </>
  )
}
