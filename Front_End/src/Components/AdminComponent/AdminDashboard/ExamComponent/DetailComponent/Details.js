import axios from "axios";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import baseUrl from "../../../../baseUrl";

function Details() {
  const { id } = useParams();

  const [exam, setExam] = useState({
    name: "",
    desc: "",
    level: "",
    passMarks: "",
    totalQuestion: "",
    marks: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    async function getExamDetails() {
      const value = await axios.get(`${baseUrl}/exam/${id}`);
      setExam(value.data);
    }
    getExamDetails();
  }, [id]);

  // -------------------------Go back function---------------------------------------

  let history = useHistory();

  function handleGoBack() {
    history.push("/AdminDashboard/Exam");
  }

  return (
    <>
      <div className="container">
        <div className="mt-4 mb-4">
          <h2>Exam Details</h2>
        </div>

        <div className="mb-4">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">Exam Name</th>
                <td className="text-center">{exam.name.name}</td>
              </tr>

              <tr>
                <th className="text-center">Exam Description</th>
                <td className="text-center">{exam.desc}</td>
              </tr>

              <tr>
                <th className="text-center">Exam Creation Date</th>
                <td className="text-center">{exam.date}</td>
              </tr>

              <tr>
                <th>Exam Time Limit</th>
                <td>{exam.time} min</td>
              </tr>

              <tr>
                <th className="text-center">Exam Total Marks</th>
                <td className="text-center">{exam.marks}</td>
              </tr>

              <tr>
                <th className="text-center">Exam Total Questions</th>
                <td className="text-center">{exam.totalQuestion}</td>
              </tr>

              <tr>
                <th className="text-center">Exam Pass Marks</th>
                <td className="text-center">{exam.passMarks}</td>
              </tr>

              <tr>
                <th className="text-center">Exam Level</th>
                <td className="text-center">{exam.level}</td>
              </tr>
            </thead>
          </table>
        </div>

        <div className="mb-4">
          <button className="btn btn-primary" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default Details;
