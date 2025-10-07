import Head from 'next/head'
import { useEffect, useState } from 'react'

const MENU = {
  coffee: [
    'Эспрессо (Espresso)',
    'Американо (Americano)',
    'Капучино (Cappuccino)',
    'Латте (Latte)',
    'Флэт уайт (Flat White)',
    'Мокко (Mocha)',
    'Раф (Raf)',
    'Айс Латте (Iced Latte)',
    'Карамельный Латте (Caramel Latte)',
    'Ванильный Латте (Vanilla Latte)',
    'Матча Латте (Matcha Latte)',
    'Какао (Cocoa)'
  ],
  cold: [
    'Айс Американо (Iced Americano)',
    'Айс Капучино (Iced Cappuccino)',
    'Лимонад — классический / ягодный / цитрусовый (Lemonade)',
    'Милкшейк — (ваниль / шоколад / клубника) (Milkshake)'
  ],
  sandwiches: [
    'The Classic Drive (Классический колбасный)',
    'Spicy Nuggets Shot (Наггетсы в остром соусе)',
    'Chicken Roll Up (Куриный рулет)',
    'Hot Street Dog (Хот-дог)',
    'Cheesy Chick Melt (Курица с сыром)',
    'Sunny Chick (Курица с яйцом)',
    "Hunter's Bite (Охотничьи колбаски)"
  ]
}

