/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { createJobPost, updateJobPostById } from "../../api/job";
import React, { useState } from "react";
import styles from "./JobPost.module.css";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

/* 

# . Like useParams to print the data whichever searched....but by help of useLocation we can print the data from any page whichever stored in the past .

# . process to follow to use ::: "useLocation" :::  
0 .  First state like below from where you want data and which page you want to use :::
   state: {
        jobDetails: jobDetails,      // Available in the JobDetails.jsx file
        edit: true,
          // },                            
1. import useLocation from "react-router-dom";
2. const { state } = useLocation();
3. console.log(state);
4. const [stateData] = useState(state?.jobDetails);

*/

function JobPost() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state);
  const [stateData] = useState(state?.jobDetails);
  console.log(stateData);

  const [formData, setFormData] = useState({
    companyName: "" || stateData?.companyName,
    logoUrl: "" || stateData?.logoUrl,
    title: "" || stateData?.title,
    description: "" || stateData?.description,
    location: "" || stateData?.location,
    duration: "" || stateData?.duration,
    salary: "" || stateData?.salary,
    jobType: "" || stateData?.jobType,
    aboutCompany: "" || stateData?.aboutCompany,
    skills: stateData?.skills || [],
    // locationType: "",
    information: "" || stateData?.information,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const goBack = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    if (
      !formData.companyName ||
      !formData.logoUrl ||
      !formData.title ||
      !formData.salary ||
      !formData.jobType ||
      !formData.duration ||
      !formData.location ||
      !formData.description ||
      !formData.aboutCompany ||
      //!formData.locationType ||
      !formData.skills ||
      !formData.information
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (state?.edit) {
      await updateJobPostById(stateData._id, formData); // when Edit it will run........
    }

    await createJobPost(formData);
  };

  /*
# There is Two Methods Available to Select only one time to the particular option 
# it just prevent from  multiple choice to the same option . 
1. .include()
2. filter((element) => element === eg.skill)
3. to Remove Item from the array ::: filter((element) => element !== eg.skill)
# For Option Panel ::: <select> <option>......</option> </select>
*/
  const addSkills = (event) => {
    const skill = event.target.value;
    const originalSkills = formData.skills;
    const filteredSkills = originalSkills.filter((item) => item === skill);
    if (!filteredSkills.length) {
      //if (!originalSkills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkills = (skill) => {
    const originalSkills = formData.skills;
    const filteredSkills = originalSkills.filter((item) => item !== skill);
    setFormData({ ...formData, skills: filteredSkills });
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Add job description</h2>
        <div className={styles.div}>
          <label htmlFor="companyName" className={styles.label}>
            Company Name{" "}
          </label>
          <input
            placeholder="Enter your company name here"
            onChange={handleChange}
            name="companyName"
            type="text"
            id="companyName"
            value={formData.companyName}
            className={styles.input}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="logoUrl" className={styles.label}>
            Add logo URL
          </label>
          <input
            placeholder="Enter the link"
            onChange={handleChange}
            name="logoUrl"
            type="text"
            id="logoUrl"
            value={formData.logoUrl}
            className={styles.input}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="description" className={styles.label}>
            Job Description
          </label>
          <input
            placeholder="Enter job description"
            onChange={handleChange}
            name="description"
            type="text"
            className={styles.input}
            id="description"
            value={formData.description}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="salary" className={styles.label}>
            Monthly salary
          </label>
          <input
            placeholder="Enter Amount in rupees"
            onChange={handleChange}
            name="salary"
            type="text"
            id="salary"
            className={styles.label}
            value={formData.salary}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="jobType" className={styles.label}>
            Job Type
          </label>
          <input
            placeholder="Enter your company name here"
            onChange={handleChange}
            name="jobType"
            type="text"
            id="jobType"
            className={styles.input}
            value={formData.jobType}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="duration" className={styles.label}>
            Job Duration
          </label>
          <input
            placeholder="Duration Period"
            onChange={handleChange}
            name="duration"
            type="text"
            className={styles.input}
            id="duration"
            value={formData.duration}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="location" className={styles.label}>
            Location
          </label>
          <input
            placeholder="Enter Location"
            onChange={handleChange}
            name="location"
            type="text"
            className={styles.input}
            id="location"
            value={formData.location}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="title" className={styles.label}>
            Job title
          </label>
          <input
            placeholder="Type the job title"
            onChange={handleChange}
            name="title"
            type="text"
            className={styles.input}
            id="title"
            value={formData.title}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="aboutCompany" className={styles.label}>
            About Company{" "}
          </label>
          <input
            placeholder="Type about your company"
            onChange={handleChange}
            name="aboutCompany"
            type="text"
            className={styles.input}
            id="aboutCompany"
            value={formData.aboutCompany}
            spellCheck="false"
          ></input>
        </div>

        <div className={styles.div}>
          <label htmlFor="skills" className={styles.label}>
            Skills Required
          </label>
          <select
            placeholder="Enter the must have skills"
            onChange={addSkills}
            name="skills"
            type="text"
            id="skills"
            value={formData.skills}
            spellCheck="false"
          >
            <option disabled selected>
              Enter the must have skills
            </option>
            {DEFAULT_SKILLS.map((skill) => {
              return <option value={skill}>{skill}</option>;
            })}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: "40px",
          }}
        >
          {formData?.skills?.map((skill) => (
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "13px",
              }}
            >
              {skill}
              <button
                className={styles.button1}
                onClick={() => removeSkills(skill)}
              >
                X
              </button>
            </span>
          ))}
        </div>

        <div className={styles.div}>
          <label htmlFor="information" className={styles.label}>
            Information
          </label>
          <input
            placeholder="Enter the additional information"
            onChange={handleChange}
            name="information"
            type="text"
            id="information"
            className={styles.input}
            value={formData.information}
            spellCheck="false"
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            marginRight: "40px",
          }}
        >
          <button className={styles.button2} onClick={goBack}>
            cancel
          </button>
          <button onClick={handleSubmit} className={styles.button3}>
            {state?.edit ? "Edit Job" : "+ Add Job"}
          </button>
        </div>
      </div>
      <h4>Recruiter add job details here</h4>
    </>
  );
}

export default JobPost;
