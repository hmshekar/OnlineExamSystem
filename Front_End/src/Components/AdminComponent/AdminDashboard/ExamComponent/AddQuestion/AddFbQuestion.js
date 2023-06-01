import style from "../../SubjectComponent/Subject.module.css";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../../baseUrl";

function AddFbQuestion() {
  const { id } = useParams();

  const [question, setQuestion] = useState({
    qname: "",
    answer: "",
    ename: id,
    sname: "",
  });

  function onInputChange(e) {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  }

  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard/Exam`);
  }

  async function addNewQuestion() {
    setQuestion((question.ename = { id: id }));

    setQuestion(
      (question.sname = { name: document.getElementById("subjectField").value })
    );

    await axios.post(`${baseUrl}/fb-question`, question);
    history.push(`/AdminDashboard/Exam/ViewQuestion/${id}`);
  }

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Adding Fill in the Blank Question</h2>
      </div>

      <div id={style.addBox} className={style.addQuestion}>
        <label>Question Name</label>
        <input
          onChange={(e) => onInputChange(e)}
          name="qname"
          type="text"
          placeholder="Enter Question"
        />

        <label>Enter Question Answer</label>
        <input
          onChange={(e) => onInputChange(e)}
          name="answer"
          type="text"
          placeholder="Enter Answer"
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
          <button onClick={addNewQuestion}>Add</button>
          <button onClick={handleGoBack}>Go back</button>
        </div>
      </div>
    </>
  );
}

export default AddFbQuestion;
