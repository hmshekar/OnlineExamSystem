import { useState, useEffect } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";

import style from "../SubjectComponent/Subject.module.css";

import baseUrl from "../../../baseUrl";

function Exam() {
  //  ---------------------- add Exam & close buttton working  -------------------------------------
  const [display, setDisplay] = useState({
    display: "none",
  });

  function handleAddExam() {
    setDisplay({ display: "block" });
  }

  function handleCloseExam() {
    setDisplay({ display: "none" });
  }

  // --------------- Fetching all Exam from db.json file-------------------------

  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function getAllExam() {
      let value = await axios.get(`${baseUrl}/exam`);
      setExams(value.data);
      //console.log(value.data[0].name);
    }
    getAllExam();
  }, []);

  // --------------------Adding Exam And re-render Exam component-----------------

  var date = new Date();
  var d =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  var t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const [exam, setExam] = useState({
    name: "",
    desc: "",
    level: "",
    passMarks: "",
    totalQuestion: "",
    marks: "",
    date: d + " " + t,
  });

  function handleInput(e) {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
    // console.log(exam);
  }

  async function isSubjectExist(subjectName) {
    try {
      // Make an API request to check if the subject exists in your backend
      const response = await axios.get(`${baseUrl}/subjects/${subjectName}`);
      // alert(JSON.stringify(response.data));
      if (response.data && Object.keys(response.data).length > 0) {
        return true;
      } else {
        alert("problem in fetching Subject, Try Again");
      }
    } catch (error) {
      console.error("Error checking subject existence:", error);
      alert("Error Fetching datails");
      // Handle the error accordingly (e.g., show an error message)
      return false;
    }
  }

  async function handleAddNewExam() {
    // setExam((exam.name = { name: document.getElementById("nameFiled").value }));
    const { name } = exam;

    // Check if the subject exists
    const subjectExists = await isSubjectExist(name);

    if (subjectExists) {
      await axios.post(`${baseUrl}/exam`, exam);
      setStatus(true);
    } else {
      alert("Sub not there");
    }
  }

  const [status, setStatus] = useState();

  // ----------------------------Deleting Exam-----------------------------------------------

  const [statusDeleteExam, setStatusDeleteExam] = useState();

  async function deleteMcqQuestion(id) {
    await axios.delete(`${baseUrl}/exam/${id}/delete`);
  }

  async function deleteTfQuestion(id) {
    await axios.delete(`${baseUrl}/exam-tf/${id}/delete`);
  }

  async function deleteFbQuestion(id) {
    await axios.delete(`${baseUrl}/exam-fb/${id}/delete`);
  }

  async function deleteResult(id) {
    await axios.delete(`${baseUrl}/result/${id}/delete`);
  }
  async function deleteExam(id) {
    deleteMcqQuestion(id);
    deleteTfQuestion(id);
    deleteFbQuestion(id);
    deleteResult(id);
    await axios.delete(`${baseUrl}/exam/${id}`);
    setStatusDeleteExam(true);
  }

  if (status) return <Exam />;

  if (statusDeleteExam) return <Exam />;

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Exam List</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th id={style.center}>Exam Name</th>
              <th id={style.center}>Exam Desc.</th>
              <th id={style.center}>Exam Creation Date</th>
              <th id={style.center}>Exam Level</th>
              <th id={style.center}>Options</th>
            </tr>
          </thead>
          <tbody id={style.tbody}>
            {exams.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.name.name}</td>
                  <td>{data.desc}</td>
                  <td>{data.date}</td>
                  <td>{data.level}</td>
                  <td>
                    <NavLink
                      exact
                      to={`/AdminDashboard/Exam/Details/${data.id}`}
                    >
                      <button className="btn btn-info">Details</button>
                    </NavLink>

                    <NavLink
                      exact
                      to={`/AdminDashboard/Exam/ViewQuestion/${data.id}`}
                    >
                      <button className="btn btn-warning">View Question</button>
                    </NavLink>

                    {/* <div className="dropdown"> */}
                    <button
                      className="btn b btn-dark"
                      type="button"
                      id="addQuestionDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Add Question
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="addQuestionDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          exact
                          to={`/AdminDashboard/Exam/AddMcqQuestion/${data.id}`}
                        >
                          AddMcq{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          exact
                          to={`/AdminDashboard/Exam/AddTrueFalseQuestion/${data.id}`}
                        >
                          Add True/False
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          exact
                          to={`/AdminDashboard/Exam/AddFbQuestion/${data.id}`}
                        >
                          Add FillInBlank
                        </NavLink>
                      </li>
                    </ul>
                    {/* </div> */}

                    <button
                      className="btn btn-danger"
                      onClick={() => deleteExam(data.id)}
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

      <div id={style.addSubjectBox}>
        <button onClick={handleAddExam}>Add Exam</button>
      </div>

      <div id={style.addBox} style={display}>
        <label htmlFor="">Enter Subject Name </label>
        <input
          id="nameFiled"
          onChange={(e) => handleInput(e)}
          name="name"
          type="text"
          placeholder="Enter Subject Name"
        />

        <label htmlFor="">Enter Exam desc </label>
        <input
          onChange={(e) => handleInput(e)}
          name="desc"
          type="text"
          placeholder="Enter Exam des"
        />

        <label htmlFor="">Enter Exam TimeLimit</label>
        <input
          onChange={(e) => handleInput(e)}
          name="time"
          type="number"
          placeholder="Enter Time in min"
        />

        <label htmlFor="">Enter Exam Level </label>
        <input
          onChange={(e) => handleInput(e)}
          name="level"
          type="text"
          placeholder="Enter Exam Level"
        />

        <label htmlFor="">Enter Total Question </label>
        <input
          onChange={(e) => handleInput(e)}
          name="totalQuestion"
          type="number"
          placeholder="Enter Total Question"
        />

        <label htmlFor="">Enter Total Marks </label>
        <input
          onChange={(e) => handleInput(e)}
          name="marks"
          type="number"
          placeholder="Enter Total Marks(each question carries 1 mark)"
        />

        <label htmlFor="">Enter Pass Marks </label>
        <input
          onChange={(e) => handleInput(e)}
          name="passMarks"
          type="number"
          placeholder="Enter Pass Marks"
        />

        <div id={style.buttonBox}>
          <button onClick={handleAddNewExam}>Add</button>
          <button onClick={handleCloseExam}>Close</button>
        </div>
      </div>
    </>
  );
}

export default Exam;
