import { useState } from "react";
import Image from "next/image";
import CoffeeMenu from "../components/CoffeeMenu";
import SandwichMenu from "../components/SandwichMenu";

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = () => {
    const orderText = cart.map(i => `${i.name} - ${i.price}₸`).join("\n");
    const message = `Заказ Tatty Sand:\n${orderText}\n\nИтого: ${totalPrice}₸`;
    const phone = "77085977808"; // твой WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="container">
      {/* Орнамент слева */}
      <div className="ornament"></div>

      {/* Анимация падающих чашек */}
      <div className="cups-animation">
        <img src="/coffee_cup.png" className="cup" alt="coffee cup" />
        <img src="/coffee_cup.png" className="cup delay1" alt="coffee cup" />
        <img src="/coffee_cup.png" className="cup delay2" alt="coffee cup" />
        <img src="/coffee_cup.png" className="cup delay3" alt="coffee cup" />
        <img src="/coffee_cup.png" className="cup delay4" alt="coffee cup" />
      </div>

      {/* HERO блок */}
      <section className="hero">
        <div className="brand">
          <h1>
            Tatty <span className="sand">Sand</span>
          </h1>
          <p className="sub">COFFEE & EATERY</p>
          <p className="sub">Wake Up Taraz</p>
          <p className="desc">
            Добро пожаловать в Tatty Sand — место, где начинается твоё пробуждение.<br />
            Welcome to Tatty Sand — where your wake-up begins<br />
            Tatty Sand-қа қош келдіңіз — ояну осында басталады.
          </p>
        </div>

        <div className="hero-cup">
          <Image src="/hero-cup.png" alt="Coffee cup" width={320} height={320} />
        </div>
      </section>

      {/* Раздел кофе */}
      <h2 className="section-title">Кофе (Coffee)</h2>
      <CoffeeMenu onAdd={addToCart} />

      {/* Раздел сэндвичей */}
      <h2 className="section-title">Сэндвичи (Sandwiches)</h2>
      <SandwichMenu onAdd={addToCart} />

      {/* Корзина */}
      <div className="cart">
        <h3>Корзина</h3>
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <>
            <ul>
              {cart.map((item, i) => (
                <li key={i}>{item.name} - {item.price}₸</li>
              ))}
            </ul>
            <p className="total">Итого: {totalPrice}₸</p>
            <button className="btn-pill" onClick={handleOrder}>
              Заказать в WhatsApp
            </button>
          </>
        )}
      </div>

      {/* Футер */}
      <footer className="footer">
        <p>TS — Taste the Wake Up (Почувствуй пробуждение)</p>
        <div className="socials">
          <a href="https://instagram.com/tatty.sand" target="_blank">Instagram</a>
          <a href="https://tiktok.com/@tatty_sand" target="_blank">TikTok</a>
          <a href="https://wa.me/77085977808" target="_blank">WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}
