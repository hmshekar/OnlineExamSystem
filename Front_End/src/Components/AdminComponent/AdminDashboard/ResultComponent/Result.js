import axios from "axios";

import { useEffect, useState } from "react";

import style from "../SubjectComponent/Subject.module.css";

import baseUrl from "../../../baseUrl";

function Result() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getAllResults() {
      let value = await axios.get(`${baseUrl}/result`);
      setResults(value.data);
      //console.log(value.data[0]);
    }
    getAllResults();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Result List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
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
    </>
  );
}

export default Result;
