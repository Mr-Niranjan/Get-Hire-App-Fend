/* eslint-disable no-unused-vars */
import React from 'react'
import Login from "../../components/Login/Login"
import picture from "../../assets/image 466.png"

function LoginPage() {
  return (
    <div style={{display:'flex',flexDirection:'row' , margin:0,padding:0}}>
      <Login />
      <img src={picture} style={{height:'100vh',width:'45vw'}} />
    </div>
  )
}

export default LoginPage
