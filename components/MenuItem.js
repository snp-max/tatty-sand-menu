export default function MenuItem({ name, engName, price, img }) {
  return (
    <div className="card">
      <div className="thumb">
        {/* Если картинка есть — покажем её, иначе оставим стилизованный круг */}
        {img ? <img src={img} alt={name} /> : null}
      </div>
      <h3>{name}</h3>
      <div className="sub">{engName}</div>
      <div className="price">{price}</div>
      <button className="btn-pill">Добавить</button>
    </div>
  );
}
