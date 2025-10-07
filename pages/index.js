
import CoffeeMenu from '../components/CoffeeMenu';
import SandwichMenu from '../components/SandwichMenu';

export default function Home() {
  return (
    <div>
      <div className="container">
        <header className="hero">
          <div>
            <h1>Tatty Sand</h1>
            <div>COFFEE & EATERY</div>
            <h2>Wake Up Taraz</h2>
            <p className="lead">
              Добро пожаловать в Tatty Sand — место, где начинается твоё пробуждение.
              Welcome to Tatty Sand — where your wake-up begins.
            </p>
            <div className="badges">☕ 🥪 💜</div>
          </div>
          <div className="hero-circle" />
        </header>

        <CoffeeMenu />
        <SandwichMenu />

        <div className="footer">TS — Taste the Wake Up (Почувствуй пробуждение)</div>
      </div>
    </div>
  );
}
