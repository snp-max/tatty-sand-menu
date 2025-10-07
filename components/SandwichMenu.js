
import MenuItem from './MenuItem';

export default function SandwichMenu() {
  const sandwiches = [
    { name: 'Охотничий Сэндвич', eng: "Hunter's Bite", img: '/sandwiches/hunters.png' },
    { name: 'Микс Вкусов', eng: 'Flavor Mix', img: '/sandwiches/mix.png' },
    { name: 'Куриный с яйцом', eng: 'Egg & Chicken', img: '/sandwiches/chicken_egg.png' },
    { name: 'Хот-дог', eng: 'Hot Dog Classic', img: '/sandwiches/hotdog.png' },
    { name: 'Клаб Дуэт', eng: 'Club Duet', img: '/sandwiches/club_duet.png' },
  ];
  return (
    <section>
      <h2>Сэндвичи Tatty Sand (Tatty Sand Sandwiches)</h2>
      <div className="grid">
        {sandwiches.map((item, i) => (
          <MenuItem key={i} name={item.name} engName={item.eng} img={item.img} />
        ))}
      </div>
    </section>
  );
}
