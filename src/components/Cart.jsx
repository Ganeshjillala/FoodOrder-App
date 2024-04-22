import {  useReducer } from "react";
import { createContext } from "react";

const CartContext= createContext({
    items:[],
    additem:(item)=>{},
    removeitem:(id)=>{},
    clearcart:()=>{}
})

function reducer(state,action){

    if(action.type==='ADD_ITEM'){

        //state.items.push(action.item)

        const existingitemIndex= state.items.findIndex((item)=>item.id===action.item.id)

        const updateditems= [...state.items]

        if(existingitemIndex >-1){

            const exisitngitem= state.items[existingitemIndex]
            const updateditem={...exisitngitem,
            quantity:exisitngitem.quantity +1}

           updateditems[existingitemIndex] = updateditem
        }
        else {
            updateditems.push({...action.item,quantity:1})
        }
         return {...state,items:updateditems}
    }

    if(action.type==='REMOVE_ITEM') {
        const existingitemIndex=state.items.findIndex((item)=>item.id===action.id)

       
            const existingitem= state.items[existingitemIndex]
            const updateditems=[...state.items]
            if(existingitem.quantity===1){
                 updateditems.splice(existingitemIndex,1)
            }else {
                  const updateditem= {...existingitem,quantity:existingitem.quantity-1}
                  updateditems[existingitemIndex] =updateditem
            }
            return {...state,items:updateditems}

              
    }
    if(action.type==='CLEAR_CART'){
        return {...state,items:[]}
    }

    return state
}
  

export  function Cart({children}){
   const [cart,dispatch]= useReducer(reducer,{items:[]})
       const cartContext={
        items:cart.items,
        additem :additem ,//or additem(shorthand)
        removeitem,
        clearcart
       }

   function additem(item){
    dispatch({type:'ADD_ITEM',item})
   }
   
   function removeitem(id){
    dispatch({type:'REMOVE_ITEM',id})
   }

   function clearcart(){
    dispatch({type:'CLEAR_CART'})
   }

   return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}
export default CartContext