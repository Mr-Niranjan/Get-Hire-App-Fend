/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import styles from "./Login.module.css";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Fields Can't be empty");
      return;
    }
    navigate("/");
    const result = await loginUser(formData);
    if (result) {
      alert("Login Successful");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Already have an account?</h2>
        <input
          className={styles.input}
          placeholder="Email"
          type="name"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit} className={styles.button}>
          Sign in
        </button>
        <p>
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
      <h6>Your Personal Job Finder</h6>
    </>
  );
}
