import Head from 'next/head'
import { useEffect, useState } from 'react'
import menuData from '../data/menu.json'

const PLACEHOLDER_DATAURL = 'data:image/png;base64,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CCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEI0QAgBEI4QAANEIIQBANEIIABCNEAIARCOEAADRCCEAQDRCCAAQjRACAEQjhAAA0QghAEA0QggAEO3/AboaPYK+yggMAAAAAElFTkSuQmCC'

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
      if(e){ return prev.map(i=>i.name===name? { ...i, qty: Math.min(i.qty+1,3)}:i) }
      return [...prev, {name, qty:1}]
    })
  }
  const dec = (name)=> setCart(prev=>prev.map(i=>i.name===name? { ...i, qty:i.qty-1}:i).filter(i=>i.qty>0))
  const rm  = (name)=> setCart(prev=>prev.filter(i=>i.name!==name))
  const wa = ()=>{
    if(cart.length===0) return `https://wa.me/${phone.replace(/\D/g,'')}`
    const text = 'Здравствуйте! Хочу заказать:\n' + cart.map(i=>`${i.name} — ${i.qty} шт.`).join('\n') + '\nИз Tatty Sand ☕️'
    return `https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent(text)}`
  }

  const onImgError = (e)=>{ e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_DATAURL }

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

      <main className="page" style={{cssVars}}>
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
