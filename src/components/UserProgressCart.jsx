import { createContext, useState } from "react";

const ProgressContext= createContext({
    progress:'',
    showCart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{}
})

export  function  UserProgressCart({children}){

    const [UserProgress,setUserProgress]=useState('')

    function showCart(){
        setUserProgress('cart')
    }
    function hideCart(){
        setUserProgress('')
    }
    function showCheckout(){
        setUserProgress('checkout')
    }
    function hideCheckout(){
        setUserProgress('')
    }

    const progressContext={
        progress:UserProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <ProgressContext.Provider value={progressContext}>{children}</ProgressContext.Provider>
    )
}
export default ProgressContext