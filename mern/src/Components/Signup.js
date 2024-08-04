import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const backend= process.env.BACKEND_URL;
const Signup = (props) => {
  const history=useNavigate()
  const [user, setUser]= useState({
    name:"", email:'', phone:"", work: "", password: "", cpassword: ""
  })
  let name, value;
  const handleInputs= (e)=>{
    name= e.target.name; //name='email'
    value= e.target.value; //value='user.email'
    setUser({...user,[name]:value})
}
  const PostData = async(e)=>{
    props.setProgress(10);
    e.preventDefault();
    const{ name, email, phone, work, password, cpassword }= user;

    const res= await fetch(`${backend}/register`, {
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword

      })

    })
    props.setProgress(50);
    const data = await res.json();
    props.setProgress(70);
    if(data.status===422 || !data){
      window.alert("Invalid registration");
    } else{
      props.setProgress(100);
      history("/login")
    }



  }

  return (
    <div className="container">
    <div className="title" style={{paddingTop:"30px", paddingLeft:"5px"}}>Registration</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input type="text" placeholder="Enter your name" required name='name' id='name'  value={user.name} onChange={handleInputs}/>
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="email" placeholder="Enter your email" required name='email' id='email' value={user.email} onChange={handleInputs}/>
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input type="number" placeholder="Enter your number" required name='phone' id='phone' value={user.phone} onChange={handleInputs}/>
          </div>
          <div className="input-box">
            <span className="details">Profession</span>
            <input type="text" placeholder="Enter your number" required name='work' id='work' value={user.work} onChange={handleInputs}/>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" placeholder="Enter your password" required name='password' id='password' value={user.password} onChange={handleInputs}/>
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="password" placeholder="Confirm your password" required name='cpassword' id='cpassword' value={user.cpassword} onChange={handleInputs}/>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="register"  name='signup' id='signup' onClick={PostData}/>
        </div>
      </form>
    </div>
    </div>
  
  )
}

export default Signup
