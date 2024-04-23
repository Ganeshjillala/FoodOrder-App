import { useCallback, useEffect, useState } from "react"

 async function useHttpRequest(url,config){

    const response= await fetch(url,config)
    const resData= await response.json()
    if(!response.ok){
        throw new Error(resData.message || 'something went wrong,unable to fetch data')
    }
    return resData
}



export default function useHttp(url,config,initialvalue){
    const [data,setdata]=useState(initialvalue)
    const [error,seterror]=useState()
    const [isLoading,setisLoading]=useState(false)

function cleardata(){
    setdata(initialvalue)
}

    const sendRequest=useCallback(async function sendRequest(data){
        setisLoading(true)
       try{
        const resdata=  await useHttpRequest(url, {...config,body:data})
        setdata(resdata)
       }
        catch(error){
           seterror(error.message || 'something went wrong')
        }
         setisLoading(false)

    },[url,config])

    useEffect(()=>{
        if((config &&( config.method==='GET' || !config.method)) || !config){
        sendRequest()
        }

    },[sendRequest,config])

    return {
        data,isLoading,error, sendRequest,cleardata
    }
}