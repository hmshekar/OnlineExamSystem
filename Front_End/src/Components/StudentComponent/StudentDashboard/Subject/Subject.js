import style from "../StudentDashboard.module.css";

import { useState, useEffect } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";

import baseUrl from "../../../baseUrl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Subject() {
  const [allSubject, setAllSubject] = useState([]);

  useEffect(() => {
    async function getAllSubject() {
      let value = await axios.get(`${baseUrl}/subject`);
      setAllSubject(value.data);
    }
    getAllSubject();
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
        <div className="container-fluid w-100">
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
                  // onClick={logout}
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
                <h1>Choose Subjects</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  {allSubject.map((data, i) => (
                    <div className="col-md-4" key={i}>
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{data.name}</h5>
                          <NavLink
                            exact
                            to={`/StudentDashboard/Exam/${data.name}`}
                          >
                            <button className="btn btn-primary">
                              Go to Exam
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subject;
