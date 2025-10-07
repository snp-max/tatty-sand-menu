import Head from 'next/head'
import { useEffect, useState } from 'react'
import menuData from '../data/menu.json'

export default function Home(){
  const [cart, setCart] = useState([])
  const phone = menuData.contact.whatsapp
  const heroBlack = menuData.ui.heroVariant === 'black'

  useEffect(()=>{
    const t = setTimeout(()=>{
      const el = document.getElementById('grid')
      if(el) el.scrollIntoView({behavior:'smooth'})
    }, 1600)
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

  const onImgError = (e)=>{ e.currentTarget.src = '/images/placeholder.jpg' }

  // Inline CSS variables to avoid SSR interpolation errors
  const cssVars = {
    '--accent': menuData.ui.accent,
    '--glass': menuData.ui.glassBg,
    '--bean': menuData.ui.beanAccent,
    '--backdrop': menuData.ui.backdrop
  }

  return (
    <>
      <Head>
        <title>Tatty Sand — COFFEE & EATERY</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      <main className="page" style={cssVars}>
        {/* Falling cups layer */}
        <div className="cups-layer" aria-hidden>
          {Array.from({length: 18}).map((_,i)=> <span key={i} className={`cup-fall c${(i%9)+1}`}>☕</span>)}
        </div>

        <section className={heroBlack? 'hero black' : 'hero'}>
          <div className="hero-col">
            <h1 className="title">{menuData.brand.title}</h1>
            <div className="subtitle">{menuData.brand.subtitle}</div>
            <div className="neonPlain">{menuData.brand.neon}</div>
            <p className="lead">
              {menuData.brand.welcomeRu}<br/>
              <em>{menuData.brand.welcomeEn}</em><br/>
              <span className="kz">{menuData.brand.welcomeKz}</span>
            </p>
            <a className="cta" href="#grid">View Menu • Посмотреть меню</a>
            <div className="icons">
              <span title="Wi‑Fi">📶</span><span title="Take away">🥡</span><span title="Love">❤️</span><span title="Sweet">🍩</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="cup card-shadow"></div>
            <div className="bean b1">•</div><div className="bean b2">•</div><div className="bean b3">•</div>
          </div>
        </section>

        <section id="grid" className="grid-wrap">
          {menuData.sections.map((sec, si)=>(
            <div key={si} className="section">
              <div className="section-head">
                <h2>{sec.titleRu} <span className="muted">({sec.titleEn})</span></h2>
              </div>
              <ul className="grid">
                {sec.items.map((it, ii)=>(
                  <li key={ii} className="card glass card-shadow">
                    {menuData.ui.showThumbnails && <img src={it.img} alt={it.name} className="thumb" onError={onImgError}/>}
                    <div className="info">
                      <div className="name">{it.name}</div>
                      <button className="btn" onClick={()=>add(it.name)}>Добавить</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <aside className="cart glass card-shadow">
          <h3>Корзина</h3>
          <div className="cart-list">
            {cart.length===0? <div className="muted">Корзина пуста</div> : cart.map((it,idx)=>(
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
          <div className="foot">{menuData.brand.slogan}</div>
        </aside>
      </main>

      <style jsx>{`
        .page{min-height:100vh;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial;
          background: radial-gradient(1200px 600px at 70% 0%, rgba(107,33,168,0.08), transparent 60%),
                      linear-gradient(180deg, #f5efe7 0%, #efe8e1 40%, #ece6df 100%);
          color:#2c2321; position:relative; overflow-x:hidden;
        }
        /* Falling cups */
        .cups-layer{ position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden }
        .cup-fall{ position:absolute; top:-10vh; font-size:22px; opacity:0.22; animation: fall 12s linear infinite }
        .cup-fall.c1{ left:5%; animation-delay:0s }
        .cup-fall.c2{ left:14%; animation-delay:2s }
        .cup-fall.c3{ left:23%; animation-delay:4s }
        .cup-fall.c4{ left:36%; animation-delay:1s }
        .cup-fall.c5{ left:48%; animation-delay:3s }
        .cup-fall.c6{ left:62%; animation-delay:5s }
        .cup-fall.c7{ left:74%; animation-delay:6s }
        .cup-fall.c8{ left:86%; animation-delay:7s }
        .cup-fall.c9{ left:94%; animation-delay:8s }
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity:0 }
          10% { opacity:0.22 }
          100% { transform: translateY(110vh) rotate(360deg); opacity:0.22 }
        }

        .hero{display:grid;grid-template-columns:1.1fr .9fr;gap:24px;max-width:1200px;margin:36px auto 10px;padding:0 18px; position:relative; z-index:1 }
        .hero.black{background:linear-gradient(#0a0a0a,#111);padding:28px 18px;border-radius:18px;box-shadow:0 22px 70px rgba(0,0,0,0.35)}
        .hero-col{align-self:center}
        .title{font-size:52px;margin:0}
        .subtitle{opacity:.9;letter-spacing:1px;margin-top:6px}
        .neonPlain{color: var(--accent); font-weight: 800; margin-top: 10px; font-size: 22px}
        .kz{opacity:.95}
        .lead{margin-top:12px;opacity:.9;line-height:1.5}
        .cta{display:inline-block;margin-top:14px;background:#2f1b2e;color:#fff;text-decoration:none;padding:10px 14px;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,0.2)}
        .icons{margin-top:16px;display:flex;gap:10px;font-size:18px;opacity:.85}
        .hero-art{position:relative;height:360px}
        .cup{position:absolute;right:6%;top:10%;width:320px;height:320px;border-radius:50%;background:
             radial-gradient(circle at 50% 46%, #fff 0 60%, transparent 61%),
             radial-gradient(circle at 50% 54%, rgba(0,0,0,0.06), transparent 62%),
             conic-gradient(from 0deg, #d8b89b 0 25%, #c9a183 25% 52%, #b7896e 52% 70%, #e1c7a9 70% 100%);
             filter: drop-shadow(0 18px 60px rgba(0,0,0,0.25));
             animation: float 5s ease-in-out infinite;
        }
        @keyframes float { 0% { transform: translateY(0px) } 50% { transform: translateY(-6px) } 100% { transform: translateY(0px) } }
        .bean{position:absolute;font-size:46px;color:var(--bean);opacity:.2;animation: swirl 14s linear infinite}
        .b1{left:10%;top:8%}.b2{left:24%;top:34%}.b3{left:6%;top:68%}
        @keyframes swirl { from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }

        .grid-wrap{max-width:1200px;margin:8px auto 40px;padding:0 18px; position:relative; z-index:1 }
        .section{margin-top:24px}
        .section-head{display:flex;justify-content:space-between;align-items:end}
        h2{margin:0 0 12px 0;font-size:26px;color:#3a2a27}
        .muted{color:#6c625f}
        .grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        @media(max-width:980px){ .grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
        @media(max-width:720px){ .grid{grid-template-columns:1fr} .hero{grid-template-columns:1fr} .hero-art{height:220px} .cup{width:220px;height:220px} }
        .glass{background:var(--glass);backdrop-filter: var(--backdrop); border-radius:18px}
        .card-shadow{box-shadow: 0 18px 40px rgba(0,0,0,0.12)}
        .card{display:flex;gap:14px;align-items:center;padding:14px}
        .thumb{width:84px;height:84px;object-fit:cover;border-radius:16px;background:#eee;box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05)}
        .info{display:flex;justify-content:space-between;gap:10px;align-items:center;width:100%}
        .name{font-weight:600;color:#3a2a27}
        .btn{background:var(--accent);color:#fff;border:none;padding:10px 12px;border-radius:12px;cursor:pointer}
        .cart{position:fixed;right:20px;bottom:20px;width:340px;padding:16px}
        .cart .row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(0,0,0,0.06)}
        .cart .qty{display:flex;gap:6px;align-items:center}
        .cart .qty button{background:#eee;border:none;border-radius:8px;padding:4px 8px}
        .cart .qty .rm{background:#ff6b6b;color:#fff}
        .wa{display:inline-block;background:#25D366;color:#fff;padding:10px 14px;border-radius:12px;text-decoration:none;margin-top:10px}
        .foot{font-size:12px;opacity:.85;margin-top:8px}
      `}</style>
    </>
  )
}
