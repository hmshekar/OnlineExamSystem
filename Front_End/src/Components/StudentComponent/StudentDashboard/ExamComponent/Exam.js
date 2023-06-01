import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

import baseUrl from "../../../baseUrl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Exam() {
  let { category } = useParams();

  const [allExam, setAllExam] = useState([]);

  useEffect(() => {
    async function getAllExams() {
      let value = await axios.get(`${baseUrl}/exam`);
      setAllExam(value.data);
      // console.log(value.data);
    }
    getAllExams();
  }, []);

  let history = useHistory();

  function logout() {
    sessionStorage.clear();
    history.push("/StudentLogin");
  }

  return (
    <>
      {/* This is the header Div start*/}
      <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <h2 className="text-white"> Online Exam System</h2>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <NavLink exact to="/StudentDashboard" className="nav-link">
                  Subject
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/StudentDashboard/Result"
                  className="nav-link"
                >
                  My Result
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={logout}
                  exact
                  to="/StudentLogin"
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* This is the header Div end*/}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h1>All {category} Exam</h1>
              </div>
              <div className="card-body">
                {allExam.map((data, i) => {
                  if (data.name.name === category)
                    return (
                      <div className="card mb-3" key={i}>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12">
                              <h5 className="card-title">{data.name.name}</h5>
                            </div>
                            <div className="col-md-6">
                              <p className="card-text">Exam ID: {data.id}</p>
                              <p className="card-text">
                                Exam Description: {data.desc}
                              </p>
                            </div>
                            <div className="col-md-3">
                              <p className="card-text">
                                Pass Marks: {data.passMarks}
                              </p>
                              <p className="card-text">
                                Time limit: {data.time} min
                              </p>
                            </div>
                            <div className="col-md-3">
                              <p className="card-text">
                                Total Marks: {data.marks}
                              </p>
                            </div>
                            <div className="col-12">
                              <NavLink
                                exact
                                to={`/StudentDashboard/Exam/${category}/${data.id}`}
                              >
                                <button className="btn btn-primary">
                                  Go to Exam
                                </button>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    );

                  return <React.Fragment key={i}></React.Fragment>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Exam;
