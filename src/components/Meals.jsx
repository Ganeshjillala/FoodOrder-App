import { useState, useEffect } from 'react';
import MealItem from './MealItem';
import useHttp from './Hooks/useHttp';
import Error from './Error';
const configReq={}
export default function Meals() {

  const {data:loadedMeals,isLoading,error, sendRequest}=useHttp('http://localhost:3000/meals',configReq,[])


  if(isLoading){
    return <p className="center">data is loading....</p>
  }

  if(error){
    return <Error title="someting went wrong" message="files not found"/>
  }

  
  return (
    <>
    <ul id="meals">
      {loadedMeals.map((meal) => (
        
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  
  
    </>
  );
}