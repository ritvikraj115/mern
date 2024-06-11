import { useContext, useState } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Login = (props) => {
   const {state, dispatch}= useContext(UserContext);
   const history=useNavigate()
   const [email,setEmail]=useState('');
   const [password,setPassword]= useState('')

   const handleE=(e)=>{
      setEmail(e.target.value)
   }

   const handleP=(e)=>{
      setPassword(e.target.value)
   }
   const loginUser= async(e)=>{
      e.preventDefault();
      props.setProgress(10);

      const res= await fetch("/login", {
         method:"POST",
         headers: {
           "Content-Type" : "application/json"
         },
         body: JSON.stringify({
          email,password
   
         })
   })
       props.setProgress(50);
       
       const data = await res.json();
       props.setProgress(80);
       if(res.status!==201 || !data){
         window.alert("Inavalid credentials")
       }else{
         dispatch({type:"USER", payload:true})
         props.setProgress(100);
         history('/')
       }

   }

   return (
    <div className="wrapper">
    <div className="title">
       Login
    </div>
    <form method='POST'>
       <div className="field">
          <input type="text" required name='email' id='email' onChange={handleE} value={email}/>
          <label>Email Address</label>
       </div>
       <div className="field">
          <input type="password" required name='password' id='password' onChange={handleP} value={password}/>
          <label>Password</label>
       </div>
       <div className="field">
          <input type="submit" value="Login" name='signin' id='signin' onClick={loginUser}/>
       </div>
       <div className="signup-link">
          Not a member? <Link to="/signup">Signup now</Link>
       </div>
    </form>
 </div>
  )
}

export default Login
