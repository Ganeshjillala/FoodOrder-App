import { useContext } from "react";
import {Currencyformatter} from "../Utils/Currencyformatter";
import Button from "./Button";
import CartContext from "./Cart";
export default function MealItem({ meal }) {

  const cartctxt= useContext(CartContext)

  function handlecartitem(){
    cartctxt.additem(meal)
  }
    return (
      <ul className="meal-item">
        <article>
          <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
           <div> 
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{Currencyformatter.format(meal.price)}</p>
            <p className="meal-item-description">{meal.description}</p>
          </div>
          <p className="meal-item-actions">
            <Button onClick={handlecartitem}>Add to Cart</Button>
          </p>
        </article>
      </ul>
    );
  }