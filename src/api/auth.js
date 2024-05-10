/* eslint-disable no-undef */
import axios from "axios";
const backendUrl = "http://localhost:5000/api/v1/auth";

export const registerUser = async ({ name, email, password, mobile }) => {
  try {
    const apiUrl = `${backendUrl}/register`;
    const response = await axios.post(apiUrl, {
      //axios takes two parameters 1. url 2. data
      name,
      email,
      password,
      mobile,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong in Auth part");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    // const apiUrl = "http://localhost:5000/api/v1/auth/login";
    const apiUrl = `${backendUrl}/login`;
    const response = await axios.post(apiUrl, {
      email,
      password,
    });

    if (response.data?.token) {
      localStorage.setItem("token", JSON.stringify(response.data?.token));
      localStorage.setItem("name", JSON.stringify(response.data?.name));
      localStorage.setItem("userId", JSON.stringify(response.data?.userId));
    }
  } catch (error) {
    // console.log(error);
    alert(
      "Sorry , You are Not an Authorize User / Something went wrong in Auth part"
    );
  }
};
