import axios from "axios";
import React, { useState, useEffect } from "react";

import baseUrl from "../../../baseUrl";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Result() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getAllResults() {
      let value = await axios.get(
        `${baseUrl}/user/${sessionStorage.getItem("user")}/result`
      );

      setResults(value.data);
      // console.log(value.data);
    }
    getAllResults();
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
                <h2>Student Exam List</h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">User Email</th>
                        <th className="text-center">Exam Name</th>
                        <th className="text-center">Exam Date</th>
                        <th className="text-center">Result Status</th>
                        <th className="text-center">Your Score</th>
                        <th className="text-center">Total Marks</th>
                        <th className="text-center">Total Question</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{data.email.email}</td>
                            <td>{data.sname.name}</td>
                            <td>{data.edate}</td>
                            <td>{data.status}</td>
                            <td>{data.score}</td>
                            <td>{data.totalMarks}</td>
                            <td>{data.totalQuestion}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
