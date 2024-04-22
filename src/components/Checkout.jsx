import { useContext } from "react"
import Modal from "./Modal"
import { Currencyformatter } from "../Utils/Currencyformatter"
import CartContext from "./Cart"
import ProgressContext from "./UserProgressCart"
import Button from "./Button"
import Input from "./Input"
import useHttp from "./Hooks/useHttp"
import Error from "./Error"
const configReq= {
  method:'POST',
  headers:{
      'Content-Type': 'application/json'
  },
 
}
export default function Checkout(){
    const crtctxt= useContext(CartContext)
    const progressctxt= useContext(ProgressContext)
    const cartTotal= crtctxt.items.reduce((TotalPrice,item)=>TotalPrice + item.quantity*item.price,0)
  
   

   const {data,isLoading:isSending,error,sendRequest,cleardata}=useHttp('http://localhost:3000/orders',configReq)
   
   function handleClose(){
    progressctxt.hideCheckout()
   }

   function handleFinish() {
    progressctxt.hideCheckout()
    crtctxt.clearcart()
    cleardata()
  
  }

   
   function handlesubmitform(event){
      event.preventDefault()
      const fd= new FormData(event.target)
      const Customerdata= Object.fromEntries(fd.entries())
      sendRequest(JSON.stringify({
        order:{
          items: crtctxt.items,
          customer:Customerdata
  
        }
      })
    )
     
     }
     let actions = (
      <>
        <Button type="button" textOnly onClick={handleClose}>
          Close
        </Button>
        <Button>Submit Order</Button>
      </>
    );
  
    if (isSending) {
      actions = <span>Sending order data...</span>;
    }
  
    if (data && !error) {
      return (
        <Modal
          open={progressctxt.progress === 'checkout'}
          onClose={handleFinish}
        >
          <h2>Success!</h2>
          <p>Your order was submitted successfully.</p>
          <p>
            We will get back to you with more details via email within the next
            few minutes.
          </p>
          <p className="modal-actions">
            <Button onClick={handleFinish}>Okay</Button>
          </p>
        </Modal>
      );
    }

    return (
        <Modal open={progressctxt.progress==='checkout'} onClose={handleClose}>
            <form onSubmit={handlesubmitform}>
                <h2>Checkout</h2>
                <p>Totalamount- {Currencyformatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        
        {error && <Error title='something went wrong' message={error} />}
        <p className="modal-actions">{actions}</p>
            </form>

        </Modal>

    )
}