export default function Home() {
  const phone = '+77085977808'
  const [cart, setCart] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      const menuEl = document.getElementById('menu')
      if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' })
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const addToCart = (name) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name)
      if (existing) {
        return prev.map(i => i.name === name ? { ...i, qty: Math.min(i.qty + 1, 3) } : i)
      }
      return [...prev, { name, qty: 1 }]
    })
  }

  const decItem = (name) => setCart(prev => prev.map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0))
  const removeItem = (name) => setCart(prev => prev.filter(i => i.name !== name))
  const buildWhatsAppLink = () => {
    if (cart.length === 0) return `https://wa.me/${phone.replace(/\D/g,'')}`
    const items = cart.map(i => `${i.name} — ${i.qty} шт.`)
    const text = encodeURIComponent('Здравствуйте! Хочу заказать:\n' + items.join('\n') + '\nИз Tatty Sand ☕️')
    return `https://wa.me/${phone.replace(/\D/g,'')}?text=${text}`
  }

  return (
    <>
      <Head>
        <title>Tatty Sand — COFFEE & EATERY</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <main className="page fancy-bg">
        {/* Falling cups */}
        <div className="cups-layer" aria-hidden>
          {Array.from({length: 14}).map((_,i)=> <span key={i} className={`cup c${(i%7)+1}`}>☕</span>)}
        </div>

        <section className="hero">
          <div className="hero-inner">
            <h1 className="logo with-steam">Tatty Sand</h1>
            <div className="subtitle">COFFEE & EATERY</div>
            <div className="neon">Wake Up Taraz</div>
            <p className="welcome">Добро пожаловать в <strong>Tatty Sand</strong> — место, где начинается твоё пробуждение.<br/><em>Welcome to Tatty Sand — where your wake-up begins</em></p>
          </div>
        </section>

        <section className="menu" id="menu">
          <h2>Кофе (Coffee)</h2>
          <ul className="items">
            {MENU.coffee.map((it, idx)=>(
              <li key={idx} className="item">
                <div className="item-name">{it}</div>
                <div className="item-actions">
                  <button onClick={()=>addToCart(it)} className="btn add">Добавить</button>
                </div>
              </li>
            ))}
          </ul>

          <h2>Холодные напитки (Cold Drinks)</h2>
          <ul className="items">
            {MENU.cold.map((it, idx)=>(
              <li key={idx} className="item">
                <div className="item-name">{it}</div>
                <div className="item-actions">
                  <button onClick={()=>addToCart(it)} className="btn add">Добавить</button>
                </div>
              </li>
            ))}
          </ul>

          <h2>Сэндвичи Tatty Sand (Tatty Sand Sandwiches)</h2>
          <ul className="items">
            {MENU.sandwiches.map((it, idx)=>(
              <li key={idx} className="item">
                <div className="item-name">{it}</div>
                <div className="item-actions">
                  <button onClick={()=>addToCart(it)} className="btn add">Добавить</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="cart" id="cart">
          <h3>Корзина</h3>
          <div className="cart-list">
            {cart.length===0 ? <div>Корзина пуста</div> : cart.map((it, idx)=>(
              <div key={idx} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid #eee'}}>
                <div style={{flex:'1 1 auto'}}>{it.name}</div>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  <button onClick={()=>decItem(it.name)} style={{background:'#eee',borderRadius:6,padding:'4px 8px',border:'none'}}>-</button>
                  <div style={{minWidth:30,textAlign:'center'}}>{it.qty} шт.</div>
                  <button onClick={()=>removeItem(it.name)} style={{background:'#ff6b6b',color:'#fff',border:'none',padding:'4px 8px',borderRadius:6}}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
          <div className="order-row">
            <a id="wa-order" className="wa-btn" href={buildWhatsAppLink()}>Заказать в WhatsApp (Order in WhatsApp)</a>
          </div>
          <div className="footer-note">TS — Taste the Wake Up (Почувствуй пробуждение)</div>
          <div className="qr-block">
            <img src="/qr-placeholder.svg" alt="QR" />
            <div className="qr-caption">Сканируй и закажи / Scan & Order</div>
          </div>
        </aside>
      </main>

      <style jsx>{`
        .page{min-height:100vh;font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;}
        .fancy-bg{
          background:
            radial-gradient(1200px 400px at 50% -200px, rgba(107,33,168,0.25), transparent 60%),
            linear-gradient(#f4efe8, #efecec);
          position: relative;
          overflow: hidden;
        }
        .cups-layer{
          position:fixed; inset:0; pointer-events:none; overflow:hidden; z-index:0;
        }
        .cup{
          position:absolute; top:-10vh; font-size:20px; opacity:0.2; animation:fall 12s linear infinite;
        }
        .cup.c1{ left:5%; animation-delay:0s }
        .cup.c2{ left:15%; animation-delay:2s }
        .cup.c3{ left:28%; animation-delay:4s }
        .cup.c4{ left:42%; animation-delay:1s }
        .cup.c5{ left:58%; animation-delay:3s }
        .cup.c6{ left:72%; animation-delay:5s }
        .cup.c7{ left:88%; animation-delay:6s }
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0 }
          10% { opacity: 0.25 }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.25 }
        }

        .hero{
          padding:56px 20px 24px;
          background-image: url('/wood-texture.jpg');
          background-size:cover; background-position:center;
          color:#fff; text-align:center; position:relative; z-index:1;
        }
        .hero-inner{ backdrop-filter: blur(2px); padding:26px; border-radius:16px; background:rgba(0,0,0,0.25); box-shadow: 0 12px 40px rgba(0,0,0,0.25) }
        .logo{ font-size:48px; margin:0; color:#fff; position:relative; display:inline-block }
        .logo.with-steam::after{
          content:''; position:absolute; left:50%; transform:translateX(-50%);
          top:-18px; width:90px; height:90px;
          background: radial-gradient(circle at 50% 80%, rgba(255,255,255,0.35), rgba(202,163,255,0.15) 60%, transparent 70%);
          filter: blur(10px);
          animation: steam 3.5s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes steam {
          0% { opacity:0.2; transform: translateX(-50%) translateY(8px) scale(0.9) }
          50% { opacity:0.5; transform: translateX(-50%) translateY(-8px) scale(1.05) }
          100% { opacity:0.2; transform: translateX(-50%) translateY(8px) scale(0.9) }
        }
        .subtitle{ opacity:0.95; margin-top:6px; letter-spacing: 1px }
        .neon{ color:#caa3ff; font-weight:700; text-shadow:0 0 10px rgba(170,90,255,0.7), 0 0 20px rgba(170,90,255,0.5); margin-top:10px; font-size:22px }
        .welcome{ margin-top:12px; font-size:14px; opacity:0.95 }

        .menu{ max-width:960px; margin:26px auto; padding:18px; z-index:1; position:relative }
        h2{ color:#4b0366; margin:18px 0 12px; text-shadow: 0 1px 0 #fff }
        .items{ list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:12px }
        @media(max-width:820px){ .items{ grid-template-columns:1fr } }
        .item{ background:#fff; border-radius:14px; padding:12px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 10px 22px rgba(0,0,0,0.08) }
        .item-name{ font-weight:500 }
        .btn.add{ background:#6b21a8; color:#fff; border:none; padding:8px 12px; border-radius:10px; cursor:pointer; transition: transform .05s }
        .btn.add:active{ transform: scale(0.98) }

        .cart{ position:fixed; right:20px; top:140px; width:320px; background:rgba(255,255,255,0.96); padding:16px; border-radius:16px; box-shadow:0 18px 40px rgba(0,0,0,0.15); z-index:2 }
        .cart h3{ margin-top:0 }
        .cart-list{ max-height:320px; overflow:auto }
        .order-row{ margin-top:12px }
        .wa-btn{ display:inline-block; background:#25D366; color:#fff; padding:10px 14px; border-radius:10px; text-decoration:none }
        .footer-note{ font-size:12px; opacity:0.8; margin-top:8px }
        .qr-block{ margin-top:12px; text-align:center }
        .qr-block img{ width:140px; height:140px }
        .qr-caption{ margin-top:8px; font-size:12px }
        @media(max-width:900px){ .cart{ position:static; width:auto; margin:16px } }
      `}</style>
    </>
  )
}
