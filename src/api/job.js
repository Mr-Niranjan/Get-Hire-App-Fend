/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
const backendUrl = "https://job-hire-app-bend-1.onrender.com"

//export const createJobPost = async({companyName , logoUrl , title , jobDescription , salary , location , duration , skills ,information , jobType , aboutCompany})=>{
export const createJobPost = async (jobPostPayload) => {
  try {
    const apiUrl = `${backendUrl}/create`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(apiUrl, jobPostPayload);
  } catch (error) {
    console.log(error);
    alert("something went wrong in the job.js part");
  }
};
export const jobPostDetailsById = async (jobId, userId) => {
  try {
    const apiUrl = `${backendUrl}/job-details/${jobId}/${userId}`;
    const response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("something went wrong in the jobPostDetailsById part");
  }
};
export const updateJobPostById = async (jobPostId, updatedFormDatA) => {
  try {
    const apiUrl = `${backendUrl}/update/${jobPostId}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(apiUrl, updatedFormDatA); //put
    return response?.data;
  } catch (error) {
    console.log(error);
    alert("something went wrong in the updateJobPostById part");
  }
};
export const getAllJobs = async (filter) => {
  try {
    const userId = JSON.parse(localStorage.getItem("userId")) || "";
    const apiUrl = `${backendUrl}/all/?searchQuery=${filter?.title || ""}&skills=${filter?.skills || ""} `;  // # all/${userId}?searchQuery.......
    // const apiUrl = `http://localhost:5000/api/v1/jobs/all?searchQuery=&&skills=`;
    const response = await axios.get(apiUrl)
    return response?.data;
  } catch (error) {
    console.log("error");
    alert("something went wrong in the getAllJobs part");
  }
}