/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../api/job";
import styles from "./Home.module.css";

function Home() {
  const Navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState();
  const [token] = useState(!!localStorage.getItem("token"));

  const fetchAllJobs = async () => {
    const result = await getAllJobs({ title: title, skills: skills });
    setJobs(result?.data);
  };

  const addSkill = (event) => {
    const newArr = skills.filter((skill) => skill === event.target.value);
    if (!newArr.length) {
      setSkills([...skills, event.target.value]);
    }
  };

  const removeSkill = (selectedSkill) => {
    const newArr = skills.filter((skill) => skill !== selectedSkill);
    setSkills([...newArr]);
  };

  useEffect(() => {
    fetchAllJobs();
    console.log(fetchAllJobs);
  }, []);

  const handleLogout = () =>{
    localStorage.clear();
    Navigate("/login");
  }
  return (
    <>
      <div className={styles.header}>
        <h3>JobFinder</h3>
        <div className={styles.btnPart}>
          {token ? (
            <button onClick={handleLogout} className={styles.login}>Logout</button>
          ) : (
            <>
              <button onClick={() => {Navigate ("/login")}} className={styles.login}>Login</button>
              <button onClick={() => {Navigate ("/register")}} className={styles.register}>Register</button>
            </>
          )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerTop}>
        <input/>
        <div>
          <label>Skill</label>
          <select onChange={addSkill}>
            <option disabled selected>
              skills
            </option>
            {DEFAULT_SKILLS.map((skill) => {
              return <option key={skill}> {skill} </option>;
            })}
          </select>

          {skills?.map((skill) => {
            return (
              <span key={skill}>
                {" "}
                {skill}{" "}
                <span
                  onClick={() => {
                    removeSkill(skill);
                  }}
                >
                  X
                </span>
              </span>
            );
          })}
          </div>
        </div>

        <button onClick={fetchAllJobs}>Apply Filter</button>
        <button
          onClick={() => {
            Navigate("/job-post");
          }}
        >
          + Add Job
        </button>
        <button
          onClick={() => {
            setSkills([]);
            setTitle();
            fetchAllJobs();
          }}
        >
          Clear
        </button>
      </div>
      <div>
        {jobs?.map((job) => {
          return (
            <div key={job._id}>
              <div>
                <div>
                  <img src={job?.logoUrl}></img>
                </div>
                <div>
                  <p>
                    {job?.title}
                    <span>11-50</span>
                    <span>₹ {job?.salary}</span>
                    <span>{job?.location}</span>
                  </p>
                  <p>
                    <span>{job?.jobType}</span>
                    <span>{job?.duration}</span>
                  </p>
                </div>
              </div>
              <div>
                {job?.skills?.map((skill) => {
                  <span key={skill}> {skill} </span>;
                })}
              </div>
              <div>
                {token && (
                  <button
                    onClick={() => {
                      Navigate("/job-post", {
                        state: {
                          jobDetails: job,
                          edit: true,
                        },
                      });
                    }}
                  >
                    Edit Job
                  </button>
                )}
                <button onClick={() => Navigate(`/job-details/${job._id}`)}>
                  {" "}
                  View details{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
