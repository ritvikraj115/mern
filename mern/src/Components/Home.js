import React, { useEffect, useState } from 'react'

const Home = () => {
  const [userName,setUsername]= useState('');
  const[show,setShow]= useState(false);
  const backend= process.env.REACT_APP_BACKEND_URL
  const userHome= async()=>{
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
      setUsername(data.name)
      setShow(true)
      
    } catch (err) {
      console.log(err)
      }
  }


  useEffect(()=>{
    //useffect automatically calls the function
    userHome();
},[])
  return (
    <div className='ab'>
        <h3 className=' my-3'>WELCOME</h3>
        <h1>{userName}</h1>
        <h2>{show? 'Happy to see you back':'We are the MERN developer'}</h2>
      
    </div>
  )
}

export default Home
