import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import style from "../../SubjectComponent/Subject.module.css";

import baseUrl from "../../../../baseUrl";

function ViewQuestion() {
  //  ---------------------- add Subject & close buttton working  -------------------------------------

  const [mcqEditDisplay, setMcqEditDisplay] = useState({
    display: "none",
  });

  function handleEditMCQQuestion(questionId) {
    setMcqEditDisplay({ display: "block" });
    setDataInInputField(questionId);
  }

  function handleCloseMcqEdit() {
    setMcqEditDisplay({ display: "none" });
  }

  const { id } = useParams();
  //  -----------------------------True False Question display--------------
  const [tfEditDisplay, setTfEditDisplay] = useState({
    display: "none",
  });

  function handleEditTfQuestion(questionId) {
    setTfEditDisplay({ display: "block" });
    setDataInInputFieldTf(questionId);
  }

  function handleCloseTfEdit() {
    setTfEditDisplay({ display: "none" });
  }

  //----------------------------------Fill In Blank Question Display--------------------------
  const [fbEditDisplay, setFbEditDisplay] = useState({
    display: "none",
  });

  function handleEditFbQuestion(questionId) {
    setFbEditDisplay({ display: "block" });
    setDataInInputFieldFb(questionId);
  }

  function handleCloseFbEdit() {
    setFbEditDisplay({ display: "none" });
  }

  //  ---------------------- Fetching All Mcq Questions -------------------------------------

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getAllQuestions() {
      let value = await axios.get(`${baseUrl}/exam/${id}/question`);
      setQuestions(value.data);
      //console.log(value.data);
    }
    getAllQuestions();
  }, [id]);

  //  ---------------------- Fetching All TrueFalse Questions -------------------------------------

  const [tfquestions, settfQuestions] = useState([]);

  useEffect(() => {
    async function getAlltfQuestions() {
      let value = await axios.get(`${baseUrl}/exam-tf/${id}/question`);
      settfQuestions(value.data);
      //console.log(value.data);
    }
    getAlltfQuestions();
  }, [id]);

  // -----------------------Fetching All FillInTheBlank Questions-------------------------------
  const [fbQuestions, setFbQuestions] = useState([]);

  useEffect(() => {
    async function getAllFbQuestions() {
      let value = await axios.get(`${baseUrl}/exam-fb/${id}/question`);
      setFbQuestions(value.data);
    }
    getAllFbQuestions();
  }, [id]);

  //  ---------------------- handling Mcq text field -------------------------------------

  const [updatedQ, setUpdatedQ] = useState({
    qname: "",
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    optionFour: "",
    answer: "",
    ename: id,
    sname: "",
  });

  function onTextFieldChange(e) {
    setUpdatedQ({
      ...updatedQ,
      [e.target.name]: e.target.value,
    });
    // console.log(updatedQ);
  }

  //  ---------------------- handling text for true false field -------------------------------------

  const [updatedtfQ, setUpdatedtfQ] = useState({
    qname: "",
    optionOne: "",
    optionTwo: "",
    answer: "",
    ename: id,
    sname: "",
  });

  function onTfTextFieldChange(e) {
    setUpdatedtfQ({
      ...updatedtfQ,
      [e.target.name]: e.target.value,
    });
    // console.log(updatedQ);
  }

  //  ---------------------- handling text for FillInTheBlank field -------------------------------------
  const [updatedFbQ, setUpdatedFbQ] = useState({
    qname: "",
    answer: "",
    ename: id,
    sname: "",
  });

  function onFbTextFieldChange(e) {
    setUpdatedFbQ({
      ...updatedFbQ,
      [e.target.name]: e.target.value,
    });
  }

  //  ---------------------- Showing data in mcq text field -------------------------------------

  // Id of current question clicked
  const [qId, setQId] = useState();

  function setDataInInputField(questionId) {
    setQId(questionId);

    for (let i = 0; i < questions.length; i++) {
      if (parseInt(questions[i].id) === parseInt(questionId)) {
        setUpdatedQ(questions[i]);
      }
    }
  }

  //  ---------------------- Showing data in true false text field -------------------------------------

  // Id of current question clicked
  const [qtfId, setQtfId] = useState();

  function setDataInInputFieldTf(questionId) {
    setQtfId(questionId);

    for (let i = 0; i < tfquestions.length; i++) {
      if (parseInt(tfquestions[i].id) === parseInt(questionId)) {
        setUpdatedtfQ(tfquestions[i]);
      }
    }
  }

  // ---------------------- Showing data in Fill blanks text field -------------------------------------
  // Id of current question clicked
  const [fbId, setFbId] = useState();

  function setDataInInputFieldFb(questionId) {
    setFbId(questionId);

    for (let i = 0; i < fbQuestions.length; i++) {
      if (parseInt(fbQuestions[i].id) === parseInt(questionId)) {
        setUpdatedFbQ(fbQuestions[i]);
      }
    }
  }
  // -----------------------------------------------------------------------------------------

  const [checkmcq, setCheckMcq] = useState();

  async function updateQuestion() {
    await axios.put(`${baseUrl}/question/${qId}`, updatedQ);
    setCheckMcq(true);
  }
  //updating true false question
  const [checktf, setCheckTf] = useState();

  async function updateTfQuestion() {
    await axios.put(`${baseUrl}/tf-question/${qtfId}`, updatedtfQ);
    setCheckTf(true);
  }
  const [checkFb, setCheckFb] = useState();

  async function updateFbQuestion() {
    await axios.put(`${baseUrl}/fb-question/${fbId}`, updatedFbQ);
    setCheckFb(true);
  }

  // ----------------------------------------------------------------------------------------

  let history = useHistory();

  function handleGoBack() {
    history.push("/AdminDashboard/Exam");
  }
  // ----------------------------------------------------------------------------------------

  const [deletemcq, setDeletemcq] = useState();

  async function deleteMcqQuestion(id) {
    await axios.delete(`${baseUrl}/question/${id}`);
    setDeletemcq(true);
  }

  //deleting True false

  const [deletetf, setDeletetf] = useState();

  async function deleteTfQuestion(id) {
    await axios.delete(`${baseUrl}/tf-question/${id}`);
    setDeletetf(true);
  }

  const [deleteFb, setDeleteFb] = useState();

  async function deleteFbQuestion(id) {
    await axios.delete(`${baseUrl}/fb-question/${id}`);
    setDeleteFb(true);
  }

  if (checkmcq) return <ViewQuestion />;

  if (deletemcq) return <ViewQuestion />;

  if (checktf) return <ViewQuestion />;

  if (deletetf) return <ViewQuestion />;

  if (checkFb) return <ViewQuestion />;

  if (deleteFb) return <ViewQuestion />;

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Mcq Question List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">Question Name</th>
                    <th className="text-center">Option One</th>
                    <th className="text-center">Option Two</th>
                    <th className="text-center">Option Three</th>
                    <th className="text-center">Option Four</th>
                    <th className="text-center">Question Answer</th>
                    <th className="text-center">Options</th>
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
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleEditMCQQuestion(data.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteMcqQuestion(data.id)}
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
      <div id={style.addSubjectBox}>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
      <br />
      <br />
      <hr />

      {/*------------------- Display TrueFalse Question ------------------------------- */}
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>True False Question List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-center">Question Name</th>
                    <th className="text-center">Option One</th>
                    <th className="text-center">Option Two</th>
                    <th className="text-center">Question Answer</th>
                    <th className="text-center">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {tfquestions.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.qname}</td>
                        <td>{data.optionOne}</td>
                        <td>{data.optionTwo}</td>
                        <td>{data.answer}</td>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleEditTfQuestion(data.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteTfQuestion(data.id)}
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
      <div id={style.addSubjectBox}>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
      <br />
      <br />
      <hr />

      {/* ------------------- Display FB Question ------------------------------- */}
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Fill in the Blank Question List</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-center">Question Name</th>
                    <th className="text-center">Question Answer</th>
                    <th className="text-center">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {fbQuestions.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.qname}</td>
                        <td>{data.answer}</td>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleEditFbQuestion(data.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteFbQuestion(data.id)}
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

      <div id={style.addSubjectBox}>
        <button onClick={handleGoBack}>Go Back</button>
      </div>

      {/*------------------ Editing Mcq Question -----------------------------*/}
      <div id={style.addBox} style={mcqEditDisplay}>
        <label>Enter Mcq Question </label>
        <input
          value={updatedQ.qname}
          onChange={(e) => onTextFieldChange(e)}
          name="qname"
          type="text"
          placeholder="Enter Question "
        />

        <label>Enter Option A </label>
        <input
          value={updatedQ.optionOne}
          onChange={(e) => onTextFieldChange(e)}
          name="optionOne"
          type="text"
          placeholder="Enter Option A"
        />
        <label>Enter Option B </label>
        <input
          value={updatedQ.optionTwo}
          onChange={(e) => onTextFieldChange(e)}
          name="optionTwo"
          type="text"
          placeholder="Enter Option B"
        />
        <label>Enter Option C </label>
        <input
          value={updatedQ.optionThree}
          onChange={(e) => onTextFieldChange(e)}
          name="optionThree"
          type="text"
          placeholder="Enter Option C"
        />
        <label>Enter Option D </label>
        <input
          value={updatedQ.optionFour}
          onChange={(e) => onTextFieldChange(e)}
          name="optionFour"
          type="text"
          placeholder="Enter Option D"
        />
        <label>Enter Question Answer </label>
        <input
          value={updatedQ.answer}
          onChange={(e) => onTextFieldChange(e)}
          name="answer"
          type="text"
          placeholder="Enter Answer"
        />
        <label>Enter Subject </label>
        <input
          value={updatedQ.sname.name}
          onChange={(e) => onTextFieldChange(e)}
          name="sname"
          type="text"
          placeholder="Enter Subject"
        />
        <div id={style.buttonBox}>
          <button onClick={updateQuestion}>Update Question</button>
          <button onClick={handleCloseMcqEdit}>Close</button>
        </div>
      </div>

      {/* ------------------------Editing TrueFalse Question----------------------- */}

      <div id={style.addBox} style={tfEditDisplay}>
        <label>Enter Question </label>
        <input
          value={updatedtfQ.qname}
          onChange={(e) => onTfTextFieldChange(e)}
          name="qname"
          type="text"
          placeholder="Enter Question "
        />

        <label>Enter Option A </label>
        <input
          value={updatedtfQ.optionOne}
          onChange={(e) => onTfTextFieldChange(e)}
          name="optionOne"
          type="text"
          placeholder="Enter True/False"
        />

        <label>Enter Option B </label>
        <input
          value={updatedtfQ.optionTwo}
          onChange={(e) => onTfTextFieldChange(e)}
          name="optionTwo"
          type="text"
          placeholder="Enter True/False"
        />

        <label>Enter Question Answer </label>
        <input
          value={updatedtfQ.answer}
          onChange={(e) => onTfTextFieldChange(e)}
          name="answer"
          type="text"
          placeholder="Enter Answer"
        />

        <label>Enter Subject </label>
        <input
          value={updatedtfQ.sname.name}
          onChange={(e) => onTfTextFieldChange(e)}
          name="sname"
          type="text"
          placeholder="Enter Subject"
        />

        <div id={style.buttonBox}>
          <button onClick={updateTfQuestion}>Update Question</button>
          <button onClick={handleCloseTfEdit}>Close</button>
        </div>
      </div>

      {/* ------------------------Editing FillInBlanks Question----------------------- */}

      <div id={style.addBox} style={fbEditDisplay}>
        <label>Enter Question</label>
        <input
          value={updatedFbQ.qname}
          onChange={(e) => onFbTextFieldChange(e)}
          name="qname"
          type="text"
          placeholder="Enter Question"
        />

        <label>Enter Question Answer</label>
        <input
          value={updatedFbQ.answer}
          onChange={(e) => onFbTextFieldChange(e)}
          name="answer"
          type="text"
          placeholder="Enter Answer"
        />

        <label>Enter Subject </label>
        <input
          value={updatedFbQ.sname.name}
          onChange={(e) => onFbTextFieldChange(e)}
          name="sname"
          type="text"
          placeholder="Enter Subject"
        />

        <button onClick={updateFbQuestion}>Update Question</button>
        <button onClick={handleCloseFbEdit}>Close</button>
      </div>
    </>
  );
}

export default ViewQuestion;
