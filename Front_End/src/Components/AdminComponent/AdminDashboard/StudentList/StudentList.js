import { useState, useEffect } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";

import baseUrl from "../../../baseUrl";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      let value = await axios.get(`${baseUrl}/user`);
      setStudents(value.data);
    }
    getAllStudent();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Student List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">User Name</th>
                    <th className="text-center">User Email</th>
                    <th className="text-center">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>
                          <NavLink
                            exact
                            to={`/AdminDashboard/StudentList/Details/${data.email}`}
                          >
                            <button className="btn btn-primary">
                              View Result
                            </button>
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentList;
