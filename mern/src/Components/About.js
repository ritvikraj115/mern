import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
const About = (props) => {
  props.setProgress(100);
  const history=useNavigate()
  const [userData,setUserData]= useState('');
  const backend= process.env.REACT_APP_BACKEND_URL
  const callAboutPage= async()=>{
    try {
      const res= await fetch(`${backend}/about`,{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const data= await res.json();
      props.setProgress(50);

      if(!res.status===200 || !data){
        history("/login")
        const error= new Error(res.error);
        throw error;
        }
      setUserData(data)
      props.setProgress(100);
      
    } catch (err) {
      console.log(err)
      history("/login")
      }
  }


  useEffect(()=>{
    //useffect automatically calls the function
    callAboutPage();
    props.setProgress(0)

  },[])



  return (
    <div class="container">
    <div class="title" style={{paddingTop:"30px"}}>About Me</div>
    <div class="content">
      <form method="GET">
        <div class="user-details">
          <img className='aimg' src="data:image/jpeg;base64,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" alt="" />
          <div class="input-box1">
            <span class="details">Full Name</span>
            <span class="details">{userData.name}</span>
            
          </div>
          <div class="input-box1">
            <span class="details">Email</span>
            <span class="details">{userData.email}</span>
          </div>
          <div class="input-box1">
            <span class="details">Phone Number</span>
            <span class="details">{userData.phone}</span>
          </div>
          <div class="input-box1">
            <span class="details">Profession</span>
            <span class="details">{userData.work}</span>
          </div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default About
