import { useContext } from 'react'
import logojpg from '../assets/logo.jpg'
import Button from './Button'
import CartContext from './Cart'
import ProgressContext from './UserProgressCart'
export default function Header(){

    const cartctxt= useContext(CartContext)
    const progressctxt= useContext(ProgressContext)

    

        const cartItems=cartctxt.items.reduce((totalnumber,item)=>{
            return totalnumber +item.quantity
        },0)


        function handleshowCart(){
            progressctxt.showCart()
        }

    
    return (
        <header id='main-header'>
        <div id='title'>
        
            <img src={logojpg} />
            <h1>Food order</h1>
            </div>
            
            <nav>
            <Button onClick={handleshowCart} >Cart({cartItems})</Button>
            </nav>
       
        </header>
    )
}