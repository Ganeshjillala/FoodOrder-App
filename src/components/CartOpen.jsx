import Modal from "./Modal"
import CartContext from "./Cart"
import { useContext } from "react"
import { Currencyformatter } from "../Utils/Currencyformatter"
import Button from "./Button"
import ProgressContext from "./UserProgressCart"
import CartItems from "./CartItems"
export default function CartOpen(){

const cartctxt= useContext(CartContext)
 const progressctxt=useContext(ProgressContext)

const cartTotal= cartctxt.items.reduce((TotalPrice,item)=>TotalPrice + item.quantity*item.price ,0)
      
     function handlehideCart(){
        progressctxt.hideCart()
     }
     
     function handleshowcheckout(){
        progressctxt.showCheckout()
     }
    return (
        <Modal className="Cart" open={progressctxt.progress==='cart'} onClose={progressctxt.progress==='cart'? handlehideCart:null}>
         <h2>Cart Items</h2>
         <ul>{cartctxt.items.map((item)=>(
            <CartItems 
            key={item.id}
            name={item.name} quantity={item.quantity} price={item.price} 
            onIncrease={()=>cartctxt.additem(item)}
            onDecrease={()=>cartctxt.removeitem(item.id)}/>
         ))}</ul>
         <p className="cart-total">{Currencyformatter.format(cartTotal)}</p>
         <p className='modal-actions'>
           <Button onClick={handlehideCart}>Close </Button>
           <Button onClick={handleshowcheckout}>Checkout</Button>   
         </p>
                  
         </Modal>
    )
}