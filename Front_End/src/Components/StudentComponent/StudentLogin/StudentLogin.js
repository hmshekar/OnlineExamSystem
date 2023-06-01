import style from "./StudentLogin.module.css";

import { NavLink, useHistory } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";

function StudentLogin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function onTextFieldChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  let history = useHistory();

  async function handleLogin() {
    try {
      const response = await axios.get(`${baseUrl}/user/${user.email}`);
      const userData = response.data;

      if (userData) {
        if (
          userData.email === user.email &&
          userData.password === user.password
        ) {
          alert("Login success");
          sessionStorage.setItem("user", user.email);
          history.push("/StudentDashboard");
        } else {
          alert("Wrong user email or password");
        }
      } else {
        alert("User does not exist");
      }
    } catch (error) {
      // Handle API request error
      console.error("Error during login:", error);
      alert("Student Does not exist. Please register.");
      history.push("/StudentSignup");
    }
  }

  return (
    <>
      {/* ====================================================================================== */}

      <div className="container-fluid" id={style.background1}>
        <div className="col-md-4" id={style.loginbox}>
          <div className="form-control" id={style.form}>
            <label htmlFor="email">
              <h3 className="display-7 text-white">StudentEmail</h3>
              <input
                className=" form-control-lg"
                name="email"
                onChange={(e) => onTextFieldChange(e)}
                type="email"
                placeholder="enter student email"
                required
              />
            </label>

            <label htmlFor="password">
              <h3 className="display-7 text-white">Password</h3>
              <input
                className=" form-control-lg"
                name="password"
                onChange={(e) => onTextFieldChange(e)}
                type="password"
                id={style.password}
                placeholder="enter password"
                required
              />
            </label>
            <br />
            <br />

            <button
              onClick={handleLogin}
              className="btn btn-warning btn-center"
              id={style.login1}
            >
              Login
            </button>

            <div className={style.buttonContainer}>
              <span className="text-white">New to Portal? </span>
              <button
                className="btn btn-warning"
                // style={{ background: "orange" }}
              >
                <NavLink
                  exact
                  to="/StudentSignup"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  Register
                </NavLink>
              </button>{" "}
              <br />
              <button className="btn btn-warning">
                <NavLink
                  exact
                  to="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  Go Back
                </NavLink>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentLogin;
