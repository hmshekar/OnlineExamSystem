import style from "../../SubjectComponent/Subject.module.css";

import { useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../../baseUrl";

function AddTrueFalseQuestion() {
  const { id } = useParams();

  const [question, setQuestion] = useState({
    qname: "",
    optionOne: "",
    optionTwo: "",
    answer: "",
    ename: id,
    sname: "",
  });

  function onInputChange(e) {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });

    // console.log(question);
  }

  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard/Exam`);
  }

  async function addnewQuestion() {
    setQuestion((question.ename = { id: id }));

    setQuestion(
      (question.sname = { name: document.getElementById("subjectField").value })
    );

    //need to change the usrl of True or false
    await axios.post(`${baseUrl}/tf-question`, question);
    history.push(`/AdminDashboard/Exam/ViewQuestion/${id}`);
  }

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Adding True OR False Question</h2>
      </div>

      <div id={style.addBox} className={style.addQuestion}>
        <label>Question </label>
        <input
          onChange={(e) => onInputChange(e)}
          name="qname"
          type="text"
          placeholder="Enter Question"
        />

        <label>Enter Option A </label>
        <input
          onChange={(e) => onInputChange(e)}
          name="optionOne"
          type="text"
          placeholder="Enter True/False"
        />

        <label>Enter Option B</label>
        <input
          onChange={(e) => onInputChange(e)}
          name="optionTwo"
          type="text"
          placeholder="Enter True/False"
        />

        <label>Enter Answer</label>
        <input
          onChange={(e) => onInputChange(e)}
          name="answer"
          type="text"
          placeholder="Enter Question answer (True/False)"
        />

        <label>Enter Subject</label>
        <input
          onChange={(e) => onInputChange(e)}
          name="sname"
          id="subjectField"
          type="text"
          placeholder="Enter Subject"
        />

        <div id={style.buttonBox}>
          <button onClick={addnewQuestion}>Add</button>
          <button onClick={handleGoBack}>Go back</button>
        </div>
      </div>
    </>
  );
}

export default AddTrueFalseQuestion;
