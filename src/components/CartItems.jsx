import { Currencyformatter } from "../Utils/Currencyformatter"

export default function CartItems({name,price,quantity,onIncrease,onDecrease}){
  return (
    <li className='cart-item'>
    <p>
        {name}-{quantity}- {Currencyformatter.format(price)}
    </p>
    <p className='cart-item-actions'>
        <button onClick={onDecrease}>-</button><span>{quantity}</span>
        <button onClick={onIncrease}>+</button>

    </p>
    </li>
  )
}