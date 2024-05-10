/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState} from "react";
import {registerUser} from "../../api/auth"
import styles from "./Register.module.css"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [isFormChecked, setIsFormChecked] = useState(false);
  
  // useEffect(()=>{        // JUST to check how teh ...formData works and checkBox also...
  //   //  console.log(formData);
  //    console.log(isFormChecked)
  // },[isFormChecked])

  // useEffect(()=>{
  //   console.log(formData);
  // },[formData])

  const handleChange = (event) => {
    setFormData({
      ...formData, [event.target.name] : event.target.value 
    })
    //console.log(formData);
  }
    const handleSubmit = async () => {
       if(!formData.name || !formData.email || !formData.password || !formData.mobile){
        alert("Please fill all the fields");
        return;
      }
      const response = await registerUser(formData);  // this is the function which is defined in the api/auth.js file
      alert(response.message);

       if(!isFormChecked){
        alert("Please agree to the terms and conditions");
        return;
       }

};
  return (
    <>
      <div className={styles.container}>
        <h2>Create an account</h2>
        <input
          placeholder="Name"
          type={"text"}
          name="name"
          onChange={handleChange}
          className={styles.input}
        ></input>
        <input
          placeholder="Email"
          name="email"
          type={"email"}
          onChange={handleChange}
          className={styles.input}
        ></input>
        <input
          placeholder="Mobile"
          name="mobile"
          type={"tel"}
          onChange={handleChange}
          className = {styles.input}
        ></input>
        <input
          placeholder="Password"
          name="password"
          type={"password"}
          onChange={handleChange}
          className={styles.input}
        ></input>
        <input
          name="checkbox"
          type={"checkbox"}
          onChange={(event) => {setIsFormChecked(event.target.checked)}}
          className={styles.checkbox}
          id="check1"
          style={{margin:"10px"}}
        ></input>
        <label htmlFor="check1"
                  className={styles.checkbox}
                  >
          By creating an account, I agree to our terms of use and privacy policy
        </label>
        <button 
        onClick={handleSubmit}>Create Account</button>
        <p >
          Already have an account ? <a href="/login">Sign in</a>
        </p>
      </div>
      <h6>Your Personal Job Finder</h6>
      </>
  );
}

export default Register;
