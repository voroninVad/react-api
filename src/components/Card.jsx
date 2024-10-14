const Card = ({item,removeItem,changeItem}) => {
    return ( 
        <li className="card">
        <h2>{item.name}</h2>
        <h3>{item.price}</h3>
        <h4>{item.year}</h4>
        <div className="btn">
            <button onClick={() => changeItem(item.id)}>Редактировать</button>
            <button onClick={() => removeItem(item.id)}>Удалить</button>
        </div>
        </li>
     );
}
 
export default Card;