
import MenuItem from './MenuItem';

export default function CoffeeMenu() {
  const coffee = [
    { name: 'Американо', eng: 'Americano', img: '/coffee/americano.png' },
    { name: 'Капучино', eng: 'Cappuccino', img: '/coffee/cappuccino.png' },
    { name: 'Латте', eng: 'Latte', img: '/coffee/latte.png' },
    { name: 'Мокко', eng: 'Mocha', img: '/coffee/mocha.png' },
    { name: 'Эспрессо', eng: 'Espresso', img: '/coffee/espresso.png' },
    { name: 'Флэт уайт', eng: 'Flat White', img: '/coffee/flatwhite.png' },
  ];
  return (
    <section>
      <h2>Кофе (Coffee)</h2>
      <div className="grid">
        {coffee.map((item, i) => (
          <MenuItem key={i} name={item.name} engName={item.eng} img={item.img} />
        ))}
      </div>
    </section>
  );
}
