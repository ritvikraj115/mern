import React,{useEffect} from 'react'
import { useState } from 'react';

const Contact = (props) => {
  const [userData,setUserData]= useState({name:"", email:"", phone:"", message:""});
  const backend= process.env.BACKEND_URL
  props.setProgress(0)
  const userContact= async()=>{
    try {
      const res= await fetch(`${backend}/getdata`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      })
      const data= await res.json();

      if(!res.status===200 || !data){
        const error= new Error(res.error);
        throw error;
        }
      setUserData({...userData,name:data.name, email: data.email, phone: data.phone})
      
    } catch (err) {
      console.log(err)
      }
  }


  useEffect(()=>{
    //useffect automatically calls the function
    userContact();
    props.setProgress(100);

  },[])

  const handleChange= (e)=>{
    const name= e.target.name;
    const value= e.target.value;
    setUserData({...userData, [name]:value })

  }

  const contactForm= async(e)=>{
    e.preventDefault();
    const{name, email, phone, message}= userData;
    const res= await fetch(`${backend}/contact`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    })
    const data= await res.json();

    if(!data){
      console.log('message not send')
    }
    else{
      alert("Message sent")
      setUserData({...userData,message:""})
    }

  }

  return (
    <>
    <div className="container">
      <div style={{textAlign: "center", color:"black"}}>
        <h2 style={{paddingTop:"30px"}}>Contact Us</h2>
        <p>Swing by for a cup of coffee, or leave us a message:</p>
      </div>
      <div className="row">
        <div className="column">
          <img src="data:image/jpeg;base64,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" style={{width:"100%"}} />
        </div>
        <div className="column">
          <form method='POST'>
            <label htmlFor="fname">First Name</label>
            <input type="text" id="name" name="name" placeholder="Your name.." value={userData.name}  onChange={handleChange} />
            <label htmlFor="lname">Email</label>
            <input type="text" id="email" name="email" placeholder="Your email.."  value={userData.email} onChange={handleChange}/>
            <label htmlFor="lname">Phone no</label>
            <input type="text" id="number" name="phone" placeholder="Your phone no.." value={userData.phone} onChange={handleChange}/>
            <label htmlFor="subject">Subject</label>
            <textarea id="subject" name="message" placeholder="Write something.." style={{height:"170px"}} onChange={handleChange} value={userData.message}></textarea>
            <input type="submit" value="Submit" onClick={contactForm}/>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact
