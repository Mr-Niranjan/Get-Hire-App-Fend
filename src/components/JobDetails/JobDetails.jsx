/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jobPostDetailsById } from "../../api/job";
import styles from "./JobDetails.module.css";

function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const navigate = useNavigate();
  const [jobDetails , setJobDetails] = useState({});
  const [isLoggedIn] = useState(!!localStorage.getItem("token")); //Shorthand rule to avoid Ternary Operator
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    getJobDetailsById();
  }, []);

  const getJobDetailsById = async () => {
    if (!id) return;
    const userId = JSON.parse(localStorage.getItem("userId"));
    const result = await jobPostDetailsById(id, userId);
    console.log(result);
    setJobDetails(result?.jobDetails);
    setIsEditable(result?.isEditable);
  };

  return (
    <>
    {jobDetails ? (
        <div className={styles.body}>
            <div className={styles.nav}>
                <p className={styles.navText}>Jobfinder</p>
                <div className={styles.btnGrp}>
                    {isLoggedIn ? (
                        <button
                            // onClick={logout}
                            className={styles.register}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button className={styles.login}>
                                Login
                            </button>
                            <button className={styles.register}>
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.container}>
                <p className={styles.containerText}>
                    {jobDetails?.companyName}
                </p>
            </div>
            <div className={styles.containerBottom}>
                <div className={styles.preHeading}>
                    <p className={styles.lightText}>
                        {jobDetails?.posted} • {jobDetails.jobType}
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div className={styles.heading}>
                        <div>
                            <p
                                style={{
                                    margin: "0px",
                                }}
                                className={styles.boldText}
                            >
                                {jobDetails.title}
                            </p>
                            <p className={styles.locationText}>
                                {jobDetails.location}
                            </p>
                        </div>
                    </div>
                    <div>
                        {isLoggedIn && isEditable && (
                            <button
                                onClick={() => {
                                    navigate("/job-post", {
                                        state: {
                                            jobDetails: jobDetails,
                                            edit: true,
                                        },
                                    });
                                }}
                                className={styles.edit}
                            >
                                Edit Job
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.perks}>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                width: "10vw",
                            }}
                        >
                            {/* <span
                                style={{
                                    color: "gray",
                                }}
                                class="material-symbols-outlined"
                            >
                                universal_currency_alt
                            </span> */}
                            <p className={styles.lightText}>Stipend</p>
                        </div>
                        <p className={styles.lightText2}>
                            Rs.{jobDetails.salary}/month
                        </p>
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                width: "10vw",
                            }}
                        >
                            {/* <span
                                style={{
                                    color: "gray",
                                }}
                                class="material-symbols-outlined"
                            >
                                calendar_today
                            </span> */}

                            <p className={styles.lightText}>Duration</p>
                        </div>

                        <p className={styles.lightText2}>
                            {jobDetails.duration}
                        </p>
                    </div>
                </div>
                <div className={styles.info}>
                    <h2>About Company</h2>
                    <p className={styles.lightText}>
                        {jobDetails.about}
                    </p>
                </div>
                <div className={styles.info}>
                    <h2>Skill(s) Required</h2>
                    {jobDetails?.skills?.map((skill) => {
                        return (
                            <p className={styles.skill} key={skill}>
                                {skill}
                            </p>
                        );
                    })}
                </div>
                <div className={styles.info}>
                    <h2>Additional Information</h2>
                    <p className={styles.lightText}>
                        {jobDetails.description}
                    </p>
                </div>
            </div>
        </div>
    ) : (
        <></>
    )}
</>
  );
}

export default JobDetails;
