
export default function MenuItem({ name, engName, img }) {
  return (
    <div className="card">
      <img src={img} alt={name} />
      <div className="item-title">{name}</div>
      <div className="item-sub">{engName}</div>
      <button className="btn">Добавить</button>
    </div>
  );
}
