//    import style from "./Question.module.css";

// import style from "../SubjectComponent/Subject.module.css";

import axios from "axios";

import baseUrl from "../../../baseUrl";

import { useEffect, useState } from "react";

function Question() {
  //----------------------Calling GetAll McqQuestions-------------------------
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getAllQuestions() {
      const value = await axios.get(`${baseUrl}/question`);
      setQuestions(value.data);
    }
    getAllQuestions();
  }, []);

  // ---------------------------Calling all TrueFalse Questions------------------------

  const [tfQuestions, setTfQuestion] = useState([]);

  useEffect(() => {
    async function getAllTfQuestion() {
      const value1 = await axios.get(`${baseUrl}/tf-question`);
      setTfQuestion(value1.data);
    }
    getAllTfQuestion();
  }, []);
  const [fbQuestions, setFbQuestion] = useState([]);

  useEffect(() => {
    async function getAllFbQuestion() {
      const value2 = await axios.get(`${baseUrl}/fb-question`);
      setFbQuestion(value2.data);
    }
    getAllFbQuestion();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>MCQ Question List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">Question Name</th>
                    <th className="text-center">Option one</th>
                    <th className="text-center">Option two</th>
                    <th className="text-center">Option three</th>
                    <th className="text-center">Option Four</th>
                    <th className="text-center">Question Answer</th>
                    <th className="text-center">Subject Name</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.qname}</td>
                        <td>{data.optionOne}</td>
                        <td>{data.optionTwo}</td>
                        <td>{data.optionThree}</td>
                        <td>{data.optionFour}</td>
                        <td>{data.answer}</td>
                        <td>{data.sname.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-header">
            <h2>TrueFalse Question List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">Question Name</th>
                    <th className="text-center">Option one</th>
                    <th className="text-center">Option two</th>
                    <th className="text-center">Question Answer</th>
                    <th className="text-center">Subject Name</th>
                  </tr>
                </thead>
                <tbody>
                  {tfQuestions.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.qname}</td>
                        <td>{data.optionOne}</td>
                        <td>{data.optionTwo}</td>
                        <td>{data.answer}</td>
                        <td>{data.sname.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-header">
            <h2>Fill in the Blank Question List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">Question Name</th>
                    <th className="text-center">Question Answer</th>
                    <th className="text-center">Subject Name</th>
                  </tr>
                </thead>
                <tbody>
                  {fbQuestions.map((data, i) => (
                    <tr key={i}>
                      <td>{data.qname}</td>
                      <td>{data.answer}</td>
                      <td>{data.sname.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
