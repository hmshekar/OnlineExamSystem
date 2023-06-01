import React, { useState, useEffect } from "react";

import axios from "axios";

// import style from "./Teacher.module.css";

import baseUrl from "../../baseUrl";

function Student() {
  // ---------------------- Fetching All Student Records -------------------------------------

  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudents() {
      let value = await axios.get(`${baseUrl}/user`);
      setStudents(value.data);
      // console.log(value.data);
    }
    getAllStudents();
  }, []);

  // ---------------------- Delete data in text field -------------------------------------

  const [deleteStudent, setDeleteStudent] = useState(false);

  async function deleteStudentData(id) {
    await axios.delete(`${baseUrl}/user/${id}`);
    setDeleteStudent(true);
  }

  if (deleteStudent) return <Student />;

  // ...

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
                    <th className="text-center">Student Name</th>
                    <th className="text-center">Student Email</th>
                    <th className="text-center">Student Password</th>
                    <th className="text-center">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.password}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteStudentData(data.email)}
                          >
                            Delete
                          </button>
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

export default Student;
