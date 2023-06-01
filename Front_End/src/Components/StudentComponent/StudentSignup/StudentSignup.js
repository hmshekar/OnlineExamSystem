import { NavLink, useHistory } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

import style from "./StudentSignup.module.css";

import baseUrl from "../../baseUrl";

function StudentSignup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function onTextFieldChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const [password, setPassword] = useState("");

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  let history = useHistory();

  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  //password Validator
  // const [isPasswordValid, setIsPasswordValid] = useState(true);

  function isPasswordValid(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,}$/;
    return passwordRegex.test(password);
  }

  async function handleSignup() {
    if (userData.password === password) {
      if (isEmailValid(userData.email)) {
        if (isPasswordValid(userData.password)) {
          await axios.post(`${baseUrl}/user`, userData);
          // if (data === null) {
          //   alert("User exixst");
          // } else {
          alert("Your account has been created");
          alert("Please login");
          history.push("/StudentLogin");
        } else {
          // setIsPasswordValid(false);
          alert("Invalid password format");
        }
      } else {
        alert("Invalid email format");
      }
    } else {
      alert("Password did not match");
    }
  }

  return (
    <>
      {/* ================================================================================== */}
      <div className="container-fluid" id={style.background1}>
        <div className="col-md-6" id={style.loginbox}>
          <div className="form-control" id={style.form}>
            {/* <h1 align="center">Student Signup</h1> */}
            <p align="center">
              {/* Please complete the form below to register with us */}
            </p>
            <div className="form-control text-white" id={style.form1}>
              <label htmlFor="name">
                <h3>Name </h3>
                <input
                  className=" form-control-lg"
                  onChange={(e) => onTextFieldChange(e)}
                  type="text"
                  name="name"
                  required
                  placeholder="Enter Name"
                />
              </label>

              <label htmlFor="email">
                {" "}
                <h3>Email</h3>
                <input
                  className=" form-control-lg"
                  onChange={(e) => onTextFieldChange(e)}
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Email"
                />
              </label>

              <label htmlFor="password">
                {" "}
                <h3>Password</h3>
                <input
                  className=" form-control-lg"
                  onChange={(e) => onTextFieldChange(e)}
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                />
              </label>

              <label htmlFor="confirmPassword">
                <h3>Confirm Password</h3>
                <input
                  className=" form-control-lg"
                  onChange={(e) => handlePassword(e)}
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                />
              </label>
              <br />
              <br />

              <button className="btn btn-warning" onClick={handleSignup}>
                Sign Up
              </button>

              <h4>
                Have a Account?{" "}
                <button className="btn btn-warning">
                  <NavLink
                    exact
                    to="/StudentLogin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {" "}
                    Log in
                  </NavLink>
                </button>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentSignup;
