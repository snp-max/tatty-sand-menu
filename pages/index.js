import Head from 'next/head'

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
  const phone = '+77085977808' // business WhatsApp number provided
  const siteUrl = 'https://tattysand-menu.vercel.app' // placeholder, replace with real after deploy
  const whatsappLink = (items) => {
    const text = encodeURIComponent('Здравствуйте! Хочу заказать:\n' + items.join('\n') + '\nИз Tatty Sand ☕️')
    return `https://wa.me/${phone.replace(/\D/g,'')}?text=${text}`
  }

  // Simple cart in-memory for demo (client-side)
  if (typeof window !== 'undefined' && !window.__tatty_cart_init) {
    window.__tatty_cart = []
    window.__tatty_cart_init = true
  }

  const addToCart = (name) => {
    const cart = window.__tatty_cart
    const item = cart.find(i=>i.name===name)
    if (item) {
      if (item.qty < 3) item.qty += 1
    } else {
      cart.push({name, qty:1})
    }
    // trigger re-render
    const ev = new CustomEvent('tattycart:update')
    window.dispatchEvent(ev)
  }

  const decItem = (name) => {
    const cart = window.__tatty_cart
    const item = cart.find(i=>i.name===name)
    if (!item) return
    item.qty -= 1
    if (item.qty <= 0) {
      const idx = cart.findIndex(i=>i.name===name)
      cart.splice(idx,1)
    }
    const ev = new CustomEvent('tattycart:update')
    window.dispatchEvent(ev)
  }

  const removeItem = (name) => {
    const cart = window.__tatty_cart
    const idx = cart.findIndex(i=>i.name===name)
    if (idx>=0) cart.splice(idx,1)
    const ev = new CustomEvent('tattycart:update')
    window.dispatchEvent(ev)
  }

  return (
    <>
      <Head>
        <title>Tatty Sand — COFFEE & EATERY</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <main className="page">
        <section className="hero">
          <div className="hero-inner">
            <h1 className="logo">Tatty Sand</h1>
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
            {MENU.cold.map((it, idx)=>(<li key={idx} className="item"><div className="item-name">{it}</div><div className="item-actions"><button onClick={()=>addToCart(it)} className="btn add">Добавить</button></div></li>))}
          </ul>

          <h2>Сэндвичи Tatty Sand (Tatty Sand Sandwiches)</h2>
          <ul className="items">
            {MENU.sandwiches.map((it, idx)=>(<li key={idx} className="item"><div className="item-name">{it}</div><div className="item-actions"><button onClick={()=>addToCart(it)} className="btn add">Добавить</button></div></li>))}
          </ul>

        </section>

        <aside className="cart" id="cart">
          <h3>Корзина</h3>
          <div className="cart-list" id="cart-list">
            <CartList decItem={decItem} removeItem={removeItem} />
          </div>
          <div className="order-row">
            <a id="wa-order" className="wa-btn" href={whatsappLink([])} onClick={(e)=>{ // update href before navigation
              e.preventDefault()
              const cart = window.__tatty_cart || []
              if (cart.length===0) {
                alert('Корзина пуста — добавьте позиции.')
                return
              }
              const items = cart.map(i=>`${i.name} — ${i.qty} шт.`)
              window.location.href = `https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent('Здравствуйте! Хочу заказать:\n' + items.join('\n') + '\nИз Tatty Sand ☕️')}`
            }}>Заказать в WhatsApp (Order in WhatsApp)</a>
          </div>
          <div className="footer-note">TS — Taste the Wake Up (Почувствуй пробуждение)</div>
          <div className="qr-block">
            <img src="/qr-placeholder.svg" alt="QR" />
            <div className="qr-caption">Сканируй и закажи / Scan & Order</div>
          </div>
        </aside>
      </main>

      <style jsx>{`
        .page{min-height:100vh;background: linear-gradient(#f4efe8, #efecec);font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;}
        .hero{padding:36px 20px 12px;background-image: url('/wood-texture.jpg');background-size:cover;background-position:center;color:#fff;text-align:center;position:relative;overflow:hidden;}
        .hero-inner{backdrop-filter: blur(2px);padding:26px;border-radius:12px;background:rgba(0,0,0,0.2);}
        .logo{font-size:44px;margin:0;color:#fff}
        .subtitle{opacity:0.9;margin-top:6px}
        .neon{color:#caa3ff;font-weight:700;text-shadow:0 0 10px rgba(170,90,255,0.7);margin-top:10px;font-size:20px}
        .welcome{margin-top:12px;font-size:14px;opacity:0.95}
        .menu{max-width:860px;margin:20px auto;padding:18px}
        h2{color:#4b0366;margin:18px 0 8px}
        .items{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr;gap:10px}
        .item{background:#fff;border-radius:12px;padding:12px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 6px 16px rgba(0,0,0,0.06)}
        .btn.add{background:#6b21a8;color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer}
        .cart{position:fixed;right:20px;top:120px;width:320px;background:rgba(255,255,255,0.95);padding:14px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.12)}
        .cart h3{margin-top:0}
        .cart-list{max-height:300px;overflow:auto}
        .order-row{margin-top:10px}
        .wa-btn{display:inline-block;background:#25D366;color:#fff;padding:10px 14px;border-radius:10px;text-decoration:none}
        .footer-note{font-size:12px;opacity:0.8;margin-top:8px}
        .qr-block{margin-top:12px;text-align:center}
        .qr-block img{width:140px;height:140px}
        .qr-caption{margin-top:8px;font-size:12px}
        @media(max-width:900px){ .cart{position:static;width:auto;margin:16px} }
      `}</style>

      <script dangerouslySetInnerHTML={{__html: `
        // simple cart render
        function renderCart() {
          const root = document.getElementById('cart-list')
          if (!root) return
          const cart = window.__tatty_cart || []
          if (cart.length===0) {
            root.innerHTML = '<div>Корзина пуста</div>'
            return
          }
          root.innerHTML = cart.map(i=>\`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #eee"><div>\${i.name}</div><div style="display:flex;gap:6px;align-items:center"><button onclick="(function(){window.__tatty_cart.forEach(function(it){if(it.name==='${'${i.name}'}'){}})})();" style="background:#eee;border-radius:6px;padding:4px 8px;border:none"> \${i.qty} шт.</button><button onclick="(function(){ const evt = new CustomEvent('tattycart:dec', {detail:'${i.name}'}); window.dispatchEvent(evt); })()" style="background:#fff;border-radius:6px;padding:4px 8px;border:1px solid #ddd">−</button><button onclick="(function(){ const evt = new CustomEvent('tattycart:remove', {detail:'${i.name}'}); window.dispatchEvent(evt); })()" style="background:#ff6b6b;color:#fff;border:none;padding:4px 8px;border-radius:6px">Удалить</button></div></div>\`).join('')
        }
        window.addEventListener('tattycart:update', renderCart)
        window.addEventListener('tattycart:dec', function(e){ const name = e.detail; (function(){ const cart = window.__tatty_cart; const item = cart.find(i=>i.name===name); if(item){ item.qty -=1; if(item.qty<=0){ const idx = cart.findIndex(i=>i.name===name); if(idx>=0) cart.splice(idx,1); } } const ev = new CustomEvent('tattycart:update'); window.dispatchEvent(ev); })() })
        window.addEventListener('tattycart:remove', function(e){ const name = e.detail; (function(){ const cart = window.__tatty_cart; const idx = cart.findIndex(i=>i.name===name); if(idx>=0) cart.splice(idx,1); const ev = new CustomEvent('tattycart:update'); window.dispatchEvent(ev); })() })
        // auto scroll behavior: show welcome then scroll to menu
        window.addEventListener('load', function(){
          setTimeout(function(){
            const menu = document.getElementById('menu')
            if(menu) menu.scrollIntoView({behavior:'smooth'})
          }, 2000)
        })
        // initial render
        setTimeout(renderCart, 100)
      `}}/>
    </>
  )
}

function CartList({decItem, removeItem}) {
  if (typeof window === 'undefined') return null
  const cart = (typeof window !== 'undefined' && window.__tatty_cart) || []
  return (
    <div>
      {cart.length===0 ? <div>Корзина пуста</div> : cart.map((it,idx)=>(
        <div key={idx} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid #eee'}}>
          <div style={{flex:'1 1 auto'}}>{it.name}</div>
          <div style={{display:'flex',gap:6,alignItems:'center'}}>
            <button onClick={()=>{ window.dispatchEvent(new CustomEvent('tattycart:dec', {detail:it.name})) }} style={{background:'#eee',borderRadius:6,padding:'4px 8px',border:'none'}}>-</button>
            <div style={{minWidth:30,textAlign:'center'}}>{it.qty} шт.</div>
            <button onClick={()=>{ window.dispatchEvent(new CustomEvent('tattycart:remove', {detail:it.name})) }} style={{background:'#ff6b6b',color:'#fff',border:'none',padding:'4px 8px',borderRadius:6}}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  )
}
