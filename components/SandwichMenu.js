import Image from "next/image";

export default function SandwichMenu({ onAdd }) {
  const sandwiches = [
    { name: "Хот-дог", price: 1200, img: "/sandwiches/hotdog.jpg" },
    { name: "Клаб сэндвич", price: 1500, img: "/sandwiches/club.jpg" },
    { name: "С курицей и яйцом", price: 1400, img: "/sandwiches/chicken-egg.jpg" },
    { name: "Охотничья колбаска", price: 1300, img: "/sandwiches/hunter.jpg" },
    { name: "Микс вкусов", price: 1600, img: "/sandwiches/mix.jpg" },
  ];

  return (
    <div className="grid">
      {sandwiches.map((item, i) => (
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
