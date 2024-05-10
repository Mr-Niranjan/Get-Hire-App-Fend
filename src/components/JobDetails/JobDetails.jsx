/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jobPostDetailsById } from "../../api/job";

function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({});
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
        <div>
          <p>Job Finder</p>
          <div>
            {isLoggedIn ? (
              <button>Logout</button>
            ) : (
              <div>
                <button>Login</button>
                <button>Register</button>
              </div>
            )}
          </div>
          <div>
            <p>{jobDetails?.companyName}</p>
          </div>
          <div>
            <p>
              {jobDetails?.jobType}
              {jobDetails?.logoUrl}
            </p>
          </div>
          <div>
            <p>{jobDetails?.title}</p>
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
                >
                  Edit Job
                </button>
              )}
            </div>
          </div>
          <div>
            <p>{jobDetails?.location}</p>
          </div>
          <div>
            <div>
              <p>stipend</p>
              <p>{jobDetails?.salary}</p>
            </div>
            <div>
              <p>Duration</p>
              <p>{jobDetails?.duration}</p>
            </div>
          </div>
          <div>
            <h2>About Company</h2>
            <p>{jobDetails?.aboutCompany}</p>
          </div>
          <div>
            <h2>About the job/internship</h2>
            <p>{jobDetails?.description}</p>
          </div>
          <div>
            <h2>Skills Required</h2>
            {jobDetails?.skills?.map((skill) => (
              <p key={skill}>{skill}</p>
            ))}
          </div>
          <div>
            <h2>Additional Information</h2>
            <p>{jobDetails?.information}</p>
          </div>
        </div>
      ) : (
        <> </>
      )}

      {/* <div>
      {id}
    </div> */}
    </>
  );
}

export default JobDetails;
