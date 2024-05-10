/* eslint-disable no-unused-vars */
import React from 'react'
import JobPage from "../../components/JobPost/JobPost.jsx"
import picture from "../../assets/jobPage.png"
function JobPostPage() {
  return (
    <div style={{display:"flex",flexDirection:"row"}}>
      <JobPage />
      <img src={picture}  style={{width: "44vw",height: "100vh"}}/>
    </div>
  )
}

export default JobPostPage
