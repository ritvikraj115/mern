import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
const Logout = (props) => {
  const {state, dispatch}= useContext(UserContext);
  const history= useNavigate()
  const backend= process.env.REACT_APP_BACKEND_URL
    //promises
    const logOut= async()=>{
        try {
            const res= await fetch(`${backend}/logout`,{
                method:"GET",
                headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json"
                },
                credentials:"include"
              })
            const data= await res.json();
            history('/login')
            dispatch({type:"USER", payload:false})
            
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
        //useffect automatically calls the function
        logOut();
    
      })
        
  return (
    <div>
        Log out
      
    </div>
  )
}

export default Logout
