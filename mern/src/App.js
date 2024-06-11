import React, { createContext, useReducer, useState } from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import About from './Components/About'
import Contact from './Components/Contact'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Error404 from './Components/Error404'
import LoadingBar from 'react-top-loading-bar'
import Logout from './Components/Logout'
import { initialState,reducer } from './reducer/UseReducer'
 //1: contextAPI
 export const UserContext= createContext();

 const App = () => {
   const [progress, setProgress] = useState(0);
   const[state,dispatch]=useReducer(reducer, initialState)
  // function cc(name) {
  //   document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // }
  // window.addEventListener('load',cc('jwtoken'))
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar />
    <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
    <Routes>
      
      <Route exact path='/' element={ <Home />}>
      </Route>

      <Route exact path='/about' element={ <About setProgress={setProgress}/>}>
      </Route>

      <Route exact path='/contact' element={ <Contact setProgress={setProgress}/>}>
      </Route >

      <Route exact path='/login'element={ <Login  setProgress={setProgress}/>}>
      </Route>

      <Route exact path='/signup'element={ <Signup setProgress={setProgress}/>}>

      </Route>
      <Route exact path='/logout' element={<Logout />}>
      </Route>
      {/* <Route element={<Error404/>}>
      </Route> */}

      </Routes>
      </UserContext.Provider>
   </>
     
  )
}

export default App

