import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "../StudentDashboard.module.css";
import baseUrl from "../../../baseUrl";

function Test() {
  const { id } = useParams();
  const { category } = useParams();

  const [allQuestions, setAllQuestions] = useState([]);
  const [allTfQuestions, setAllTfQuestions] = useState([]);
  const [allFbQuestions, setAllFbQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const history = useHistory();
  const [exam, setExam] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // const ExamPage = ({ exam }) => {
  useEffect(() => {
    setTimeRemaining(parseInt(exam.time) * 60);
  }, [exam.time]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          SubmitTest();
          console.log("Time is up");
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers]);

  //Helper Function to format time in mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    async function fetchAllQuestions() {
      try {
        const response = await axios.get(`${baseUrl}/exam/${id}/question`);
        setAllQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchAllTfQuestions() {
      try {
        const response = await axios.get(`${baseUrl}/exam-tf/${id}/question`);
        setAllTfQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchAllFbQuestions() {
      try {
        const response = await axios.get(`${baseUrl}/exam-fb/${id}/question`);
        setAllFbQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchExam() {
      try {
        const response = await axios.get(`${baseUrl}/exam/${id}`);
        setExam(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExam();
    fetchAllQuestions();
    fetchAllTfQuestions();
    fetchAllFbQuestions();
  }, [id]);

  useEffect(() => {
    const correctAnswers = allQuestions.map((question) => question.answer);
    setCorrectAnswers(correctAnswers);
  }, [allQuestions]);

  function onRadioButtonChange(e) {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  }

  function onFbInputChange(e) {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  }

  async function SubmitTest() {
    let score = 0;
    const totalQuestions =
      allQuestions.length + allTfQuestions.length + allFbQuestions.length;

    // Verify MCQ answers
    for (let i = 0; i < allQuestions.length; i++) {
      if (correctAnswers[i] === answers[`answer${i + 1}`]) {
        score++;
      }
    }

    // Verify True/False answers
    for (let i = 0; i < allTfQuestions.length; i++) {
      const tfQuestion = allTfQuestions[i];
      const selectedAnswer = answers[`answer${allQuestions.length + i + 1}`];

      if (selectedAnswer === tfQuestion.answer) {
        score++;
      }
    }

    // Verify Fill in the Blank answers
    for (let i = 0; i < allFbQuestions.length; i++) {
      const fbQuestion = allFbQuestions[i];
      const selectedAnswer =
        answers[`answer${allQuestions.length + allTfQuestions.length + i + 1}`];

      if (selectedAnswer.toLowerCase() === fbQuestion.answer.toLowerCase()) {
        score++;
      }
    }

    const status = score >= parseInt(exam.passMarks) ? "Pass" : "Fail";
    const date = new Date();
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const resultData = {
      status,
      score,
      email: { email: sessionStorage.getItem("user") },
      edate: `${formattedDate} ${formattedTime}`,
      sname: { name: category },
      totalMarks: totalQuestions.toString(),
      examId: { id },
      totalQuestion: totalQuestions.toString(),
      answers: answers,
    };

    try {
      await axios.post(`${baseUrl}/result`, resultData);
      history.push("/StudentDashboard/Result");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col text-end mt-2 ">
            <h3
              className="fixed-top"
              style={{ color: "red", marginTop: "60px" }}
            >
              Time Remaining: {formatTime(timeRemaining)}
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-4">
              <h1>Answer all the questions</h1>
            </div>
          </div>
        </div>
        {allQuestions.map((data, i) => (
          <div id={style.displayBoxQuestionBox} className="row" key={i}>
            <div className="col">
              <div id={style.divQuestion}>
                <h6>{data.qname}</h6>
              </div>
              <div className="form-check">
                <label htmlFor={style.option1} className="form-check-label">
                  {data.optionOne}
                </label>
                <input
                  onChange={(e) => onRadioButtonChange(e)}
                  value={data.optionOne}
                  id={style.option1}
                  name={`answer${i + 1}`}
                  type="radio"
                  className="form-check-input"
                />
              </div>
              <div className="form-check">
                <input
                  onChange={(e) => onRadioButtonChange(e)}
                  value={data.optionTwo}
                  id={style.option2}
                  name={`answer${i + 1}`}
                  type="radio"
                  className="form-check-input"
                />
                <label htmlFor={style.option2} className="form-check-label">
                  {data.optionTwo}
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={(e) => onRadioButtonChange(e)}
                  value={data.optionThree}
                  id={style.option3}
                  name={`answer${i + 1}`}
                  type="radio"
                  className="form-check-input"
                />
                <label htmlFor={style.option3} className="form-check-label">
                  {data.optionThree}
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={(e) => onRadioButtonChange(e)}
                  value={data.optionFour}
                  id={style.option4}
                  name={`answer${i + 1}`}
                  type="radio"
                  className="form-check-input"
                />
                <label htmlFor={style.option4} className="form-check-label">
                  {data.optionFour}
                </label>
              </div>
            </div>
          </div>
        ))}

        {/* Remaining code for True/False and Fill in the Blank questions */}
        {allTfQuestions.map((data, i) => (
          <div id={style.displayBoxQuestionBox} className="row" key={i}>
            <div className="col">
              <div id={style.divQuestion}>
                <span>{data.qname}</span>
              </div>
              <div className="form-check">
                <label htmlFor="option1" className="form-check-label">
                  {data.optionOne}
                </label>
                <input
                  onChange={(e) => onRadioButtonChange(e)}
                  value="True"
                  id={style.option1}
                  name={`answer${allQuestions.length + i + 1}`}
                  type="radio"
                  className="form-check-input"
                />
              </div>
              <div className="form-check">
                <input
                  onChange={(e) => onRadioButtonChange(e)}
                  value="False"
                  id={style.option2}
                  name={`answer${allQuestions.length + i + 1}`}
                  type="radio"
                  className="form-check-input"
                />
                <label htmlFor="option2" className="form-check-label">
                  {data.optionTwo}
                </label>
              </div>
            </div>
          </div>
        ))}

        {allFbQuestions.map((data, i) => (
          <div id={style.displayBoxQuestionBox} className="row" key={i}>
            <div className="col">
              <div id={style.divQuestion}>
                <span>{data.qname}</span>
              </div>
              <div className="form-group">
                <input
                  onChange={(e) => onFbInputChange(e)}
                  id={style.fbInput}
                  name={`answer${
                    allQuestions.length + allTfQuestions.length + i + 1
                  }`}
                  type="text"
                  placeholder="Your answer"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="row">
          <div className="col text-center">
            <div id={style.submitExam}>
              <button onClick={SubmitTest} className="btn btn-primary">
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
