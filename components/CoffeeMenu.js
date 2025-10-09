import Image from "next/image";

export default function CoffeeMenu({ onAdd }) {
  const coffee = [
    { name: "Американо", price: 700, img: "/coffee/americano.jpg" },
    { name: "Капучино", price: 900, img: "/coffee/cappuccino.jpg" },
    { name: "Латте", price: 900, img: "/coffee/latte.jpg" },
    { name: "Мокко", price: 950, img: "/coffee/mocha.jpg" },
    { name: "Эспрессо", price: 600, img: "/coffee/espresso.jpg" },
    { name: "Флэт Уайт", price: 950, img: "/coffee/flatwhite.jpg" },
  ];

  return (
    <div className="grid">
      {coffee.map((item, i) => (
        <div className="card" key={i}>
          <div className="thumb">
            <Image src={item.img} alt={item.name} width={88} height={88} />
          </div>
          <h3>{item.name}</h3>
          <p className="price">{item.price}₸</p>
          <button className="btn-pill" onClick={() => onAdd(item)}>Добавить</button>
        </div>
      ))}
    </div>
  );
}
