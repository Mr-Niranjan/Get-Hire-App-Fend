/* eslint-disable no-unused-vars */
import React from 'react';
import Register from "../../components/Register/Register";
import pic from "../../assets/image 466.png"

export default function RegisterPage() {
  return (
  <div style={{display:'flex',flexDirection:'row' , margin:0,padding:0}}>
  <Register />
  <img src={pic} style={{height:'100vh',width:'45vw'}} />
  </div>
  )
}
