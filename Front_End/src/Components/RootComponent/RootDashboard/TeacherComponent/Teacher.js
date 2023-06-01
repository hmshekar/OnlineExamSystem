import React, { useState, useEffect } from "react";

import axios from "axios";

import style from "./Teacher.module.css";

import baseUrl from "../../../baseUrl";

function Teacher() {
  // ----------------------Add AddAdmin button-----------------------------------------------
  const [addAdmin, setAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    password: "",
  });

  function handleAddAdmin() {
    setAddAdmin(true);
  }

  function handleCancelAddAdmin() {
    setAddAdmin(false);
    setNewAdmin({
      name: "",
      password: "",
    });
  }

  async function addAdminData() {
    if (isPasswordValid(newAdmin.password)) {
      await axios.post(`${baseUrl}/admin`, newAdmin);
      setAddAdmin(false);
      setNewAdmin({
        name: "",
        password: "",
      });
    } else {
      alert("invalid password format");
    }
  }

  function isPasswordValid(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,}$/;
    return passwordRegex.test(password);
  }
  //  ---------------------- add Teacher & close buttton working  -------------------------------------
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  function setEditTeacherData(teacherId) {
    setEditTeacherId(teacherId);
    setIsEditing(true);

    const teacher = teachers.find((data) => data.id === teacherId);
    setUpdateTeacher({ ...teacher });
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setUpdateTeacher({
      name: "",
      password: "",
    });
  }

  //  ---------------------- Fetching All Teacher Record -------------------------------------

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function getAllTeacher() {
      let value = await axios.get(`${baseUrl}/admin`);
      setTeachers(value.data);
      //console.log(value.data);
    }
    getAllTeacher();
  }, []);

  //  ---------------------- handling Teacher data field -------------------------------------

  const [updateTeacher, setUpdateTeacher] = useState({
    name: "",
    password: "",
  });

  function onTextFieldChange(e) {
    setUpdateTeacher({
      ...updateTeacher,
      [e.target.name]: e.target.value,
    });
  }

  //  ---------------------- Showing data in  text field -------------------------------------

  // Id of current question clicked
  // const [teacherId, setTeacherId] = useState();

  // -----------------------------------------------------------------------------------------

  const [checkTeacher, setCheckTeacher] = useState();

  async function updateTeachers() {
    await axios.put(`${baseUrl}/admin/${editTeacherId}`, updateTeacher);
    setCheckTeacher(true);
  }

  // ----------------------------------------------------------------------------------------

  const [deleteTeacher, setDeleteTeacher] = useState();

  async function deleteTeacherData(id) {
    await axios.delete(`${baseUrl}/admin/${id}`);
    setDeleteTeacher(true);
  }

  if (checkTeacher) return <Teacher />;

  if (deleteTeacher) return <Teacher />;

  // if (addAdmin === false) return <Teacher />;

  // ...

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Teacher List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">Teacher Id</th>
                    <th className="text-center">Teacher Name</th>
                    <th className="text-center">Teacher Password</th>
                    <th className="text-center">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.password}</td>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => setEditTeacherData(data.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteTeacherData(data.id)}
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
      <div>
        <div className={style.addBox}>
          {/* ... */}

          {addAdmin ? (
            <>
              <label>Teacher Name</label>
              <input
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
                name="adminName"
                type="text"
                className="form-control"
                placeholder="Enter teacher name"
              />

              <label>Teacher Password</label>
              <input
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                name="adminPassword"
                type="text"
                className="form-control"
                placeholder="Enter teacher password"
              />

              <div className={style.buttonBox}>
                <button className="btn btn-primary" onClick={addAdminData}>
                  Add Teacher
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={handleCancelAddAdmin}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleAddAdmin}>
              Add Teacher
            </button>
          )}
        </div>
      </div>

      {/*------------------ Editing Teacher Data -----------------------------*/}
      {isEditing && (
        <div className={style.addBox}>
          <label>Edit Teacher name</label>
          <input
            value={updateTeacher.name}
            onChange={(e) => onTextFieldChange(e)}
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter teacher name"
          />

          <label>Edit Password</label>
          <input
            value={updateTeacher.password}
            onChange={(e) => onTextFieldChange(e)}
            name="password"
            type="text"
            className="form-control"
            placeholder="Enter password"
          />

          <div className={style.buttonBox}>
            <button className="btn btn-primary" onClick={updateTeachers}>
              Update Teacher
            </button>
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* --------------------------------Add Icon------------------------------------- */}
    </>
  );
}

export default Teacher;
