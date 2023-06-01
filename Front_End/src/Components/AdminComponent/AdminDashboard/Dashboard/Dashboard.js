import style from "./Dashboard.module.css";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import baseUrl from "../../../baseUrl";

function Dashboard() {
  const [exam, setExam] = useState("Updating...");
  const [question, setQuestion] = useState("Updating...");
  const [user, setUser] = useState("Updating...");

  useEffect(() => {
    async function getAllExam() {
      let value = await axios.get(`${baseUrl}/exam`);
      setExam("We have total " + value.data.length + " exam");
    }
    getAllExam();

    async function getAllQuestions() {
      let value = await axios.get(`${baseUrl}/question`);
      setQuestion("We have total " + value.data.length + " question");
    }
    getAllQuestions();

    async function getAllUsers() {
      let value = await axios.get(`${baseUrl}/user`);
      setUser("We have total " + value.data.length + " user");
    }
    getAllUsers();
  });

  let history = useHistory();

  function showExam() {
    history.push("/AdminDashboard/Exam");
  }

  function showQuestions() {
    history.push("/AdminDashboard/Question");
  }

  function showUsers() {
    history.push("/AdminDashboard/StudentList");
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="text-dark p-4">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="bg-info text-dark p-4 rounded">
              <p>
                Exam: <span>{exam}</span>
              </p>
              <button className="btn btn-light" onClick={showExam}>
                View Details
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-success text-white p-4 rounded">
              <p>Question: {question}</p>
              <button className="btn btn-light" onClick={showQuestions}>
                View Details
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-warning text-dark p-4 rounded">
              <p>
                User: <span>{user}</span>
              </p>
              <button className="btn btn-light" onClick={showUsers}>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
